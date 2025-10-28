//api

import { FiltersResponse } from "../types/filters";


const API_BASE_URL = process.env.NEXT_PUBLIC_API;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const filtersApi = {
  async getFilters(): Promise<FiltersResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/search/filters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `Failed to fetch filters: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error("Network error while fetching filters");
    }
  },

  async getOccasions(page: number = 1, limit: number = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/filters?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `Failed to fetch occasions: ${response.statusText}`
        );
      }

      const data = await response.json();
      return {
        occasions: data.filters.occasions,
        hasMore: data.filters.occasions.length === limit,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error("Network error while fetching occasions");
    }
  },
};