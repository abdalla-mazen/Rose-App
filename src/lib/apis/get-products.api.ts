// Types
type GetProductsParams = { page?: number; limit?: number };

export async function GetProductsApi({ page = 1, limit = 12 }: GetProductsParams) {
  // Build url
  const url = new URL(`${process.env.API}/products`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  // Fetch data
  const response = await fetch(url.toString());
  const payload: ApiResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

  // Handle error
  if ("error" in payload) {
    throw new Error((payload as ErrorResponse).error);
  }

  // Return result
  return payload as SuccessResponse<PaginatedResponse<{ products: Product[] }>>;
}
