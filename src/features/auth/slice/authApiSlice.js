import { apiSlice } from "../../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (payload) => ({
        url: `/users/auth/change-password`,
        method: "PATCH",
        body: {...payload}
      }),
    }),
  }),
});

export const { 
  useUpdatePasswordMutation,
} = authApiSlice;
