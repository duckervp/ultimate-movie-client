import { apiSlice } from "../../app/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => ({ url: `/users/` }),
      keepUnusedDataFor: 5,
    }),
  })
})

export const {
  useGetUserQuery
} = userApiSlice;