import { apiSlice } from "../../../app/api/apiSlice";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMovieRating: builder.query({
      query: ({userId, movieId}) => `/activities/rating?userId=${userId}&movieId=${movieId}`,
      transformResponse: response => response.result,
    }),
    addMovieRating: builder.mutation({
      query: (payload) => ({
        url: `/activities/rating`,
        method: "POST",
        body: {...payload},
      }),
    }),
    updateMovieRating: builder.mutation({
      query: ({ratingId, payload}) => ({
        url: `/activities/rating/${ratingId}`,
        method: "PATCH",
        body: {...payload},
      }),
    })
  }),
});

export const {
  useGetMovieRatingQuery,
  useAddMovieRatingMutation,
  useUpdateMovieRatingMutation,
} = ratingApiSlice;