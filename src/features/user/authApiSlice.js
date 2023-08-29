import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/users/auth/register",
        method: "POST",
        body: {...payload},
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
