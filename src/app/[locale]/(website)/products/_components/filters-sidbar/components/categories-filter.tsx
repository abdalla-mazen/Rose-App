// "use client";

// import Image from "next/image";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useTranslations } from "next-intl";
// import { useOccasionsInfinite } from "@/hooks/use-occasions-infinite";
// import { useFilters } from "@/hooks/use-filters";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { PaginationMetadata } from "@/lib/types/catregories";
// import { useCategoriesInfinite } from "@/hooks/use-categories-infinite";

// export interface CategoriesResponse {
//   message: string;
//   metadata: PaginationMetadata;
//   categories: Category[];
// }
// export default function CategoriesFilter( { categories }: { categories: CategoriesResponse} ) {
//   //Translations
//   const t = useTranslations();
//   const { currentFilters, toggleOccasion } = useFilters();
//   const selectedOccasions = currentFilters.occasionIds || [];
// const {
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
// } = useCategoriesInfinite(true);

// const categoriesArr =
//   data?.pages.flatMap((page) => page.categories) ?? [];

//   // if (isLoading) {
//   //   return (
//   //     <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
//   //       {Array.from({ length: 6 }).map((_, i) => (
//   //         <Skeleton key={i} className="bg-zinc-300 rounded-xl h-[80px]" />
//   //       ))}
//   //     </div>
//   //   );
//   // }

//   // // Error
//   // if (error) {
//   //   return (
//   //     <div className="text-sm text-red-600 py-4 text-center">
//   //       {t("errorLoading")}
//   //     </div>
//   //   );
//   // }

//   // Empty
//   if (!categoriesArr.length) {
//     return (
//       <div className="text-sm text-gray-500 py-4 text-center">
//         {t("noOccasions")}
//       </div>
//     );
//   }

//   // UI with InfiniteScroll library
//   return (
//     <div
//       className={cn(
//         "h-96 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]"
//       )}
//       id="occasions-scroll-container"
//     >
//       <InfiniteScroll
//       dataLength={categoriesArr.length}
//         next={fetchNextPage}
//         hasMore={!!hasNextPage}
//         loader={
//           <div className="grid grid-cols-2 gap-2 mt-2">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <Skeleton key={i} className="h-[80px] rounded-xl bg-zinc-300" />
//             ))}
//           </div>
//         }
//         scrollableTarget="occasions-scroll-container"
//       >
//         {/* Grid of occasion cards */}
//         <div className="grid grid-cols-2 gap-2 pr-2">
//           {categoriesArr.map((cat) => {
//             const isSelected = selectedOccasions.includes(cat._id);
//             return (
//               <Button
//                 key={cat._id}
//                 onClick={() => toggleOccasion(cat._id)}
//                 variant="ghost"
//                 className={cn(
//                   "relative h-[80px] w-full rounded-xl overflow-hidden group transition-all p-0",
//                   isSelected ? "ring-2 ring-red-600" : "",
//                 )}
//               >
//                 {/* Occasion image */}
//                 <Image
//                   src={cat.image}
//                   alt={cat.name}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   sizes="(max-width: 768px) 50vw, 200px"
//                 />

//                 {/* Overlay effect */}
//                 <div
//                   className={cn(
//                     "absolute inset-0 transition-colors",
//                     isSelected ? "bg-red-600/40" : "bg-black/30 group-hover:bg-black/40"
//                   )}
//                 />

//                 {/* Occasion name label */}
//                 <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-center px-1">
//                   {cat.name}
//                 </span>
//               </Button>
//             );
//           })}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCategoriesInfinite } from "@/hooks/use-categories-infinite";
import { useFilters } from "@/hooks/use-filters";

export default function CategoriesFilter() {
  const { currentFilters, toggleCategory } = useFilters();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCategoriesInfinite(true);

  const categories =
    data?.pages.flatMap((page) => page.categories) ?? [];

  if (!categories.length) {
    return (
      <p className="text-sm text-gray-500 text-center py-4">
        No categories
      </p>
    );
  }



  return (
    <div
      id="categories-scroll"
      className="h-96 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]"
    >
      <InfiniteScroll
        dataLength={categories.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="categories-scroll"
        loader={
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[80px] rounded-xl bg-zinc-300"
              />
            ))}
          </div>
        }
      >
        <div className="   pr-2">
          {categories.map((cat) => {
            const isSelected =
              currentFilters.categoryIds?.includes(cat._id);

            return (
         <Button
  key={cat._id}
  onClick={() => toggleCategory(cat._id)}
  variant="ghost"
  className={cn(
    "w-full flex items-center gap-3  py-2 my-2 rounded-xl justify-between px-0 transition",
    isSelected
      ? "bg-red-50"
      : "bg-zinc-200 hover:bg-zinc-300"
  )}
>
  {/* Image */}
  <div
    className={cn(
      "relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0",
      isSelected ? "bg-red-600" : "bg-zinc-500"
    )}
  >
    <Image
      src={cat.image}
      alt={cat.name}
      fill
      className="object-contain p-1 invert brightness-0"
      sizes="40px"
    />
  </div>

  {/* Name */}
  <span
    className={cn(
      "text-sm font-medium",
      isSelected ? "text-red-600" : "text-zinc-800"
    )}
  >
    {cat.name}
  </span>
</Button>


            );
          })}
        </div>

        {isFetchingNextPage && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[80px] rounded-xl bg-zinc-300"
              />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
