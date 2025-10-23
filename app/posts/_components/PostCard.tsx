"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Edit,
  MessageCircle,
  MoreHorizontal,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  onViewComments: (post: Post) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function PostCard({
  post,
  onEdit,
  onDelete,
  onViewComments,
  isUpdating = false,
  isDeleting = false,
}: PostCardProps) {
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    onEdit(post);
    setShowActions(false);
  };

  const handleDelete = () => {
    onDelete(post.id);
    setShowActions(false);
  };

  const handleViewComments = () => {
    onViewComments(post);
    setShowActions(false);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
            {post.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3 w-3" />
          <span>User {post.userId}</span>
          <Badge variant="secondary" className="text-xs">
            Post #{post.id}
          </Badge>
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
            disabled={isUpdating}
            className="flex-1"
          >
            <Edit className="h-3 w-3 mr-1" />
            {isUpdating ? "Updating..." : "Edit"}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>

          <Button size="sm" onClick={handleViewComments} className="flex-1">
            <MessageCircle className="h-3 w-3 mr-1" />
            Comments
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
