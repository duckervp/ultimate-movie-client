import { apiSlice } from "../../../app/api/apiSlice";
import { arrayToCommaSeparatedString } from "../../../utils";

export const scheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addSchedule: builder.mutation({
      query: payload => ({
        url: `/schedules`,
        method: "POST",
        body: { ...payload }
      }),
    }),
    updateSchedule: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/schedules/${id}`,
        method: "PATCH",
        body: { ...payload }
      }),
    }),
    deleteSchedules: builder.mutation({
      query: ids => {
        let taskIds = arrayToCommaSeparatedString(ids);
        return {
          url: `/schedules?taskIds=${taskIds}`,
          method: "DELETE",
        }
      },
    }),
    fetchAllSchedules: builder.query({
      query: () => "/schedules",
    }),
  }),
});

export const {
  useAddScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteSchedulesMutation,
  useFetchAllSchedulesQuery,
} = scheduleApiSlice;