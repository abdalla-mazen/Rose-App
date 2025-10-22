"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "@/lib/apis/categories.api";
export function useCategoriesInfinite() {
  return useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getCategoriesApi(pageParam);
      return res;
    },
    getNextPageParam: (lastPage) => {
      const nextPage =
        lastPage.metadata.currentPage < lastPage.metadata.totalPages
          ? lastPage.metadata.currentPage + 1
          : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });
}
