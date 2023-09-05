import { noAuthApiSlice } from "../../../app/api/apiSlice";

export const movieApiNoCredSlice = noAuthApiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchAllMovies: builder.query({
      query: (params) => {
        let url = "/movies";
        let paramString = "";
        Object.keys(params).forEach(key => {
          if (params[key]) {
            paramString += "&".concat(key).concat("=").concat(params[key]);
          }
        });
        if (paramString !== "") {
          url = url.concat("?").concat(paramString.slice(1));
        }
        return url;
      },
      keepUnusedDataFor: 60,
    }),
    fetchMovie: builder.query({
      query: (slug) => `/movies/s/${slug}`,
      transformResponse: (response) => response.result,
    }),
  }),
});


export const {
  useFetchAllMoviesQuery,
  useFetchMovieQuery,
} = movieApiNoCredSlice;