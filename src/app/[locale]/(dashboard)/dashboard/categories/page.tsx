import React, { Suspense } from "react";

import TableCategories from "./_components/table-categories";

import AddCategoriesBtn from "./_components/add-categories-btn";
import { TableOccasionsSkeleton } from "@/components/skeletons/occasions-table.skeletons";
import { fetchCategories } from "@/lib/apis/categories-dashboard.api";

interface PageProps {
  searchParams: { page?: string; search?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const data = await fetchCategories({ page, search, limit: 10 });

  return (
    <div className="w-full mt-5 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 capitalize dark:text-zinc-50">
          all categories
        </h1>
        <AddCategoriesBtn />
      </div>

      <div className="bg-white dark:bg-zinc-800 dark:border-zinc-700 border rounded-xl shadow-sm p-6">
        <Suspense fallback={<TableOccasionsSkeleton />}>
          <TableCategories
            data={data.categories}
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            totalCount={data.totalCount}
          />
        </Suspense>
      </div>
    </div>
  );
}
