/**
 * User Service
 * Handles user profile and account management
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { User } from "../shared/types";

/**
 * Get user profile
 */
export async function getUserProfile(): Promise<User> {
  try {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch profile");
    }

    return response.data!;
  } catch (error) {
    console.error("Get user profile error:", error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(data: Partial<User>): Promise<User> {
  try {
    const response = await apiClient.put<User>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      data
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to update profile");
    }

    return response.data!;
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
}

/**
 * Change password
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD,
      { currentPassword, newPassword }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to change password");
    }
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
}

/**
 * Get user's children (for parents)
 */
export async function getUserChildren(): Promise<User[]> {
  try {
    const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS.CHILDREN);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch children");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get user children error:", error);
    throw error;
  }
}

/**
 * Add a child (for parents)
 */
export async function addChild(childData: Partial<User>): Promise<User> {
  try {
    const response = await apiClient.post<User>(
      API_ENDPOINTS.USERS.CHILDREN,
      childData
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to add child");
    }

    return response.data!;
  } catch (error) {
    console.error("Add child error:", error);
    throw error;
  }
}

/**
 * Delete user account
 */
export async function deleteAccount(): Promise<void> {
  try {
    const response = await apiClient.delete(`${API_ENDPOINTS.USERS.PROFILE}`);

    if (!response.success) {
      throw new Error(response.error || "Failed to delete account");
    }
  } catch (error) {
    console.error("Delete account error:", error);
    throw error;
  }
}
