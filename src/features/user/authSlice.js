import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null; 
    }
  },
});

export const {setCredentials, setUser, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.token;
