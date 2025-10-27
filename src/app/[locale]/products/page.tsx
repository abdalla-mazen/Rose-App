import { Suspense } from "react";
import Header from "@/components/layout/header";
import { ProductsFiltersPanel } from "@/components/shared/productsFilters/filtters-panal";
import ProductsSkeletons from "@/components/skeletons/products-skeletons/products.skeletons";
import ProductsList from "./_components/product-list";
import PaginationComponent from "@/components/shared/custom-pagination";
import { GetProductsApi } from "@/lib/apis/get-products.api";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    category?: string;
    rating?: string;
    occasion?: string;
    price?: string;
  };
}) {
  // Pagination
  const page = Number(searchParams.page) || 1;
  const limit = 12;

  // Filters
  const filters = {
    category: searchParams.category || "",
    rating: searchParams.rating ? Number(searchParams.rating) : undefined,
    occasion: searchParams.occasion || "",
    price: searchParams.price || "",
  };

  // pagination + filters
  const res = await GetProductsApi({
    page,
    limit,
    ...filters,
  });

  const { products, metadata } = res;
  const totalPages = metadata?.totalPages ?? 1;

  return (
    <>
      <Header />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-[250px_1fr] mx-auto py-8 container">
        {/* Filters Panel */}
        <ProductsFiltersPanel />

        {/* Products List */}
        <section className="p-6">
          <Suspense fallback={<ProductsSkeletons />}>
            <ProductsList products={products} />
          </Suspense>

          {/* Pagination */}
          <PaginationComponent
            totalPages={totalPages}
            initialPage={page}
            currentPage={page}
          />
        </section>
      </div>
    </>
  );
}