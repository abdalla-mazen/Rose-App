export interface Product {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity?: number;
  description?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  products: CartItem[];
  totalPrice: number;
  user: string;
}

export interface CartResponse {
  status: string;
  data: Cart;
}

export interface RecommendationsResponse {
  status: string;
  products: Product[];
}