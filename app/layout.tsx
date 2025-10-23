import AppProvider from "@/components/providers/app-provider";
import QueryProvider from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "LearningPad API Client Example - React Query Hooks & JSONPlaceholder Demo",
    template: "%s | LearningPad API Client Example",
  },
  description:
    "Comprehensive React TypeScript example demonstrating @learningpad/api-client with JSONPlaceholder API. Features React Query hooks, CRUD operations, caching, error handling, and modern UI components.",
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
  authors: [{ name: "LearningPad Team" }],
  creator: "LearningPad",
  publisher: "LearningPad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL("https://learningpad-api-client.netlify.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learningpad-api-client.netlify.app",
    title:
      "LearningPad API Client Example - React Query Hooks & JSONPlaceholder Demo",
    description:
      "Comprehensive React TypeScript example demonstrating @learningpad/api-client with JSONPlaceholder API. Features React Query hooks, CRUD operations, caching, error handling, and modern UI components.",
    siteName: "LearningPad API Client Example",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LearningPad API Client Example - React Query Hooks Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LearningPad API Client Example - React Query Hooks & JSONPlaceholder Demo",
    description:
      "Comprehensive React TypeScript example demonstrating @learningpad/api-client with JSONPlaceholder API. Features React Query hooks, CRUD operations, caching, error handling, and modern UI components.",
    images: ["/og-image.png"],
    creator: "@learningpad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AppProvider>{children}</AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
