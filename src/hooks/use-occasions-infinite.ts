// hooks/use-occasions-infinite.ts
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { filtersApi } from "@/lib/apis/filter-products.api";

export function useOccasionsInfinite(open: boolean) {
  const pageSize = 10;

  const query = useInfiniteQuery({
    queryKey: ["occasions"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await filtersApi.getFilters();
      const allOccasions = response.filters.occasions;

      // simulate pagination
      const start = (pageParam - 1) * pageSize;
      const end = start + pageSize;
      const occasions = allOccasions.slice(start, end);

      return {
        occasions,
        meta: {
          currentPage: pageParam,
          totalPages: Math.ceil(allOccasions.length / pageSize),
        },
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage >= lastPage.meta.totalPages) return undefined;
      return lastPage.meta.currentPage + 1;
    },
    initialPageParam: 1,
    enabled: open, // fetch only when open = true
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    occasionsPages: query.data,
  };
}
