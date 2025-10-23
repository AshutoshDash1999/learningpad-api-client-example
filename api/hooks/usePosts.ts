import { useApiMutation, useApiQuery } from "@learningpad/api-client";

// Query hook for fetching users
export const usePosts = () => {
  return useApiQuery<Post[]>({
    serviceName: "posts", // Must match your service name
    key: ["posts"],
    url: "/posts",
    options: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });
};

// Mutation hook for creating users
export const useCreatePost = () => {
  return useApiMutation<Post, CreatePost>({
    serviceName: "posts",
    keyToInvalidate: { queryKey: ["posts"] },
    url: "/posts",
    method: "post",
    successMessage: "Post created successfully!",
    errorMessage: "Failed to create post",
  });
};

// Mutation hook for updating users
export const useUpdatePost = () => {
  return useApiMutation<Post, { id: string; data: Partial<CreatePost> }>({
    serviceName: "posts",
    keyToInvalidate: { queryKey: ["posts"] },
    url: "/posts",
    method: "put",
    successMessage: "Post updated successfully!",
    errorMessage: "Failed to update post",
  });
};

// Mutation hook for deleting users
export const useDeletePost = () => {
  return useApiMutation<void, string>({
    serviceName: "posts",
    keyToInvalidate: { queryKey: ["posts"] },
    url: "/posts",
    method: "delete",
    successMessage: "Post deleted successfully!",
    errorMessage: "Failed to delete post",
  });
};
