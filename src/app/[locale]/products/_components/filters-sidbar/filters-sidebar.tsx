"use client";

import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import { PriceFilter, OccasionFilter } from "./components";
import FilterSection from "./filter-section";

export default function FiltersSidebar() {
  const t = useTranslations();
  const { resetOccasions, resetPriceRange, currentFilters } =
    useFilters();

  const hasOccasionFilters =
    currentFilters.occasionIds && currentFilters.occasionIds.length > 0;
  const hasPriceFilters =
    currentFilters.minPrice !== undefined ||
    currentFilters.maxPrice !== undefined;
  const hasAnyFilters = hasOccasionFilters || hasPriceFilters;

  return (
    <aside className="w-1/4 border-r border-zinc-100 pr-6 flex flex-col justify-between min-h-screen bg-white">
      <div>
        {/* Header with Clear All button */}
        {hasAnyFilters && (
          <div className="flex items-center justify-end mb-4 pb-3 border-b border-zinc-100">
          </div>
        )}

        <FilterSection
          title={t("occasions")}
          onReset={resetOccasions}
          hasActiveFilters={hasOccasionFilters}
        >
          <OccasionFilter />
        </FilterSection>

        <FilterSection
          title={t("priceRange")}
          onReset={resetPriceRange}
          hasActiveFilters={hasPriceFilters}
        >
          <PriceFilter />
        </FilterSection>
      </div>
    </aside>
  );
}