import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRecipe } from "../features/recipes/recipesSlice";
import { TextField, Button, Grid, Paper, Typography, Box } from "@mui/material";

const EditRecipeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const recipe = useSelector((state) => state.recipes.recipes.find((r) => r.id === parseInt(id)));

  useEffect(() => {
    if (!recipe) {
      navigate("/"); 
    }
  }, [recipe, navigate]);

  const [title, setTitle] = useState(recipe?.title || "");
  const [ingredients, setIngredients] = useState(recipe?.ingredients.join(",") || "");
  const [instructions, setInstructions] = useState(recipe?.instructions || "");
  const [image, setImage] = useState(recipe?.image || "");
  const [cookingTime, setCookingTime] = useState(recipe?.cookingTime || "");
  const [rating, setRating] = useState(recipe?.rating || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions,
      image,
      cookingTime: parseInt(cookingTime),
      rating: parseFloat(rating),
    };

    dispatch(updateRecipe({ id: recipe.id, updatedRecipe }));
    navigate("/");
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h5" align="center">Edit Recipe</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField label="Recipe Title" variant="outlined" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField label="Ingredients (comma separated)" variant="outlined" fullWidth margin="normal" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required multiline rows={4} />
            <TextField label="Instructions" variant="outlined" fullWidth margin="normal" value={instructions} onChange={(e) => setInstructions(e.target.value)} required multiline rows={4} />
            <TextField label="Image URL" variant="outlined" fullWidth margin="normal" value={image} onChange={(e) => setImage(e.target.value)} required />
            <TextField label="Cooking Time (minutes)" type="number" variant="outlined" fullWidth margin="normal" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
            <TextField label="Rating" type="number" variant="outlined" fullWidth margin="normal" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <Button type="submit" variant="contained" color="primary" sx={{ padding: "10px 20px" }}>
                Update Recipe
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditRecipeForm;
