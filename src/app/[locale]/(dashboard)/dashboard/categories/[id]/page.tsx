
import { getCategory } from "@/lib/apis/get-category.api";
import UpdateCategoriesForm from "../_components/update-categories-form";

export default async function page({ params }: { params: { id: string } }) {
  // Fetch specific category
  const data = await getCategory(params.id);

  return (
    <div className="ms-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-zinc-800 py-7">
        Update Category: {data.category.name}
      </h1>

      {/* Form */}
      <div className="py-6 bg-white rounded-lg ps-6">
        <UpdateCategoriesForm data={data.category} />
      </div>
    </div>
  );
}
