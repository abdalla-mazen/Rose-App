"use client";

import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { filtersApi } from "@/lib/apis/filter-products.api";
import { useFilters } from "@/hooks/use-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function OccasionFilter() {
  const t = useTranslations();
  const { currentFilters, toggleOccasion } = useFilters();

  // Fetch occasions
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["occasions"],
    queryFn: async ({ pageParam = 1 }) => {
      // Get all filters
      const response = await filtersApi.getFilters();
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
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const selectedOccasions = currentFilters.occasionIds || [];
  const allOccasions = data?.pages.flatMap((page) => page.occasions) || [];

  // Loading (Skeleton)
  if (isLoading) {
    return (
      <div className="gap-2 grid grid-cols-2 pr-2 max-h-[400px] overflow-y-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="bg-zinc-300 rounded-xl h-[80px]" />
        ))}
      </div>
    );
  }

  // Error UI state
  if (error) {
    return <div className="py-4 text-red-600 text-sm">{t("errorLoading")}</div>;
  }

  if (allOccasions.length === 0) {
    return <div className="py-4 text-gray-500 text-sm">{t("noOccasions")}</div>;
  }

  return (
    //  Infinite scroll component
    <InfiniteScroll
      dataLength={allOccasions.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="flex flex-col gap-2 col-span-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="bg-zinc-300 rounded-xl w-full h-[80px]" />
          ))}
        </div>
      }
      height={400}
      className="[&::-webkit-scrollbar]:hidden gap-2 grid grid-cols-2 pr-2 [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* Render all loaded occasions */}
      {allOccasions.map((occ) => {
        const isSelected = selectedOccasions.includes(occ._id);

        return (
          <button
            key={occ._id}
            onClick={() => toggleOccasion(occ._id)}
            className={`relative h-[80px] rounded-xl overflow-hidden group transition-all ${
              isSelected ? "ring-2 ring-red-600" : ""
            }`}
          >
            {/* Occasion image */}
            <Image
              src={occ.image}
              alt={occ.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 200px"
            />
            {/* Overlay to show selected state */}
            <div
              className={`absolute inset-0 ${
                isSelected ? "bg-red-600/40" : "bg-black/30 group-hover:bg-black/40"
              } transition-colors`}
            />
            {/* Occasion name */}
            <span className="absolute inset-0 flex justify-center items-center px-1 font-medium text-white text-center">
              {occ.name}
            </span>
          </button>
        );
      })}
    </InfiniteScroll>
  );
}
