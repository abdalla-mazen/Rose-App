import ProductsStatisticsWrapper from "@/components/products-statistics/products-statistics-wrapper";
import React from "react";
import OrderRevenueCharts from "./_components/order-revenue-charts";
import DashboardStats from "./_components/over-all";

export default async function page() {
  return (
    <div className="bg-zinc-50 w-full dark:bg-zinc-800">
      <DashboardStats />
      <OrderRevenueCharts />
      <ProductsStatisticsWrapper />
    </div>
  );
}
