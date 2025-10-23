import {
  ApiClientOptions,
  ApiConfig,
  ApiService,
} from "@learningpad/api-client";
import toast from "react-hot-toast";

/**
 * API Configuration for LearningPad API Client
 *
 * This file configures the API client with multiple services, token management,
 * and notification handling. It uses JSONPlaceholder as the mock API backend.
 *
 * @see https://jsonplaceholder.typicode.com/ - Mock REST API for testing
 * @see @learningpad/api-client - The underlying API client library
 */

// Your API configuration
const apiConfig: ApiClientOptions = {
  services: {
    /**
     * Posts Service
     * Handles blog posts, articles, and content management
     * Endpoints: GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id
     */
    posts: {
      name: "posts",
      baseURL: "https://jsonplaceholder.typicode.com/posts",
      timeout: 10000,
    },

    /**
     * Users Service
     * Handles user profiles, authentication, and user management
     * Endpoints: GET /users, GET /users/:id, GET /users/:id/posts, GET /users/:id/albums, GET /users/:id/todos
     */
    users: {
      name: "users",
      baseURL: "https://jsonplaceholder.typicode.com/users",
      timeout: 10000,
    },

    /**
     * Todos Service
     * Handles task management and to-do items
     * Endpoints: GET /todos, GET /todos/:id, POST /todos, PUT /todos/:id, DELETE /todos/:id
     */
    todos: {
      name: "todos",
      baseURL: "https://jsonplaceholder.typicode.com/todos",
      timeout: 10000,
    },

    /**
     * Photos Service
     * Handles image management and photo galleries
     * Endpoints: GET /photos, GET /photos/:id, POST /photos, PUT /photos/:id, DELETE /photos/:id
     */
    photos: {
      name: "photos",
      baseURL: "https://jsonplaceholder.typicode.com/photos",
      timeout: 10000,
    },

    /**
     * Albums Service
     * Handles photo album organization and management
     * Endpoints: GET /albums, GET /albums/:id, GET /albums/:id/photos, POST /albums, PUT /albums/:id, DELETE /albums/:id
     */
    albums: {
      name: "albums",
      baseURL: "https://jsonplaceholder.typicode.com/albums",
      timeout: 10000,
    },

    /**
     * Comments Service
     * Handles comments on posts and content
     * Endpoints: GET /comments, GET /comments/:id, GET /comments?postId=:id, POST /comments, PUT /comments/:id, DELETE /comments/:id
     */
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

  /**
   * Token Management
   * Handles JWT tokens for authentication
   * Automatically includes tokens in API requests and manages refresh logic
   */
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

  /**
   * Notification Management
   * Provides consistent toast notifications for API operations
   * Automatically shows success/error messages for mutations
   */
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

  /**
   * Unauthorized Handler
   * Called when API returns 401 Unauthorized
   * Automatically redirects to login page
   */
  onUnauthorized: () => {
    // Redirect to login page
    window.location.href = "/login";
  },
};

// Initialize the API configuration
ApiConfig.initialize(apiConfig);

/**
 * API Service Instances
 * Pre-configured service instances for each API endpoint
 * Use these in your React hooks for data fetching and mutations
 */
const postService = new ApiService("posts");
const commentService = new ApiService("comments");
const userService = new ApiService("users");
const albumService = new ApiService("albums");
const todoService = new ApiService("todos");
const photoService = new ApiService("photos");

export {
  albumService,
  commentService,
  photoService,
  postService,
  todoService,
  userService,
};
