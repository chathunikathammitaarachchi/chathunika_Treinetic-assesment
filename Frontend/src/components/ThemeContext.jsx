import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };
  
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2', 
        light: '#63a4ff', 
        dark: '#004ba0', 
      },
      secondary: {
        main: '#4caf50',
        light: '#80e27e', 
        dark: '#087f23', 
      },
      background: {
        default: mode === 'light' ? '#f9f9f9' : '#121212', 
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      
        text: {
            primary: mode === 'light' ? '#000000' : '#ffffff', 
          },
          
      
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(0,0,0,0.05)' 
              : '0 4px 12px rgba(0,0,0,0.2)', 
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: '10px 20px',
            boxShadow: mode === 'light' 
              ? '0 4px 8px rgba(0,0,0,0.1)' 
              : '0 4px 8px rgba(0,0,0,0.3)', 
          },
        },
      },
    },
  }), [mode]);
  
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> 
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
