import { noAuthApiSlice } from "../../../app/api/apiSlice";

export const genreApiNoCredSlice = noAuthApiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchAllGenres: builder.query({
      query: () => "/genres",
      transformResponse: (response) => response.results,
      keepUnusedDataFor: 3600,
    }),
  }),
});


export const {
  useFetchAllGenresQuery
} = genreApiNoCredSlice;