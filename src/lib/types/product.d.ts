declare type Product = {
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
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
} & DatabaseProperties;
