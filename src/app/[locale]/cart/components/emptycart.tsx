import React from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div className="bg-white rounded-lg p-12 text-center">
      {/* Empty cart icon */}
      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty,</h3>

      {/* Left-aligned button */}
      <div className="flex justify-start">
        <Button
          onClick={onContinueShopping}
          className={cn(
            'w-1/4 flex items-center gap-2 px-4 py-2 rounded-lg text-white transition',
            'bg-red-800 hover:bg-red-800'
          )}
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
