//useFilters hooks
"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ProductFilters } from "@/lib/types/filters";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current filters from URL
  const currentFilters = useMemo((): ProductFilters => {
    const occasionIds = searchParams.getAll("occasionId");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    return {
      occasionIds: occasionIds.length > 0 ? occasionIds : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };
  }, [searchParams]);

  // Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Handle occasion IDs
      if (newFilters.occasionIds !== undefined) {
        params.delete("occasionId");
        if (newFilters.occasionIds.length > 0) {
          newFilters.occasionIds.forEach((id) => {
            params.append("occasionId", id);
          });
        }
      }

      // Handle min price
      if (newFilters.minPrice !== undefined) {
        if (newFilters.minPrice) {
          params.set("minPrice", newFilters.minPrice.toString());
        } else {
          params.delete("minPrice");
        }
      }

      // Handle max price
      if (newFilters.maxPrice !== undefined) {
        if (newFilters.maxPrice) {
          params.set("maxPrice", newFilters.maxPrice.toString());
        } else {
          params.delete("maxPrice");
        }
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Toggle occasion selection
  const toggleOccasion = useCallback(
    (occasionId: string) => {
      const currentOccasions = currentFilters.occasionIds || [];
      const newOccasions = currentOccasions.includes(occasionId)
        ? currentOccasions.filter((id) => id !== occasionId)
        : [...currentOccasions, occasionId];

      updateFilters({ occasionIds: newOccasions });
    },
    [currentFilters.occasionIds, updateFilters]
  );

  // Reset occasion filters
  const resetOccasions = useCallback(() => {
    updateFilters({ occasionIds: [] });
  }, [updateFilters]);

  // Reset price filters
  function resetPriceRange() {
    updateFilters({
      minPrice: undefined,
      maxPrice: undefined,
    });
  }

  // Reset all filters
  const resetAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    currentFilters,
    updateFilters,
    toggleOccasion,
    resetOccasions,
    resetPriceRange,
    resetAllFilters,
  };
}
