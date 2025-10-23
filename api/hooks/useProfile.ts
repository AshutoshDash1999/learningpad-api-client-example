import { userService } from "../config";

/**
 * Profile API Hooks
 *
 * This file contains React hooks for managing user profiles and related data.
 * All hooks use React Query for caching, background updates, and error handling.
 * Profiles include user information, posts, albums, and todos.
 *
 * @example
 * // Fetch a single profile
 * const { data: profile, isLoading, error } = useProfile("1");
 *
 * // Fetch all profiles
 * const { data: profiles } = useProfiles();
 *
 * // Fetch user's posts
 * const { data: userPosts } = useUserPosts("1");
 *
 * // Update a profile
 * const updateProfile = useUpdateProfile();
 * await updateProfile.mutateAsync({
 *   id: "1",
 *   data: { name: "New Name", email: "new@email.com" }
 * });
 */

/**
 * Hook to fetch a single profile by ID
 *
 * @param {string} id - The user ID to fetch
 * @returns {Object} React Query result with profile data
 * @returns {Profile} data - The profile data
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const useProfile = (id: string) => {
  return userService.useQuery<Profile>({
    key: ["profile", id],
    url: `/${id}`,
  });
};

/**
 * Hook to fetch all profiles
 *
 * @returns {Object} React Query result with profiles data
 * @returns {Profile[]} data - Array of all profiles
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const useProfiles = () => {
  return userService.useQuery<Profile[]>({
    key: ["profiles"],
    url: "",
  });
};

/**
 * Hook to fetch posts by a specific user
 *
 * @param {string} userId - The user ID to fetch posts for
 * @returns {Object} React Query result with posts data
 * @returns {Post[]} data - Array of posts by the user
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const useUserPosts = (userId: string) => {
  return userService.useQuery<Post[]>({
    key: ["userPosts", userId],
    url: `/${userId}/posts`,
  });
};

/**
 * Hook to fetch albums by a specific user
 *
 * @param {string} userId - The user ID to fetch albums for
 * @returns {Object} React Query result with albums data
 * @returns {Album[]} data - Array of albums by the user
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const useUserAlbums = (userId: string) => {
  return userService.useQuery<Album[]>({
    key: ["userAlbums", userId],
    url: `/${userId}/albums`,
  });
};

/**
 * Hook to fetch todos by a specific user
 *
 * @param {string} userId - The user ID to fetch todos for
 * @returns {Object} React Query result with todos data
 * @returns {Todo[]} data - Array of todos by the user
 * @returns {boolean} isLoading - Loading state
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} refetch - Function to manually refetch data
 */
export const useUserTodos = (userId: string) => {
  return userService.useQuery<Todo[]>({
    key: ["userTodos", userId],
    url: `/${userId}/todos`,
  });
};

/**
 * Hook to update a user profile
 *
 * @returns {Object} React Query mutation result
 * @returns {Function} mutateAsync - Function to update a profile
 * @returns {boolean} isPending - Loading state during update
 * @returns {Error} error - Error state
 * @returns {boolean} isError - Error flag
 * @returns {Function} reset - Function to reset mutation state
 *
 * @example
 * const updateProfile = useUpdateProfile();
 * await updateProfile.mutateAsync({
 *   id: "1",
 *   data: {
 *     name: "New Name",
 *     email: "new@email.com",
 *     phone: "123-456-7890",
 *     website: "https://example.com",
 *     address: {
 *       street: "123 Main St",
 *       suite: "Apt 1",
 *       city: "New York",
 *       zipcode: "10001"
 *     },
 *     company: {
 *       name: "Company Inc",
 *       catchPhrase: "Great company",
 *       bs: "Business description"
 *     }
 *   }
 * });
 */
export const useUpdateProfile = () => {
  const mutation = userService.useMutation<
    Profile,
    { id: string; data: UpdateProfile }
  >({
    keyToInvalidate: { queryKey: ["profiles"] },
    url: "",
    method: "put",
    successMessage: "Profile updated successfully!",
    errorMessage: "Failed to update profile",
  });

  return {
    ...mutation,
    mutateAsync: async ({ id, data }: { id: string; data: UpdateProfile }) => {
      return userService.put(`/${id}`, data);
    },
  };
};
