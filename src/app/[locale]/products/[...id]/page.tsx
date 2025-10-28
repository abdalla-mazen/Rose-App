import React, { Suspense } from "react";
import ProductDetailsServer from "./_components/product-details-server";
import ProductDetailsSkeleton from "@/components/skeletons/product-details.skeleton";

export default async function Page({ params }: { params: { id: string } }) {
  // Get ID from params
  const { id } = params;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsServer id={id} />
    </Suspense>
  );
}
