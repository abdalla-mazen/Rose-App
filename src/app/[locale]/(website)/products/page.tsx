import { getProducts } from "@/lib/apis/get-products.api";
import ProductsList from "./_components/product-list";
import FiltersSidebar from "./_components/filters-sidbar/filters-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import FiltersTrigger from "./_components/filters-sidbar/components/fillter-triagger";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
    } else if (value) {
      query.set(key, value);
    }
  });

  const products = await getProducts(query.toString());

  return (
    <main className="flex">
      <SidebarProvider>
        <FiltersSidebar />
        <FiltersTrigger />
      </SidebarProvider>
      <ProductsList products={products} />
    </main>
  );
}
