
// Base API service for making HTTP requests

const BASE_URL = "https://api.example.com"; // Replace with your Symfony API URL

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiService = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...requestOptions } = options;
    
    // Build URL with query params if provided
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      url += `?${searchParams.toString()}`;
    }

    // Get the authentication token from localStorage
    const token = localStorage.getItem("token");
    
    // Set default headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...requestOptions,
        headers,
      });

      // Handle 401 Unauthorized responses by trying to refresh the token
      if (response.status === 401) {
        // This would be handled by the auth context in a real app
        // For demo purposes, we'll just throw an error
        throw new Error("Unauthorized");
      }

      // For non-JSON responses
      if (!response.headers.get("content-type")?.includes("application/json")) {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API error");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  // GET request helper
  get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  },

  // POST request helper
  post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT request helper
  put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // DELETE request helper
  delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
