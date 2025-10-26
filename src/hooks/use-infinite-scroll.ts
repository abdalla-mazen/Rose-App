"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteScrollQuery<T>({
  queryKey,
  url,
  limit = 10,
}: {
  queryKey: string[];
  url: string;
  limit?: number;
}) {
  return useInfiniteQuery<PaginatedResponse<T>>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`${url}?page=${pageParam}&limit=${limit}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage?.metadata?.currentPage + 1;
      return nextPage <= lastPage?.metadata?.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
}
