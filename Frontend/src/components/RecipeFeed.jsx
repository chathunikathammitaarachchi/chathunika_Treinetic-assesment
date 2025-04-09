import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Card, CardContent, CardMedia, Typography, Rating, Button, Container } from "@mui/material";
import { Link } from "react-router-dom"; 
import { recipes } from "../api/mockData"; 


const RecipeFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query)
        )
      );
    });

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRecipes(recipes); 
    }
  }, [searchQuery]);

  return (
    <Container sx={{ padding: 4 }}>
      <Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            maxWidth: 600,
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: 3,
            '& .MuiInputBase-root': {
              padding: '8px 20px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#1976D2',
              },
            },
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}> 
            <Card sx={{
              width: 280, 
              height: 400, 
              boxShadow: 4,
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 12,
              },
            }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                  objectFit: 'cover', 
                  filter: 'brightness(70%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter: 'brightness(100%)',
                  }
                }}
                onError={(e) => { e.target.onerror = null; e.target.src = ''; }} 
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
                  <Rating value={recipe.rating} readOnly sx={{ color: '#FFB74D' }} />
                  <Typography variant="body2" sx={{ marginLeft: 1, color: 'text.secondary' }}>
                    ({recipe.rating})
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
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
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    
  );
};

export default RecipeFeed;
