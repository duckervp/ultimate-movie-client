import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../features/user/authSlice';
import { BASE_URL } from '../../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    headers.set("ngrok-skip-browser-warning", true);
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    console.log('sending refresh token')
    const refreshResult = await baseQuery("/users/auth/refresh", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data && refreshResult?.data.access_token) {
      api.dispatch(setCredentials({token: refreshResult?.data.access_token}))
      
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