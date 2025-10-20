declare type AddToCartResponse = {
  message: string;
  numOfCartItems: number;
  cart: {
    user: string;
    cartItems: [
      {
        product: {
          rateAvg: number;
          rateCount: number;
          title: string;
          slug: string;
          description: string;
          imgCover: string;
          images: [string, string];
          price: number;
          priceAfterDiscount: number;
          quantity: number;
          category: string;
          occasion: string;
          __v: number;
          isSuperAdmin: boolean;
          sold: number;
          id: string;
        } & DatabaseProperties;
        price: number;
        quantity: number;
        _id: string;
      }
    ];
    appliedCoupons: [];
    totalPrice: 1160;
    __v: number;
  } & DatabaseProperties;
};
