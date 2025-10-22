// example for products api to match the fillters method
import { Filters, ProductsResponse } from "@/lib/types/product";
export async function FilteredProductsApi(filters: Filters) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.rating) params.append("rating", filters.rating.toString());
  if (filters.occasion) params.append("occasion", filters.occasion);
  if (filters.price) params.append("price", filters.price);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`
  );

  const payload: ApiResponse<PaginatedResponse<ProductsResponse>> =
    await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload.products;
}
