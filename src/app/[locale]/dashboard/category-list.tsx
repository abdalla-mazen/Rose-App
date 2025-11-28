import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { CategoryData } from '@/lib/types/dashboard.types';

interface CategoryListProps {
  categories: CategoryData[];
  isLoading?: boolean;
  error?: Error | null;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  isLoading = false,
  error = null,
}) => {
  // Remove duplicates by name and sum product counts
  const uniqueCategories = useMemo(() => {
    const categoryMap = new Map<string, CategoryData>();

    categories.forEach((cat) => {
      const existing = categoryMap.get(cat.name);
      if (existing) {
        existing.productCount += cat.productCount;
      } else {
        categoryMap.set(cat.name, { ...cat });
      }
    });

    return Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [categories]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">All Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-4"
              >
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load categories. Please try again.
            </AlertDescription>
          </Alert>
        ) : uniqueCategories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No categories found
          </div>
        ) : (
          <div className="space-y-1">
            {uniqueCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between py-3 px-4 hover:bg-accent rounded-lg transition-colors cursor-pointer"
              >
                <span className="font-medium text-foreground">
                  {category.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {category.productCount} Products
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};