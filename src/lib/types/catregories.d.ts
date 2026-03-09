// Pagination metadata
export interface PaginationMetadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

// Category item
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  isSuperAdmin: boolean;
  productsCount: number;
}

// Main API response
export interface CategoriesResponse {
  message: string;
  metadata: PaginationMetadata;
  categories: Category[];
}
