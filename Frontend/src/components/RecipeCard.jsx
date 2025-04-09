import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';  
import { Typography, Button, Card, CardContent } from '@mui/material';  
import { addFavorite, removeFavorite } from '../api/favoritesSlice';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const theme = useTheme(); 

 
  const isFavorite = favorites.some(fav => fav.id === recipe.id);

  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(recipe));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2, backgroundColor: theme.palette.background.paper }}>
      <CardContent>
       
        <Typography 
          variant="h5" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#fff' : '#000' 
          }}
        >
          {recipe.title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#bbb' : '#333' 
          }}
        >
          {recipe.description}
        </Typography>

        <Button 
          variant="contained" 
          onClick={handleToggleFavorite} 
          sx={{ marginTop: 2 }}
        >
          {isFavorite ? 'Unsave from Favorites' : 'Save to Favorites'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
