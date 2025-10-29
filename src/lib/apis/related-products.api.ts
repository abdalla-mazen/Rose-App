export async function getRelatedProducts(productId: string) {
  const response = await fetch(`/api/related-products/${productId}`);

  if (!response.ok) {
    throw new Error("Something went wrong caught in the: Get Related Products function api ");
  }

  const payload = await response.json();

  return payload;
}
