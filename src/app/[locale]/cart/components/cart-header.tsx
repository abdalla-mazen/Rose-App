import React from 'react';
import { Trash2 } from 'lucide-react';

interface CartHeaderProps {
  itemCount: number;  // Number of products in the cart
  onClearCart: () => void; // Function to clear all cart items
  showClearButton: boolean; // Controls visibility of the "Clear Cart" button
}

export const CartHeader: React.FC<CartHeaderProps> = ({ 
  itemCount, 
  onClearCart, 
  showClearButton 
}) => {
  return (
     // Header container
    <div className="flex items-center justify-between mb-8">
      {/* Cart title and item count */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
        <p className="text-gray-600 mt-1">
          {itemCount} product{itemCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* "Clear Cart" button */}
      {showClearButton && (
        <button
          onClick={onClearCart}
          className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
          Clear Cart
        </button>
      )}
    </div>
  );
};