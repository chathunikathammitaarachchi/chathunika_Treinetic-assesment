import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { Button, AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useThemeContext } from './theme/ThemeContext';  
import Profile from "./features/auth/UserProfile"
import RecipeFeed from './components/RecipeFeed';

import EditRecipePage from './pages/EditRecipePage';
import RecipeDetail from './components/RecipeDetails';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import FavoritesPage from './components/FavouritesPage';
import AddRecipe from './features/recipes/AddRecipes';

const App = () => {
  const { mode, toggleTheme } = useThemeContext(); 
  const { isAuthenticated } = useSelector((state) => state.auth);  
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flavor Exchange
          </Typography>
         
          <Button color="inherit" onClick={toggleTheme}>
            Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
          
         
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
              <Button color="inherit" onClick={() => navigate('/login')}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <RecipeFeed /> : <Signup />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={isAuthenticated ? <AddRecipe /> : <Login />} />
          <Route path="/edit-recipe/:id" element={isAuthenticated ? <EditRecipePage /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
       
        
        </Routes>
      </Container>
    </>
  );
};

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
