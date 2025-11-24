import { getTranslations } from "next-intl/server";
import React from "react";

export default async function ProductStatisticsSkeleton() {
  // Translations
  const t = await getTranslations();

  return (
    <div className="flex gap-6 max-w-[1096px]">
      {/* Top selling products */}
      <div className="bg-white p-6 rounded-lg w-full">
        {/* Top selling products header */}
        <h1 className="mb-6 font-semibold text-2xl capitalize">{t("top-selling-products")}</h1>

        <div className="space-y-2.5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between my-2.5 px-2.5 py-1 rounded-md animate-pulse"
            >
              {/* Product , price */}
              <div className="flex items-baseline gap-2">
                <div className="bg-gray-300 rounded w-36 h-4"></div>
                <div className="bg-gray-300 rounded w-16 h-4"></div>
              </div>

              {/*  Quantity */}
              <div className="flex items-baseline gap-1">
                <div className="bg-gray-300 rounded w-6 h-4"></div>
                <div className="bg-gray-300 rounded w-10 h-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low stock products */}
      <div className="bg-white p-6 rounded-lg w-full">
        {/* Low stock products header */}
        <h1 className="mb-6 font-semibold text-2xl capitalize">{t("low-stock-products")}</h1>

        <div className="space-y-2.5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between my-2.5 py-1 border-b animate-pulse">
              {/* Product title */}
              <div className="bg-gray-300 rounded w-40 h-4"></div>

              {/* quantity */}
              <div className="flex items-baseline gap-2">
                <div className="bg-gray-300 rounded w-6 h-4"></div>
                <div className="bg-gray-300 rounded w-12 h-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
