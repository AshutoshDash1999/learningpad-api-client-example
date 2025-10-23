import { commentService } from "../config";

// Query hook for fetching comments
export const useComments = () => {
  return commentService.useQuery<Comment[]>({
    key: ["comments"],
    url: "/",
    options: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });
};

// Mutation hook for creating comments
export const useCreateComment = () => {
  return commentService.useMutation<Comment, CreateComment>({
    keyToInvalidate: { queryKey: ["comments"] },
    url: "",
    method: "post",
    successMessage: "Comment created successfully!",
    errorMessage: "Failed to create comment",
  });
};

// Mutation hook for updating comments
export const useUpdateComment = () => {
  return commentService.useMutation<
    Comment,
    { id: string; data: Partial<CreateComment> }
  >({
    keyToInvalidate: { queryKey: ["comments"] },
    url: "",
    method: "put",
    successMessage: "Comment updated successfully!",
    errorMessage: "Failed to update comment",
  });
};

// Mutation hook for deleting comments
export const useDeleteComment = () => {
  return commentService.useMutation<void, string>({
    keyToInvalidate: { queryKey: ["comments"] },
    url: "",
    method: "delete",
    successMessage: "Comment deleted successfully!",
    errorMessage: "Failed to delete comment",
  });
};
