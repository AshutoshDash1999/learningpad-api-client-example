"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CommentForm } from "./CommentForm";

interface CreateCommentFormProps {
  onSubmit: (data: { name: string; email: string; body: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
  postId: number;
}

export function CreateCommentForm({
  onSubmit,
  onCancel,
  isLoading = false,
  postId,
}: CreateCommentFormProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Add New Comment</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CommentForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        initialData={{ postId }}
      />
    </div>
  );
}
