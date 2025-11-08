'use client';

import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  const t = useTranslations();
  const locale = useLocale();

  // Use right arrow for Arabic, left arrow for other languages
  const ArrowIcon = locale === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="bg-white rounded-lg p-12 text-center">
      {/* Empty cart icon */}
      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {t('empty-cart-message')}
      </h3>

      {/* button */}
      <div className="flex justify-start">
        <Button
          onClick={onContinueShopping}
          className={cn(
            'w-1/4 flex items-center gap-2 px-4 py-2 rounded-lg text-white transition',
            'bg-red-800 hover:bg-red-800'
          )}
        >
          <ArrowIcon size={16} />
          {t('continue-shopping')}
        </Button>
      </div>
    </div>
  );
};
