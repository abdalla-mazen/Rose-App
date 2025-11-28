// hooks/useDashboardStats.ts

import { useQuery } from '@tanstack/react-query';
import { DashboardStats, CategoryData } from '@/lib/types/dashboard.types';
import { dashboardApi } from '@/lib/apis/dashboard.api';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  categories: () => [...dashboardKeys.all, 'categories'] as const,
  products: () => [...dashboardKeys.all, 'products'] as const,
  orders: () => [...dashboardKeys.all, 'orders'] as const,
};

// Hook to fetch all statistics
export const useAllStatistics = () => {
  return useQuery<DashboardStats>({
    queryKey: dashboardKeys.stats(),
    queryFn: dashboardApi.getAllStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

// Hook to fetch category statistics
export const useCategoryStatistics = () => {
  return useQuery<CategoryData[]>({
    queryKey: dashboardKeys.categories(),
    queryFn: dashboardApi.getCategoryStatistics,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

// Hook to fetch product statistics
export const useProductStatistics = () => {
  return useQuery({
    queryKey: dashboardKeys.products(),
    queryFn: dashboardApi.getProductStatistics,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch order statistics
export const useOrderStatistics = () => {
  return useQuery({
    queryKey: dashboardKeys.orders(),
    queryFn: dashboardApi.getOrderStatistics,
    staleTime: 5 * 60 * 1000,
  });
};