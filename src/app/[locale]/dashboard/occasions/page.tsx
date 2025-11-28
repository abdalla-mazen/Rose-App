import React, { Suspense } from "react";
import { FetchOccasions } from "@/lib/apis/occasion.api";
import TableOccasions from "./_components/table-occasions";
import { TableOccasionsSkeleton } from "@/components/skeletons/occasions-table.skeletons";
import AddOccasionsBtn from "./_components/add-occasions-btn";


export default async function page() {
  // Fetch occasions
  const data = await FetchOccasions();

  return (
    <div className="  bg-white px-6 rounded-lg  w-full mt-5">
      <div className="flex justify-between pt-6 mb-5   ">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-zinc-800   ">All Occasions</h1>

        {/* Add occasions button */}
        <AddOccasionsBtn />
      </div>

      {/* Occasions Table */}
      <Suspense fallback={<TableOccasionsSkeleton />}>
        <TableOccasions data={data} />
      </Suspense>
    </div>
  );
}
