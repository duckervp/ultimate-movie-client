import { noAuthApiSlice } from "../../app/api/apiSlice";

export const authApiSlice = noAuthApiSlice.injectEndpoints({
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
    refresh: builder.mutation({
      query: () => ({
        url: "/users/auth/refresh",
        method: "GET",
      }),
    }),
    requestResetPassword: builder.mutation({
      query: (email) => ({
        url: `users/auth/reset-password-request?email=${email}`,
        method: "GET"
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `users/auth/reset-password?token=${token}`,
        method: "PATCH",
        body: { newPassword }
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useRefreshMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApiSlice;
