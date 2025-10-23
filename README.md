# LearningPad API Client Example

This is a comprehensive example demonstrating the usage of `@learningpad/api-client` with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). The project showcases how to implement CRUD operations for posts and comments using React Query hooks.

## Features Demonstrated

- **Query Hooks**: Data fetching with automatic caching, background refetching, and error handling
- **Mutation Hooks**: CRUD operations with optimistic updates and automatic cache invalidation
- **Real-time Synchronization**: Automatic data updates across components
- **Form Management**: Multiple forms for different CRUD operations
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Proper loading indicators during API calls
- **Notifications**: Success/error messages for user actions

## API Client Features

The `@learningpad/api-client` provides:

- **Automatic Caching**: Built on React Query for intelligent data caching
- **Background Refetching**: Keeps data fresh automatically
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Error Handling**: Centralized error management with custom handlers
- **Token Management**: Automatic token refresh and storage
- **Notifications**: Built-in success/error notification system
- **TypeScript Support**: Full type safety throughout

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── api/
│   ├── config.ts              # API client configuration
│   └── hooks/
│       ├── usePosts.ts        # Posts CRUD hooks
│       └── useComments.ts     # Comments CRUD hooks
├── app/
│   ├── posts/
│   │   └── page.tsx           # Posts & Comments management page
│   ├── layout.tsx             # Root layout with API initialization
│   └── page.tsx               # Home page
├── components/
│   ├── providers/
│   │   └── query-provider.tsx # React Query provider
│   └── ui/
│       └── button.tsx         # UI components
└── lib/
    └── utils.ts               # Utility functions
```

## Usage Examples

### Query Hooks

```typescript
// Fetch posts with caching and error handling
const { data: posts, isLoading, error } = usePosts();

// Fetch comments with stale time configuration
const { data: comments } = useComments();
```

### Mutation Hooks

```typescript
// Create a new post
const createPostMutation = useCreatePost();
await createPostMutation.mutateAsync({
  title: "New Post",
  body: "Post content",
  userId: 1,
});

// Update an existing post
const updatePostMutation = useUpdatePost();
await updatePostMutation.mutateAsync({
  id: "1",
  data: { title: "Updated Title" },
});

// Delete a post
const deletePostMutation = useDeletePost();
await deletePostMutation.mutateAsync("1");
```

## API Configuration

The API client is configured in `api/config.ts` with:

- **Service Definitions**: Multiple API endpoints (posts, comments, users, etc.)
- **Timeout Settings**: Configurable request timeouts
- **Token Management**: Automatic token refresh and storage
- **Error Handling**: Custom error handlers and notifications
- **Headers**: Default headers for all requests

## Learn More

- [LearningPad API Client Documentation](https://github.com/dibyajyoti79/lp-api-client)
- [JSONPlaceholder API Guide](https://jsonplaceholder.typicode.com/guide/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Next.js Documentation](https://nextjs.org/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
