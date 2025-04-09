import React, { useState } from "react";
import { Box, Button, Typography, List, ListItem, Card, CardContent, CardMedia } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; 
import { recipes } from "../api/mockData";  

const RecipeDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  
 
  const recipe = recipes.find((r) => r.id === parseInt(id));

 
  const handleSaveToFavorites = () => {
    const updatedFavorites = [...favoriteRecipes, recipe];
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Recipe saved to favorites!");
  };

  
  const handleShare = (platform) => {
    const url = window.location.href; 
    const message = `Check out this recipe: ${recipe.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'instagram':
        alert('Instagram does not support direct URL sharing, but you can manually share via their app.');
        break;
      default:
        console.log('Platform not supported');
    }
  };

  
  if (!recipe) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Recipe not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: '900px', margin: 'auto' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          height="300"
          image={recipe.image}
          alt={recipe.title}
          sx={{
            objectFit: 'cover',
            borderRadius: '8px',
            width: '100%',
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {recipe.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Cooking Time: {recipe.cookingTime} minutes
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Ingredients:
          </Typography>
          <List sx={{ textAlign: 'left' }}>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <Typography variant="body2">{ingredient}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Instructions:
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            {recipe.instructions}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginRight: 2,
                padding: '10px 20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
              onClick={handleSaveToFavorites}
            >
              Save to Favorites
            </Button>

          
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#f50057',
                  borderColor: '#f50057',
                  color: '#fff',
                },
              }}
              onClick={() => navigate(-1)} 
            >
              Go Back
            </Button>
          </Box>

        
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={() => handleShare('facebook')}
            >
              Share on Facebook
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{ marginRight: 2 }}
              onClick={() => handleShare('twitter')}
            >
              Share on Twitter
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleShare('instagram')}
            >
              Share on Instagram
            </Button>
          </Box>

          
          <Button
            variant="outlined"
            color="info"
            sx={{ marginTop: 2 }}
            onClick={() => navigate("/profile")} 
          >
            Go to My Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetail;
