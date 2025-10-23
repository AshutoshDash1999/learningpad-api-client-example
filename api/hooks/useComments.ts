import { useApiMutation, useApiQuery } from "@learningpad/api-client";

// Query hook for fetching comments
export const useComments = () => {
  return useApiQuery<Comment[]>({
    serviceName: "comments", // Must match your service name
    key: ["comments"],
    url: "/comments",
    options: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });
};

// Mutation hook for creating comments
export const useCreateComment = () => {
  return useApiMutation<Comment, CreateComment>({
    serviceName: "comments",
    keyToInvalidate: { queryKey: ["comments"] },
    url: "/comments",
    method: "post",
    successMessage: "Comment created successfully!",
    errorMessage: "Failed to create comment",
  });
};

// Mutation hook for updating comments
export const useUpdateComment = () => {
  return useApiMutation<Comment, { id: string; data: Partial<CreateComment> }>({
    serviceName: "comments",
    keyToInvalidate: { queryKey: ["comments"] },
    url: "/comments",
    method: "put",
    successMessage: "Comment updated successfully!",
    errorMessage: "Failed to update comment",
  });
};

// Mutation hook for deleting comments
export const useDeleteComment = () => {
  return useApiMutation<void, string>({
    serviceName: "comments",
    keyToInvalidate: { queryKey: ["comments"] },
    url: "/comments",
    method: "delete",
    successMessage: "Comment deleted successfully!",
    errorMessage: "Failed to delete comment",
  });
};
