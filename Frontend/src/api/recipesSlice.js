import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers: {
    createRecipe: (state, action) => {
      state.push(action.payload);
    },
    deleteRecipe: (state, action) => {
      return state.filter(recipe => recipe.id !== action.payload);
    },
    updateRecipe: (state, action) => {
      const index = state.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { createRecipe, deleteRecipe, updateRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
