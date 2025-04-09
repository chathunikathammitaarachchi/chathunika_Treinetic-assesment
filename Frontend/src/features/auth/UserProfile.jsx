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

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        My Favorite Recipes
      </Typography>

      {favoriteRecipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center" }}>
          You have no favorite recipes yet.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {favoriteRecipes.map((recipe) => (
            <Card key={recipe.id} sx={{ display: "flex", flexDirection: "row" }}>
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
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
