export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface CategoryData {
  id: string;
  name: string;
  productCount: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}