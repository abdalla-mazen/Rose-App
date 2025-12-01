"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useOrderStatus } from "../_hooks/orders-status";
import { CustomLabel } from "./custom-label";

// Type
type OrderType = {
  _id: string;
  count: number;
  percent: number;
  status: string;
  fill: string;
};

// The chart config is where we define the labels, icons and colors for a chart.
const chartConfig = {
  completed: {
    label: "Completed",
    color: "#00BC7D",
  },
  inProgress: {
    label: "In progress",
    color: "#2B7FFF",
  },
  canceled: {
    label: "Canceled",
    color: "#DC2626",
  },
};

export function OrdersStatus() {
  // Data
  const { data } = useOrderStatus();
  const orders = data?.statistics?.ordersByStatus;

  // Filter only the 3 statuses you want
  const filtered = orders?.filter((o: OrderType) =>
    ["completed", "inProgress", "canceled"]?.includes(o._id),
  );

  // Total
  const total = filtered?.reduce((sum: number, item: OrderType) => sum + item.count, 0);

  // Build chart data dynamically
  const chartData = filtered?.map((item: OrderType) => ({
    status: item._id,
    count: item.count,
    percent: total ? Math.round((item.count / total) * 100) : 0,
    fill: chartConfig[item._id].color,
  }));

  return (
    <Card className="flex flex-col w-72 h-94">
      <CardHeader className="items-center pb-0">
        <CardTitle>Orders Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto pb-0 max-h-[250px] aspect-square"
        >
          {/* Pie Chart */}
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* Pie */}
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={<CustomLabel />}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Legend */}
      <CardFooter className="flex-col gap-3 text-sm">
        {chartData?.map((item: OrderType) => (
          <div key={item.status} className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span className="rounded-full w-3 h-3" style={{ backgroundColor: item.fill }} />
              <span>{chartConfig[item.status]?.label}</span>
            </div>

            <span>
              {item.count} ({item.percent}%)
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
