import { api } from "@/app/api";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ businessId, body }) => ({
        url: `/review/${businessId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Business", id: arg.id },
      ],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/review/${reviewId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Business", id: arg.id },
      ],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Business", id: arg.id },
      ],
    }),
  }),
});
export const {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
