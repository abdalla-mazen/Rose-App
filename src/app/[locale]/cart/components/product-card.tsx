import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types/cart';

interface ProductCardProps {
  product: Product;                 // Product data
  onAddToCart?: (product: Product) => void; // Optional add to cart handler
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart 
}) => {
  // Determine price and discount
  const price = product.priceAfterDiscount || product.price;
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
      {/* Product image */}
      <div className="relative h-48 w-full">
        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            {discountPercent}% OFF
          </span>
        )}
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="p-4">
        {/* Product title */}
        <h4 className="font-semibold text-gray-900 mb-1 truncate">{product.title}</h4>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="text-sm text-gray-600">{product.ratingsAverage || '0'}</span>
        </div>
        
        {/* Price and discount */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {price.toFixed(2)} EGP
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {product.price.toFixed(2)} EGP
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <button 
          onClick={() => onAddToCart?.(product)}
          className="w-full mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
