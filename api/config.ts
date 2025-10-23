import { ApiClientOptions, ApiConfig } from "@learningpad/api-client";

// Your API configuration
const apiConfig: ApiClientOptions = {
  services: {
    // Your main API service
    posts: {
      name: "posts",
      baseURL: "https://jsonplaceholder.typicode.com/posts",
      timeout: 10000,
    },
    users: {
      name: "users",
      baseURL: "https://jsonplaceholder.typicode.com/users",
      timeout: 10000,
    },
    todos: {
      name: "todos",
      baseURL: "https://jsonplaceholder.typicode.com/todos",
      timeout: 10000,
    },
    photos: {
      name: "photos",
      baseURL: "https://jsonplaceholder.typicode.com/photos",
      timeout: 10000,
    },
    albums: {
      name: "albums",
      baseURL: "https://jsonplaceholder.typicode.com/albums",
      timeout: 10000,
    },
    comments: {
      name: "comments",
      baseURL: "https://jsonplaceholder.typicode.com/comments",
      timeout: 10000,
    },
  },
  defaultTimeout: 10000,
  defaultHeaders: {
    "Content-Type": "application/json",
  },
  // Token management (optional)
  tokenManager: {
    getAccessToken: () => localStorage.getItem("access_token"),
    getRefreshToken: () => localStorage.getItem("refresh_token"),
    setAccessToken: (token: string) =>
      localStorage.setItem("access_token", token),
    setRefreshToken: (token: string) =>
      localStorage.setItem("refresh_token", token),
    clearTokens: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  // Notifications (optional)
  notificationManager: {
    success: (message: string) => console.log("✅", message),
    error: (message: string) => console.error("❌", message),
    info: (message: string) => console.log("ℹ️", message),
    warning: (message: string) => console.warn("⚠️", message),
  },
  // Unauthorized handler (optional)
  onUnauthorized: () => {
    // Redirect to login page
    window.location.href = "/login";
  },
};

// Initialize the API client
ApiConfig.initialize(apiConfig);

export default apiConfig;
