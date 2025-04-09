import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../features/recipes/recipesSlice";
import { TextField, Button, Grid, Paper, Typography, Box } from "@mui/material";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

  
    const parsedCookingTime = parseInt(cookingTime, 10);
    const parsedRating = parseFloat(rating);

    
    if (isNaN(parsedCookingTime) || isNaN(parsedRating)) {
      alert("Please enter valid numbers for cooking time and rating.");
      return;
    }

    
    const newRecipe = {
      id: Date.now(), 
      title,
      ingredients: ingredients.split(",").map(ingredient => ingredient.trim()), 
      instructions,
      image,
      cookingTime: parsedCookingTime,
      rating: parsedRating,
    };

   
    dispatch(createRecipe(newRecipe));

    
    setTitle("");
    setIngredients("");
    setInstructions("");
    setImage("");
    setCookingTime("");
    setRating("");
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h5" align="center">Add New Recipe</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Recipe Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Ingredients (comma separated)"
              variant="outlined"
              fullWidth
              margin="normal"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              multiline
              rows={4}
            />
            <TextField
              label="Instructions"
              variant="outlined"
              fullWidth
              margin="normal"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              multiline
              rows={4}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <TextField
              label="Cooking Time (minutes)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              required
            />
            <TextField
              label="Rating"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <Button type="submit" variant="contained" color="primary" sx={{ padding: "10px 20px" }}>
                Add Recipe
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RecipeForm;
