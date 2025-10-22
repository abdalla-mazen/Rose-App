declare type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
} & DatabaseProperties;

declare type CategoriesResponse = {
  categories: Category[];
};
