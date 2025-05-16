import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
  Container,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { recipes } from "../api/mockData";

const RecipeFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const theme = useTheme();

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query)
      )
    );

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery]);

  return (
    <Container
      sx={{
        padding: 4,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            maxWidth: 600,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: 3,
            "& .MuiInputBase-root": {
              padding: "8px 20px",
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <Card
              sx={{
                width: 280,
                height: 400,
                boxShadow: 4,
                borderRadius: 3,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                backgroundColor: theme.palette.background.paper,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 12,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                  objectFit: "cover",
                  filter: "brightness(75%)",
                  transition: "filter 0.3s ease",
                  "&:hover": {
                    filter: "brightness(100%)",
                  },
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg"; // optional placeholder
                }}
              />

              <CardContent sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    maxHeight: 40,
                  }}
                >
                  {recipe.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Cooking Time: {recipe.cookingTime} mins
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Rating
                    value={recipe.rating}
                    readOnly
                    sx={{ color: "#FFB74D" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, color: theme.palette.text.secondary }}
                  >
                    ({recipe.rating})
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Link to={`/recipe/${recipe.id}`} style={{ width: "100%", textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        borderRadius: 20,
                        fontWeight: 600,
                        padding: "10px 24px",
                        boxShadow: 3,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                          boxShadow: 6,
                        },
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
