
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  bgColor?: string;
  iconColor?: string;
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  bgColor = 'bg-slate-50',
  iconColor = 'text-slate-600',
  isLoading = false,
}) => {
  return (
    <Card className={cn('border-none shadow-sm', bgColor)}>
      <CardContent className="p-6">
        <div className={cn('mb-4', iconColor)}>
          <Icon className="w-8 h-8" />
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {value}
            </div>
            <div className="text-sm font-medium text-gray-600">
              {title}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};