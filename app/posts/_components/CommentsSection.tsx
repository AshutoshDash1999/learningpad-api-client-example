"use client";

import { useComments, useCreateComment } from "@/api/hooks/useComments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { CreateCommentForm } from "./CreateCommentForm";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface CommentsSectionProps {
  post: Post;
}

export function CommentsSection({ post }: CommentsSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Comment query and mutation hooks
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useComments();

  const { mutateAsync: createComment, isPending: isCreatingComment } =
    useCreateComment();

  // Filter comments for this post
  const postComments =
    comments?.filter((comment) => comment.postId === post.id) || [];

  const handleCreateComment = async (data: {
    name: string;
    email: string;
    body: string;
  }) => {
    try {
      await createComment({ ...data, postId: post.id });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Header with create button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {postComments.length} comment
            {postComments.length !== 1 ? "s" : ""}
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
        {commentsLoading ? (
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
        ) : commentsError ? (
          <div className="text-red-600 py-8 text-center">
            Error loading comments:{" "}
            {commentsError instanceof Error
              ? commentsError.message
              : "Unknown error"}
          </div>
        ) : postComments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          postComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>

      {/* Create Comment Form */}
      {showCreateForm && (
        <div className="border-t pt-4">
          <CreateCommentForm
            onSubmit={handleCreateComment}
            onCancel={() => setShowCreateForm(false)}
            isLoading={isCreatingComment}
            postId={post.id}
          />
        </div>
      )}
    </div>
  );
}
