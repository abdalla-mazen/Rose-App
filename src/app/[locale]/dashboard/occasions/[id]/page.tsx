import { getOccasions } from "@/lib/apis/get-occasion.api";
import React from "react";
import UpdateOccasionsForm from "../_components/update-occasions-form";

export default async function page({ params }: { params: { id: string } }) {
  // Fetch specific occasion
  const data = await getOccasions(params.id);

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-semibold text-zinc-800">Update Occasion {data.occasion.name}</h1>

      {/* Form */}
      <UpdateOccasionsForm data={data.occasion} />
    </div>
  );
}
