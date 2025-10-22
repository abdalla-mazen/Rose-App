export async function getProductReviews(productId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products/${productId}/reviews`
  );

  if (!response.ok) {
    throw new Error(
      "Something went wrong from get product reviews function api"
    );
  }

  const payload = await response.json();

  return payload;
}
