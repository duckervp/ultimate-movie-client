import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const episodeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    deleteEpisodes: builder.mutation({
      query: ids => {
        let episodeIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/episodes?episodeIds=${episodeIds}`,
          method: "DELETE",
        }
      },
    }),
  }),
});

export const {
  useDeleteEpisodeMutation,
} = episodeApiSlice;