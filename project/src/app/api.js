import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/* Central api setup with RTK Query
    endpoints will be injected in separate slices
    auth token will be automatically added to request headers if available */

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Business", "User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-business-review-site.onrender.com/api",
    // if exists, grab token from auth slice & set header
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
