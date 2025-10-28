import { getProductReviews } from "@/lib/apis/product-reviews";
import { useQuery } from "@tanstack/react-query";

export function useProductReviews(productID: string) {
  return useQuery({
    queryKey: ["Product-review", productID],
    queryFn: () => getProductReviews(productID),
    enabled: !!productID,
  });
}
