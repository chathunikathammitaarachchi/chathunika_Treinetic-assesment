import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Menu, MenuItem, Avatar, Box, Drawer, List,
  ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon, Restaurant, Favorite, Add, Logout, Person, LightMode, DarkMode } from '@mui/icons-material';
import { logout } from '../features/auth/authSlice';
import { useThemeContext } from '../theme/ThemeContext';

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { mode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <Restaurant />, path: '/' },
    ...(isAuthenticated ? [
      { text: 'Add Recipe', icon: <Add />, path: '/add-recipe' },
      { text: 'My Favorites', icon: <Favorite />, path: '/favorites' },
      { text: 'Profile', icon: <Person />, path: '/profile' }
    ] : [])
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1, color: 'primary.main' }}>
          Flavor Exchange
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'primary.light' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={toggleTheme}>
          <ListItemIcon>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </ListItemIcon>
          <ListItemText primary={mode === 'light' ? 'Dark Mode' : 'Light Mode'} />
        </ListItem>
        {isAuthenticated && (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={5} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: '1.3rem'
            }}
          >
            <Restaurant sx={{ fontSize: 30, color: 'primary.main' }} /> Flavor Exchange
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button color="inherit" component={RouterLink} to="/" sx={{
                '&:hover': { bgcolor: 'secondary.main', color: 'white' }, 
                fontSize: '1rem', fontWeight: '500'
              }}>
                Home
              </Button>

              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={RouterLink} to="/add-recipe" sx={{
                    '&:hover': { bgcolor: 'secondary.main', color: 'white' }, 
                    fontSize: '1rem', fontWeight: '500'
                  }}>
                    Add Recipe
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/favorites" sx={{
                    '&:hover': { bgcolor: 'secondary.main', color: 'white' }, 
                    fontSize: '1rem', fontWeight: '500'
                  }}>
                    Favorites
                  </Button>
                  <IconButton onClick={toggleTheme} color="inherit">
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                  </IconButton>
                  <IconButton
                    onClick={handleMenuOpen}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/login" sx={{
                    '&:hover': { bgcolor: 'secondary.main', color: 'white' }, 
                    fontSize: '1rem', fontWeight: '500'
                  }}>
                    Login
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/register" sx={{
                    '&:hover': { bgcolor: 'secondary.main', color: 'white' }, 
                    fontSize: '1rem', fontWeight: '500'
                  }}>
                    Register
                  </Button>
                  <IconButton onClick={toggleTheme} color="inherit">
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default AppHeader;
