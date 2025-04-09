import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';  
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div style={{ padding: '10px', backgroundColor: theme.palette.background.paper }}>
      
      <Typography 
        variant="h6" 
        sx={{ 
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000' 
        }}
      >
        Search Recipes
      </Typography>

      <TextField
        label="Search for recipes..."
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          marginTop: 2,
          backgroundColor: theme.palette.background.default,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
