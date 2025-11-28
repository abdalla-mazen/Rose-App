
import ProductsStatisticsWrapper from "@/components/products-statistics/products-statistics-wrapper";
import { DashboardStatistics } from "./statistics";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your store statistics and performance
          </p>
        </div>

        {/* Dashboard Statistics */}
        <DashboardStatistics />

        {/* Products Statistics */}
        <ProductsStatisticsWrapper />
      </div>
    </div>
  );
}