"use client";

import { useTranslations } from "next-intl";
import ReviewCard from "./review-card";
import ReviewForm from "./review-form";
import { useProductReviews } from "../hooks/use-get-product-reviews";
import { LucideStar } from "lucide-react";

export default function ProductReviews({ productId }: { productId: string }) {
  // Translation
  const t = useTranslations();

  // Data
  const { data } = useProductReviews(productId);
  const productReviews = data?.reviews ?? [];

  // Average rating
  const averageRating = productReviews.length
    ? productReviews.reduce((acc: number, r: Review) => acc + r.rating, 0) /
      productReviews.length
    : 0;

  return (
    <main className="mx-auto max-w-7xl">
      {/* Top */}
      <div>
        {/* Title */}
        <h2 className="flex items-center gap-2 my-2.5 font-bold text-maroon-700 dark:text-softPink-200 text-4xl capitalize -translate-x-3">
          {t.rich("product-reviews", {
            span: (chunk) => (
              <span className="before:bottom-1 before:left-1 before:-z-10 before:absolute relative flex items-center gap-2 before:bg-softPink-100 before:dark:bg-zinc-700 py-1 ps-1 before:rounded-e-2xl before:w-[120%] before:h-4 rtl:before:-translate-x-8">
                {chunk}
              </span>
            ),
            span1: (chunk) => (
              <span className="after:block after:bg-softPink-600 dark:after:bg-softPink-500 after:w-1/2 after:h-[2px] after:content-['']">
                {chunk}
              </span>
            ),
          })}
        </h2>

        {/* General rating */}
        <div className="flex flex-col gap-1 text-zinc-800 dark:text-zinc-400">
          <span className="font-semibold text-xl capitalize">
            {t("general-rating")}:<span className="ms-2">{averageRating}</span>
          </span>

          <div className="flex items-center gap-2 font-bold text-2xl">
            <span>{averageRating}</span>
            <span className="text-zinc-500 text-lg translate-y-1">
              ({averageRating} {t("rating")})
            </span>
          </div>

          <div className="flex items-center my-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>
                <LucideStar
                  size={20}
                  className="fill-yellow-500 border-none text-yellow-500"
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-5 border-zinc-200 border-t">
        {/* Left */}
        <div className="px-5 max-h-96 overflow-y-auto -translate-y-12">
          <ReviewCard productId={productId} />
        </div>

        {/* Right: Review form */}
        <div className="mt-4 ps-10 border-s border-zinc-200 min-w-[30rem]">
          <ReviewForm productId={productId} />
        </div>
      </div>
    </main>
  );
}
