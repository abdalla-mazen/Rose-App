"use client";

import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import FilterSection from "./filter-section";
import OccasionFilter from "./components/occasion-filter";
import PriceFilter from "./components/price-filter";

export default function FiltersSidebar() {
  const t = useTranslations();
  const { resetOccasions, currentFilters } =
    useFilters();

  const hasOccasionFilters =
    currentFilters.occasionIds && currentFilters.occasionIds.length > 0;
  const hasPriceFilters =
    currentFilters.minPrice !== undefined ||
    currentFilters.maxPrice !== undefined;

  return (
    <aside className="w-1/4 border-r border-zinc-100 pr-6 flex flex-col justify-between min-h-screen bg-white">
      <div>
        <FilterSection
          title={t("occasions")}
          onReset={resetOccasions}
          hasActiveFilters={hasOccasionFilters}
        >
          <OccasionFilter />
        </FilterSection>

        <FilterSection
          title={t("priceRange")}
          hasActiveFilters={hasPriceFilters}
        >
          <PriceFilter />
        </FilterSection>
      </div>
    </aside>
  );
}