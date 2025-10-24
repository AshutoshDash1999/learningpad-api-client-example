import { Footer, Header } from "@/components/layout";
import AppProvider from "@/components/providers/app-provider";
import QueryProvider from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "LearningPad API Client Example - TanStack React Query Hooks Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LearningPad API Client Example - React Query Hooks & JSONPlaceholder Demo",
    description:
      "Comprehensive React TypeScript example demonstrating @learningpad/api-client with JSONPlaceholder API. Features React Query hooks, CRUD operations, caching, error handling, and modern UI components.",
    images: ["/logo.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={`${nunito.variable} font-nunito antialiased`}>
        <QueryProvider>
          <AppProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer version="1.1.0" />
            </div>
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
