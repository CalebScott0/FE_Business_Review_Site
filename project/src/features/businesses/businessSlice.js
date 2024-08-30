import { api } from "@/app/api";
import { providesId } from "@/app/api";
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
      providesTags: providesId("Business"),
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useGetBusinessListQuery,
  useGetBusinessByIdQuery,
} = businessSlice;
