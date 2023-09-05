import { apiSlice } from "../../../app/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: (id) => ({ url: `/users/${id}` }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.result, 
    }),
    updateUser: builder.mutation({
      query: ({id, payload}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: {...payload}
      }),
    }),
  })
})

export const {
  useGetUserQuery,
  useUpdateUserMutation,
} = userApiSlice;