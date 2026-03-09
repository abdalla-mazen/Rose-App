import getToken from "../utils/get-token";

interface FetchCategoriesParams {
  page?: number;
  search?: string;
  limit?: number;
}

export async function fetchCategories({
  page = 1,
  search = "",
  limit = 10,
}: FetchCategoriesParams) {
  const token = await getToken();

  const query = new URLSearchParams({
    page: page.toString(),
    search,
    limit: limit.toString(),
  });

  const response = await fetch(`${process.env.API}/categories?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: "no-store",
  });

  const payload = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
