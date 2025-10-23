"use client";

import { usePhotosByAlbum } from "@/api/hooks/useAlbums";
import { useUserAlbums } from "@/api/hooks/useProfile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen, Hash, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";

interface UserAlbumsTabProps {
  userId: string;
}

interface AlbumPhotosContentProps {
  albumId: number;
}

const AlbumPhotosContent = ({ albumId }: AlbumPhotosContentProps) => {
  const {
    data: photos,
    isLoading,
    error,
  } = usePhotosByAlbum(albumId.toString());

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Photos</h3>
        <p className="text-muted-foreground">
          Failed to load photos for this album. Please try again.
        </p>
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-8">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Photos Found</h3>
        <p className="text-muted-foreground">
          This album doesn&apos;t contain any photos.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {photos.length} photo{photos.length !== 1 ? "s" : ""} in this album
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-full aspect-square object-cover rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => window.open(photo.url, "_blank")}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {photo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserAlbumsTab = ({ userId }: UserAlbumsTabProps) => {
  const { data: albums, isLoading, error } = useUserAlbums(userId);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbumId(albumId);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FolderOpen className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Albums</h3>
        <Badge variant="secondary">{albums.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <Card
            key={album.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleAlbumClick(album.id)}
          >
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

      {/* Photo Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Album Photos
              {selectedAlbumId && (
                <Badge variant="outline">Album #{selectedAlbumId}</Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedAlbumId && <AlbumPhotosContent albumId={selectedAlbumId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAlbumsTab;
