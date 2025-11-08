'use client';

import React from 'react';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from '@/i18n/navigation';
import { useRecommendations } from '@/hooks/use-recommendations';
import { Loading } from './components/loading-skeleton';
import { CartHeader } from './components/cart-header';
import { EmptyCart } from './components/emptycart';
import { CartItem } from './components/cart-item';
import { ProductRecommendations } from './components/product-recommendations';

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    loading, 
    updateQuantity, 
    removeItem, 
    clearCart 
  } = useCart(); // Cart state & actions
  
  const { recommendations } = useRecommendations(); // Recommended products

  // Navigate to homepage
  const handleContinueShopping = () => {
    router.push('/');
  };

  // Show loading skeleton while fetching cart
  if (loading) {
    return <Loading message="Loading your cart..." />;
  }

  const cartItems = cart?.products || [];
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cart header with item count & clear button */}
        <CartHeader 
          itemCount={cartItems.length}
          onClearCart={clearCart}
          showClearButton={!isEmpty}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - spans 2 columns */}
          <div className="lg:col-span-2">
            {isEmpty ? (
              // Empty cart state
              <EmptyCart onContinueShopping={handleContinueShopping} />
            ) : (
              <div className="space-y-4">
                {/* Render cart items */}
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
                
                {/* Continue shopping button */}
                <button
                  onClick={handleContinueShopping}
                  className="w-full px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                >
                  ← Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Summary Placeholder - spans 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="text-center py-8 text-gray-400">
                Summary will be rendered via parallel route
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products section */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Products You May Like
            </h2>
            <ProductRecommendations products={recommendations} />
          </div>
        )}
      </div>
    </div>
  );
}
