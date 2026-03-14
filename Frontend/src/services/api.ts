/**
 * API Client Setup
 * Centralized fetch wrapper for all API calls
 */

import { handleError } from "../shared/utils";
import type { ApiResponse } from "../shared/types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Set authentication token
   */
  setToken(token: string | null) {
    this.token = token;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString();
      url = `${url}?${queryString}`;
    }

    return url;
  }

  /**
   * Get default headers with authentication
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Perform GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
        ...options,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Perform POST request
   */
  async post<T>(
    endpoint: string,
    data?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Perform PUT request
   */
  async put<T>(
    endpoint: string,
    data?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const response = await fetch(url, {
        method: "PUT",
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Perform DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.getHeaders(),
        ...options,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error [${response.status}]:`, data);
      return {
        success: false,
        error: data.error || data.message || "An error occurred",
        message: data.message,
      };
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    };
  }

  /**
   * Handle fetch errors
   */
  private handleError<T>(error: any): ApiResponse<T> {
    console.error("API Request Error:", error);
    return {
      success: false,
      error: error.message || "Network error occurred",
    };
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

/**
 * Export helper functions for common operations
 */
export async function fetchApi<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Record<string, any>,
  params?: Record<string, string | number>
): Promise<T> {
  const options = { params };

  let response: ApiResponse<T>;

  switch (method) {
    case "POST":
      response = await apiClient.post<T>(endpoint, data, options);
      break;
    case "PUT":
      response = await apiClient.put<T>(endpoint, data, options);
      break;
    case "DELETE":
      response = await apiClient.delete<T>(endpoint, options);
      break;
    case "GET":
    default:
      response = await apiClient.get<T>(endpoint, options);
  }

  if (!response.success) {
    throw new Error(response.error || "API request failed");
  }

  return response.data as T;
}
