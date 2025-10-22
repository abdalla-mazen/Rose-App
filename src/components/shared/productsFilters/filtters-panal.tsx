"use client";

import { FormProvider } from "react-hook-form";
import { useFiltersForm } from "@/hooks/use-filters-form";
import { CategoryFilter } from "@/components/shared/productsFilters/CategoryFilter";
import { RatingFilter } from "@/components/shared/productsFilters/RatingFilter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProductsFiltersPanel() {
  //translation
  const t = useTranslations();
  //form
  const form = useFiltersForm();
  //form
  const { watch, reset } = form;

  // watch values
  const values = watch();
  const isAnyFilterActive = Object.values(values).some(
    (val) => val && val !== ""
  );

  // handel reset all function
  const handleResetAll = () => {
    reset({
      category: "",
      rating: "",
    });
  };

  return (
    <FormProvider {...form}>
      <form className="top-52 left-20 bg-white dark:bg-zinc-900 shadow-sm pr-6 border-zinc-100 border-r">
        {/* Category Section */}
        <CategoryFilter />

        {/* Rating Section */}
        <RatingFilter />

        {/* ✅ Reset All button*/}
        {isAnyFilterActive && (
          <div className="gap-2 pt-4 pb-4 w-full h-20">
            <Button
              type="button"
              onClick={handleResetAll}
              className={cn(
                "gap-2 bg-maroon-50 hover:bg-maroon-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 px-4 py-3 rounded-xl w-full h-10 font-semibold text-maroon-600 dark:text-softPink-300 text-sm"
              )}
            >
              <RotateCcw />
              {t("reset-all")}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
