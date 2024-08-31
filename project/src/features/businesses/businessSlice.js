import { api } from "@/app/api";
import { providesList, providesId } from "../../app/api";
const businessSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => "/businesses",
    }),
    getBusinessList: builder.query({
      query: ({ category, page, limit }) =>
        `/businesses/category/${category}?page=${page}&limit=${limit}`,
      providesTags: (result) => providesList(result.businesses, "Business"),
    }),
    getBusinessById: builder.query({
      query: (id) => `/businesses/${id}`,
      providesTags: (result) => providesId("Business"),
      // providesTags: (result, error, id) => [{ type: "Business", id }],
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useGetBusinessListQuery,
  useGetBusinessByIdQuery,
} = businessSlice;
