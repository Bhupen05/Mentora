/**
 * Mentor Service
 * Handles mentor-related API calls
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { Mentor, TimeSlot, PaginatedResponse } from "../shared/types";

/**
 * Get list of all mentors with pagination
 */
export async function getMentors(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Mentor>> {
  try {
    const response = await apiClient.get<PaginatedResponse<Mentor>>(
      API_ENDPOINTS.MENTORS.LIST,
      {
        params: { page, pageSize },
      }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch mentors");
    }

    return response.data!;
  } catch (error) {
    console.error("Get mentors error:", error);
    throw error;
  }
}

/**
 * Get mentor by ID
 */
export async function getMentorById(mentorId: string): Promise<Mentor> {
  try {
    const endpoint = API_ENDPOINTS.MENTORS.DETAIL.replace(":id", mentorId);
    const response = await apiClient.get<Mentor>(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch mentor");
    }

    return response.data!;
  } catch (error) {
    console.error("Get mentor by ID error:", error);
    throw error;
  }
}

/**
 * Search mentors by query (name, specialty, etc.)
 */
export async function searchMentors(
  query: string,
  filters?: {
    specialty?: string;
    minRating?: number;
    maxPrice?: number;
  }
): Promise<Mentor[]> {
  try {
    const params: Record<string, string | number> = { q: query };

    if (filters?.specialty) params.specialty = filters.specialty;
    if (filters?.minRating) params.minRating = filters.minRating;
    if (filters?.maxPrice) params.maxPrice = filters.maxPrice;

    const response = await apiClient.get<Mentor[]>(
      API_ENDPOINTS.MENTORS.SEARCH,
      { params }
    );

    if (!response.success) {
      throw new Error(response.error || "Search failed");
    }

    return response.data || [];
  } catch (error) {
    console.error("Search mentors error:", error);
    throw error;
  }
}

/**
 * Get mentor's availability schedule
 */
export async function getMentorAvailability(mentorId: string): Promise<TimeSlot[]> {
  try {
    const endpoint = API_ENDPOINTS.MENTORS.AVAILABILITY.replace(":id", mentorId);
    const response = await apiClient.get<TimeSlot[]>(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch availability");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get mentor availability error:", error);
    throw error;
  }
}

/**
 * Create a new mentor profile (for mentor users)
 */
export async function createMentorProfile(data: Partial<Mentor>): Promise<Mentor> {
  try {
    const response = await apiClient.post<Mentor>(
      API_ENDPOINTS.MENTORS.CREATE,
      data
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to create mentor profile");
    }

    return response.data!;
  } catch (error) {
    console.error("Create mentor profile error:", error);
    throw error;
  }
}

/**
 * Update mentor profile
 */
export async function updateMentorProfile(
  mentorId: string,
  data: Partial<Mentor>
): Promise<Mentor> {
  try {
    const endpoint = API_ENDPOINTS.MENTORS.UPDATE.replace(":id", mentorId);
    const response = await apiClient.put<Mentor>(endpoint, data);

    if (!response.success) {
      throw new Error(response.error || "Failed to update mentor profile");
    }

    return response.data!;
  } catch (error) {
    console.error("Update mentor profile error:", error);
    throw error;
  }
}

/**
 * Update mentor availability
 */
export async function updateMentorAvailability(
  mentorId: string,
  availability: TimeSlot[]
): Promise<void> {
  try {
    const endpoint = API_ENDPOINTS.MENTORS.AVAILABILITY.replace(":id", mentorId);
    const response = await apiClient.post(endpoint, { availability });

    if (!response.success) {
      throw new Error(response.error || "Failed to update availability");
    }
  } catch (error) {
    console.error("Update availability error:", error);
    throw error;
  }
}

/**
 * Delete mentor profile
 */
export async function deleteMentorProfile(mentorId: string): Promise<void> {
  try {
    const endpoint = API_ENDPOINTS.MENTORS.DELETE.replace(":id", mentorId);
    const response = await apiClient.delete(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to delete mentor profile");
    }
  } catch (error) {
    console.error("Delete mentor profile error:", error);
    throw error;
  }
}
