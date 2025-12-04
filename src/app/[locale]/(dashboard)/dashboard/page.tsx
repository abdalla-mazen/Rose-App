import ProductsStatisticsWrapper from "@/components/products-statistics/products-statistics-wrapper";
import React from "react";
import OrderRevenueCharts from "./_components/order-revenue-charts";

export default async function page() {
  return (
    <div className="bg-zinc-50">
      <OrderRevenueCharts />
      <ProductsStatisticsWrapper />
    </div>
  );
}
