import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { TextField, Button, Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid xs={12} sm={8} md={6}> 
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
            <Avatar sx={{ backgroundColor: "primary.main", width: 60, height: 60 }}>
              <LockIcon />
            </Avatar>
          </Box>

          <Typography variant="h5" align="center" gutterBottom>
            Login
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
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
