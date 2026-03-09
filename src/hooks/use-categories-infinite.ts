import { useInfiniteQuery } from "@tanstack/react-query";
import { filtersApi } from "@/lib/apis/filter-products.api";

export function useCategoriesInfinite(open: boolean) {
  const limit = 10;

  return useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam = 1 }) =>
      filtersApi.getCategories(pageParam, limit),
   getNextPageParam: (lastPage, pages) =>
  lastPage.metadata.hasMore ? pages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: open,
    staleTime: 5 * 60 * 1000,
    
  });
}
