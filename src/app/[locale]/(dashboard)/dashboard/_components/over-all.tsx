import { getStatics } from "@/lib/apis/get-statistics.api";
import { Package, ClipboardList, LayoutGrid, DollarSign } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
};

interface DashboardStatistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

interface DashboardResponse {
  message: string;
  statistics: DashboardStatistics;
}

const StatCard = ({ title, value, icon, bgColor, textColor }: StatCardProps) => {
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-3 mt-3 shadow-sm ${bgColor}`}>
      <div className={`w-fit p-2 rounded-xl bg-white/50`}>{icon}</div>
      <div>
        <h2 className={`text-2xl font-bold ${textColor}`}>{value}</h2>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default async function DashboardStats() {
  const data: DashboardResponse = await getStatics();
  console.log(data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:bg-zinc-800">
      <StatCard
        title="Total products"
        value={data.statistics?.totalProducts}
        icon={<Package className="w-6 h-6 text-red-500" />}
        bgColor="bg-red-100"
        textColor="text-red-600"
      />

      <StatCard
        title="Total orders"
        value={data.statistics?.totalOrders}
        icon={<ClipboardList className="w-6 h-6 text-blue-500" />}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />

      <StatCard
        title="Total categories"
        value={data.statistics?.totalCategories}
        icon={<LayoutGrid className="w-6 h-6 text-purple-500" />}
        bgColor="bg-purple-100"
        textColor="text-purple-600"
      />

      <StatCard
        title="Total revenue"
        value={data.statistics?.totalRevenue}
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
    </div>
  );
}
