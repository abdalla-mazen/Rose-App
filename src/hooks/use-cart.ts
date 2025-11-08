'use client';

import { cartService } from '@/lib/apis/cart/cart-service';
import { Cart } from '@/lib/types/cart';
import { useState, useEffect } from 'react';


export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      await cartService.updateQuantity(productId, quantity);
      await fetchCart();
    } catch (err) {
      alert('Failed to update quantity: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await cartService.removeItem(productId);
      await fetchCart();
    } catch (err) {
      alert('Failed to remove item: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    
    try {
      await cartService.clearCart();
      await fetchCart();
    } catch (err) {
      alert('Failed to clear cart: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cart,
    loading,
    error,
    updateQuantity,
    removeItem,
    clearCart,
    refetch: fetchCart,
  };
};