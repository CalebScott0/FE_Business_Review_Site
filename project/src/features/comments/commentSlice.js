import { api } from "@/app/api";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/comment/${reviewId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Business", id: arg.id },
      ],
    }),
  }),
});
