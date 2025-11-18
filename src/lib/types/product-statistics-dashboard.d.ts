declare type productStatistics = {
  message: string;

  productsByCategory: {
    _id: string;
    count: number;
    category: string;
    products: {
      title: string;
      price: number;
      imgCover: string;
      quantity: number;
      sold: number;
    };
  }[];

  topSellingProducts: {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    sold: number;
    id: string;
  }[];

  lowStockProducts: {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    quantity: number;
    id: string;
  }[];
};
