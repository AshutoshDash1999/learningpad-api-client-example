"use client";

import { useDeletePost, useUpdatePost } from "@/api/hooks/usePosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, MessageCircle, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommentsSection } from "./CommentsSection";
import { PostForm } from "./PostForm";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Post mutation hooks
  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();

  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  const handleEdit = () => {
    setShowEditForm(true);
  };

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
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post. Please try again.");
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

  const handleViewComments = () => {
    setShowCommentsModal(true);
  };

  const handleCloseComments = () => {
    setShowCommentsModal(false);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
            {post.title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3 w-3" />
          <Link
            href={`/profile/${post.userId}`}
            className="hover:text-primary hover:underline transition-colors"
          >
            User {post.userId}
          </Link>
          <Link
            href={`/posts/${post.id}`}
            className="hover:text-primary hover:underline transition-colors"
          >
            <Badge
              variant="secondary"
              className="text-xs cursor-pointer hover:bg-primary/10"
            >
              Post #{post.id}
            </Badge>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {post.body}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={isUpdatingPost}
            className="flex-1"
          >
            <Edit className="h-3 w-3 mr-1" />
            {isUpdatingPost ? "Updating..." : "Edit"}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeletingPost}
            className="flex-1"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {isDeletingPost ? "Deleting..." : "Delete"}
          </Button>

          <Button size="sm" onClick={handleViewComments} className="flex-1">
            <MessageCircle className="h-3 w-3 mr-1" />
            Comments
          </Button>
        </div>
      </CardFooter>

      {/* Comments Modal */}
      <Dialog open={showCommentsModal} onOpenChange={handleCloseComments}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments for: {post.title}
            </DialogTitle>
            <DialogDescription>Manage comments for this post</DialogDescription>
          </DialogHeader>

          <CommentsSection post={post} />
        </DialogContent>
      </Dialog>

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
    </Card>
  );
}
