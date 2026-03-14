/**
 * Pagination Hook
 * Handle pagination logic
 */

import { useState, useCallback } from "react";

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function usePagination(initialPageSize: number = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.totalPages),
    }));
  }, []);

  const previousPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPagination((prev) => ({ ...prev, pageSize: size, page: 1 }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setPagination((prev) => ({
      ...prev,
      total,
      totalPages: Math.ceil(total / prev.pageSize),
    }));
  }, []);

  const reset = useCallback(() => {
    setPagination({
      page: 1,
      pageSize: initialPageSize,
      total: 0,
      totalPages: 0,
    });
  }, [initialPageSize]);

  return {
    ...pagination,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    setTotal,
    reset,
  };
}
