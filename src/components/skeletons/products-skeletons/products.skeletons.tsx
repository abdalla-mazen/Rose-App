import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProductsSkeletons() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-md overflow-hidden"
        >
          <Skeleton className="h-56 w-full rounded-xl" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
