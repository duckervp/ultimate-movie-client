import { noAuthApiSlice } from "../../../app/api/apiSlice";

export const characterApiNoCredSlice = noAuthApiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchAllCharacters: builder.query({
      query: () => "/characters",
      transformResponse: response => response.results,
    }),
  }),
});

export const {
  useFetchAllCharactersQuery
} = characterApiNoCredSlice;