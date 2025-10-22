import React from "react";

export default function ProductsSkeletons() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-md overflow-hidden"
        >
          <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
