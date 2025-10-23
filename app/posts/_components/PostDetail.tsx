"use client";

import { useDeletePost, useUpdatePost } from "@/api/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PostForm } from "./PostForm";

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Post mutation hooks
  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  const handleUpdatePost = async (data: {
    title: string;
    body: string;
    userId: number;
  }) => {
    try {
      await updatePost({
        id: post.id.toString(),
        data,
      });
      setShowEditForm(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(post.id.toString());
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl font-bold leading-tight">
              {post.title}
            </CardTitle>
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditForm(true)}
                disabled={isUpdatingPost}
              >
                <Edit className="h-4 w-4 mr-1" />
                {isUpdatingPost ? "Updating..." : "Edit"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeletingPost}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {isDeletingPost ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <Link
              href={`/profile/${post.userId}`}
              className="hover:text-primary hover:underline transition-colors"
            >
              User {post.userId}
            </Link>
            <span>•</span>
            <span>Post #{post.id}</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {post.body}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit Post Form */}
      <PostForm
        open={showEditForm}
        onOpenChange={setShowEditForm}
        onSubmit={handleUpdatePost}
        onCancel={() => setShowEditForm(false)}
        isLoading={isUpdatingPost}
        title="Update Post"
        isEdit={true}
        initialData={{
          title: post.title,
          body: post.body,
          userId: post.userId,
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Post
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{post.title}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-4">
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeletingPost}
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeletingPost ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeletingPost}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
