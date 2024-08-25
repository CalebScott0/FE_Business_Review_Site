import { api } from "@/app/api";
const businessSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => "/businesses",
    }),
    getBusinessList: builder.query({
      query: ({ category, page, limit }) =>
        `/businesses/category/${category}?page=${page}&limit=${limit}`,
    }),
    getBusinessById: builder.query({
      query: (id) => `/businesses/${id}`,
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useGetBusinessListQuery,
  useGetBusinessByIdQuery,
} = businessSlice;
