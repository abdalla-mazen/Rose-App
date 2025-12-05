// "use client";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Fragment } from "react";

// export default function DashboardBreadcrumb() {
//   const pathname = usePathname();
//   let pathArray = pathname.split("/").filter((x) => x);

//   // Remove locale segments (en or ar)
//   if (pathArray[0] === "en" || pathArray[0] === "ar") {
//     pathArray = pathArray.slice(1);
//   }

//   return (
//     <nav className="bg-white p-4 border-zinc-100 border-b w-full text-gray-500 text-sm">
//       <div className="flex items-center gap-1">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link href="/dashboard" className="capitalize">
//                   dashboard{" "}
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             {pathArray.length >= 2 && <BreadcrumbSeparator />}
//             {pathArray.slice(1).map((link, index) => {
//               const href = "/" + pathArray.slice(1, index + 1).join("/");
//               const isLast = index === pathArray.slice(1).length - 1;
//               return (
//                 <Fragment key={index}>
//                   <BreadcrumbItem>
//                     {!isLast ? (
//                       <BreadcrumbLink asChild>
//                         <Link href={href} className="capitalize">
//                           {link}
//                         </Link>
//                       </BreadcrumbLink>
//                     ) : (
//                       <BreadcrumbPage className="capitalize">{link}</BreadcrumbPage>
//                     )}
//                   </BreadcrumbItem>
//                   {!isLast && <BreadcrumbSeparator />}
//                 </Fragment>
//               );
//             })}
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>
//     </nav>
//   );
// }

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
    <nav className="bg-white p-4 border-b text-sm text-gray-500">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Dashboard root */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Products */}
          {isProductsRoot && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {/* Add Product */}
          {isAddProduct && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Product</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {/* Update Product */}
          {isUpdateProduct && !isAddProduct && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Update Product: {title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {/* Occasions */}
          {isOccasionsRoot && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/occasions">Occasions</Link>
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
                  <Link href="/dashboard/categories">Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
