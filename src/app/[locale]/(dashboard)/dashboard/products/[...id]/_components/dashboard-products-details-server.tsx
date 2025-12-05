import React from "react";
import UpdateProductForm from "./update-product-form";

// Props
type Props = {
  product: Product;
  categories: Category[];
  occasions: Occasion[];
};

export default async function DashboardProductsDetailsServer({
  categories,
  occasions,
  product,
}: Props) {
  return (
    <div className="p-7">
      {/* Add product title */}
      <h1 className="font-semibold text-2xl mb-7">Update Product: {product.title}</h1>

      {/* Update product form */}
      <UpdateProductForm product={product} occasions={occasions} categories={categories} />
    </div>
  );
}
