import { api } from "@/app/api";
const businessSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => "/businesses",
    }),
    getBusinessList: builder.query({
      query: ({ category, page, limit }) =>
        `/businesses/category/${category}?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) =>
        result ? { type: "Business", id } : ["Business"],
    }),
    getBusinessById: builder.query({
      query: (id) => `/businesses/${id}`,
      providesTags: (result, error, id) => [{ type: "Business", id }],
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useGetBusinessListQuery,
  useGetBusinessByIdQuery,
} = businessSlice;
