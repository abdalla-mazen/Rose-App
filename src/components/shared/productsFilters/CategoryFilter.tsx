"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { useCategoriesInfinite } from "@/hooks/use-categories-Infinite";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { CategorySkeletonList } from "@/components/skeletons/category.skeleton";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function CategoryFilter() {
  //Translation
  const t = useTranslations();
  // Form Context
  const { watch, setValue } = useFormContext();
  //State
  const selectedCategory = watch("category");
  //Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCategoriesInfinite();
  //Ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  //scroll event
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 50;
      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <CategorySkeletonList />;

  const categories = data?.pages.flatMap((page) => page.categories) ?? [];

  return (
    <div className="gap-2 dark:bg-zinc-700 pt-2 pb-5 border-zinc-100 border-b w-full capitalize">
      {/* title */}
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold dark:text-zinc-50 text-lg">
          {t("category")}
        </h4>
        {selectedCategory && (
          <button
            type="button"
            onClick={() => setValue("category", "")}
            className="flex text-red-600 dark:text-red-500 text-sm"
          >
            <X />
            {t("reset")}
          </button>
        )}
      </div>

      {/* category  */}
      <div
        ref={containerRef}
        className={cn(
          "p-2 max-h-64 overflow-y-auto scroll-smooth no-scrollbar"
        )}
      >
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setValue("category", cat._id)}
              type="button"
              className={cn(
                "flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 py-2 border rounded-sm w-full h-7 overflow-hidden dark:text-white capitalize transition-all duration-200",
                selectedCategory === cat._id
                  ? "bg-maroon-50 text-primary dark:bg-softPink-100 dark:text-zinc-800"
                  : " hover:bg-zinc-300 dark:hover:bg-zinc-600 text-foreground"
              )}
            >
              {/* category icon */}
              {/* the base icon color is fixed */}
              <div
                className={cn(
                  "relative flex flex-shrink-0 justify-center items-center bg-zinc-500 w-8 h-8",
                  selectedCategory === cat._id
                    ? "bg-maroon-600 text-white dark:bg-softPink-300"
                    : "bg-zinc-500 dark:hover:bg-zinc-500"
                )}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-sm">{t(cat.name)}</span>
            </button>
          ))}

          {/* Skeleton */}
          {isFetchingNextPage && (
            <div className="mt-3">
              <CategorySkeletonList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
