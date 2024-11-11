// src/pages/Home.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, addRecentSearch } from "../features/recipesSlice";
import RecipeList from "../components/RecipeList";
import "./Home.css";

const Home = () => {
  const [ingredient, setIngredient] = useState("");
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recentlySearched = useSelector(
    (state) => state.recipes.recentlySearched
  );

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchRecipes(ingredient));
    dispatch(addRecentSearch(ingredient));
    setIngredient("");
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for an ingredient..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <h2 className="section-title">Recently Searched</h2>
      <div className="recently-searched">
        {recentlySearched.map((item, index) => (
          <div key={index} className="recent-item">
            {item}
          </div>
        ))}
      </div>

      <h2 className="section-title">Recipes</h2>
      <div className="recipe-list-container">
        {Array.isArray(recipes) && recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
