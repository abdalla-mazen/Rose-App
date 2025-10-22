"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import { filtersApi } from "@/lib/apis/filter-products.api";
import { useDebounce } from "@/hooks/use-debounce";
import {
  PriceFilterFormData,
  priceFilterSchema,
} from "@/lib/schemas/price-schema";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function PriceFilter() {
  // Setup translations and filter state
  const t = useTranslations("filters");
  const { currentFilters, updateFilters } = useFilters();

  // Fetch price range data
  const { data, isLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: filtersApi.getFilters,
    staleTime: 5 * 60 * 1000,
  });

  const priceRange = data?.filters.priceRange;

  // Validation with Zod
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

  // Debounce input changes
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  // Sync form values with current filters
  useEffect(() => {
    setValue("minPrice", currentFilters.minPrice || "");
    setValue("maxPrice", currentFilters.maxPrice || "");
  }, [currentFilters.minPrice, currentFilters.maxPrice, setValue]);

  // Update filters when user stops typing
  useEffect(() => {
    const minVal =
      typeof debouncedMinPrice === "number" ? debouncedMinPrice : undefined;
    const maxVal =
      typeof debouncedMaxPrice === "number" ? debouncedMaxPrice : undefined;

    if (
      minVal !== currentFilters.minPrice ||
      maxVal !== currentFilters.maxPrice
    ) {
      updateFilters({
        minPrice: minVal,
        maxPrice: maxVal,
      });
    }
  }, [debouncedMinPrice, debouncedMaxPrice]);

  // Loading state (Skeleton)
  if (isLoading) {
    return (
      <div className="flex gap-2 w-full">
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    );
  }

  // Price input fields
  return (
    <div className="flex flex-col gap-3">
      {/* Reset Button */}
      {(currentFilters.minPrice || currentFilters.maxPrice) && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setValue("minPrice", "");
              setValue("maxPrice", "");
              updateFilters({ minPrice: undefined, maxPrice: undefined });
            }}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            {t("Reset")}
          </button>
        </div>
      )}

      <div className="flex gap-2">
        {/* Min price input */}
        <div className="flex-1">
          <Input
            type="number"
            placeholder={t("from", { default: "From" })}
            {...register("minPrice", { valueAsNumber: true })}
            min={priceRange?.min}
            max={priceRange?.max}
            className={cn(
              "border rounded-lg w-full px-2 py-1 text-sm focus:outline-none focus:ring-2 transition-all",
              errors.minPrice
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-red-200"
            )}
            aria-label={t("minimumPrice")}
            aria-invalid={!!errors.minPrice}
            aria-describedby={errors.minPrice ? "min-price-error" : undefined}
          />
          {errors.minPrice && (
            <p
              id="min-price-error"
              className="text-xs text-red-600 mt-1"
              role="alert"
            >
              {errors.minPrice.message}
            </p>
          )}
        </div>

        {/* Max price input */}
        <div className="flex-1">
          <Input
            type="number"
            placeholder={t("to", { default: "To" })}
            {...register("maxPrice", { valueAsNumber: true })}
            min={priceRange?.min}
            max={priceRange?.max}
            className={cn(
              "border rounded-lg w-full px-2 py-1 text-sm focus:outline-none focus:ring-2 transition-all",
              errors.maxPrice
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-red-200"
            )}
            aria-label={t("maximumPrice")}
            aria-invalid={!!errors.maxPrice}
            aria-describedby={errors.maxPrice ? "max-price-error" : undefined}
          />
          {errors.maxPrice && (
            <p
              id="max-price-error"
              className="text-xs text-red-600 mt-1"
              role="alert"
            >
              {errors.maxPrice.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
