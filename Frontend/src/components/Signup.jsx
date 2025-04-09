import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, login } from "../api/authSlice";
import { TextField, Button, Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (username && password) {
      const user = { username, savedRecipes: [] };

      // Dispatch signup and login
      dispatch(signup(user)).then(() => {
        // Automatically login after successful signup
        dispatch(login(user));
        navigate("/"); // Redirect to home page
      }).catch(err => {
        alert("Signup failed: " + err.message);
      });
    } else {
      alert("Please fill in all fields correctly");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
            <Avatar sx={{ backgroundColor: "primary.main", width: 60, height: 60 }}>
              <PersonAddIcon />
            </Avatar>
          </Box>

          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>

          <form onSubmit={handleSignup}>
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign Up
            </Button>
          </form>

          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button onClick={() => navigate('/login')} color="primary">
                Login
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
