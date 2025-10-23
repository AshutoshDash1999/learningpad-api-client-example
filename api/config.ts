import {
  ApiClientOptions,
  ApiConfig,
  ApiService,
} from "@learningpad/api-client";
import toast from "react-hot-toast";

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
    getAccessToken: () => {
      const token = localStorage.getItem("access_token");
      console.log("[TokenManager] getAccessToken called, returning:", token);
      return token;
    },
    getRefreshToken: () => {
      const token = localStorage.getItem("refresh_token");
      console.log("[TokenManager] getRefreshToken called, returning:", token);
      return token;
    },
    setAccessToken: (token: string) => {
      localStorage.setItem("access_token", token);
      console.log("[TokenManager] setAccessToken called with:", token);
      toast.success("Access token updated successfully");
    },
    setRefreshToken: (token: string) => {
      localStorage.setItem("refresh_token", token);
      console.log("[TokenManager] setRefreshToken called with:", token);
      toast.success("Refresh token updated successfully");
    },
    clearTokens: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      console.log("[TokenManager] clearTokens called, tokens removed");
      toast("Tokens cleared successfully", { icon: "ℹ️" });
    },
  },
  // Notifications (optional)
  notificationManager: {
    success: (message: string) => {
      console.log("✅", message);
      toast.success(message);
    },
    error: (message: string) => {
      console.error("❌", message);
      toast.error(message);
    },
    info: (message: string) => {
      console.log("ℹ️", message);
      toast(message);
    },
    warning: (message: string) => {
      console.warn("⚠️", message);
      toast(message);
    },
  },
  // Unauthorized handler (optional)
  onUnauthorized: () => {
    // Redirect to login page
    window.location.href = "/login";
  },
};

// In your config file
ApiConfig.initialize(apiConfig);

const postService = new ApiService("posts");
const commentService = new ApiService("comments");
const userService = new ApiService("users");

export { commentService, postService, userService };
