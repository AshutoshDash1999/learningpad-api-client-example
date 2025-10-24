"use client";

import { useCreatePost, usePosts } from "@/api/hooks/usePosts";
import { PostCard } from "@/app/posts/_components/PostCard";
import { PostForm } from "@/app/posts/_components/PostForm";
import { PostsSkeleton } from "@/app/posts/_components/PostsSkeleton";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { useState } from "react";

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
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

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

  /**
   * MUTATION HOOKS - Demonstrates CRUD operations with @learningpad/api-client
   *
   * useApiMutation provides:
   * - Optimistic updates
   * - Automatic cache invalidation
   * - Success/error notifications
   * - Loading states during mutations
   */
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();

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
    } catch (error) {
      console.error("Failed to create post:", error);
      // Error or success toast message not required, since they are already declared in config
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Posts & Comments Management</h1>
      <p className="text-gray-600">
        This page demonstrates comprehensive usage of @learningpad/api-client
        with JSONPlaceholder API
      </p>
      <p>
        Please keep in mind that this is a demo and the data is not real. Hence
        any changes you make will not be saved. Please make sure to check
        network tab to see the API calls.
      </p>

      {/* POSTS SECTION */}
      <div className="my-8">
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
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* CREATE POST FORM */}
      <PostForm
        open={showCreatePostForm}
        onOpenChange={setShowCreatePostForm}
        onSubmit={handleCreatePost}
        onCancel={() => setShowCreatePostForm(false)}
        isLoading={isCreatingPost}
        title="Create New Post"
      />
    </div>
  );
}
