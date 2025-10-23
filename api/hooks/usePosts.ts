import { postService } from "../config";

// Query hook for fetching users
export const usePosts = () => {
  return postService.useQuery<Post[]>({
    key: ["posts"],
    url: "/",
    options: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  });
};

// Mutation hook for creating users
export const useCreatePost = () => {
  return postService.useMutation<Post, CreatePost>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "/",
    method: "post",
    successMessage: "Post created successfully!",
    errorMessage: "Failed to create post",
  });
};

// Mutation hook for updating users
export const useUpdatePost = () => {
  return postService.useMutation<
    Post,
    { id: string; data: Partial<CreatePost> }
  >({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "/",
    method: "put",
    successMessage: "Post updated successfully!",
    errorMessage: "Failed to update post",
  });
};

// Mutation hook for deleting users
export const useDeletePost = () => {
  return postService.useMutation<void, string>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "/",
    method: "delete",
    successMessage: "Post deleted successfully!",
    errorMessage: "Failed to delete post",
  });
};
