import React, { Suspense } from "react";
import DashboardProductsDetailsServer from "./_components/dashboard-products-details-server";
import UpdateProductSkeleton from "@/components/skeletons/update-product.skeleton";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<UpdateProductSkeleton />}>
      <DashboardProductsDetailsServer id={params.id} />
    </Suspense>
  );
}
