"use client";

import { useEffect, useState } from "react";
import FilterSection from "./filter-section";
import CategoriesFilter from "./components/categories-filter";
import OccasionFilter from "./components/occasion-filter";
import PriceFilter from "./components/price-filter";
import { useFilters } from "@/hooks/use-filters";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export default function FiltersSidebar() {
  const { currentFilters, resetCategories, resetOccasions } = useFilters();
  const { state } = useSidebar(); // 👈 نعرف مفتوح ولا مقفول

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div suppressHydrationWarning />;

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon"    className="relative top-0 h-full">
      <SidebarHeader className="flex justify-center">
        
        <SidebarTrigger />

        
        {state !== "collapsed" && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Filters
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>

    
      {state !== "collapsed" && (
        <SidebarContent className="p-4 space-y-6">
          <FilterSection
            title="Categories"
            onReset={resetCategories}
            hasActiveFilters={!!currentFilters.categoryIds?.length}
          >
            <CategoriesFilter />
          </FilterSection>

          <FilterSection
            title="Occasions"
            onReset={resetOccasions}
            hasActiveFilters={!!currentFilters.occasionIds?.length}
          >
            <OccasionFilter />
          </FilterSection>

          <FilterSection title="Price">
            <PriceFilter />
          </FilterSection>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
