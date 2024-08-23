import { api } from "@/app/api";
const businessSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => "/businesses",
      providesTags: ["Businesses"],
    }),
    getBusinessesByCategory: builder.query({
      query: (category) => `/businesses/category/${category}`,
      providesTags: ["Businesses"],
    }),
    // getBusinessById
  }),
});

export const { useGetBusinessesQuery, useGetBusinessesByCategoryQuery } =
  businessSlice;
