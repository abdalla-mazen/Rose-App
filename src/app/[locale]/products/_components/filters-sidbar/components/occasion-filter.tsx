"use client";

import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";
import { useOccasionsInfinite } from "@/hooks/use-occasions-infinite";
import { useFilters } from "@/hooks/use-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function OccasionFilter() {
  //Translations
  const t = useTranslations();
  const { currentFilters, toggleOccasion } = useFilters();
  const selectedOccasions = currentFilters.occasionIds || [];

  // Fetch occasions with infinite scroll  
  const {
    occasionsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useOccasionsInfinite(true);

  const allOccasions = occasionsPages?.pages.flatMap((p) => p.occasions) || [];

  // Loading (Skeleton)
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[80px] rounded-xl bg-zinc-300" />
        ))}
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-sm text-red-600 py-4 text-center">
        {t("errorLoading")}
      </div>
    );
  }

  // Empty
  if (!allOccasions.length) {
    return (
      <div className="text-sm text-gray-500 py-4 text-center">
        {t("noOccasions")}
      </div>
    );
  }

  // UI with InfiniteScroll library
  return (
    <div
      className={cn(
        "h-96 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]"
      )}
      id="occasions-scroll-container"
    >
      <InfiniteScroll
        dataLength={allOccasions.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-[80px] rounded-xl bg-zinc-300" />
            ))}
          </div>
        }
        scrollableTarget="occasions-scroll-container"
      >
        {/* Grid of occasion cards */}
        <div className="grid grid-cols-2 gap-2 pr-2">
          {allOccasions.map((occ) => {
            const isSelected = selectedOccasions.includes(occ._id);
            return (
              <button
                key={occ._id}
                onClick={() => toggleOccasion(occ._id)}
                className={`relative h-[80px] rounded-xl overflow-hidden group transition-all ${isSelected ? "ring-2 ring-red-600" : ""
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
                {/* Overlay effect (red if selected) */}
                <div
                  className={`absolute inset-0 ${isSelected
                    ? "bg-red-600/40"
                    : "bg-black/30 group-hover:bg-black/40"
                    } transition-colors`}
                />
                {/* Occasion name label */}
                <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-center px-1">
                  {occ.name}
                </span>
              </button>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
