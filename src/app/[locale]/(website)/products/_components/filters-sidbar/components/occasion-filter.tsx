"use client";

import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useOccasionsInfinite } from "@/hooks/use-occasions-infinite";
import { useFilters } from "@/hooks/use-filters";

export default function OccasionFilter() {
  const { currentFilters, toggleOccasion } = useFilters();
  const selected = currentFilters.occasionIds || [];

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, error } =
    useOccasionsInfinite(true);

  //  Loading  first time
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[80px]" />
        ))}
      </div>
    );
  }

  //  Error state
  if (error) {
    return (
      <p className="text-sm text-red-500 text-center py-4">
        Error loading occasions: {error.message}
      </p>
    );
  }

  // Collect all occasions
  const occasions = data?.pages?.flatMap((page) => page.items ?? []) ?? [];
  console.log("occasions array:", occasions);

  if (!occasions.length && !isFetching) {
    return <p className="text-sm text-gray-500 text-center py-4">No occasions</p>;
  }

  return (
    <InfiniteScroll
      dataLength={occasions.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      height={384}
      loader={
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-[80px]" />
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2 pr-2">
        {occasions.map((occ) => {
          const isSelected = selected.includes(occ._id);

          return (
            <Button
              key={occ._id}
              onClick={() => toggleOccasion(occ._id)}
              variant="ghost"
              className={cn(
                "relative h-[80px] w-full rounded-xl overflow-hidden p-0",
                isSelected && "ring-2 ring-red-600",
              )}
            >
              <div className=" w-full h-full">
                <Image
                  src={`https://flower.elevateegy.com/uploads/${occ.image}`}
                  alt={occ.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div
                className={cn("absolute inset-0", isSelected ? "bg-red-600/40" : "bg-black/30")}
              />

              <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-center px-1">
                {occ.name}
              </span>
            </Button>
          );
        })}
      </div>
    </InfiniteScroll>
  );
}
