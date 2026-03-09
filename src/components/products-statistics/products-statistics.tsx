import { ProductsStatisticsDashboardApi } from "@/lib/apis/product-statistics-dashboard.api";
import { cn } from "@/lib/utils";
import { getFormatter, getTranslations } from "next-intl/server";
import React from "react";

export default async function ProductsStatistics() {
  // Translations
  const t = await getTranslations();
  const format = await getFormatter();

  // Fetch products statistics dashboard
  const products = await ProductsStatisticsDashboardApi();

  // Get top product background function
  // function getTopProductBackground(index: number) {
  //   switch (index) {
  //     case 0:
  //       return "font-medium bg-[linear-gradient(90deg,rgba(223,172,22,0.25)_0%,rgba(223,172,22,0.1)_100%)]";
  //     case 1:
  //       return "font-medium bg-[linear-gradient(90deg,rgba(117,127,149,0.25)_0%,rgba(117,127,149,0.1)_100%)]";
  //     case 2:
  //       return "font-medium bg-[linear-gradient(90deg,rgba(145,68,0,0.25)_0%,rgba(145,68,0,0.1)_100%)]";
  //     default:
  //       return "bg-zinc-100";
  //   }
  // }
function getTopProductBackground(index: number) {
  switch (index) {
    case 0:
      return `
        font-medium 
        bg-[linear-gradient(90deg,rgba(223,172,22,0.25)_0%,rgba(223,172,22,0.1)_100%)]
        dark:bg-[linear-gradient(90deg,rgba(223,172,22,0.35)_0%,rgba(223,172,22,0.15)_100%)]
      `;

    case 1:
      return `
        font-medium 
        bg-[linear-gradient(90deg,rgba(117,127,149,0.25)_0%,rgba(117,127,149,0.1)_100%)]
        dark:bg-[linear-gradient(90deg,rgba(117,127,149,0.35)_0%,rgba(117,127,149,0.15)_100%)]
      `;

    case 2:
      return `
        font-medium 
        bg-[linear-gradient(90deg,rgba(145,68,0,0.25)_0%,rgba(145,68,0,0.1)_100%)]
        dark:bg-[linear-gradient(90deg,rgba(145,68,0,0.35)_0%,rgba(145,68,0,0.15)_100%)]
      `;

    default:
      return "bg-zinc-100 dark:bg-zinc-800";
  }
}
  return (
    <div className="flex gap-6 pl-10 max-w-[1096px]">
      {/* Top selling products */}
      <div className="bg-white p-6 rounded-lg w-full dark:bg-zinc-900">
        {/* Top selling products header */}
        <h1 className="mb-6 font-semibold text-2xl capitalize">{t("top-selling-products")}</h1>

        {products?.topSellingProducts.map((topProd, index) => (
          <div
            key={topProd._id}
            className={cn(
              `flex justify-between my-2.5 px-2.5 py-1 rounded-md
               ${getTopProductBackground(index)}`,
            )}
          >
            <h3>
              {/* Product title */}
              {topProd.title.split(" ").slice(0, 5).join(" ")}...
              {/* Product price */}
              <span className="text-gray-500 text-xs">
                (
                {format.number(topProd.price, {
                  style: "currency",
                  currency: "EGP",
                })}{" "}
                )
              </span>
            </h3>

            {/* Product sales */}
            <p className="font-bold text-sm">
              {topProd.sold} <span className="font-medium capitalize">{t("sales")}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Low stock products */}
      <div className="bg-white p-6 rounded-lg w-full dark:bg-zinc-900">
        {/* Top selling products header */}
        <h1 className="mb-6 font-semibold text-2xl capitalize">{t("low-stock-products")}</h1>

        {products?.lowStockProducts.map((lowProd) => (
          <div
          key={lowProd._id}
          className="flex justify-between my-2.5 py-1 border-b">
            {/* Product title */}
            <h3>{lowProd.title.split(" ").slice(0, 5).join(" ")}... </h3>

            {/* Product quantity */}
            <p className={cn(`font-bold text-sm ${lowProd.quantity < 0 && "text-red-600"}`)}>
              {lowProd.quantity} <span className="font-medium">{t("products")}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
