import { noAuthApiSlice } from "../../app/api/apiSlice";

export const logoutApiSlice = noAuthApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: "/users/auth/logout",
        method: "GET",
      }),
    }),
  }),
}); 

export const {
  useLogoutMutation
} = logoutApiSlice;