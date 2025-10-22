// Fetch products API in best selling component
export async function BestSellingApi() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products?sort=-sold`
  );

  const payload: ApiResponse<PaginatedResponse<{ products: Product[] }>> =
    await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload.products;
}

// Fetch products by occasions API in most popular component
export async function MostPopularApi(occasion: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products?occasion=${occasion}&sort=-sold`
  );

  const payload: ApiResponse<PaginatedResponse<{ products: Product[] }>> =
    await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload.products;
}

// Add product review
export async function addProductReview(data: SendReview) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/add-product-review`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit the review");
  }

  const payload = await response.json();

  return payload;
}
