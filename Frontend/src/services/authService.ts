/**
 * Authentication Service
 * Handles login, registration, and token management
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { User, AuthResponse, LoginCredentials, RegisterData, AuthToken } from "../shared/types";

/**
 * Login user with email and password
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (!response.success) {
      throw new Error(response.error || "Login failed");
    }

    // Store token
    if (response.data?.token) {
      apiClient.setToken(response.data.token.accessToken);
      // Store in AsyncStorage if needed
    }

    return response.data!;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Register new user
 */
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    if (!response.success) {
      throw new Error(response.error || "Registration failed");
    }

    // Store token
    if (response.data?.token) {
      apiClient.setToken(response.data.token.accessToken);
    }

    return response.data!;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  try {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    apiClient.setToken(null);
    // Clear AsyncStorage if needed
  } catch (error) {
    console.error("Logout error:", error);
    // Still clear token even if request fails
    apiClient.setToken(null);
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken(): Promise<AuthToken> {
  try {
    const response = await apiClient.post<AuthToken>(API_ENDPOINTS.AUTH.REFRESH);

    if (!response.success) {
      throw new Error("Token refresh failed");
    }

    if (response.data?.accessToken) {
      apiClient.setToken(response.data.accessToken);
    }

    return response.data!;
  } catch (error) {
    console.error("Token refresh error:", error);
    // Force logout on token refresh failure
    apiClient.setToken(null);
    throw error;
  }
}

/**
 * Verify email (for email verification)
 */
export async function verifyEmail(email: string, code: string): Promise<void> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      email,
      code,
    });

    if (!response.success) {
      throw new Error(response.error || "Email verification failed");
    }
  } catch (error) {
    console.error("Email verification error:", error);
    throw error;
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);

    if (!response.success) {
      throw new Error("Failed to fetch user profile");
    }

    return response.data!;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return apiClient.getToken() !== null;
}

/**
 * Initialize auth (restore token from storage)
 */
export async function initializeAuth(): Promise<User | null> {
  try {
    // Try to restore token from AsyncStorage (if using)
    // const token = await AsyncStorage.getItem("authToken");
    // if (token) {
    //   apiClient.setToken(token);
    //   return await getCurrentUser();
    // }
    
    return null;
  } catch (error) {
    console.error("Auth initialization error:", error);
    return null;
  }
}
