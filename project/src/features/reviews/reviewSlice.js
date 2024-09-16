import { api } from "@/app/api";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ businessId, body }) => ({
        url: `/review/${businessId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editReview: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/review/${reviewId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useCreateReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
