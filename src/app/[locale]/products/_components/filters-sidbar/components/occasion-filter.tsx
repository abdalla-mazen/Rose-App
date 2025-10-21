"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFilters } from "@/hooks/use-filters";
import { filtersApi } from "@/lib/apis/filter-products.api";

export default function OccasionFilter() {
  const t = useTranslations("filters");
  const { currentFilters, toggleOccasion } = useFilters();

  const { data, isLoading, error } = useQuery({
    queryKey: ["filters"],
    queryFn: filtersApi.getFilters,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const selectedOccasions = currentFilters.occasionIds || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600 py-4">
        {t("errorLoading")}
      </div>
    );
  }

  const occasions = data?.filters.occasions || [];

  if (occasions.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-4">
        {t("noOccasions")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Occasions grid */}
      <div className="grid grid-cols-2 gap-2">
        {occasions.map((occ) => {
          const isSelected = selectedOccasions.includes(occ._id);

          return (
            <button
              key={occ._id}
              onClick={() => toggleOccasion(occ._id)}
              className={`relative h-[80px] rounded-xl overflow-hidden group focus:outline-none focus:ring-2 transition-all ${isSelected ? "ring-2 ring-red-600" : ""
                }`}
              aria-pressed={isSelected}
              aria-label={`${occ.name} ${isSelected
                  ? t("selected")
                  : t("notSelected")
                }`}
            >
              <Image
                src={occ.image}
                alt={occ.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 200px"
              />
              <div
                className={`absolute inset-0 transition-colors ${isSelected
                    ? "bg-red-600/40"
                    : "bg-black/30 group-hover:bg-black/40"
                  }`}
              ></div>

              {/* title  */}
              <span className="absolute inset-0 flex items-center justify-center text-white text-md font-medium drop-shadow-md text-center px-2">
                {occ.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}