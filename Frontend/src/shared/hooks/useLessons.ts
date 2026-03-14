/**
 * useLessons Hook
 * Fetch and manage lesson data
 */

import { useState, useEffect } from "react";
import { getLessons } from "../../services/lessonService";
import type { Lesson } from "../../shared/types";

interface useLessonsOptions {
  status?: string;
  page?: number;
}

export function useLessons(options: useLessonsOptions = {}) {
  const { status, page = 1 } = options;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const result = await getLessons(status, page);
        setLessons(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch lessons"));
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [status, page]);

  return { lessons, loading, error };
}
