import React, { useState, useEffect } from 'react';
import { Package, FileText, FolderOpen, DollarSign, Loader2 } from 'lucide-react';

// Types
interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

interface CategoryData {
  id: string;
  name: string;
  productCount: number;
}

interface occaData {
  id: string;
  name: string;
  productCount: number;
}

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// StatCard Component
const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
  iconColor: string;
  isLoading?: boolean;
}> = ({ icon, title, value, bgColor, iconColor, isLoading }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
      <div className={`${iconColor} mb-4`}>
        {icon}
      </div>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      ) : (
        <>
          <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
        </>
      )}
    </div>
  );
};

// CategoryList Component
const CategoryList: React.FC<{
  categories: CategoryData[];
  isLoading?: boolean;
}> = ({ categories, isLoading }) => {
  // Remove duplicates by name and sum product counts
  const uniqueCategories = React.useMemo(() => {
    const categoryMap = new Map<string, CategoryData>();
    
    categories.forEach(cat => {
      const existing = categoryMap.get(cat.name);
      if (existing) {
        existing.productCount += cat.productCount;
      } else {
        categoryMap.set(cat.name, { ...cat });
      }
    });
    
    return Array.from(categoryMap.values());
  }, [categories]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">All Categories</h2>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-500">Loading categories...</span>
        </div>
      ) : uniqueCategories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No categories found
        </div>
      ) : (
        <div className="space-y-2">
          {uniqueCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-gray-700 font-medium">{category.name}</span>
              <span className="text-sm text-gray-500">
                {category.productCount} Products
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// StatsGrid Component
const StatsGrid: React.FC<{
  stats: DashboardStats;
  isLoading?: boolean;
}> = ({ stats, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Package className="w-8 h-8" />}
        title="Total products"
        value={stats.totalProducts}
        bgColor="bg-pink-50"
        iconColor="text-pink-500"
        isLoading={isLoading}
      />
      <StatCard
        icon={<FileText className="w-8 h-8" />}
        title="Total orders"
        value={stats.totalOrders.toLocaleString()}
        bgColor="bg-blue-50"
        iconColor="text-blue-500"
        isLoading={isLoading}
      />
      <StatCard
        icon={<FolderOpen className="w-8 h-8" />}
        title="Total categories"
        value={stats.totalCategories}
        bgColor="bg-purple-50"
        iconColor="text-purple-500"
        isLoading={isLoading}
      />
      <StatCard
        icon={<DollarSign className="w-8 h-8" />}
        title="Total revenue"
        value={formatCurrency(stats.totalRevenue)}
        bgColor="bg-green-50"
        iconColor="text-green-500"
        isLoading={isLoading}
      />
    </div>
  );
};

// Mock API functions (replace with actual API calls)
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalProducts: 12,
    totalOrders: 1284,
    totalCategories: 125,
    totalRevenue: 6824528,
  };
};

const fetchCategories = async (): Promise<CategoryData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return [
    { id: '1', name: 'Chocolate', productCount: 4 },
    { id: '2', name: 'Flowers', productCount: 8 },
    { id: '3', name: 'Chocolate', productCount: 4 },
    { id: '4', name: 'Chocolate', productCount: 4 },
    { id: '5', name: 'Chocolate', productCount: 4 },
  ];
};

// Main Dashboard Component
const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load stats
        setIsLoadingStats(true);
        const statsData = await fetchDashboardStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setIsLoadingStats(false);
      }

      try {
        // Load categories
        setIsLoadingCategories(true);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <StatsGrid stats={stats} isLoading={isLoadingStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CategoryList 
              categories={categories} 
              isLoading={isLoadingCategories}
            />
          </div>
          
          {/* Placeholder for charts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Orders Status & Revenue
              </h2>
              <div className="text-center py-12 text-gray-400">
                Charts will be implemented here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;