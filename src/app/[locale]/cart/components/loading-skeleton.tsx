import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-32 mb-2" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Skeleton - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex gap-6">
                  {/* Image Skeleton */}
                  <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
                  
                  {/* Content Skeleton */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="w-10 h-10 rounded-lg" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Skeleton className="h-8 w-24" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-16 h-8 rounded-lg" />
                        <Skeleton className="w-8 h-8 rounded-full" />
                      </div>
                    </div>
                    
                    <Skeleton className="h-7 w-20 rounded-full mt-3" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Continue Shopping Button Skeleton */}
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

          {/* Summary Skeleton - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <Skeleton className="h-7 w-24 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-px w-full my-4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-12 w-full rounded-lg mt-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Skeleton */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};