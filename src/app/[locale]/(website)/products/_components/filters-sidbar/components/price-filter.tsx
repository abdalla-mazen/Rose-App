"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import { filtersApi } from "@/lib/apis/filter-products.api";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSection from "../filter-section";
import { PriceFilterFormData, priceFilterSchema } from "@/lib/schemas/price.schema";

export default function PriceFilter() {
  const t = useTranslations("filters");
  const { currentFilters, updateFilters } = useFilters();

  // Fetch price range from API
  const { data, isLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: filtersApi.getFilters,
    staleTime: 5 * 60 * 1000,
  });

  const priceRange = data?.filters.priceRange;

  // Form setup with Zod validation
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<PriceFilterFormData>({
    resolver: zodResolver(priceFilterSchema),
    defaultValues: {
      minPrice: currentFilters.minPrice || "",
      maxPrice: currentFilters.maxPrice || "",
    },
    mode: "onChange",
  });

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  // Debounce inputs
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  // Sync form values with current filters
  useEffect(() => {
    setValue("minPrice", currentFilters.minPrice || "");
    setValue("maxPrice", currentFilters.maxPrice || "");
  }, [currentFilters.minPrice, currentFilters.maxPrice, setValue]);

  // Update filters after debounce
  useEffect(() => {
    const minVal = typeof debouncedMinPrice === "number" ? debouncedMinPrice : undefined;
    const maxVal = typeof debouncedMaxPrice === "number" ? debouncedMaxPrice : undefined;

    if (minVal !== currentFilters.minPrice || maxVal !== currentFilters.maxPrice) {
      updateFilters({ minPrice: minVal, maxPrice: maxVal });
    }
  }, [debouncedMinPrice, debouncedMaxPrice]);

  // Loading skeleton
  if (isLoading) {
    return (
      <FilterSection title="">
        <div className="flex gap-2 w-full">
          <Skeleton className="rounded-lg w-full h-9" />
          <Skeleton className="rounded-lg w-full h-9" />
        </div>
      </FilterSection>
    );
  }

  // Price inputs
  return (
    <FilterSection
      title="" // Hide title
      hasActiveFilters={!!(currentFilters.minPrice || currentFilters.maxPrice)}
      onReset={() => {
        setValue("minPrice", "");
        setValue("maxPrice", "");
        updateFilters({ minPrice: undefined, maxPrice: undefined });
      }}
    >
      <div className="flex gap-2">
        {/* Min price input */}
        <div className="flex-1">
          <Input
            type="number"
            {...register("minPrice", { valueAsNumber: true })}
            min={priceRange?.min}
            max={priceRange?.max}
            className={cn(
              "px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 w-full text-sm transition-all",
              errors.minPrice
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-red-200",
            )}
          />
          {errors.minPrice && (
            <p className="mt-1 text-red-600 text-xs" role="alert">
              {errors.minPrice.message}
            </p>
          )}
        </div>

        {/* Max price input */}
        <div className="flex-1">
          <Input
            type="number"
            {...register("maxPrice", { valueAsNumber: true })}
            min={priceRange?.min}
            max={priceRange?.max}
            className={cn(
              "px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 w-full text-sm transition-all",
              errors.maxPrice
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-red-200",
            )}
          />
          {errors.maxPrice && (
            <p className="mt-1 text-red-600 text-xs" role="alert">
              {errors.maxPrice.message}
            </p>
          )}
        </div>
      </div>
    </FilterSection>
  );
}
