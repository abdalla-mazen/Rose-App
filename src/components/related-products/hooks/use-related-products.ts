import { getRelatedProducts } from "@/lib/apis/related-products.api";
import { useQuery } from "@tanstack/react-query";

export function useRelatedProducts(productId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["related-products", productId],
    queryFn: () => getRelatedProducts(productId),
    enabled: !!productId, // Only run query if productId exists
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
