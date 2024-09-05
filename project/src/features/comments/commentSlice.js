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
        { type: "User" },
      ],
    }),
    editComment: builder.mutation({
      query: ({ commentId, body }) => ({
        url: `/comment/${commentId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Business", id: arg.id },
        { type: "User" },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Business", id: arg.id },
        { type: "User" },
      ],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
