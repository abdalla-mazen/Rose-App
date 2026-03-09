import React from "react";
import { OrdersStatus } from "./orders-status";
import { RevenueChart } from "./revenue-chart";

export default function OrderRevenueCharts() {
  return (
    <div className="flex justify-evenly items-center mb-6 pt-6 dark:bg-zinc-800">
      <OrdersStatus />
      <RevenueChart />
    </div>
  );
}
