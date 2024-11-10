// src/pages/Home.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, addRecentSearch } from '../features/recipesSlice';
import RecipeList from '../components/RecipeList';

const Home = () => {
  const [ingredient, setIngredient] = useState('');
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recentlySearched = useSelector((state) => state.recipes.recentlySearched);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchRecipes(ingredient));
    dispatch(addRecentSearch(ingredient));
    setIngredient('');
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for an ingredient..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h2>Recently Searched</h2>
      <ul>
        {recentlySearched.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Recipes</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Home;
