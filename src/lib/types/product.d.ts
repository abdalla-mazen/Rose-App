declare type Product = {
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  discount?: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: string | null;
  isInWishlist: boolean;
  _id: string;
} & DatabaseProperties;

declare type AddUpdateProduct = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rateAvg: number;
  rateCount: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  __v: number;
} & DatabaseProperties;

declare type Review = {
  _id: string;
  product: {
    _id: string;
    title: string;
    imgCover: string;
    id: string;
  };
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  title: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

declare type ReviewsResponse = {
  reviews: Review[];
};

declare type SendReview = {
  product: string;
  rating: number;
  title: string;
  comment: string;
};
type ProductByIdResponse = ApiResponse<{ product: Product }>;
