declare type DatabaseProperties = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  passwordChangedAt?: string;
};

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
} & T;

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
