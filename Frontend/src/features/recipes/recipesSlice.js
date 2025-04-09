import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [], 
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    createRecipe: (state, action) => {
      state.recipes.push(action.payload); 
    },
    updateRecipe: (state, action) => {
      const { id, updatedRecipe } = action.payload;
      const index = state.recipes.findIndex((recipe) => recipe.id === id);
      if (index !== -1) {
        state.recipes[index] = { ...state.recipes[index], ...updatedRecipe }; 
      }
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload); 
    },
  },
});

export const { createRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
