// src/components/RecipeList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectRecipe } from '../features/recipesSlice';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          style={{ width: '200px', margin: '10px', textAlign: 'center' }}
        >
          <Link
            to={`/recipe/${recipe.idMeal}`} // Passing recipe id in URL
            onClick={() => dispatch(selectRecipe(recipe))}
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%' }} />
            <h4>{recipe.strMeal}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
