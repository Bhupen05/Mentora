/**
 * Lesson Service
 * Handles lesson booking and management
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { Lesson, BookingRequest } from "../shared/types";

/**
 * Get list of user's lessons
 */
export async function getLessons(
  status?: string,
  page: number = 1
): Promise<Lesson[]> {
  try {
    const params: Record<string, string | number> = { page };
    if (status) params.status = status;

    const response = await apiClient.get<Lesson[]>(
      API_ENDPOINTS.LESSONS.LIST,
      { params }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch lessons");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get lessons error:", error);
    throw error;
  }
}

/**
 * Get lesson by ID
 */
export async function getLessonById(lessonId: string): Promise<Lesson> {
  try {
    const endpoint = API_ENDPOINTS.LESSONS.DETAIL.replace(":id", lessonId);
    const response = await apiClient.get<Lesson>(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch lesson");
    }

    return response.data!;
  } catch (error) {
    console.error("Get lesson by ID error:", error);
    throw error;
  }
}

/**
 * Book a lesson with a mentor
 */
export async function bookLesson(booking: BookingRequest): Promise<Lesson> {
  try {
    const response = await apiClient.post<Lesson>(
      API_ENDPOINTS.LESSONS.CREATE,
      booking
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to book lesson");
    }

    return response.data!;
  } catch (error) {
    console.error("Book lesson error:", error);
    throw error;
  }
}

/**
 * Update lesson details
 */
export async function updateLesson(
  lessonId: string,
  data: Partial<Lesson>
): Promise<Lesson> {
  try {
    const endpoint = API_ENDPOINTS.LESSONS.UPDATE.replace(":id", lessonId);
    const response = await apiClient.put<Lesson>(endpoint, data);

    if (!response.success) {
      throw new Error(response.error || "Failed to update lesson");
    }

    return response.data!;
  } catch (error) {
    console.error("Update lesson error:", error);
    throw error;
  }
}

/**
 * Cancel a lesson
 */
export async function cancelLesson(lessonId: string, reason?: string): Promise<void> {
  try {
    const endpoint = API_ENDPOINTS.LESSONS.CANCEL.replace(":id", lessonId);
    const response = await apiClient.post(endpoint, { reason });

    if (!response.success) {
      throw new Error(response.error || "Failed to cancel lesson");
    }
  } catch (error) {
    console.error("Cancel lesson error:", error);
    throw error;
  }
}

/**
 * Get meeting link for lesson
 */
export async function getLessonMeetingLink(lessonId: string): Promise<string> {
  try {
    const endpoint = API_ENDPOINTS.LESSONS.JOIN.replace(":id", lessonId);
    const response = await apiClient.post<{ meetingLink: string }>(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to get meeting link");
    }

    return response.data?.meetingLink || "";
  } catch (error) {
    console.error("Get meeting link error:", error);
    throw error;
  }
}

/**
 * Mark lesson as completed
 */
export async function completeLesson(lessonId: string): Promise<Lesson> {
  try {
    const endpoint = API_ENDPOINTS.LESSONS.UPDATE.replace(":id", lessonId);
    const response = await apiClient.put<Lesson>(endpoint, { status: "completed" });

    if (!response.success) {
      throw new Error(response.error || "Failed to complete lesson");
    }

    return response.data!;
  } catch (error) {
    console.error("Complete lesson error:", error);
    throw error;
  }
}
