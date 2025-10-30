import FiltersSidebar from "./_components/filters-sidbar/filters-sidebar";

export default function Page() {
  return (
    <main className="flex p-10">
      <FiltersSidebar />
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Product cards 
      </div>
    </main>
  );
}
