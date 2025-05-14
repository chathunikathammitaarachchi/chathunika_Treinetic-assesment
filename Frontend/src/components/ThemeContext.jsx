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
        main: mode === 'light' ? '#8BC34A' : '#AED581', 
        light: '#DCEDC8',
        dark: '#689F38',
      },
      secondary: {
        main: mode === 'light' ? '#FF7043' : '#FFAB91', 
        light: '#FFCCBC',
        dark: '#BF360C',
      },
      background: {
        default: mode === 'light' ? '#FAF8F5' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#333333' : '#FFFFFF',
        secondary: mode === 'light' ? '#666666' : '#CCCCCC',
      },
    },
    components: {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: mode === 'light'
          ? '0 4px 12px rgba(0,0,0,0.05)'
          : '0 4px 12px rgba(0,0,0,0.25)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 24,
        padding: '10px 24px',
        fontWeight: 600,
        boxShadow: mode === 'light'
          ? '0 3px 6px rgba(0,0,0,0.1)'
          : '0 3px 6px rgba(0,0,0,0.3)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? 'rgb(111, 142, 150)' : 'rgb(0, 0, 0)',
        color: '#FFFFFF',
        boxShadow: 'none',
        borderBottom: mode === 'light'
          ? '1px solid #E0E0E0'
          : '1px solid #333',
      },
    },
  },
}

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
