// // Types
// type GetFilteredProductsParams = Filters & {
//   page?: number;
//   limit?: number;
// };

// export async function GetProductsApi({
//   page = 1,
//   limit = 12,
//   category,
//   rating,
//   occasion,
//   price,
// }: GetFilteredProductsParams) {
//   // Build url
//   const url = new URL(`${process.env.API}/products`);

//   // Add pagination
//   url.searchParams.set("page", String(page));
//   url.searchParams.set("limit", String(limit));

//   // Add filters if exist
//   if (category) url.searchParams.append("category", category);
//   if (rating) url.searchParams.append("rating", rating.toString());
//   if (occasion) url.searchParams.append("occasion", occasion);
//   if (price) url.searchParams.append("price",price);

//   // Fetch data
//   const response = await fetch(url.toString());
//   const payload: ApiResponse<PaginatedResponse<ProductsResponse>> =
//     await response.json();

//   // Handle error
//   if ("error" in payload) {
//     throw new Error((payload as ErrorResponse).error);
//   }

//   // Return result
//   return payload;
// }




export async function getProducts(searchParams: string) {
  const res = await fetch(
    `${process.env.API}/products?${searchParams}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}