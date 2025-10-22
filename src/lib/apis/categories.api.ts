export async function getCategoriesApi(page = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/categories?page=${page}&limit=10`
  );

  const payload: ApiResponse<PaginatedResponse<CategoriesResponse>> =
    await res.json();

  if ("error" in payload) {
    throw new Error(payload.message);
  }

  return {
    categories: payload?.categories ?? [],
    metadata: payload?.metadata,
  };
}
