import { getOccasions } from "@/lib/apis/get-occasion.api";
import React from "react";
import UpdateOccasionsForm from "../_components/update-occasions-form";

export default async function page({ params }: { params: { id: string } }) {
  // Fetch specific occasion
  const data = await getOccasions(params.id);

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-semibold text-zinc-800 py-7">
        Update Occasion: {data.occasion.name}
      </h1>

      {/* Form */}
      <div className=" py-6   bg-white  rounded-lg   ps-6 ">
        <UpdateOccasionsForm data={data.occasion} />
      </div>
    </div>
  );
}
