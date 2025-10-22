import { useQuery } from "@tanstack/react-query";
import { FilteredProductsApi } from "@/lib/apis/FilteredProducts.api";

export function useProductsQuery(filters: Filters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => FilteredProductsApi(filters),
  });
}
