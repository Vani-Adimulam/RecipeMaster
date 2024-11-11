// src/pages/RecipePage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecipeDetails } from "../features/recipesSlice";
import "./RecipePage.css";

const RecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state) => state.recipes.recipeDetails);

  useEffect(() => {
    const recipeId = window.location.pathname.split("/").pop();
    if (recipeId) {
      dispatch(fetchRecipeDetails(recipeId));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

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
    <div className="recipe-page">
      <h2 className="recipe-title">{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
      />

      <h3 className="recipe-section-title">Ingredients:</h3>
      <div className="recipe-ingredients">
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.ingredient}: {item.measure}
            </li>
          ))}
        </ul>
      </div>

      <h3 className="recipe-section-title">Instructions:</h3>
      <p className="recipe-instructions">{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipePage;
