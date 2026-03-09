import React from "react";
import AddCategoriesForm from "../_components/add-categories-form";

export default function page() {
  return (
    <div >
      {/* Header */}
      <h1 className="text-2xl text-zinc-800 font-semibold ">Add a New Category</h1>

      {/* Form */}
      <div className="bg-white w-full rounded-lg dark:bg-zinc-800">
        <AddCategoriesForm />
      </div>
    </div>
  );
}
