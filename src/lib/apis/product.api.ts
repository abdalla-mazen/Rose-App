// Fetch products API in best selling component
export async function BestSellingApi() {
  const response = await fetch(`${process.env.API}/products?sort=-sold`, {
    cache: "no-store",
  });

  const payload: ApiResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.products;
}

// Fetch products by occasions API in most popular component
export async function MostPopularApi(occasion: string) {
  const response = await fetch(`${process.env.API}/products?occasion=${occasion}&sort=-sold`, {
    cache: "no-store",
  });

  const payload: ApiResponse<PaginatedResponse<{ products: Product[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.products;
}

// Fetch product by ID API in product details page
export async function ProductByIdApi(id: string) {
  const response = await fetch(`${process.env.API}/products/${id}`, {
    cache: "no-store",
  });

  const payload: ProductByIdResponse = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
