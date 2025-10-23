"use client";

import { useDeleteComment, useUpdateComment } from "@/api/hooks/useComments";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Trash2, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CommentForm } from "./CommentForm";

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Comment mutation hooks
  const { mutateAsync: updateComment, isPending: isUpdatingComment } =
    useUpdateComment();

  const { mutateAsync: deleteComment, isPending: isDeletingComment } =
    useDeleteComment();

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

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id.toString());
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
  );
}
