import { albumService } from "../config";

// Query hook for fetching photos by albumId
export const usePhotosByAlbum = (albumId: string) => {
  return albumService.useQuery<Photo[]>({
    key: ["albums", "photos"],
    url: `/${albumId}/photos`,
  });
};
