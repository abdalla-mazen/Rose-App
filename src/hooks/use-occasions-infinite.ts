"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { filtersApi } from "@/lib/apis/filter-products.api";

export function useOccasionsInfinite(open: boolean) {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: ["occasions"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await filtersApi.getFilters();

      // Handle different response structures
      const all = res?.filters?.occasions || res?.occasions || [];

      if (!Array.isArray(all)) {
        console.error("Occasions is not an array:", all);
        throw new Error("Invalid API response: occasions is not an array");
      }

      const start = (pageParam - 1) * limit;
      const end = start + limit;
      const items = all.slice(start, end);

      const result = {
        items,
        nextPage: end < all.length ? pageParam + 1 : undefined,
      };

      return result;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: open,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
