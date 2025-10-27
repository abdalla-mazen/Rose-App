"use client";

import { useFormContext } from "react-hook-form";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function RatingFilter() {
  //Translation
  const t = useTranslations();
  // Form Context
  const { watch, setValue } = useFormContext();
  //State
  const selectedRating = Number(watch("rating") || 0);
  // function
  const handleSelect = (value: number) => {
    if (selectedRating === value) {
      setValue("rating", "");
    } else {
      setValue("rating", value.toString());
    }
  };

  return (
    <div className="gap-2 bg-transparent pt-2 pb-5 w-full h-20 capitalize">
      {/* header + Reset button */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-zinc-800 dark:text-zinc-50 text-lg">{t("rating")}</h4>

        {selectedRating > 0 && (
          <button
            type="button"
            onClick={() => setValue("rating", "")}
            className="flex items-center text-red-600 dark:text-red-500 text-sm"
          >
            <X size={14} />
            {t("reset")}
          </button>
        )}
      </div>

      {/* rating stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            key={starValue}
            type="button"
            onClick={() => handleSelect(starValue)}
            aria-label={`${starValue} ${t("stars")}`}
          >
            <Star
              className={cn(
                "w-6 h-6 transition-colors",
                starValue <= selectedRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none stroke-yellow-400 text-muted-foreground hover:text-yellow-400",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
