import { FiltersSidebar } from "./_components";
import { GetProductsApi } from "@/lib/apis/get-products.api";
import { Suspense } from "react";
import ProductsSkeletons from "@/components/skeletons/products-skeletons/products.skeletons";
import ProductsList from "./_components/product-list";
import PaginationComponent from "@/components/shared/custom-pagination";

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  // Variables
  const page = Number(searchParams.page) || 1;
  const limit = 12;
  const res = await GetProductsApi({ page, limit });
  const { products, metadata } = res;
  const totalPages = metadata?.totalPages ?? 1;

  return (
    <main className="flex p-10">
      <FiltersSidebar />
      <div className="flex flex-1 justify-center items-center text-gray-500">Product cards</div>
      <main className="p-6 w-954">
        {/* Show products with loading skeleton */}
        <Suspense fallback={<ProductsSkeletons />}>
          <ProductsList products={products} />
        </Suspense>

        {/* Pagination */}
        <PaginationComponent totalPages={totalPages} initialPage={page} currentPage={page} />
      </main>
    </main>
  );
}
