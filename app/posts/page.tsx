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
import { CommentsModal } from "@/app/posts/_components/CommentsModal";
import { PostCard } from "@/app/posts/_components/PostCard";
import { PostForm } from "@/app/posts/_components/PostForm";
import { PostsSkeleton } from "@/app/posts/_components/PostsSkeleton";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
  // State for modal management
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

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
  const {
    mutateAsync: createPost,
    isPending: isCreatingPost,
    error: createPostError,
  } = useCreatePost();

  const {
    mutateAsync: updatePost,
    isPending: isUpdatingPost,
    error: updatePostError,
  } = useUpdatePost();

  const {
    mutateAsync: deletePost,
    isPending: isDeletingPost,
    error: deletePostError,
  } = useDeletePost();

  const {
    mutateAsync: createComment,
    isPending: isCreatingComment,
    error: createCommentError,
  } = useCreateComment();

  const {
    mutateAsync: updateComment,
    isPending: isUpdatingComment,
    error: updateCommentError,
  } = useUpdateComment();

  const {
    mutateAsync: deleteComment,
    isPending: isDeletingComment,
    error: deleteCommentError,
  } = useDeleteComment();

  // Filter comments for selected post
  const postComments = selectedPost
    ? comments?.filter(
        (comment: Comment) => comment.postId === selectedPost.id
      ) || []
    : [];

  /**
   * POST OPERATIONS
   */
  const handleCreatePost = async (data: {
    title: string;
    body: string;
    userId: number;
  }) => {
    try {
      await createPost(data);
      setShowCreatePostForm(false);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  const handleUpdatePost = async (data: {
    title: string;
    body: string;
    userId: number;
  }) => {
    if (!editingPost) return;

    try {
      await updatePost({
        id: editingPost.id.toString(),
        data,
      });
      setEditingPost(null);
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post. Please try again.");
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId.toString());
        toast.success("Post deleted successfully!");
      } catch (error) {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete post. Please try again.");
      }
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleViewComments = (post: Post) => {
    setSelectedPost(post);
  };

  /**
   * COMMENT OPERATIONS
   */
  const handleCreateComment = async (data: {
    name: string;
    email: string;
    body: string;
    postId: number;
  }) => {
    try {
      await createComment(data);
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to create comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleUpdateComment = async (comment: {
    id: number;
    name: string;
    email: string;
    body: string;
  }) => {
    try {
      await updateComment({
        id: comment.id.toString(),
        data: {
          name: comment.name,
          email: comment.email,
          body: comment.body,
        },
      });
      toast.success("Comment updated successfully!");
    } catch (error) {
      console.error("Failed to update comment:", error);
      toast.error("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(commentId.toString());
        toast.success("Comment deleted successfully!");
      } catch (error) {
        console.error("Failed to delete comment:", error);
        toast.error("Failed to delete comment. Please try again.");
      }
    }
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
              onClick={() => setShowCreatePostForm(true)}
              disabled={isCreatingPost}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isCreatingPost ? "Creating..." : "Create Post"}
            </Button>
            <Button
              variant="outline"
              onClick={() => refetchPosts()}
              disabled={postsLoading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {postsLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        {/* POSTS LIST */}
        {postsLoading ? (
          <PostsSkeleton count={6} />
        ) : postsError ? (
          <div className="text-red-600 py-8 text-center">
            Error loading posts: {postsError.message}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts?.slice(0, 12).map((post: Post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onViewComments={handleViewComments}
                isUpdating={isUpdatingPost}
                isDeleting={isDeletingPost}
              />
            ))}
          </div>
        )}
      </div>

      {/* COMMENTS MODAL */}
      <CommentsModal
        post={selectedPost}
        comments={postComments}
        isLoading={commentsLoading}
        error={commentsError}
        onClose={() => setSelectedPost(null)}
        onEditComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
        onCreateComment={handleCreateComment}
        isCreatingComment={isCreatingComment}
        isUpdatingComment={isUpdatingComment}
        isDeletingComment={isDeletingComment}
      />

      {/* CREATE POST FORM */}
      {showCreatePostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <PostForm
            onSubmit={handleCreatePost}
            onCancel={() => setShowCreatePostForm(false)}
            isLoading={isCreatingPost}
            title="Create New Post"
          />
        </div>
      )}

      {/* UPDATE POST FORM */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <PostForm
            onSubmit={handleUpdatePost}
            onCancel={() => setEditingPost(null)}
            isLoading={isUpdatingPost}
            title="Update Post"
            isEdit={true}
            initialData={{
              title: editingPost.title,
              body: editingPost.body,
              userId: editingPost.userId,
            }}
          />
        </div>
      )}
    </div>
  );
}
