import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRecipe } from "./recipesSlice";
import { Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const recipes = useSelector((state) => state.recipes); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditRecipe = (id) => {
    navigate(`/edit-recipe/${id}`); 
  };

  const handleDeleteRecipe = (id) => {
    dispatch(deleteRecipe(id)); 
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        All Recipes
      </Typography>

      {recipes.length === 0 ? (
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center" }}>
          No recipes available. Add some!
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {recipes.map((recipe) => (
            <Card key={recipe.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {recipe.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditRecipe(recipe.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                  sx={{ marginLeft: 1 }}
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

export default Home;
