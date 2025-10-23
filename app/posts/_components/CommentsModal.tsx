"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Mail, MessageCircle, Plus, Trash2, User, X } from "lucide-react";
import { useState } from "react";
import { CommentForm } from "./CommentForm";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsModalProps {
  post: Post | null;
  comments: Comment[];
  isLoading: boolean;
  error: unknown;
  onClose: () => void;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
  onCreateComment: (data: unknown) => void;
  isCreatingComment: boolean;
  isUpdatingComment: boolean;
  isDeletingComment: boolean;
}

export function CommentsModal({
  post,
  comments,
  isLoading,
  error,
  onClose,
  onEditComment,
  onDeleteComment,
  onCreateComment,
  isCreatingComment,
  isUpdatingComment,
  isDeletingComment,
}: CommentsModalProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  if (!post) return null;

  const handleCreateComment = (data: any) => {
    onCreateComment({ ...data, postId: post.id });
    setShowCreateForm(false);
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
  };

  const handleDeleteComment = (commentId: number) => {
    onDeleteComment(commentId);
  };

  const handleClose = () => {
    setShowCreateForm(false);
    setEditingComment(null);
    onClose();
  };

  return (
    <Dialog open={!!post} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments for: {post.title}
          </DialogTitle>
          <DialogDescription>Manage comments for this post</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header with create button */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {comments.length} comment{comments.length !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              disabled={isCreatingComment}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {comment.name}
                        </h4>
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
                        onClick={() => handleEditComment(comment)}
                        disabled={isUpdatingComment}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
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
              ))
            )}
          </div>
        </div>

        {/* Create Comment Form */}
        {showCreateForm && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Add New Comment</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CommentForm
              onSubmit={handleCreateComment}
              onCancel={() => setShowCreateForm(false)}
              isLoading={isCreatingComment}
              initialData={{ postId: post.id }}
            />
          </div>
        )}

        {/* Edit Comment Form */}
        {editingComment && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Edit Comment</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingComment(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CommentForm
              onSubmit={(data) => {
                onEditComment({ ...editingComment, ...data });
                setEditingComment(null);
              }}
              onCancel={() => setEditingComment(null)}
              isLoading={isUpdatingComment}
              initialData={editingComment}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
