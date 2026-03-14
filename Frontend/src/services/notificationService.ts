/**
 * Notification Service
 * Handles user notifications
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { Notification } from "../shared/types";

/**
 * Get user's notifications
 */
export async function getNotifications(
  page: number = 1,
  limit: number = 20
): Promise<Notification[]> {
  try {
    const response = await apiClient.get<Notification[]>(
      API_ENDPOINTS.NOTIFICATIONS.LIST,
      { params: { page, limit } }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch notifications");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get notifications error:", error);
    throw error;
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<void> {
  try {
    const endpoint = API_ENDPOINTS.NOTIFICATIONS.MARK_READ.replace(
      ":id",
      notificationId
    );
    const response = await apiClient.post(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to mark as read");
    }
  } catch (error) {
    console.error("Mark notification as read error:", error);
    throw error;
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    const response = await apiClient.post(`${API_ENDPOINTS.NOTIFICATIONS.LIST}/mark-all-read`);

    if (!response.success) {
      throw new Error(response.error || "Failed to mark all as read");
    }
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    throw error;
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: string): Promise<void> {
  try {
    const endpoint = API_ENDPOINTS.NOTIFICATIONS.DELETE.replace(":id", notificationId);
    const response = await apiClient.delete(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to delete notification");
    }
  } catch (error) {
    console.error("Delete notification error:", error);
    throw error;
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(): Promise<number> {
  try {
    const response = await apiClient.get<{ count: number }>(
      `${API_ENDPOINTS.NOTIFICATIONS.LIST}/unread-count`
    );

    if (!response.success) {
      return 0;
    }

    return response.data?.count || 0;
  } catch (error) {
    console.error("Get unread count error:", error);
    return 0;
  }
}
