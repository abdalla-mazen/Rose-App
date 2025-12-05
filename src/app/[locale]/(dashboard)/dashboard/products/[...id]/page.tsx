import React, { Suspense } from "react";
import DashboardProductsDetailsServer from "./_components/dashboard-products-details-server";
import UpdateProductSkeleton from "@/components/skeletons/update-product.skeleton";
import { ProductByIdApi } from "@/lib/apis/product.api";
import { FetchCategories } from "@/lib/apis/categories.api";
import SetBreadcrumbTitle from "@/components/set-breadcrumb-title";
import { fetchOccasions } from "@/lib/apis/occasion.api";

export default async function Page({ params }: { params: { id: string } }) {
  // Product by ID API Call
  const { product } = await ProductByIdApi(params.id);

  // Fetch occasions and categories in parallel
  const [occasions, categories] = await Promise.all([fetchOccasions(), FetchCategories()]);

  return (
    <SetBreadcrumbTitle title={product.title}>
      <Suspense fallback={<UpdateProductSkeleton />}>
        <DashboardProductsDetailsServer
          product={product}
          occasions={occasions.occasions}
          categories={categories}
        />
      </Suspense>
    </SetBreadcrumbTitle>
  );
}
