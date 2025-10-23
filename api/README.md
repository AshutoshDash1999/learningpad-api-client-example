# API Hooks Documentation

This directory contains React hooks for managing API operations using the LearningPad API Client. All hooks are built on top of React Query for efficient data fetching, caching, and state management.

## 📁 File Structure

```
api/
├── config.ts           # API client configuration and service instances
├── hooks/
│   ├── usePosts.ts     # Posts management hooks
│   ├── useComments.ts  # Comments management hooks
│   ├── useProfile.ts   # User profiles and related data hooks
│   └── useAlbums.ts    # Albums and photos hooks
└── README.md          # This documentation file
```

## 🚀 Quick Start

### 1. Import the hooks you need

```tsx
import { usePosts, useCreatePost } from "@/api/hooks/usePosts";
import { useProfile, useUserPosts } from "@/api/hooks/useProfile";
import { useCommentsByPostId, useCreateComment } from "@/api/hooks/useComments";
```

### 2. Use in your components

```tsx
const PostsPage = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
```

## 📚 Available Hooks

### Posts Hooks (`usePosts.ts`)

| Hook              | Description             | Returns                                       |
| ----------------- | ----------------------- | --------------------------------------------- |
| `usePosts()`      | Fetch all posts         | `{ data: Post[], isLoading, error, refetch }` |
| `usePost(id)`     | Fetch single post by ID | `{ data: Post, isLoading, error, refetch }`   |
| `useCreatePost()` | Create new post         | `{ mutateAsync, isPending, error, reset }`    |
| `useUpdatePost()` | Update existing post    | `{ mutateAsync, isPending, error, reset }`    |
| `useDeletePost()` | Delete post             | `{ mutateAsync, isPending, error, reset }`    |

**Example Usage:**

```tsx
// Fetch posts
const { data: posts, isLoading } = usePosts();

// Create post
const createPost = useCreatePost();
await createPost.mutateAsync({
  title: "New Post",
  body: "Post content",
  userId: 1,
});
```

### Comments Hooks (`useComments.ts`)

| Hook                          | Description                      | Returns                                          |
| ----------------------------- | -------------------------------- | ------------------------------------------------ |
| `useComments()`               | Fetch all comments               | `{ data: Comment[], isLoading, error, refetch }` |
| `useCommentsByPostId(postId)` | Fetch comments for specific post | `{ data: Comment[], isLoading, error, refetch }` |
| `useCreateComment(postId)`    | Create new comment               | `{ mutateAsync, isPending, error, reset }`       |
| `useUpdateComment(postId)`    | Update existing comment          | `{ mutateAsync, isPending, error, reset }`       |
| `useDeleteComment(postId)`    | Delete comment                   | `{ mutateAsync, isPending, error, reset }`       |

**Example Usage:**

```tsx
// Fetch comments for a post
const { data: comments } = useCommentsByPostId("1");

// Create comment
const createComment = useCreateComment("1");
await createComment.mutateAsync({
  postId: 1,
  name: "John Doe",
  email: "john@example.com",
  body: "Great post!",
});
```

### Profile Hooks (`useProfile.ts`)

| Hook                    | Description                | Returns                                          |
| ----------------------- | -------------------------- | ------------------------------------------------ |
| `useProfile(id)`        | Fetch single profile by ID | `{ data: Profile, isLoading, error, refetch }`   |
| `useProfiles()`         | Fetch all profiles         | `{ data: Profile[], isLoading, error, refetch }` |
| `useUserPosts(userId)`  | Fetch posts by user        | `{ data: Post[], isLoading, error, refetch }`    |
| `useUserAlbums(userId)` | Fetch albums by user       | `{ data: Album[], isLoading, error, refetch }`   |
| `useUserTodos(userId)`  | Fetch todos by user        | `{ data: Todo[], isLoading, error, refetch }`    |
| `useUpdateProfile()`    | Update user profile        | `{ mutateAsync, isPending, error, reset }`       |

**Example Usage:**

```tsx
// Fetch user profile
const { data: profile } = useProfile("1");

// Fetch user's posts
const { data: userPosts } = useUserPosts("1");

// Update profile
const updateProfile = useUpdateProfile();
await updateProfile.mutateAsync({
  id: "1",
  data: { name: "New Name", email: "new@email.com" },
});
```

### Albums Hooks (`useAlbums.ts`)

| Hook                        | Description                     | Returns                                        |
| --------------------------- | ------------------------------- | ---------------------------------------------- |
| `usePhotosByAlbum(albumId)` | Fetch photos for specific album | `{ data: Photo[], isLoading, error, refetch }` |

**Example Usage:**

```tsx
// Fetch album photos
const { data: photos } = usePhotosByAlbum("1");
```

## 🔧 Configuration

The API client is configured in `config.ts` with the following services:

- **Posts Service**: `https://jsonplaceholder.typicode.com/posts`
- **Users Service**: `https://jsonplaceholder.typicode.com/users`
- **Comments Service**: `https://jsonplaceholder.typicode.com/comments`
- **Albums Service**: `https://jsonplaceholder.typicode.com/albums`
- **Photos Service**: `https://jsonplaceholder.typicode.com/photos`
- **Todos Service**: `https://jsonplaceholder.typicode.com/todos`

## ✨ Features

### Automatic Features

- **Caching**: All queries are automatically cached
- **Background Updates**: Data is refreshed in the background
- **Error Handling**: Automatic error states and retry logic
- **Loading States**: Built-in loading indicators
- **Toast Notifications**: Success/error messages for mutations
- **Cache Invalidation**: Related queries are automatically refreshed after mutations

### Query Features

- **Deduplication**: Identical queries are deduplicated
- **Stale-While-Revalidate**: Shows cached data while fetching fresh data
- **Retry Logic**: Automatic retries on failure
- **Refetch on Window Focus**: Refetches data when window regains focus

### Mutation Features

- **Optimistic Updates**: UI updates immediately
- **Rollback on Error**: Reverts changes if mutation fails
- **Loading States**: Built-in pending states
- **Success/Error Callbacks**: Automatic toast notifications

## 🎯 Best Practices

### 1. Error Handling

```tsx
const { data, isLoading, error } = usePosts();

if (error) {
  return <div>Error: {error.message}</div>;
}
```

### 2. Loading States

```tsx
const { data, isLoading } = usePosts();

if (isLoading) {
  return <div>Loading...</div>;
}
```

### 3. Mutation Handling

```tsx
const createPost = useCreatePost();

const handleSubmit = async (formData) => {
  try {
    await createPost.mutateAsync(formData);
    // Success - toast will show automatically
  } catch (error) {
    // Error - toast will show automatically
  }
};
```

### 4. Conditional Queries

```tsx
// Only fetch if userId exists
const { data: profile } = useProfile(userId, {
  enabled: !!userId,
});
```

## 🔄 Data Flow

1. **Query Hooks**: Fetch data from API and cache it
2. **Mutation Hooks**: Modify data and invalidate related caches
3. **Automatic Refetch**: Related queries are automatically refreshed
4. **UI Updates**: Components re-render with fresh data

## 🐛 Troubleshooting

### Common Issues

1. **Data not updating**: Check if cache invalidation is working
2. **Loading forever**: Check network requests in DevTools
3. **Error states**: Check error messages in console
4. **Stale data**: Use `refetch()` to force refresh

### Debug Mode

Enable React Query DevTools for debugging:

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

## 📖 TypeScript Support

All hooks are fully typed with TypeScript interfaces:

```tsx
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
```

## 🚀 Advanced Usage

### Custom Query Options

```tsx
const { data } = usePosts({
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
});
```

### Manual Cache Management

```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// Invalidate specific queries
queryClient.invalidateQueries(["posts"]);

// Set query data manually
queryClient.setQueryData(["post", "1"], newPostData);
```

This documentation provides a comprehensive guide to using the API hooks in your React application. For more advanced usage, refer to the [React Query documentation](https://tanstack.com/query/latest).
