import React, { Suspense } from "react";
import { fetchOccasions } from "@/lib/apis/occasion.api";
import TableOccasions from "./_components/table-occasions";
import { TableOccasionsSkeleton } from "@/components/skeletons/occasions-table.skeletons";
import AddOccasionsBtn from "./_components/add-occasions-btn";
import { getTranslations } from "next-intl/server";

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function page({ searchParams }: PageProps) {
  // Translations
  const t = await getTranslations();

  // Variables
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  // Fetch occasions with pagination
  const data = await fetchOccasions({ page, search, limit: 10 });

  return (
    <div className="bg-white px-6 rounded-lg w-full mt-5 dark:bg-zinc-800 ">
      <div className="flex justify-between pt-6 mb-5">
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">{t("all-occasions")}</h1>
        <AddOccasionsBtn />
      </div>

      <Suspense fallback={<TableOccasionsSkeleton />}>
        <TableOccasions
          data={data.occasions}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
          totalCount={data.totalCount}
        />
      </Suspense>
    </div>
  );
}
