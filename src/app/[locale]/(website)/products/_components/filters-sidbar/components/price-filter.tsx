"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFilters } from "@/hooks/use-filters";
import { filtersApi } from "@/lib/apis/filter-products.api";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSection from "../filter-section";
import { Slider } from "@/components/ui/slider";


export default function PriceFilter() {
  const { currentFilters, updateFilters } = useFilters();

  // 🔹 Fetch price range
  const { data, isLoading } = useQuery({
    queryKey: ["filters"],
    queryFn: () => filtersApi.getFilters(),
    staleTime: 5 * 60 * 1000,
  });

  const priceRange = data?.filters?.priceRange;
  const min = priceRange?.min ?? 0;
  const max = priceRange?.max ?? 1000;

  //  Slider state
  const [value, setValue] = useState<[number, number]>([
    currentFilters.minPrice ?? min,
    currentFilters.maxPrice ?? max,
  ]);

  //  Debounce slider
  const debouncedValue = useDebounce(value, 500);

  //  Sync from URL → slider
  useEffect(() => {
    setValue([
      currentFilters.minPrice ?? min,
      currentFilters.maxPrice ?? max,
    ]);
  }, [currentFilters.minPrice, currentFilters.maxPrice, min, max]);

  // 🔹 Update filters after debounce
  useEffect(() => {
    const [minPrice, maxPrice] = debouncedValue;

    if (
      minPrice !== currentFilters.minPrice ||
      maxPrice !== currentFilters.maxPrice
    ) {
      updateFilters({
        minPrice,
        maxPrice,
      });
    }
  }, [
    debouncedValue,
    currentFilters.minPrice,
    currentFilters.maxPrice,
    updateFilters,
  ]);

  //  Loading
  if (isLoading) {
    return (
      <FilterSection title="">
        <Skeleton className="h-10 w-full rounded-lg" />
      </FilterSection>
    );
  }

  return (
    <FilterSection
      title=""
      hasActiveFilters={
        currentFilters.minPrice !== undefined ||
        currentFilters.maxPrice !== undefined
      }
      onReset={() => {
        setValue([min, max]);
        updateFilters({
          minPrice: undefined,
          maxPrice: undefined,
        });
      }}
    >
      <div className="space-y-3">
        {/*  Numbers */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{value[0]}</span>
          <span>{value[1]}</span>
        </div>

        {/*  Slider */}
        <Slider
          value={value}
          onValueChange={(v) => setValue(v as [number, number])}
          min={min}
          max={max}
          step={1}
        />
      </div>
    </FilterSection>
  );
}
