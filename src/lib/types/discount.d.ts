
// types/api.ts

export interface Product {
  _id: string;
  id?: string; // في بعض الـ responses بيبقى فيه both _id و id
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number | null;
  quantity: number;
  category: string;
  occasion?: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number;
  isSuperAdmin?: boolean;
  sold?: number;
  rateAvg?: number;
  rateCount?: number;
}

export interface CartItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

export interface AppliedCoupon {
  coupon: string; // coupon id
  discountAmount: number;
  appliedAt: string; // ISO date string
  _id: string;
}

export interface Cart {
  _id: string;
  user: string; // user id
  cartItems: CartItem[];
  appliedCoupons: AppliedCoupon[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  discount?: number; // aggregated discount on cart
  totalPriceAfterDiscount?: number;
}

export interface CouponApplyResponse {
  message: string;
  cart: Cart;
  discountAmount?: number; // top-level duplicate (if present)
  totalAfterDiscount?: number; // top-level duplicate (if present)
}

/* -- Optionals / Helper types -- */

// Generic API wrapper if your backend returns a consistent shape
export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, unknown> | string[];
}


