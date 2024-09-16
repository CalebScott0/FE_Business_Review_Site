import { api } from "@/app/api";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/comment/${reviewId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editComment: builder.mutation({
      query: ({ commentId, body }) => ({
        url: `/comment/${commentId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
