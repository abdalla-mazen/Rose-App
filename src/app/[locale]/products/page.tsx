import Header from "@/components/layout/header";
import { ProductsFiltersPanel } from "@/components/shared/productsFilters/filtters-panal";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="gap-6 grid grid-cols-1 md:grid-cols-[250px_1fr] mx-auto py-8 container">
        {/* filters */}
        <ProductsFiltersPanel />

        {/* products */}
        <section className="bg-white dark:bg-zinc-900 p-4 border rounded-xl">
          <p className="text-muted-foreground"></p>
        </section>
      </div>
    </>
  );
}
