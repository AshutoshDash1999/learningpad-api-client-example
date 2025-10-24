import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LearningPad API Client Example",
    short_name: "LearningPad API Demo",
    description:
      "Comprehensive React TypeScript example demonstrating @learningpad/api-client with JSONPlaceholder API. Features TanStack React Query hooks, CRUD operations, caching, error handling, and modern UI components.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["developer", "education", "productivity"],
    lang: "en",
    orientation: "portrait-primary",
  };
}
