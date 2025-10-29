export async function getRelatedProducts(productId: string) {
  const response = await fetch(`${process.env.API}/related/category/${productId}`);

  if (!response.ok) {
    throw new Error("Something went wrong caught in the: Get Related Products function api ");
  }

  const payload = await response.json();

  return payload;
}
