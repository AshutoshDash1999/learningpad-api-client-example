import { userService } from "../config";

// Query hook for fetching a single profile by ID
export const useProfile = (id: string) => {
  return userService.useQuery<Profile>({
    key: ["profile", id],
    url: `/${id}`,
  });
};

// Query hook for fetching all profiles
export const useProfiles = () => {
  return userService.useQuery<Profile[]>({
    key: ["profiles"],
    url: "",
  });
};

// Query hook for fetching user's posts
export const useUserPosts = (userId: string) => {
  return userService.useQuery<Post[]>({
    key: ["userPosts", userId],
    url: `/${userId}/posts`,
  });
};

// Query hook for fetching user's albums
export const useUserAlbums = (userId: string) => {
  return userService.useQuery<Album[]>({
    key: ["userAlbums", userId],
    url: `/${userId}/albums`,
  });
};

// Query hook for fetching user's todos
export const useUserTodos = (userId: string) => {
  return userService.useQuery<Todo[]>({
    key: ["userTodos", userId],
    url: `/${userId}/todos`,
  });
};

// Mutation hook for updating profile
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
