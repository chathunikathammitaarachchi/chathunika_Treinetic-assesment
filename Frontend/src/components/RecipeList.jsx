import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../features/recipes/recipesSlice";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  const handleDelete = (id) => {
    dispatch(deleteRecipe(id));
  };

  return (
    <div>
      {recipes.map((recipe) => (
       <Card key={recipe.id} sx={{ marginBottom: 2 }}>
       <CardContent>
         <Typography variant="h6">{recipe.title}</Typography>
         <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "auto" }} />
         <Typography variant="body2">{recipe.instructions.slice(0, 100)}...</Typography>
         <Button component={Link} to={`/edit/${recipe.id}`} variant="outlined" sx={{ marginRight: 2 }}>
           Edit
         </Button>
         <Button onClick={() => handleDelete(recipe.id)} variant="contained" color="error">
           Delete
         </Button>
       </CardContent>
     </Card>
     
      ))}
    </div>
  );
};

export default RecipeList;
