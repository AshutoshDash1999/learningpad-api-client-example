"use client";

import { useDeleteComment, useUpdateComment } from "@/api/hooks/useComments";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Mail, Trash2, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CommentForm } from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  postId: string;
}

export function CommentItem({ comment, postId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Comment mutation hooks
  const { mutateAsync: updateComment, isPending: isUpdatingComment } =
    useUpdateComment(postId);

  const { mutateAsync: deleteComment, isPending: isDeletingComment } =
    useDeleteComment(postId);

  const handleUpdateComment = async (data: {
    name: string;
    email: string;
    body: string;
  }) => {
    try {
      await updateComment({
        id: comment.id.toString(),
        data,
      });
      setIsEditing(false);
      toast.success("Comment updated successfully!");
    } catch (error) {
      console.error("Failed to update comment:", error);
      toast.error("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteComment(comment.id.toString());
      setShowDeleteConfirm(false);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Edit Comment</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
        <CommentForm
          onSubmit={handleUpdateComment}
          onCancel={() => setIsEditing(false)}
          isLoading={isUpdatingComment}
          initialData={comment}
        />
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{comment.name}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                {comment.email}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              disabled={isUpdatingComment}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteComment}
              disabled={isDeletingComment}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {comment.body}
        </p>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Comment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-4">
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeletingComment}
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeletingComment ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeletingComment}
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
