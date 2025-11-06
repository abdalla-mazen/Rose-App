import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AddressItemSkeleton() {
  return (
    <Skeleton className="relative pt-6 pr-9 pb-5 pl-4 border border-zinc-300 hover:border-maroon-600 rounded-lg w-full min-h-32">
      <div>
        <Skeleton className="-top-5 absolute bg-white px-2 font-semibold text-maroon-600 text-2xl capitalize" />

        <div className="flex justify-between items-center">
          {/* Map pin */}
          <div className="flex justify-between items-center gap-1.5">
            <Skeleton className="flex justify-center items-center bg-emerald-500 rounded-full w-8 h-8 text-white"></Skeleton>
            <Skeleton className="bg-zinc-500 font-semibold text-zinc-800 text-2xl" />
          </div>

          {/* Phone number */}
          <div className="flex justify-between items-center bg-zinc-500">
            <Skeleton className="bg-zinc-500 mr-1 w-5 h-5 text-zinc-800" />
            <Skeleton className="bg-zinc-500 font-medium text-zinc-600 text-lg" />
          </div>
        </div>

        <Skeleton className="bg-zinc-500 mt-5 px-3 py-1 rounded-full w-20 max-w-full font-medium text-zinc-800 text-base" />

        {/* Edit and delete buttons */}
        <div className="top-5 -right-4 absolute flex flex-col items-center gap-4">
          <Skeleton className="flex justify-center items-center bg-zinc-50 border border-zinc-400 rounded-full w-9 h-9 cursor-pointer">
            <Skeleton className="w-4 h-4" />
          </Skeleton>

          <Skeleton className="flex justify-center items-center bg-red-600 rounded-full w-9 h-9 text-white cursor-pointer">
            <span className="w-4 h-4" />
          </Skeleton>
        </div>
      </div>
    </Skeleton>
  );
}
