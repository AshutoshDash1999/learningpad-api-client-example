import { commentService } from "../config";

/**
 * Comments API Hooks
 *
 * This file contains React hooks for managing comments on posts.
 * All hooks use React Query for caching, background updates, and error handling.
 * Comments are associated with specific posts and can be created, updated, and deleted.
 *
 * @example
 * ```tsx
 * // Fetch all comments
 * const { data: comments, isLoading, error } = useComments();
 *
 * // Fetch comments for a specific post
 * const { data: postComments } = useCommentsByPostId("1");
 *
 * // Create a new comment
 * const createComment = useCreateComment("1");
 * await createComment.mutateAsync({
 *   postId: 1,
 *   name: "John Doe",
 *   email: "john@example.com",
 *   body: "Great post!"
 * });
 * ```
 */

/**
 * Hook to fetch all comments
 *
 * @returns {Object} React Query result with comments data
 * @returns {Comment[]} data - Array of all comments
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 *
 * @example
 * ```tsx
 * const CommentsList = () => {
 *   const { data: comments, isLoading, error } = useComments();
 *
 *   if (isLoading) return <div>Loading comments...</div>;
 *   if (error) return <div>Error loading comments</div>;
 *
 *   return (
 *     <div>
 *       {comments?.map(comment => (
 *         <div key={comment.id}>
 *           <h4>{comment.name}</h4>
 *           <p>{comment.body}</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 * ```
 */
export const useComments = () => {
  return commentService.useQuery<Comment[]>({
    key: ["comments"],
    url: "/",
  });
};

/**
 * Hook to fetch comments for a specific post
 *
 * @param {string} postId - The post ID to fetch comments for
 * @returns {Object} React Query result with comments data
 * @returns {Comment[]} data - Array of comments for the post
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 *
 * @example
 * ```tsx
 * const PostComments = ({ postId }: { postId: string }) => {
 *   const { data: comments, isLoading, error } = useCommentsByPostId(postId);
 *
 *   if (isLoading) return <div>Loading comments...</div>;
 *   if (error) return <div>Error loading comments</div>;
 *
 *   return (
 *     <div>
 *       <h3>Comments ({comments?.length || 0})</h3>
 *       {comments?.map(comment => (
 *         <div key={comment.id} className="comment">
 *           <h4>{comment.name}</h4>
 *           <p>{comment.body}</p>
 *           <small>{comment.email}</small>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 * ```
 */
export const useCommentsByPostId = (postId: string) => {
  return commentService.useQuery<Comment[]>({
    key: ["comments", "postId", postId],
    url: `?postId=${postId}`,
  });
};

/**
 * Hook to create a new comment
 *
 * @param {string} postId - The post ID to create a comment for
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to create a comment
 * @returns {boolean} isPending - Loading state during creation
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * ```tsx
 * const CreateCommentForm = ({ postId }: { postId: string }) => {
 *   const createComment = useCreateComment(postId);
 *
 *   const handleSubmit = async (formData) => {
 *     try {
 *       await createComment.mutateAsync({
 *         postId: parseInt(postId),
 *         name: formData.name,
 *         email: formData.email,
 *         body: formData.body
 *       });
 *       // Success toast will be shown automatically
 *       // Comments list will be refreshed automatically
 *     } catch (error) {
 *       // Error toast will be shown automatically
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input name="name" placeholder="Your name" required />
 *       <input name="email" type="email" placeholder="Your email" required />
 *       <textarea name="body" placeholder="Your comment" required />
 *       <button disabled={createComment.isPending}>
 *         {createComment.isPending ? "Posting..." : "Post Comment"}
 *       </button>
 *     </form>
 *   );
 * };
 * ```
 */
export const useCreateComment = (postId: string) => {
  return commentService.useMutation<Comment, CreateComment>({
    keyToInvalidate: { queryKey: ["comments", "postId", postId] },
    url: "",
    method: "post",
    successMessage: "Comment created successfully!",
    errorMessage: "Failed to create comment",
  });
};

/**
 * Hook to update an existing comment
 *
 * @param {string} postId - The post ID (used for cache invalidation)
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to update a comment
 * @returns {boolean} isPending - Loading state during update
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * ```tsx
 * const EditCommentForm = ({
 *   comment,
 *   postId
 * }: {
 *   comment: Comment;
 *   postId: string;
 * }) => {
 *   const updateComment = useUpdateComment(postId);
 *
 *   const handleSubmit = async (formData) => {
 *     try {
 *       await updateComment.mutateAsync({
 *         id: comment.id,
 *         data: {
 *           name: formData.name,
 *           email: formData.email,
 *           body: formData.body
 *         }
 *       });
 *       // Success toast will be shown automatically
 *       // Comments list will be refreshed automatically
 *     } catch (error) {
 *       // Error toast will be shown automatically
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input name="name" defaultValue={comment.name} required />
 *       <input name="email" type="email" defaultValue={comment.email} required />
 *       <textarea name="body" defaultValue={comment.body} required />
 *       <button disabled={updateComment.isPending}>
 *         {updateComment.isPending ? "Updating..." : "Update Comment"}
 *       </button>
 *     </form>
 *   );
 * };
 * ```
 */
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

/**
 * Hook to delete a comment
 *
 * @param {string} postId - The post ID (used for cache invalidation)
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to delete a comment
 * @returns {boolean} isPending - Loading state during deletion
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * ```tsx
 * const CommentItem = ({
 *   comment,
 *   postId
 * }: {
 *   comment: Comment;
 *   postId: string;
 * }) => {
 *   const deleteComment = useDeleteComment(postId);
 *
 *   const handleDelete = async () => {
 *     if (confirm("Are you sure you want to delete this comment?")) {
 *       try {
 *         await deleteComment.mutateAsync(comment.id);
 *         // Success toast will be shown automatically
 *         // Comments list will be refreshed automatically
 *       } catch (error) {
 *         // Error toast will be shown automatically
 *       }
 *     }
 *   };
 *
 *   return (
 *     <div className="comment">
 *       <h4>{comment.name}</h4>
 *       <p>{comment.body}</p>
 *       <small>{comment.email}</small>
 *       <button
 *         onClick={handleDelete}
 *         disabled={deleteComment.isPending}
 *         className="delete-btn"
 *       >
 *         {deleteComment.isPending ? "Deleting..." : "Delete"}
 *       </button>
 *     </div>
 *   );
 * };
 * ```
 */
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
