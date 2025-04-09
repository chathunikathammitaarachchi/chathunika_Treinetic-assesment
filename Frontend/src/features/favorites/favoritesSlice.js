import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    
    addFavorite: (state, action) => {
      const recipeExists = state.favorites.some(recipe => recipe.id === action.payload.id);
      if (!recipeExists) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites)); 
      }
    },
   
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(recipe => recipe.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); 
    },
    
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, clearError } = favoritesSlice.actions;

export default favoritesSlice.reducer;
