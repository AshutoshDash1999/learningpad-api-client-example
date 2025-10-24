"use client";

import { useCreateComment } from "@/api/hooks/useComments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { CreateCommentForm } from "./CreateCommentForm";

interface CommentsSectionProps {
  post: Post;
  comments?: Comment[];
  isLoading?: boolean;
}

export function CommentsSection({
  post,
  comments = [],
  isLoading: commentsLoading = false,
}: CommentsSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Comment mutation hooks
  const { mutateAsync: createComment, isPending: isCreatingComment } =
    useCreateComment(post.id.toString());

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
    <div className="space-y-6">
      {/* Header with create button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {comments.length} comment
            {comments.length !== 1 ? "s" : ""}
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

      {/* Create Comment Form */}
      {showCreateForm && (
        <CreateCommentForm
          onSubmit={handleCreateComment}
          onCancel={() => setShowCreateForm(false)}
          isLoading={isCreatingComment}
          postId={post.id}
        />
      )}

      {/* Comments List */}
      <div className="space-y-4">
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
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={post.id.toString()}
            />
          ))
        )}
      </div>
    </div>
  );
}
