import FiltersSidebar from "./_components/filters-sidbar/filters-sidebar";

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
