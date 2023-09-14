import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const providerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addProvider: builder.mutation({
      query: payload => ({
        url: `/providers`,
        method: "POST",
        body: { ...payload }
      }),
    }),
    updateProvider: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/providers/${id}`,
        method: "PATCH",
        body: { ...payload }
      }),
    }),
    deleteProviders: builder.mutation({
      query: ids => {
        let providerIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/providers?providerIds=${providerIds}`,
          method: "DELETE",
        }
      },
    }),
    fetchAllProviders: builder.query({
      query: () => "/providers",
    }),
  }),
});

export const {
  useAddProviderMutation,
  useUpdateProviderMutation,
  useDeleteProvidersMutation,
  useFetchAllProvidersQuery,
} = providerApiSlice;