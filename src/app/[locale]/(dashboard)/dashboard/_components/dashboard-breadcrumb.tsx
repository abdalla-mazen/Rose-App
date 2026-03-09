"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProductBreadcrumb } from "@/lib/contexts/product-breadcrumb.context";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  const { title } = useProductBreadcrumb();
  const segments = pathname.split("/").filter(Boolean);

  // Flags
  const isAddProduct = segments.includes("add-product");
  const isUpdateProduct = Boolean(title);
  const isProductsRoot = segments.includes("products");
  const isOccasionsRoot = segments.includes("occasions");
  const isCategoriesRoot = segments.includes("categories");

  return (
    <nav className="bg-white p-4 border-b text-sm text-gray-500 dark:text-white dark:bg-zinc-700  w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Dashboard root */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="dark:text-white">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Products */}
          {isProductsRoot && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/products" className="dark:text-white">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {/* Add Product */}
          {isAddProduct && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="dark:text-white">Add Product</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {/* Update Product */}
          {isUpdateProduct && !isAddProduct && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="dark:text-white">Update Product: {title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {/* Occasions */}
          {isOccasionsRoot && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/occasions" className="dark:text-white">
                    Occasions
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {/* Categories */}
          {isCategoriesRoot && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/categories" className="dark:text-white">
                    Categories
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
