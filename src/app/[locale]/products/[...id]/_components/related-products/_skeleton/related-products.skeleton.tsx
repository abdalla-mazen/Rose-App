import React from "react";

export default function RelatedProductsSkeleton() {
  return (
    <div className="gap-4 grid grid-cols-4 mx-auto mt-6 w-8/12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="bg-gray-200 dark:bg-gray-700 h-56"></div>
          <div className="space-y-3 p-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded w-3/4 h-4"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded w-1/2 h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
