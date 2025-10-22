"use client";

export function CategorySkeletonList() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-muted rounded-xl w-full h-12 animate-pulse"
        />
      ))}
    </div>
  );
}
