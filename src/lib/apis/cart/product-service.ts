import { RecommendationsResponse } from "@/lib/types/cart";

const API_URL = process.env.API || 'https://flower.elevateegy.com/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const productService = {
  async getRecommendations(): Promise<RecommendationsResponse> {
    const response = await fetch(`${API_URL}/products/recommendations`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    
    return response.json();
  },
};