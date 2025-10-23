import { commentService } from "../config";

// Query hook for fetching all comments
export const useComments = () => {
  return commentService.useQuery<Comment[]>({
    key: ["comments"],
    url: "/",
  });
};

// Query hook for fetching comments by postId
export const useCommentsByPostId = (postId: string) => {
  return commentService.useQuery<Comment[]>({
    key: ["comments", "postId", postId],
    url: `?postId=${postId}`,
  });
};

// Mutation hook for creating comments
export const useCreateComment = (postId: string) => {
  return commentService.useMutation<Comment, CreateComment>({
    keyToInvalidate: { queryKey: ["comments", "postId", postId] },
    url: "",
    method: "post",
    successMessage: "Comment created successfully!",
    errorMessage: "Failed to create comment",
  });
};

// Mutation hook for updating comments
export const useUpdateComment = (postId: string) => {
  const mutation = commentService.useMutation<
    Comment,
    { id: string; data: Partial<CreateComment> }
  >({
    keyToInvalidate: { queryKey: ["comments", "postId", postId] },
    url: "",
    method: "put",
    successMessage: "Comment updated successfully!",
    errorMessage: "Failed to update comment",
  });

  return {
    ...mutation,
    mutateAsync: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateComment>;
    }) => {
      return commentService.put(`/${id}`, data);
    },
  };
};

// Mutation hook for deleting comments
export const useDeleteComment = (postId: string) => {
  const mutation = commentService.useMutation<void, string>({
    keyToInvalidate: { queryKey: ["comments", "postId", postId] },
    url: "",
    method: "delete",
    successMessage: "Comment deleted successfully!",
    errorMessage: "Failed to delete comment",
  });

  return {
    ...mutation,
    mutateAsync: async (id: string) => {
      return commentService.delete(`/${id}`);
    },
  };
};
