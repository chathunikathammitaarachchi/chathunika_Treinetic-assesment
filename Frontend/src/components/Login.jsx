import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../api/authSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      const user = { username, savedRecipes: [] };
      dispatch(login(user));
      navigate("/");
    } else {
      alert("Please enter a valid username and password");
    }
  };

  return (
    <Box
     sx={{
  minHeight: "100vh",

  backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVjaXBlfGVufDB8fDB8fHww')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
}}

    >
      <Paper
        elevation={20}
        sx={{
          padding: 5,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 8px 40px rgba(0,0,0,0.3)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 80, height: 80 }}>
            <LockIcon sx={{ fontSize: 45 }} />
          </Avatar>
        </Box>

        <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 2 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 4 }} color="text.secondary">
          Log in to manage your favorite recipes.
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "12px",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "12px",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Button
              onClick={() => navigate("/signup")}
              color="secondary"
              sx={{
                fontWeight: 600,
                ":hover": {
                  color: theme.palette.secondary.dark,
                },
              }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
