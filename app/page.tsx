"use client";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LearningPad API Client Example",
    description:
      "Comprehensive React TypeScript example demonstrating @learningpad/api-client with JSONPlaceholder API. Features React Query hooks, CRUD operations, caching, error handling, and modern UI components.",
    url: "https://learningpad-api-client.netlify.app",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "LearningPad",
      url: "https://learningpad.com",
    },
    keywords: [
      "LearningPad API Client",
      "React Query",
      "TypeScript",
      "JSONPlaceholder",
      "API Hooks",
      "CRUD Operations",
      "React Hooks",
      "Data Fetching",
      "Caching",
      "Error Handling",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    featureList: [
      "Query hooks for data fetching with caching and error handling",
      "Mutation hooks for CRUD operations with optimistic updates",
      "Real-time data synchronization",
      "Form management for different operations",
      "Proper error handling and loading states",
      "Automatic cache invalidation",
      "Success/error notifications",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">
          LearningPad API Client Example
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This is a comprehensive example demonstrating the usage of
          @learningpad/api-client with JSONPlaceholder API for CRUD operations
          on posts and comments.
        </p>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">
            Features Demonstrated:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Query hooks for data fetching with caching and error handling
            </li>
            <li>Mutation hooks for CRUD operations with optimistic updates</li>
            <li>Real-time data synchronization</li>
            <li>Form management for different operations</li>
            <li>Proper error handling and loading states</li>
            <li>Automatic cache invalidation</li>
            <li>Success/error notifications</li>
          </ul>

          <div className="mt-8">
            <Link href="/posts">
              <Button size="lg">View Posts & Comments Demo</Button>
            </Link>
          </div>
        </div>

        {/* API Client Integration Guide */}
        <div className="mt-12 space-y-8">
          <h2 className="text-3xl font-bold mb-6">
            API Client Integration Guide
          </h2>

          {/* Step 1: Installation */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Step 1: Install @learningpad/api-client
            </h3>
            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="grid w-1/3 grid-cols-3">
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              </TabsList>

              <TabsContent value="npm" className="mt-4">
                <CodeBlock
                  code="npm install @learningpad/api-client @tanstack/react-query"
                  language="bash"
                />
              </TabsContent>

              <TabsContent value="yarn" className="mt-4">
                <CodeBlock
                  code="yarn add @learningpad/api-client @tanstack/react-query"
                  language="bash"
                />
              </TabsContent>

              <TabsContent value="pnpm" className="mt-4">
                <CodeBlock
                  code="pnpm add @learningpad/api-client @tanstack/react-query"
                  language="bash"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Step 2: Query Provider Configuration */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Step 2: Query Provider Configuration
            </h3>
            <p className="text-gray-700 mb-4">
              Configure the Query Provider with the API client:
            </p>
            <CodeBlock
              code={`// components/providers/query-provider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2, // 2 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
`}
              language="typescript"
            />
          </div>

          {/* Step 3: API Configuration */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Step 3: API Configuration
            </h3>
            <p className="text-gray-700 mb-4">
              Configure the API client with multiple services:
            </p>
            <CodeBlock
              code={`// api/config.ts
import { ApiClientOptions, ApiConfig, ApiService } from "@learningpad/api-client";

const apiConfig: ApiClientOptions = {
  services: {
    posts: {
      name: "posts",
      baseURL: "https://jsonplaceholder.typicode.com/posts",
      timeout: 10000,
    },
    comments: {
      name: "comments",
      baseURL: "https://jsonplaceholder.typicode.com/comments",
      timeout: 10000,
    },
    // ... other services
  },
  defaultTimeout: 10000,
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

ApiConfig.initialize(apiConfig);

// Export service instances
export const postService = new ApiService("posts");
export const commentService = new ApiService("comments");`}
              language="typescript"
            />
          </div>

          {/* Step 4: App Layout Setup */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Step 4: App Layout Setup
            </h3>
            <p className="text-gray-700 mb-4">
              Configure the app layout to include the Query Provider:
            </p>
            <CodeBlock
              code={`// app/layout.tsx

import QueryProvider from "@/components/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}`}
              language="tsx"
            />
          </div>

          {/* Step 5: Custom Hooks */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Step 5: Create Custom Hooks
            </h3>
            <p className="text-gray-700 mb-4">
              Create hooks using the API service instances for all CRUD
              operations:
            </p>
            <CodeBlock
              code={`// api/hooks/usePosts.ts
import { postService } from "../config";

// Read: Fetch all posts
export const usePosts = () => {
  return postService.useQuery<Post[]>({
    key: ["posts"],
    url: "",
  });
};

// Read: Fetch a single post
export const usePost = (id: string) => {
  return postService.useQuery<Post>({
    key: ["post", id],
    url: \`/\${id}\`,
  });
};

// Create: Create a new post
export const useCreatePost = () => {
  return postService.useMutation<Post, CreatePost>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: "",
    method: "post",
    successMessage: "Post created successfully!",
    errorMessage: "Failed to create post",
  });
};

// Update: Update an existing post
export const useUpdatePost = (id: string) => {
  return postService.useMutation<Post, Partial<CreatePost>>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: \`/\${id}\`,
    method: "put",
    successMessage: "Post updated successfully!",
    errorMessage: "Failed to update post",
  });
};

// Delete: Delete a post
export const useDeletePost = (id: string) => {
  return postService.useMutation<void, void>({
    keyToInvalidate: { queryKey: ["posts"] },
    url: \`/\${id}\`,
    method: "delete",
    successMessage: "Post deleted successfully!",
    errorMessage: "Failed to delete post",
  });
};`}
              language="typescript"
            />
          </div>

          {/* Step 6: Component Usage */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Step 6: Use Hooks in Components
            </h3>
            <p className="text-gray-700 mb-4">
              Example of how to use all CRUD hooks in a UI component:
            </p>
            <CodeBlock
              code={`// app/posts/_components/PostCard.tsx
"use client";

import { useDeletePost, useUpdatePost, usePosts, usePost } from "@/api/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function PostCard({ post }: { post: Post }) {
  // Read Operations: Fetch data
  // In parent component or here for list of posts
  // const { data: posts, isLoading, error } = usePosts();
  
  // Fetch single post details
  // const { data: postDetails } = usePost(post.id.toString());

  // Update: useUpdatePost hook
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost(
    post.id.toString()
  );

  // Delete: useDeletePost hook
  const { mutateAsync: deletePost, isPending: isDeletingPost } = useDeletePost(
    post.id.toString()
  );

  const handleUpdate = async () => {
    try {
      await updatePost({
        title: "Updated Title",
        body: "Updated body content",
        userId: 1,
      });
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          {post.body}
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeletingPost}
        >
          {isDeletingPost ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Example: Creating a new post (can be in a separate form component)
// function CreatePostForm() {
//   const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
//
//   const handleCreate = async () => {
//     try {
//       await createPost({
//         title: "New Post",
//         body: "Post content",
//         userId: 1
//       });
//     } catch (error) {
//       console.error("Failed to create post:", error);
//     }
//   };
//
//   return <Button onClick={handleCreate} disabled={isCreating}>
//     {isCreating ? "Creating..." : "Create Post"}
//   </Button>;
// }`}
              language="tsx"
            />
          </div>

          {/* Key Features */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Complete CRUD Operations:</strong> Full support for
                Create, Read, Update, and Delete operations with custom hooks
              </li>
              <li>
                • <strong>Multiple Services:</strong> Configure different API
                endpoints for posts, users, comments, etc.
              </li>
              <li>
                • <strong>Token Management:</strong> Automatic JWT token
                handling with refresh logic
              </li>
              <li>
                • <strong>Notifications:</strong> Built-in toast notifications
                for success/error states
              </li>
              <li>
                • <strong>React Query Integration:</strong> Automatic caching,
                background updates, and error handling
              </li>
              <li>
                • <strong>TypeScript Support:</strong> Full type safety with
                TypeScript interfaces
              </li>
              <li>
                • <strong>Cache Invalidation:</strong> Automatic cache updates
                after mutations
              </li>
              <li>
                • <strong>Loading & Error States:</strong> Built-in handling for
                pending states and error scenarios
              </li>
            </ul>
          </div>

          {/* Additional Resources */}
          <div className="p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <a
                  href="https://www.npmjs.com/package/@learningpad/api-client"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NPM Package Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dibyajyoti79/lp-api-client/blob/HEAD/SETUP_GUIDE.md"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Setup Guide
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
