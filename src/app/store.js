import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, noAuthApiSlice } from "./api/apiSlice";
import authReducer from "../features/user/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [noAuthApiSlice.reducerPath]: noAuthApiSlice.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .concat(noAuthApiSlice.middleware),
  devTools: true
})