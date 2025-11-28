
import { DashboardStats, CategoryData } from '@/lib/types/dashboard.types';

const API_BASE_URL = process.env.API ;

export const dashboardApi = {
  // Get all statistics
  getAllStatistics: async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_BASE_URL}/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }

    const data = await response.json();
    return data;
  },

  // Get overall statistics
  getOverallStatistics: async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_BASE_URL}/statistics/overall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch overall statistics');
    }

    const data = await response.json();
    return data;
  },

  // Get product statistics
  getProductStatistics: async (): Promise<{ totalProducts: number }> => {
    const response = await fetch(`${API_BASE_URL}/statistics/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product statistics');
    }

    const data = await response.json();
    return data;
  },

  // Get order statistics
  getOrderStatistics: async (): Promise<{ totalOrders: number }> => {
    const response = await fetch(`${API_BASE_URL}/statistics/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order statistics');
    }

    const data = await response.json();
    return data;
  },

  // Get category statistics
  getCategoryStatistics: async (): Promise<CategoryData[]> => {
    const response = await fetch(`${API_BASE_URL}/statistics/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch category statistics');
    }

    const data = await response.json();
    return data;
  },
};