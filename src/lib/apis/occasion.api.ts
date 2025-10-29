export async function FetchOccasions() {
  const response = await fetch(`${process.env.API}/occasions`);

  const payload: ApiResponse<PaginatedResponse<{ occasions: Occasion[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.occasions;
}
