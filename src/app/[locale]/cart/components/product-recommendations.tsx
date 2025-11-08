import React from 'react';
import { ProductCard } from './product-card';
import { Product } from '@/lib/types/cart';

interface ProductRecommendationsProps {
  products: Product[];                 // Array of recommended products
  onAddToCart?: (product: Product) => void; // Optional add to cart handler
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  products, 
  onAddToCart 
}) => {
  return (
    // Grid container for product cards
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Render up to 4 recommended products */}
      {products.slice(0, 4).map((product) => (
        <ProductCard 
          key={product._id}           // Unique key for each product
          product={product}           // Pass product data
          onAddToCart={onAddToCart}   // Pass add to cart handler
        />
      ))}
    </div>
  );
};
