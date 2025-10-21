"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import { filtersApi } from "@/lib/apis/filter-products.api";
import { useDebounce } from "@/hooks/use-debounce";
import { PriceFilterFormData, priceFilterSchema } from "@/lib/schemas/price-schema";

export default function PriceFilter() {
  const t = useTranslations("filters");
  const { currentFilters, updateFilters } = useFilters();

  const { data, isLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: filtersApi.getFilters,
    staleTime: 5 * 60 * 1000,
  });

  const priceRange = data?.filters.priceRange;

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

  // Debounce price changes to avoid excessive URL updates
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  // Sync form with URL on mount and URL changes
  useEffect(() => {
    setValue("minPrice", currentFilters.minPrice || "");
    setValue("maxPrice", currentFilters.maxPrice || "");
  }, [currentFilters.minPrice, currentFilters.maxPrice, setValue]);

  // Update URL when debounced values change
  useEffect(() => {
    const minVal =
      typeof debouncedMinPrice === "number" ? debouncedMinPrice : undefined;
    const maxVal =
      typeof debouncedMaxPrice === "number" ? debouncedMaxPrice : undefined;

    // Only update if values actually changed
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header with range info and reset */}


      {/* Price inputs */}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            placeholder={t("from", { default: "From" })}
            {...register("minPrice", { valueAsNumber: true })}
            min={priceRange?.min}
            max={priceRange?.max}
            className={`border rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.minPrice
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-red-200"
            }`}
            aria-label={t("minimumPrice", { default: "Minimum price" })}
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

        <div className="flex-1">
          <input
            type="number"
            placeholder={t("to", { default: "To" })}
            {...register("maxPrice", { valueAsNumber: true })}
            min={priceRange?.min}
            max={priceRange?.max}
            className={`border rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.maxPrice
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-red-200"
            }`}
            aria-label={t("maximumPrice", { default: "Maximum price" })}
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