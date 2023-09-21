import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const campaignApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchAllCampaigns: builder.query({
      query: () => `/campaigns`,
    }),
    fetchCampaign: builder.query({
      query: (id) => `/campaigns/${id}`,
    }),
    addCampaign: builder.mutation({
      query: payload => ({
        url: `/campaigns`,
        method: "POST",
        body: { ...payload }
      }),
    }),
    updateCampaign: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/campaigns/${id}`,
        method: "PATCH",
        body: { ...payload }
      }),
    }),
    deleteCampaigns: builder.mutation({
      query: ids => {
        let campaignIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/campaigns?campaignIds=${campaignIds}`,
          method: "DELETE",
        }
      },
    }),
    fetchAllCampaignRecipients: builder.query({
      query: (campaignId) => `/campaigns/${campaignId}/recipients`,
    }),
  }),
});

export const {
  useFetchAllCampaignsQuery,
  useAddCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignsMutation,
  useFetchCampaignQuery,
  useFetchAllCampaignRecipientsQuery
} = campaignApiSlice;