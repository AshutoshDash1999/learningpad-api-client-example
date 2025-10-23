import { postService } from "../config";

/**
 * Posts API Hooks
 *
 * This file contains React hooks for managing blog posts and articles.
 * All hooks use React Query for caching, background updates, and error handling.
 *
 * @example
 * // Fetch all posts
 * const { data: posts, isLoading, error } = usePosts();
 *
 * // Fetch a single post
 * const { data: post } = usePost("1");
 *
 * // Create a new post
 * const createPost = useCreatePost();
 * await createPost.mutateAsync({ title: "New Post", body: "Content", userId: 1 });
 */

/**
 * Hook to fetch all posts
 *
 * @returns {Object} React Query result with posts data
 * @returns {Post[]} data - Array of all posts
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const usePosts = () => {
  return postService.useQuery<Post[]>({
    key: ["posts"],
    url: "",
  });
};

/**
 * Hook to fetch a single post by ID
 *
 * @param {string} id - The post ID to fetch
 * @returns {Object} React Query result with post data
 * @returns {Post} data - The post data
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const usePost = (id: string) => {
  return postService.useQuery<Post>({
    key: ["post", id],
    url: `/${id}`,
  });
};

/**
 * Hook to create a new post
 *
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to create a post
 * @returns {boolean} isPending - Loading state during creation
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * const createPost = useCreatePost();
 * await createPost.mutateAsync({
 *   title: "New Post",
 *   body: "Post content",
 *   userId: 1
 * });
 */
export const useCreatePost = () => {
  return postService.useMutation<Post, CreatePost>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "",
    method: "post",
    successMessage: "Post created successfully!",
    errorMessage: "Failed to create post",
  });
};

/**
 * Hook to update an existing post
 *
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to update a post
 * @returns {boolean} isPending - Loading state during update
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * const updatePost = useUpdatePost();
 * await updatePost.mutateAsync({
 *   id: "1",
 *   data: {
 *     title: "Updated Title",
 *     body: "Updated content"
 *   }
 * });
 */
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

/**
 * Hook to delete a post
 *
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to delete a post
 * @returns {boolean} isPending - Loading state during deletion
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * const deletePost = useDeletePost();
 * await deletePost.mutateAsync("1");
 */
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
