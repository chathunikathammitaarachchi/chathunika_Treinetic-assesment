import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  isAuthenticated: savedUser ? true : false,
  user: savedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user)); 
    },
    login: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user)); 
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); 
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
