"use client";

import {
  useComments,
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "@/api/hooks/useComments";
import {
  useCreatePost,
  useDeletePost,
  usePosts,
  useUpdatePost,
} from "@/api/hooks/usePosts";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

/**
 * Posts Page - Demonstrates comprehensive usage of @learningpad/api-client
 *
 * This page showcases:
 * 1. Query hooks for fetching data with caching and error handling
 * 2. Mutation hooks for CRUD operations with optimistic updates
 * 3. Proper error handling and loading states
 * 4. Form management for different operations
 * 5. Real-time data synchronization
 */

export default function PostsPage() {
  // State for form management
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [showCreateCommentForm, setShowCreateCommentForm] = useState(false);
  const [showUpdatePostForm, setShowUpdatePostForm] = useState(false);
  const [showUpdateCommentForm, setShowUpdateCommentForm] = useState(false);

  // Form data states
  const [postFormData, setPostFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [commentFormData, setCommentFormData] = useState({
    postId: 1,
    name: "",
    email: "",
    body: "",
  });

  /**
   * QUERY HOOKS - Demonstrates data fetching with @learningpad/api-client
   *
   * useApiQuery provides:
   * - Automatic caching with React Query
   * - Background refetching
   * - Error handling
   * - Loading states
   * - Stale time configuration
   */
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePosts();

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useComments();

  /**
   * MUTATION HOOKS - Demonstrates CRUD operations with @learningpad/api-client
   *
   * useApiMutation provides:
   * - Optimistic updates
   * - Automatic cache invalidation
   * - Success/error notifications
   * - Loading states during mutations
   */
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  // Filter comments for selected post
  const postComments = selectedPost
    ? comments?.filter(
        (comment: Comment) => comment.postId === selectedPost.id
      ) || []
    : [];

  /**
   * POST OPERATIONS
   */
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // The mutation hook handles the API call, cache invalidation, and notifications
      await createPostMutation.mutateAsync(postFormData);
      setPostFormData({ title: "", body: "", userId: 1 });
      setShowCreatePostForm(false);
    } catch (error) {
      // Error handling is managed by the mutation hook
      console.error("Failed to create post:", error);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;

    try {
      // Update mutation with ID and partial data
      await updatePostMutation.mutateAsync({
        id: selectedPost.id.toString(),
        data: postFormData,
      });
      setShowUpdatePostForm(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Delete mutation with post ID
        await deletePostMutation.mutateAsync(postId.toString());
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  /**
   * COMMENT OPERATIONS
   */
  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCommentMutation.mutateAsync(commentFormData);
      setCommentFormData({ postId: 1, name: "", email: "", body: "" });
      setShowCreateCommentForm(false);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComment) return;

    try {
      await updateCommentMutation.mutateAsync({
        id: selectedComment.id.toString(),
        data: commentFormData,
      });
      setShowUpdateCommentForm(false);
      setSelectedComment(null);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteCommentMutation.mutateAsync(commentId.toString());
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  // Reset forms
  const resetPostForm = () => {
    setPostFormData({ title: "", body: "", userId: 1 });
    setSelectedPost(null);
  };

  const resetCommentForm = () => {
    setCommentFormData({ postId: 1, name: "", email: "", body: "" });
    setSelectedComment(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Posts & Comments Management</h1>
      <p className="text-gray-600 mb-8">
        This page demonstrates comprehensive usage of @learningpad/api-client
        with JSONPlaceholder API
      </p>

      {/* POSTS SECTION */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Posts</h2>
          <div className="space-x-2">
            <Button
              onClick={() => {
                resetPostForm();
                setShowCreatePostForm(true);
              }}
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
            <Button
              variant="outline"
              onClick={() => refetchPosts()}
              disabled={postsLoading}
            >
              {postsLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* POSTS LIST */}
        {postsLoading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : postsError ? (
          <div className="text-red-600 py-8">
            Error loading posts: {postsError.message}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts?.slice(0, 12).map((post: Post) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.body}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    User ID: {post.userId}
                  </span>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedPost(post);
                        setPostFormData({
                          title: post.title,
                          body: post.body,
                          userId: post.userId,
                        });
                        setShowUpdatePostForm(true);
                      }}
                      disabled={updatePostMutation.isPending}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePost(post.id)}
                      disabled={deletePostMutation.isPending}
                    >
                      Delete
                    </Button>
                    <Button size="sm" onClick={() => setSelectedPost(post)}>
                      View Comments
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COMMENTS SECTION */}
      {selectedPost && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Comments for Post: {selectedPost.title}
            </h2>
            <div className="space-x-2">
              <Button
                onClick={() => {
                  resetCommentForm();
                  setCommentFormData((prev) => ({
                    ...prev,
                    postId: selectedPost.id,
                  }));
                  setShowCreateCommentForm(true);
                }}
                disabled={createCommentMutation.isPending}
              >
                {createCommentMutation.isPending
                  ? "Creating..."
                  : "Add Comment"}
              </Button>
              <Button variant="outline" onClick={() => setSelectedPost(null)}>
                Close
              </Button>
            </div>
          </div>

          {/* COMMENTS LIST */}
          {commentsLoading ? (
            <div className="text-center py-8">Loading comments...</div>
          ) : commentsError ? (
            <div className="text-red-600 py-8">
              Error loading comments: {commentsError.message}
            </div>
          ) : (
            <div className="space-y-4">
              {postComments.map((comment: Comment) => (
                <div key={comment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{comment.name}</h4>
                      <p className="text-sm text-gray-500">{comment.email}</p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedComment(comment);
                          setCommentFormData({
                            postId: comment.postId,
                            name: comment.name,
                            email: comment.email,
                            body: comment.body,
                          });
                          setShowUpdateCommentForm(true);
                        }}
                        disabled={updateCommentMutation.isPending}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={deleteCommentMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.body}</p>
                </div>
              ))}
              {postComments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No comments found for this post
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* CREATE POST FORM */}
      {showCreatePostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Post</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={postFormData.title}
                  onChange={(e) =>
                    setPostFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Body</label>
                <textarea
                  value={postFormData.body}
                  onChange={(e) =>
                    setPostFormData((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  User ID
                </label>
                <input
                  type="number"
                  value={postFormData.userId}
                  onChange={(e) =>
                    setPostFormData((prev) => ({
                      ...prev,
                      userId: parseInt(e.target.value),
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={createPostMutation.isPending}>
                  {createPostMutation.isPending ? "Creating..." : "Create Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreatePostForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE POST FORM */}
      {showUpdatePostForm && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Post</h3>
            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={postFormData.title}
                  onChange={(e) =>
                    setPostFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Body</label>
                <textarea
                  value={postFormData.body}
                  onChange={(e) =>
                    setPostFormData((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  User ID
                </label>
                <input
                  type="number"
                  value={postFormData.userId}
                  onChange={(e) =>
                    setPostFormData((prev) => ({
                      ...prev,
                      userId: parseInt(e.target.value),
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={updatePostMutation.isPending}>
                  {updatePostMutation.isPending ? "Updating..." : "Update Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUpdatePostForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COMMENT FORM */}
      {showCreateCommentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Comment</h3>
            <form onSubmit={handleCreateComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={commentFormData.name}
                  onChange={(e) =>
                    setCommentFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={commentFormData.email}
                  onChange={(e) =>
                    setCommentFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Comment
                </label>
                <textarea
                  value={commentFormData.body}
                  onChange={(e) =>
                    setCommentFormData((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={createCommentMutation.isPending}
                >
                  {createCommentMutation.isPending
                    ? "Adding..."
                    : "Add Comment"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateCommentForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE COMMENT FORM */}
      {showUpdateCommentForm && selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Comment</h3>
            <form onSubmit={handleUpdateComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={commentFormData.name}
                  onChange={(e) =>
                    setCommentFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={commentFormData.email}
                  onChange={(e) =>
                    setCommentFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Comment
                </label>
                <textarea
                  value={commentFormData.body}
                  onChange={(e) =>
                    setCommentFormData((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-3 py-2 h-24"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={updateCommentMutation.isPending}
                >
                  {updateCommentMutation.isPending
                    ? "Updating..."
                    : "Update Comment"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUpdateCommentForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
