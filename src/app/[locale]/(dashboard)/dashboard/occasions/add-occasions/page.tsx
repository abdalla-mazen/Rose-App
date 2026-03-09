import React from "react";
import AddOccasionsForm from "../_components/add-occasions-form";

export default function page() {
  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl text-zinc-800 font-semibold dark:text-zinc-50">Add a New Occasion</h1>

      {/* Form */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg">
        <AddOccasionsForm />
      </div>
    </div>
  );
}
