"use client";

import { useCommentsByPostId } from "@/api/hooks/useComments";
import { usePost } from "@/api/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PostDetail } from "../_components";
import { CommentsSection } from "../_components/CommentsSection";

const PostPage = () => {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  const [showComments, setShowComments] = useState(true);

  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
  } = usePost(postId);
  const { data: comments, isLoading: isLoadingComments } =
    useCommentsByPostId(postId);

  if (isLoadingPost) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Button
          asChild
          variant="ghost"
          className="mb-4 p-0 h-auto hover:bg-transparent"
        >
          <Link href="/posts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <Link
                  href={`/profile/${post.userId}`}
                  className="hover:text-primary hover:underline"
                >
                  User {post.userId}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{comments?.length || 0} comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <PostDetail post={post} />

      {/* Comments Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Comments ({comments?.length || 0})
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide" : "Show"} Comments
          </Button>
        </div>

        {showComments && (
          <CommentsSection
            post={post}
            comments={comments}
            isLoading={isLoadingComments}
          />
        )}
      </div>
    </div>
  );
};

export default PostPage;
