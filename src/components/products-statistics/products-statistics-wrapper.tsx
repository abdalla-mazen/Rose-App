import React, { Suspense } from "react";
import ProductsStatistics from "./products-statistics";
import ProductStatisticsSkeleton from "../skeletons/products-statistics.skeleton";

export default function ProductsStatisticsWrapper() {
  return (
    // Suspense when products is loading
    <Suspense fallback={<ProductStatisticsSkeleton />}>
      <ProductsStatistics />
    </Suspense>
  );
}
