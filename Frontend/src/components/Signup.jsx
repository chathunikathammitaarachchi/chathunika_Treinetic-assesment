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
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a1b9a, #ab47bc)", 
        padding: '20px'
      }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper 
          elevation={3} 
          sx={{
            padding: 4, 
            borderRadius: 8, 
            background: "#fff", 
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease", 
            "&:hover": { transform: "scale(1.05)" }
          }}
        >
          <Box sx={{
            display: "flex", 
            justifyContent: "center", 
            marginBottom: 3
          }}>
            <Avatar 
              sx={{ 
                backgroundColor: "#6a1b9a", 
                width: 60, 
                height: 60 
              }}
            >
              <PersonAddIcon sx={{ color: "#fff" }} />
            </Avatar>
          </Box>

          <Typography 
            variant="h5" 
            align="center" 
            gutterBottom 
            sx={{ fontWeight: 600, color: "#6a1b9a" }}
          >
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
              sx={{
                backgroundColor: "#fafafa", 
                borderRadius: 3, 
                marginBottom: '10px', 
                "& .MuiInputLabel-root": { color: "#6a1b9a" }
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
                backgroundColor: "#fafafa", 
                borderRadius: 3, 
                marginBottom: '10px', 
                "& .MuiInputLabel-root": { color: "#6a1b9a" }
              }}
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
              sx={{
                backgroundColor: "#fafafa", 
                borderRadius: 3, 
                marginBottom: '20px', 
                "& .MuiInputLabel-root": { color: "#6a1b9a" }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2, 
                padding: '12px 0', 
                backgroundColor: "#6a1b9a", 
                borderRadius: 5,
                '&:hover': { backgroundColor: "#ab47bc" }
              }}
            >
              Sign Up
            </Button>
          </form>

          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button 
                onClick={() => navigate('/login')} 
                color="primary" 
                sx={{ textTransform: 'none', fontWeight: 600, textDecoration: 'underline' }}
              >
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
