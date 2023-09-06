import { apiSlice } from "../../../app/api/apiSlice";

export const streamApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation({
      query: file => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/files`,
          method: "POST",
          body: formData,
          prepareHeaders: (headers) => {
            headers.set("Content-Type", "multipart/form-data");
            return headers
          },
        };
      },
    }),
  }),
});

export const {
  useUploadFileMutation,
} = streamApiSlice;