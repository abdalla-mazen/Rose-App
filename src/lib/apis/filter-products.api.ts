
const API_BASE_URL = "https://flower.elevateegy.com/api/v1";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const filtersApi = {
  async getFilters( page = 1, limit = 10) {
    const res = await fetch(`${API_BASE_URL}/occasions?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });
console.log( "res", res);
    if (!res.ok) {
      throw new ApiError(res.status, res.statusText);
    }
const data = await res.json();
console.log("data from api" , data);
    return data;
  },

  async getCategories(page = 1, limit = 10) {
       const res = await fetch(`${API_BASE_URL}/categories?page=${page}&limit=${limit}`,
      { cache: "no-store" }

    );
    if (!res.ok) {
      throw new ApiError(res.status, res.statusText);
    }
    const data = await res.json();
    return data;
  },
};
