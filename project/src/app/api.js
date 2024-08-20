import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/* Central api setup with RTK Query
    endpoints will be injected in separate slices
    auth token will be automatically added to request headers if available */

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Businesses"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    // prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    // token && headers.set("authorization", `Bearer ${token}`);
    // return headers;
    // },
  }),
  endpoints: () => ({}),
});

// Helper functions for providing and invalidating tags
// May not need to use these as invalidating business tag on create/delete review will rerender business

export function providesList(tagType) {
  return (resultsWithIds) =>
    resultsWithIds
      ? [
          { type: tagType, id: "LIST" },
          ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        ]
      : [{ type: tagType, id: "LIST" }];
}

export function providesId(tagType) {
  return (result, error, id) => [{ type: tagType, id }];
}

export function invalidatesId(tagType) {
  return (result, error, arg) => [{ type: tagType, id: arg.id }];
}
