import { albumService } from "../config";

/**
 * Albums API Hooks
 *
 * This file contains React hooks for managing photo albums and related data.
 * All hooks use React Query for caching, background updates, and error handling.
 * Albums contain collections of photos and can be organized by users.
 *
 * @example
 * ```tsx
 * // Fetch photos for a specific album
 * const { data: photos, isLoading, error } = usePhotosByAlbum("1");
 *
 * // Display photos in a gallery
 * const PhotoGallery = ({ albumId }: { albumId: string }) => {
 *   const { data: photos, isLoading } = usePhotosByAlbum(albumId);
 *
 *   if (isLoading) return <div>Loading photos...</div>;
 *
 *   return (
 *     <div className="photo-gallery">
 *       {photos?.map(photo => (
 *         <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
 *       ))}
 *     </div>
 *   );
 * };
 * ```
 */

/**
 * Hook to fetch photos for a specific album
 *
 * @param {string} albumId - The album ID to fetch photos for
 * @returns {Object} React Query result with photos data
 * @returns {Photo[]} data - Array of photos in the album
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 *
 * @example
 * ```tsx
 * const AlbumPhotos = ({ albumId }: { albumId: string }) => {
 *   const { data: photos, isLoading, error } = usePhotosByAlbum(albumId);
 *
 *   if (isLoading) return <div>Loading photos...</div>;
 *   if (error) return <div>Error loading photos</div>;
 *
 *   return (
 *     <div className="album-photos">
 *       <h2>Album Photos ({photos?.length || 0})</h2>
 *       <div className="photo-grid">
 *         {photos?.map(photo => (
 *           <div key={photo.id} className="photo-item">
 *             <img
 *               src={photo.thumbnailUrl}
 *               alt={photo.title}
 *               loading="lazy"
 *               onClick={() => window.open(photo.url, '_blank')}
 *             />
 *             <p className="photo-title">{photo.title}</p>
 *           </div>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 */
export const usePhotosByAlbum = (albumId: string) => {
  return albumService.useQuery<Photo[]>({
    key: ["albums", "photos"],
    url: `/${albumId}/photos`,
  });
};
