import { api } from "@/app/api";
import { invalidatesId } from "@/app/api";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ businessId, body }) => ({
        url: `/review/${businessId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: () => invalidatesId("Business"),
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/review/${reviewId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: () => invalidatesId("Business"),
    }),
  }),
});
export const { useCreateReviewMutation } = reviewApi;
