/**
 * useMentors Hook
 * Fetch and manage mentor data
 */

import { useState, useEffect } from "react";
import { getMentors, searchMentors } from "../../services/mentorService";
import type { Mentor } from "../../shared/types";

interface UseMentorsOptions {
  page?: number;
  pageSize?: number;
}

export function useMentors(options: UseMentorsOptions = {}) {
  const { page = 1, pageSize = 10 } = options;
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const result = await getMentors(currentPage, pageSize);
        setMentors(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch mentors"));
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [currentPage, pageSize]);

  const search = async (query: string, filters?: any) => {
    try {
      setLoading(true);
      const results = await searchMentors(query, filters);
      setMentors(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Search failed"));
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    mentors,
    loading,
    error,
    totalPages,
    currentPage,
    search,
    goToPage,
  };
}
