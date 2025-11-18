import React, { Suspense } from "react";
import ProductDetailsServer from "./_components/product-details-server";
import ProductDetailsSkeleton from "@/components/skeletons/product-details.skeleton";
import ProductReviews from "./_components/product-reviews/_components/product-reviews";
import RelatedProducts from "./_components/related-products/related-products";

export default async function Page({ params }: { params: { id: string } }) {
  // Get ID from params
  const { id } = params;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsServer id={id} />
      <ProductReviews productId={id} />
      <RelatedProducts productId={id} />
    </Suspense>
  );
}
