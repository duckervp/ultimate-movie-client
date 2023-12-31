import { apiSlice } from "../../../app/api/apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserHistory: builder.query({
      query: (userId) => `/activities/history?userId=${userId}`,
      transformResponse: (response) => response.results,
    }),
    addUserHistory: builder.mutation({
      query: (payload) => ({
        url: "/activities/history",
        method: "POST",
        body: {...payload},
      }),
    }),
  }),
});

export const {
  useGetUserHistoryQuery,
  useAddUserHistoryMutation,
} = historyApiSlice;