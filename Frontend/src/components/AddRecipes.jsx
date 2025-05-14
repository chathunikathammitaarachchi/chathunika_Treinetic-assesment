import React, { useState, useEffect } from "react";
import { 
  Box, Grid, TextField, Card, CardContent, CardMedia, Typography, 
  Rating, Button, Container, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, Tab, Tabs 
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';




const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);


  
 
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cookingTime, setCookingTime] = useState(30);
  const [rating, setRating] = useState(0); 
  
 
  const currentUser = "current-user";
  
 
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
    
      setRecipes(initialRecipes);
      localStorage.setItem('recipes', JSON.stringify(initialRecipes));
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
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImageUrl("");
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
                    display: 'flex', 
                    gap: 1,
                    zIndex: 10 
                  }}>
                    <IconButton 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(255,255,255,0.8)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(recipe);
                      }}
                    >
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(255,255,255,0.8)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecipe(recipe.id);
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                )}
                
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                  sx={{
                    objectFit: 'cover',
                    filter: 'brightness(80%)',
                    transition: 'filter 0.3s ease',
                    '&:hover': {
                      filter: 'brightness(100%)',
                    }
                  }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                />

                <CardContent sx={{ padding: 2 }}>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    maxHeight: 40,
                    display: 'block',
                    lineHeight: '1.2em',
                  }}>
                    {recipe.title}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, textAlign: 'center' }}>
                    Cooking Time: {recipe.cookingTime} mins
                  </Typography>

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2,
                  }}>
                    <Rating value={recipe.rating || 0} readOnly sx={{ color: '#FFB74D' }} />
                    <Typography variant="body2" sx={{ marginLeft: 1, color: 'text.secondary' }}>
                      ({recipe.rating || 0})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: '100%',
                        borderRadius: 20,
                        boxShadow: 3,
                        padding: '12px 20px',
                        '&:hover': {
                          backgroundColor: '#1976D2',
                          boxShadow: 6,
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', padding: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No recipes found. {activeTab === 1 ? "Add a new recipe to get started!" : "Try a different search term."}
            </Typography>
          </Box>
        )}
      </Grid>

    
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ingredients (one per line)"
              multiline
              rows={4}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Instructions"
              multiline
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Cooking Time (minutes)"
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              inputProps={{ min: 1 }}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Rating
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />
            </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            color="primary"
          >
            {isEditing ? 'Update Recipe' : 'Add Recipe'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecipeApp;