export async function getCategory(id: string) {
  const response = await fetch(`${process.env.API}/categories/${id}`, { cache: "no-store" });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
