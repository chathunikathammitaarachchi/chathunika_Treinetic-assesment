import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import recipesReducer from './recipesSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer, 
  },
});
