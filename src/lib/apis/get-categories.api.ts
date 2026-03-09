export async function getCategories() {
  const response = await fetch(`${process.env.API}/categories`);

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
