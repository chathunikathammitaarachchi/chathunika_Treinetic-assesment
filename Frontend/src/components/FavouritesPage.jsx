// src/components/FavoritesPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard'; 

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>No favorite recipes yet!</p>
        ) : (
          favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
