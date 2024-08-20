import { api } from "../../app/api";
// endpoint to get all categories

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categorySlice;
