"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Add New Comment
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CommentForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          initialData={{ postId }}
        />
      </CardContent>
    </Card>
  );
}
