import { fetchOccasions } from "@/lib/apis/occasion.api";
import AddProductForm from "./_components/add-product-form";
import { FetchCategories } from "@/lib/apis/categories.api";

export default async function Page() {
  // Fetch occasions
  const occasions = await fetchOccasions();

  // Fetch categories
  const categories = await FetchCategories();

  return (
    <div className="p-7">
      {/* Add product title */}
      <h1 className="font-semibold text-2xl mb-7">Add a New Product</h1>

      {/* Add product form */}
      <AddProductForm occasions={occasions.occasions} categories={categories} />
    </div>
  );
}
