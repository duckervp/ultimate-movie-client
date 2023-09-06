import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addMovie: builder.mutation({
      query: payload => ({
        url: "/movies",
        method: "POST",
        body: { ...payload },
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/movies/${id}`,
        method: "PATCH",
        body: { ...payload },
      }),
    }),
    deleteMovies: builder.mutation({
      query: ids => {
        const movieIds = arrayToCommaSeparatedString(ids);
        const url = `/movies?movieIds=${movieIds}`;
        return {
          url,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMoviesMutation,
} = movieApiSlice;