// src/pages/RecipePage.js
import React from 'react';
import { useSelector } from 'react-redux';

const RecipePage = () => {
  const recipe = useSelector((state) => state.recipes.selectedRecipe);

  return (
    <div>
      {recipe ? (
        <>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p>{recipe.strInstructions || 'No instructions available.'}</p>
        </>
      ) : (
        <p>No recipe selected.</p>
      )}
    </div>
  );
};

export default RecipePage;
