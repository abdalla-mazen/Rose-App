import { Occasion } from "../types/occasion";

interface FetchOccasionsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationProps {
  totalPages: number;
  initialPage: number;
}
export async function fetchOccasions(params?: FetchOccasionsParams) {
  const { page = 1, limit = 10, search = "" } = params || {};

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  const response = await fetch(`${process.env.API}/occasions?${queryParams}`);

  const payload: ApiResponse<PaginatedResponse<{ occasions: Occasion[] }>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return {
    occasions: payload.occasions || [],
    totalPages: payload?.metadata.totalPages || 1,
    currentPage: payload?.metadata.currentPage || page,
    totalCount: payload?.metadata.totalItems || 0,
  };
}
