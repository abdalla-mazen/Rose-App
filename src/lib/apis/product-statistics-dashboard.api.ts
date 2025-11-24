import { JSON_HEADER } from "../constants/shared.constant";
import getToken from "../utils/get-token";

// Fetch products statistics API in dashboard
export async function ProductsStatisticsDashboardApi() {
  // Get token
  const token = await getToken();

  // If token is not exist
  if (!token) return null;

  const response = await fetch(`${process.env.API}/statistics/products?sort=-sold`, {
    cache: "no-store",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: ApiResponse<{ statistics: productStatistics }> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload.statistics;
}
