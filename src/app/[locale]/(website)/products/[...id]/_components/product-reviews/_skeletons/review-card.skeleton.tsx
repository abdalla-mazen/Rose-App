import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 shadow-sm p-4 border border-zinc-100 rounded-2xl w-[45rem]">
      {/* Heading */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full w-11 h-11" />
          <div className="flex flex-col gap-1">
            <Skeleton className="rounded w-28 h-4" />
            <Skeleton className="rounded w-20 h-3" />
          </div>
        </div>

        <div className="flex items-center gap-1 mt-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="rounded-sm w-5 h-5" />
            ))}
          </div>
          <Skeleton className="ml-2 rounded w-10 h-6" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="rounded w-48 h-4" />
        <Skeleton className="rounded w-full h-12" />
      </div>
    </div>
  );
}
