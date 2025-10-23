import { postService } from "../config";

// Query hook for fetching users
export const usePosts = () => {
  return postService.useQuery<Post[]>({
    key: ["posts"],
    url: "",
  });
};

// Mutation hook for creating users
export const useCreatePost = () => {
  return postService.useMutation<Post, CreatePost>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "",
    method: "post",
    successMessage: "Post created successfully!",
    errorMessage: "Failed to create post",
  });
};

// Mutation hook for updating posts
export const useUpdatePost = () => {
  const mutation = postService.useMutation<
    Post,
    { id: string; data: Partial<CreatePost> }
  >({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "",
    method: "put",
    successMessage: "Post updated successfully!",
    errorMessage: "Failed to update post",
  });

  return {
    ...mutation,
    mutateAsync: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePost>;
    }) => {
      return postService.put(`/${id}`, data);
    },
  };
};

// Mutation hook for deleting posts
export const useDeletePost = () => {
  const mutation = postService.useMutation<void, string>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "",
    method: "delete",
    successMessage: "Post deleted successfully!",
    errorMessage: "Failed to delete post",
  });

  return {
    ...mutation,
    mutateAsync: async (id: string) => {
      return postService.delete(`/${id}`);
    },
  };
};
