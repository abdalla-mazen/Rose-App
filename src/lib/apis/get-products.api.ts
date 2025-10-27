// Types
type GetFilteredProductsParams = Filters & {
  page?: number;
  limit?: number;
};

export async function GetProductsApi({
  page = 1,
  limit = 12,
  category,
  rating,
  occasion,
  price,
}: GetFilteredProductsParams) {
  // Build url
  const url = new URL(`${process.env.NEXT_PUBLIC_API}/products`);

  // Add pagination
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  // Add filters if exist
  if (category) url.searchParams.append("category", category);
  if (rating) url.searchParams.append("rateAvg", rating.toString());
  if (occasion) url.searchParams.append("occasion", occasion);
  if (price) url.searchParams.append("price", price);

  // Fetch data
  const response = await fetch(url.toString());
  const payload: ApiResponse<PaginatedResponse<ProductsResponse>> = await response.json();

  // Handle error
  if ("error" in payload) {
    throw new Error((payload as ErrorResponse).error);
  }

  // Return result
  return payload;
}
