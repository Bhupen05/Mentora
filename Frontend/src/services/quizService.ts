/**
 * Quiz Service
 * Handles quiz and assessment operations
 */

import { apiClient } from "./api";
import { API_ENDPOINTS } from "../shared/constants";
import type { Quiz, QuizAttempt, QuizQuestion } from "../shared/types";

/**
 * Get available quizzes
 */
export async function getQuizzes(page: number = 1): Promise<Quiz[]> {
  try {
    const response = await apiClient.get<Quiz[]>(
      API_ENDPOINTS.QUIZZES.LIST,
      { params: { page } }
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch quizzes");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get quizzes error:", error);
    throw error;
  }
}

/**
 * Get quiz by ID
 */
export async function getQuizById(quizId: string): Promise<Quiz> {
  try {
    const endpoint = API_ENDPOINTS.QUIZZES.DETAIL.replace(":id", quizId);
    const response = await apiClient.get<Quiz>(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch quiz");
    }

    return response.data!;
  } catch (error) {
    console.error("Get quiz by ID error:", error);
    throw error;
  }
}

/**
 * Submit quiz answers and get score
 */
export async function submitQuiz(
  quizId: string,
  answers: number[]
): Promise<QuizAttempt> {
  try {
    const endpoint = API_ENDPOINTS.QUIZZES.SUBMIT.replace(":id", quizId);
    const response = await apiClient.post<QuizAttempt>(endpoint, { answers });

    if (!response.success) {
      throw new Error(response.error || "Failed to submit quiz");
    }

    return response.data!;
  } catch (error) {
    console.error("Submit quiz error:", error);
    throw error;
  }
}

/**
 * Get quiz results
 */
export async function getQuizResults(
  quizId: string,
  attemptId: string
): Promise<QuizAttempt> {
  try {
    const endpoint = API_ENDPOINTS.QUIZZES.RESULTS
      .replace(":id", quizId)
      .replace(":attemptId", attemptId);
    const response = await apiClient.get<QuizAttempt>(endpoint);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch quiz results");
    }

    return response.data!;
  } catch (error) {
    console.error("Get quiz results error:", error);
    throw error;
  }
}

/**
 * Get user's quiz attempts history
 */
export async function getQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
  try {
    const response = await apiClient.get<QuizAttempt[]>(
      `${API_ENDPOINTS.QUIZZES.LIST}/${quizId}/attempts`
    );

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch attempts");
    }

    return response.data || [];
  } catch (error) {
    console.error("Get quiz attempts error:", error);
    throw error;
  }
}

/**
 * Get best quiz attempt score
 */
export async function getBestQuizScore(quizId: string): Promise<number> {
  try {
    const attempts = await getQuizAttempts(quizId);
    if (attempts.length === 0) return 0;

    const bestScore = Math.max(...attempts.map(a => a.score));
    return bestScore;
  } catch (error) {
    console.error("Get best quiz score error:", error);
    throw error;
  }
}
