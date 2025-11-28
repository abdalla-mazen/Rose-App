
import React from 'react';
import { Package, FileText, FolderOpen, DollarSign } from 'lucide-react';
import { DashboardStats } from '@/lib/types/dashboard.types';
import { StatCard } from './stat-card';
import { formatCurrency, formatNumber } from '@/lib/utils/currency';

interface StatsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={Package}
        title="Total products"
        value={isLoading ? 0 : stats.totalProducts}
        bgColor="bg-pink-50"
        iconColor="text-pink-600"
        isLoading={isLoading}
      />
      
      <StatCard
        icon={FileText}
        title="Total orders"
        value={isLoading ? 0 : formatNumber(stats.totalOrders)}
        bgColor="bg-blue-50"
        iconColor="text-blue-600"
        isLoading={isLoading}
      />
      
      <StatCard
        icon={FolderOpen}
        title="Total categories"
        value={isLoading ? 0 : stats.totalCategories}
        bgColor="bg-purple-50"
        iconColor="text-purple-600"
        isLoading={isLoading}
      />
      
      <StatCard
        icon={DollarSign}
        title="Total revenue"
        value={isLoading ? 'EGP 0' : formatCurrency(stats.totalRevenue)}
        bgColor="bg-emerald-50"
        iconColor="text-emerald-600"
        isLoading={isLoading}
      />
    </div>
  );
};