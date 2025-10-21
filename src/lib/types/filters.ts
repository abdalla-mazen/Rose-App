// types filter products 

export interface Occasion {
  _id: string;
  name: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface RatingRange {
  min: number;
  max: number;
}

export interface FiltersResponse {
  message: string;
  filters: {
    categories: Category[];
    occasions: Occasion[];
    priceRange: PriceRange;
    ratingRange: RatingRange;
  };
}

export interface ProductFilters {
  occasionIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: string[];
  minRating?: number;
  maxRating?: number;
}