// Single Product inside wishlist
export interface WishlistProduct {
  _id: string;
  id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
}

// Wishlist object
export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Full API Response
export interface WishlistResponse {
  message: string;
  count: number;
  wishlist: Wishlist;
}