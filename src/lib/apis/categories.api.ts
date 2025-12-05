export async function FetchCategories() {
  const response = await fetch(`${process.env.API}/categories`);

  const payload: ApiResponse<PaginatedResponse<{ categories: Category[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.categories;
}
