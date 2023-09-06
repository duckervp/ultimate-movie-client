import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const characterApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addCharacter: builder.mutation({
      query: payload => ({
        url: `/characters`,
        method: "POST",
        body: { ...payload }
      }),
    }),
    updateCharacter: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/characters/${id}`,
        method: "PATCH",
        body: { ...payload }
      }),
    }),
    deleteCharacters: builder.mutation({
      query: ids => {
        let characterIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/characters?characterIds=${characterIds}`,
          method: "DELETE",
        }
      },
    }),
  }),
});

export const {
  useAddCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharactersMutation,
} = characterApiSlice;