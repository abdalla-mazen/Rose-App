'use client';

import { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types/cart';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.product._id, newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    handleQuantityChange(value);
  };

  const product = item.product;
  const price = product.priceAfterDiscount || product.price;
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex gap-6">
        {/* Product image */}
        <div className="w-24 h-24 flex-shrink-0 relative">
          <Image
            src={product.imageCover || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          {/* Product info and remove icon */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-yellow-600">
                  ★ {t('rating')} {product.ratingsAverage}
                </span>
                {product.ratingsQuantity && (
                  <span className="text-sm text-gray-500">
                    ({product.ratingsQuantity} {t('ratings')})
                  </span>
                )}
              </div>
            </div>

            {/* Remove icon button */}
            <button
              onClick={() => onRemove(product._id)}
              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
              title={t('remove')}
            >
              <X size={20} />
            </button>
          </div>

          {/* Price and quantity controls */}
          <div className="flex items-center justify-between mt-4">
            {/* Price display */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {price.toFixed(2)} {t('currency')}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.price.toFixed(2)} {t('currency')}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                className="w-16 text-center border border-gray-300 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Remove button */}
          <button
            onClick={() => onRemove(product._id)}
            className="mt-3 px-4 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </div>
  );
};
