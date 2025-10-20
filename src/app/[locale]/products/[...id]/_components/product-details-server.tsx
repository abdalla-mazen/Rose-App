import React from "react";
import ProductDetailsClient from "./product-details-client";

export default function ProductDetailsServer({
  product,
}: {
  product: Product;
}) {
  return <ProductDetailsClient product={product} />;
}
