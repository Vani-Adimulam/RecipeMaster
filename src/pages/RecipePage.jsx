// src/pages/RecipePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRecipeDetails } from '../features/recipesSlice';

const RecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state) => state.recipes.recipeDetails);

  // Fetch recipe details when component mounts or when the recipe changes
  useEffect(() => {
    const recipeId = window.location.pathname.split('/').pop(); // Get recipe id from URL
    if (recipeId) {
      dispatch(fetchRecipeDetails(recipeId));
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  // If recipe details are not yet loaded
  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Extract ingredients and instructions from recipe data
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '300px', marginBottom: '20px' }} />
      
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient}: {item.measure}
          </li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipePage;
