import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const producerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addProducer: builder.mutation({
      query: payload => ({
        url: `/producers`,
        method: "POST",
        body: { ...payload }
      }),
    }),
    updateProducer: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/producers/${id}`,
        method: "PATCH",
        body: { ...payload }
      }),
    }),
    deleteProducers: builder.mutation({
      query: ids => {
        let producerIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/producers?producerIds=${producerIds}`,
          method: "DELETE",
        }
      },
    }),
    fetchAllProducers: builder.query({
      query: () => "/producers",
    }),
  }),
});

export const {
  useAddProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducersMutation,
  useFetchAllProducersQuery,
} = producerApiSlice;