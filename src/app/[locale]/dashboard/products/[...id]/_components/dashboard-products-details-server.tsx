import { ProductByIdApi } from "@/lib/apis/product.api";
import React from "react";
import UpdateProductForm from "./update-product-form";
import { FetchOccasions } from "@/lib/apis/occasion.api";
import { FetchCategories } from "@/lib/apis/categories.api";

export default async function DashboardProductsDetailsServer({ id }: { id: string }) {
  // Product by ID API Call
  const { product } = await ProductByIdApi(id);

  // Fetch occasions
  const occasions = await FetchOccasions();

  // Fetch categories
  const categories = await FetchCategories();

  return (
    <div className="p-7">
      {/* Add product title */}
      <h1 className="font-semibold text-2xl mb-7">Update Product: {product.title}</h1>

      {/* Update product form */}
      <UpdateProductForm product={product} occasions={occasions} categories={categories} />
    </div>
  );
}
