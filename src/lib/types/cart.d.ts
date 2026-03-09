export interface CartResponse {
  message: string;
  numOfCartItems: number;
  cart: Cart;
}

export interface Cart {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: Coupon[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
}

export interface Product {
  _id: string;
  id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin?: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
}

export interface Coupon {
  _id?: string;
  code?: string;
  discount?: number;
}