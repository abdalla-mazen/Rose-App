"use client";

import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useCallback } from "react";
import { filtersApi } from "@/lib/apis/filter-products.api";
import { useFilters } from "@/hooks/use-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function OccasionFilter() {
  const t = useTranslations();
  const { currentFilters, toggleOccasion } = useFilters();
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["occasions"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await filtersApi.getFilters();
      // Simulate pagination
      const pageSize = 10;
      const start = (pageParam - 1) * pageSize;
      const end = start + pageSize;
      const occasions = response.filters.occasions.slice(start, end);
      
      return {
        occasions,
        nextPage: end < response.filters.occasions.length ? pageParam + 1 : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  const selectedOccasions = currentFilters.occasionIds || [];

  if (isLoading) {
    return (
       <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[80px] rounded-xl bg-zinc-300"
        />
      ))}
    </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600 py-4">
        {t("errorLoading")}
      </div>
    );
  }

  // Flatten all pages
  const allOccasions = data?.pages.flatMap((page) => page.occasions) || [];

  if (allOccasions.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-4">
        {t("noOccasions")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {allOccasions.map((occ) => {
          const isSelected = selectedOccasions.includes(occ._id);

          return (
            <button
              key={occ._id}
              onClick={() => toggleOccasion(occ._id)}
              className={`relative h-[80px] rounded-xl m-1 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all ${
                isSelected ? "ring-2 ring-red-600" : ""
              }`}
              aria-pressed={isSelected}
              aria-label={`${occ.name} ${
                isSelected
                  ? t("selected", { default: "selected" })
                  : t("notSelected", { default: "not selected" })
              }`}
            >
              {/* img */}
              <Image
                src={occ.image}
                alt={occ.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 200px"
              />
              {/* overlay */}
              <div
                className={`absolute inset-0 transition-colors ${
                  isSelected
                    ? "bg-red-600/40"
                    : "bg-black/30 group-hover:bg-black/40"
                }`}
              ></div>
              {/* title */}
             <span className="absolute inset-0 flex items-center justify-center text-white text-md font-medium drop-shadow-md text-center px-2">
                {occ.name}
              </span>
            </button>
          );
        })}
      </div>
  );
}