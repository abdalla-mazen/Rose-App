import React from "react";
import ProductDetailsClient from "./product-details-client";
import { ProductByIdApi } from "@/lib/apis/product.api";

export default async function ProductDetailsServer({ id }: { id: string }) {
  // Product by ID API Call
  const product = await ProductByIdApi(id);

  return <ProductDetailsClient product={product.product} />;
}
