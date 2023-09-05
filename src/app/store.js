import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice, noAuthApiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/slice/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['token']
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [noAuthApiSlice.reducerPath]: noAuthApiSlice.reducer,
  auth: persistReducer(authPersistConfig, authReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(
    {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }
  )
    .concat(apiSlice.middleware)
    .concat(noAuthApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);