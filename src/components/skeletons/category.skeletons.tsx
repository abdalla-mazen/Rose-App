import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeletonCard() {
  return (
    <Card
      className="
        relative mx-auto w-full max-w-sm overflow-hidden
        border
        animate-pulse
      "
    >
      {/* Neon glow fake */}
      <div
        className="
          pointer-events-none absolute inset-0
          shadow-[0_0_20px_rgba(244,63,94,0.25)]
        "
      />

      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full rounded-none" />

      <CardHeader>
        <CardTitle className="flex justify-center">
          <Skeleton className="h-5 w-1/2" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

