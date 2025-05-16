import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Card, CardContent, CardMedia, Typography, Rating, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cookingTime, setCookingTime] = useState(30);
  const [rating, setRating] = useState(0);
  const currentUser = 'current-user';

  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      setRecipes([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = recipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(query) ||
          (recipe.ingredients && recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          ))
        );
      });
      setFilteredRecipes(filtered);
    } else {
      if (activeTab === 0) {
        setFilteredRecipes(recipes);
      } else {
        setFilteredRecipes(recipes.filter(recipe => recipe.userId === currentUser));
      }
    }
  }, [searchQuery, recipes, activeTab]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (recipe = null) => {
    if (recipe) {
      setCurrentRecipe(recipe);
      setTitle(recipe.title);
      setIngredients(Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join('\n')
        : recipe.ingredients);
      setInstructions(recipe.instructions);
      setImageUrl(recipe.image);
      setCookingTime(recipe.cookingTime || 30);
      setRating(recipe.rating || 0);
      setIsEditing(true);
    } else {
      setCurrentRecipe(null);
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImageUrl('');
      setCookingTime(30);
      setRating(0);
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const ingredientsList = ingredients.split('\n').filter(i => i.trim() !== '');
    const recipeData = {
      title,
      ingredients: ingredientsList,
      instructions,
      image: imageUrl,
      cookingTime: parseInt(cookingTime),
      rating: rating,
      userId: currentUser,
    };

    if (isEditing) {
      setRecipes(recipes.map(recipe =>
        recipe.id === currentRecipe.id ? { ...recipeData, id: currentRecipe.id } : recipe
      ));
    } else {
      const newRecipe = {
        ...recipeData,
        id: Date.now(),
      };
      setRecipes([...recipes, newRecipe]);
    }

    handleCloseDialog();
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold', color: '#1976D2' }}>
        Recipe Manager
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="All Recipes" />
          <Tab label="My Recipes" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            maxWidth: 600,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: 3,
            '& .MuiInputBase-root': {
              padding: '8px 20px',
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            borderRadius: 2,
            padding: '10px 20px',
            marginLeft: 2,
            boxShadow: 3,
          }}
        >
          Add Recipe
        </Button>
      </Box>

      <Grid container spacing={4}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <Card sx={{
                width: '100%',
                height: 400,
                boxShadow: 4,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 12,
                },
                position: 'relative'
              }}>
                                {recipe.userId === currentUser && (
                  <Box sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}>
                    <IconButton onClick={() => handleOpenDialog(recipe)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRecipe(recipe.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                )}

                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image || 'https://via.placeholder.com/400'}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                    Cooking Time: {recipe.cookingTime} mins
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                    Rating: <Rating value={recipe.rating} readOnly />
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.ingredients.slice(0, 3).join(', ')}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray' }}>
              No recipes found.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Recipe Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit Recipe' : 'Add Recipe'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Ingredients (separate by line)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Instructions"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Cooking Time (mins)"
            variant="outlined"
            fullWidth
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            <CloseIcon /> Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {isEditing ? 'Update Recipe' : 'Add Recipe'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecipeApp;

