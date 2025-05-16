import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
    <Box
      sx={{
        padding: 4,
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: theme.palette.primary.main,
          mb: 4,
        }}
      >
        My Favorite Recipes
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewAllRecipes}
          sx={{
            borderRadius: 3,
            fontWeight: "bold",
            paddingX: 3,
          }}
        >
          View All Recipes
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddRecipe}
          sx={{
            borderRadius: 3,
            fontWeight: "bold",
            paddingX: 3,
          }}
        >
          Add New Recipe
        </Button>
      </Box>

      {favoriteRecipes.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: "center", marginTop: 6 }}
        >
          You have no favorite recipes yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 3,
          }}
        >
          {favoriteRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                borderRadius: 3,
                boxShadow: 4,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                  width: 140,
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 2,
                  marginRight: 3,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {recipe.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    marginTop: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRecipeClick(recipe.id)}
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      paddingX: 3,
                    }}
                  >
                    View Recipe
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      paddingX: 3,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
