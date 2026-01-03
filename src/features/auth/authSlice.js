import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';

const startState = loadState('auth') || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: startState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveState('auth', state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear persistence
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
