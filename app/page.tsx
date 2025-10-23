"use client";

import { Button } from "@/components/ui/button";
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

        <div className="space-y-4">
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
      </div>
    </>
  );
}
