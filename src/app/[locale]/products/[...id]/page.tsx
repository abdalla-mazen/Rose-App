import { ProductByIdApi } from "@/lib/apis/product.api";
import React, { Suspense } from "react";
import ProductDetailsServer from "./_components/product-details-server";
import ProductLoader from "./_components/product-loader";

export default async function Page({ params }: { params: { id: string } }) {
  // Get ID from params
  const { id } = params;

  // Product by ID API Call
  const product = await ProductByIdApi(id);

  return (
    <Suspense fallback={<ProductLoader />}>
      <ProductDetailsServer product={product.product} />
    </Suspense>
  );
}
