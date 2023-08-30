import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../features/user/authSlice';
import { BASE_URL } from '../../constants';

const baseQuery = fetchBaseQuery({
  credentials: "include",
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("ngrok-skip-browser-warning", true);
    const token = getState().auth.token;
    console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers;
  }
});

const baseQueryWithNoAuth = fetchBaseQuery({
  credentials: "include",
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("ngrok-skip-browser-warning", true);
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.data?.code === 401) {
    const refreshResult = await baseQueryWithNoAuth("/users/auth/refresh", api, extraOptions);
    const accessToken = refreshResult?.data?.access_token;
    if (accessToken) {
      api.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export const noAuthApiSlice = createApi({
  baseQuery: baseQueryWithNoAuth,
  endpoints: (builder) =>( {}),
});