export async function getProductReviews(productId: string) {
  const response = await fetch(`/api/product-review/${productId}`);

  if (!response.ok) {
    throw new Error("Something went wrong from get product reviews function api");
  }

  const payload = await response.json();

  return payload;
}
