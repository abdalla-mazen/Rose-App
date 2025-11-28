import React from "react";
import AddOccasionsForm from "../_components/add-occasions-form";

export default function page() {
  return (
    <div className="mt-7 ">
      {/* Header */}
      <h1  className="text-2xl text-zinc-800 font-semibold mb-6" >Add a New Occasion</h1>

      {/* Form */}
      <div className="bg-white py-6 ps-6 rounded-lg">

      <AddOccasionsForm />
      </div>
    </div>
  );
}
