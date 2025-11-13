
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemContent } from "@/components/ui/item";

export function AddressSkeleton() {
  return (
    <div className="flex w-2/3  flex-col gap-4  ">
      {[1, 2, 3].map((i) => (
        <Item
          key={i}
          variant="outline"
          className="flex-col items-start gap-2 py-3.5 px-4"
        >
          <ItemContent className="w-full">
            <div className="flex justify-between items-center">
              {/* city skeleton */}
              <Skeleton className="h-6 w-32 rounded-md" />

              <div className="flex items-center gap-2">
                {/* phone icon circle */}
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>

            {/* street skeleton */}
            <Skeleton className="h-5 w-40 rounded-full mt-3" />
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}