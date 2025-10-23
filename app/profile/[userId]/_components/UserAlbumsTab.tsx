"use client";

import { useUserAlbums } from "@/api/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen, Hash } from "lucide-react";

interface UserAlbumsTabProps {
  userId: string;
}

const UserAlbumsTab = ({ userId }: UserAlbumsTabProps) => {
  const { data: albums, isLoading, error } = useUserAlbums(userId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Albums</h3>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-16" />
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
        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Albums</h3>
        <p className="text-muted-foreground">
          Failed to load albums. Please try again.
        </p>
      </div>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <div className="text-center py-8">
        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Albums Found</h3>
        <p className="text-muted-foreground">
          This user has&nbsp;nt created any albums yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FolderOpen className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Albums</h3>
        <Badge variant="secondary">{albums.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <Card key={album.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base line-clamp-2">
                {album.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>ID: {album.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserAlbumsTab;
