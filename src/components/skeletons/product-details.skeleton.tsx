import React from "react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="flex gap-16 mx-auto mt-5 max-w-7xl h-[523px] animate-pulse">
      {/* Left Side – Gallery Skeleton */}
      <div>
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-[605px] h-[401px]" />
        <div className="flex justify-center items-center gap-2.5 mt-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-[91px] h-[111px]"
            />
          ))}
        </div>
      </div>

      {/* Right Side – Details Skeleton */}
      <div className="space-y-4 w-[605px] h-[523px]">
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded w-2/3 h-8" />{" "}
        {/* title */}
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 h-6" />{" "}
        {/* price */}
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded w-1/4 h-5" />{" "}
        {/* stock */}
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded w-1/5 h-5" />{" "}
        {/* rating */}
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded w-full h-[307px]" />{" "}
        {/* description */}
        <div className="flex gap-3">
          <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full w-11 h-11" />
          <div className="bg-zinc-200 dark:bg-zinc-700 rounded w-32 h-11" />
        </div>
      </div>
    </div>
  );
}
