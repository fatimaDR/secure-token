
import { apiService } from "./apiService";

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export const authService = {
  // Login with email and password
  async login(email: string, password: string): Promise<LoginResponse> {
    // In a real app, this would be an API call to your Symfony backend
    // For demo purposes, we'll simulate a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "1",
            name: "Demo User",
            email: email,
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoiZGVtb0BleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.example-token",
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.example-refresh-token",
        });
      }, 1000);
    });
  },

  // Register a new user
  async register(name: string, email: string, password: string): Promise<LoginResponse> {
    // In a real app, this would be an API call to your Symfony backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "1",
            name: name,
            email: email,
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoiZGVtb0BleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.example-token",
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.example-refresh-token",
        });
      }, 1000);
    });
  },

  // Get the current user from the token
  async getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      // In a real app, this would validate the token with your Symfony backend
      // For demo purposes, we'll simulate a user
      return {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Refresh the access token
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    // In a real app, this would be an API call to your Symfony backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoiZGVtb0BleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.new-example-token",
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.new-example-refresh-token",
        });
      }, 500);
    });
  },
};
