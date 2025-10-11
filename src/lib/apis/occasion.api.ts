export async function FetchOccasions() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/occasions`);

  const payload: ApiResponse<PaginatedResponse<{ occasions: Occasion[] }>> =
    await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload.occasions;
}
