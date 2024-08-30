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
        "User",
      ],
    }),
  }),
});
export const { useCreateReviewMutation } = reviewApi;
