import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, role: null},
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, role } = action.payload;
      state.token = accessToken;
      state.role = role
    },
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null; 
      state.role = null;
    }
  },
});

export const {setCredentials, setUser, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.token;

export const selectCurrentRole = (state) => state.auth.role;
