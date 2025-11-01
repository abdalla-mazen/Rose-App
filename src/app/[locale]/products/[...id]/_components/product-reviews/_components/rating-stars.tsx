"use client";

import { LucideStar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type RatingStarsProps = {
  onRatingChange: (rating: number) => void;
};

export default function RatingStarts({ onRatingChange }: RatingStarsProps) {
  // Translation
  const t = useTranslations();
  // Hooks
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleRatingClick = (index: number) => {
    setRating(index + 1);

    onRatingChange(index + 1);
  };

  return (
    <div className="flex items-center space-x-1 mt-2">
      <span className="me-2 font-semibold text-lg capitalize">
        {t("your-rating")}:
      </span>
      {[...Array(5)].map((_, index) => {
        const filled = hover ? index < hover : index < rating;

        return (
          <LucideStar
            key={index}
            size={20}
            onClick={() => handleRatingClick(index)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(null)}
            className={`cursor-pointer transition-colors ${
              filled ? "fill-yellow-500 stroke-yellow-500" : "stroke-yellow-500"
            }`}
          />
        );
      })}
    </div>
  );
}
