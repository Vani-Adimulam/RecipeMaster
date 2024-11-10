// src/features/recipesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch recipes based on ingredient
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (ingredient) => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    return response.data.meals;
  }
);

// Fetch single recipe details based on idMeal
export const fetchRecipeDetails = createAsyncThunk(
  'recipes/fetchRecipeDetails',
  async (idMeal) => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    return response.data.meals[0]; // The meal data is in the first index
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    recentlySearched: [],
    selectedRecipe: null,
    recipeDetails: null, // Store the selected recipe's detailed info
  },
  reducers: {
    selectRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
    addRecentSearch: (state, action) => {
      if (!state.recentlySearched.includes(action.payload)) {
        state.recentlySearched.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
    builder.addCase(fetchRecipeDetails.fulfilled, (state, action) => {
      state.recipeDetails = action.payload;
    });
  },
});

export const { selectRecipe, addRecentSearch } = recipesSlice.actions;
export default recipesSlice.reducer;
