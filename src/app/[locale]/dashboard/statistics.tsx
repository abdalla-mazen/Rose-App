
'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAllStatistics, useCategoryStatistics } from '@/hooks/use-dashboard-stats';
import { StatsGrid } from './stats-grid';
import { CategoryList } from './category-list';

export const DashboardStatistics: React.FC = () => {
  const {
    data: stats,
    isLoading: isLoadingStats,
    error: statsError,
    refetch: refetchStats,
  } = useAllStatistics();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategoryStatistics();

  const hasError = statsError || categoriesError;

  return (
    <div className="space-y-8">
      {/* Error Alert */}
      {hasError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load dashboard data. Please try again.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                refetchStats();
                refetchCategories();
              }}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <StatsGrid
        stats={
          stats || {
            totalProducts: 0,
            totalOrders: 0,
            totalCategories: 0,
            totalRevenue: 0,
          }
        }
        isLoading={isLoadingStats}
      />

      {/* Category List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryList
            categories={categories || []}
            isLoading={isLoadingCategories}
            error={categoriesError}
          />
        </div>

        {/* Placeholder for Charts */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Orders Status & Revenue
            </h2>
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Charts will be implemented here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
