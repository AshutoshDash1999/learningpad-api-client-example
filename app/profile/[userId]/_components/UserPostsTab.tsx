"use client";

import { useUserPosts } from "@/api/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

interface UserPostsTabProps {
  userId: string;
}

const UserPostsTab = ({ userId }: UserPostsTabProps) => {
  const { data: posts, isLoading, error } = useUserPosts(userId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Posts</h3>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Posts</h3>
        <p className="text-muted-foreground">
          Failed to load posts. Please try again.
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Posts Found</h3>
        <p className="text-muted-foreground">
          This user hasn&apos;t written any posts yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Posts</h3>
        <Badge variant="secondary">{posts.length}</Badge>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
                <Link
                  href={`/posts/${post.id}`}
                  className="flex items-center gap-1 text-sm text-primary hover:underline shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                  View
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserPostsTab;
