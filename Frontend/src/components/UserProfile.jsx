import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteRecipes(savedFavorites);
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleDeleteRecipe = (id) => {
    const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== id);

    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleViewAllRecipes = () => {
 
    navigate("/"); 
  };

  const handleAddRecipe = () => {
  
    navigate("/add-recipe");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        My Favorite Recipes
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewAllRecipes}
        >
          View All Recipes
        </Button>
      </Box>

     
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddRecipe}
        >
          Add Recipe
        </Button>
      </Box>

      {favoriteRecipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center" }}>
          You have no favorite recipes yet.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {favoriteRecipes.map((recipe) => (
            <Card key={recipe.id} sx={{ display: "flex", flexDirection: "row", boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {recipe.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1 }}
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  View Recipe
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: 1 }}
                  onClick={() => handleDeleteRecipe(recipe.id)} 
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
