"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useOrderStatus } from "../_hooks/orders-status";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Types
type Data = {
  count: number;
  revenue: number;
  _id: string;
};

export function RevenueChart() {
  // State
  const [selected, setSelected] = useState("daily");

  // Hooks
  const { data } = useOrderStatus();
  const dailyData = data?.statistics?.dailyRevenue;
  const monthlyDate = data?.statistics?.monthlyRevenue;

  console.log(data?.statistics);

  const chartDailyData = dailyData?.map((day: Data) => ({
    date: day._id,
    revenue: day.revenue,
    count: day.count,
  }));

  const chartMonthlyDate = monthlyDate?.map((month: Data) => ({
    date: month._id,
    revenue: month.revenue,
    count: month.count,
  }));

  const chartConfig = {
    revenue: {
      label: "revenue",
      color: "#A6252A",
    },
    date: {
      label: "date",
      color: "blue",
    },
  };

  return (
    <Card className="w-[40rem] h-96">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Revenue</CardTitle>
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => setSelected("monthly")}
            className={cn("font-semibold text-[#969696] text-sm", {
              "text-maroon-600": selected === "monthly",
            })}
          >
            Monthly
          </button>{" "}
          <button
            onClick={() => setSelected("daily")}
            className={cn("font-semibold text-[#969696] text-sm", {
              "text-maroon-600": selected === "daily",
            })}
          >
            Last week
          </button>
        </div>
      </CardHeader>
      <CardContent className="w-[35rem] h-80">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={selected === "daily" ? chartDailyData : chartMonthlyDate}
            margin={{
              left: 15,
              right: -40,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A6252A" stopOpacity={0.5} /> {/* bottom */}
                <stop offset="60%" stopColor="#A6252A" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#A6252A" stopOpacity={0} /> {/* fully transparent */}
              </linearGradient>
            </defs>

            <CartesianGrid vertical={true} />
            <XAxis dataKey="date" tickLine={false} axisLine={true} tickMargin={8} />
            <YAxis
              dataKey="revenue"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#revenueGradient)"
              fillOpacity={0.8}
              stroke="#A6252A"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
