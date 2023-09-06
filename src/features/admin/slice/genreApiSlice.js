import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addGenre: builder.mutation({
      query: payload => ({
        url: `/genres`,
        method: "POST",
        body: { ...payload }
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/genres/${id}`,
        method: "PATCH",
        body: { ...payload }
      }),
    }),
    deleteGenres: builder.mutation({
      query: ids => {
        let genreIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/genres?genreIds=${genreIds}`,
          method: "DELETE",
        }
      },
    }),
  }),
});

export const {
  useAddGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenresMutation,
} = genreApiSlice;