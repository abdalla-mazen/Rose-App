import { CartResponse } from "@/lib/types/cart";

const API_URL = process.env.API || 'https://flower.elevateegy.com/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const response = await fetch(`${API_URL}/cart`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    return response.json();
  },

  async updateQuantity(productId: string, quantity: number): Promise<CartResponse> {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update quantity');
    }
    
    return response.json();
  },

  async removeItem(productId: string): Promise<CartResponse> {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to remove item');
    }
    
    return response.json();
  },

  async clearCart(): Promise<{ status: string; message: string }> {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    
    return response.json();
  },
};