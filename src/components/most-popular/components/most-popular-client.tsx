// "use client";

// import React, { useState, useEffect } from "react";
// import Subtitle from "@/components/shared/subtitle";
// import { MostPopularApi } from "@/lib/apis/product.api";
// import { useTranslations } from "next-intl";
// import { MoveLeft, MoveRight } from "lucide-react";
// import CardProduct from "@/app/[locale]/(website)/products/_components/card-product";

// // Props type
// type Occasion = {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string;
//   isSuperAdmin: boolean;
//   productsCount: number;
//   createdAt: string;
//   updatedAt?: string;
// };
// type Props = {
//   occasions: Occasion[];
//   products: Product[];
//   locale: string;
//   // product: Product;
// };

// export default function MostPopularClient({ occasions, products: initialProducts, locale }: Props) {
//   // Translations
//   const t = useTranslations();

//   // Hooks
//   const [selectedOccasion, setSelectedOccasion] = useState<string>(occasions[0]?._id || "");
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [loading, setLoading] = useState(false);

//   // Fetch products when selectedOccasion changes Effect



//   useEffect(() => {
//     if (!selectedOccasion) return;

//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         console.log(selectedOccasion);
//         const prods = await MostPopularApi(selectedOccasion);
//         console.log(prods);
//         setProducts(prods);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [selectedOccasion]);

//   // Navigation to all products page by search param(selected occasion)
//   function allProducts(occasion: string) {
//     if (!occasion) return;

//     const redirectUrl = new URL(`${location.origin}/products`);
//     redirectUrl.searchParams.set("occasion", occasion);
//     location.href = redirectUrl.toString();
//   }

//   return (
//     <div className="flex flex-col justify-center items-center mt-40 w-full">
//       <div className="flex justify-between items-center mb-6 w-full">
//         <Subtitle title={t("mostpopular-title")} />

//         <ul className="flex gap-6">
//           {occasions.slice(0, 4).map((occasion) => (
//             <li
//               key={occasion.name}
//               onClick={() => setSelectedOccasion(occasion._id)}
//               className={`cursor-pointer transition font-medium ${
//                 selectedOccasion === occasion._id
//                   ? "text-maroon-600 dark:text-softPink-200"
//                   : "dark:text-zinc-400 text-zinc-700 dark:hover:text-softPink-200 hover:text-maroon-600"
//               }`}
//             >
//               {occasion.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Skeleton loader*/}
//       {loading ? (
//         <div className="gap-6 grid grid-cols-4 w-full">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div
//               key={i}
//               className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl overflow-hidden animate-pulse"
//             >
//               <div className="bg-gray-200 dark:bg-gray-700 h-56"></div>
//               <div className="space-y-3 p-4">
//                 <div className="bg-gray-200 dark:bg-gray-700 rounded w-3/4 h-4"></div>
//                 <div className="bg-gray-200 dark:bg-gray-700 rounded w-1/2 h-4"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="gap-6 grid grid-cols-4 w-full">
//           {products.slice(0, 12).map((product) => (
//             <CardProduct key={product._id} product={product} />
//           ))}
//         </div>
//       )}

//       <div className="flex justify-end items-center gap-2 mt-12 w-full font-semibold text-maroon-600 dark:text-softPink-200 cursor-pointer">
//         <button onClick={() => allProducts(selectedOccasion)}>{t("mostpopular-view-btn")}</button>
//         <span>{locale === "ar" ? <MoveLeft /> : <MoveRight />}</span>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import Subtitle from "@/components/shared/subtitle";
import { MostPopularApi } from "@/lib/apis/product.api";
import { useTranslations } from "next-intl";
import { MoveLeft, MoveRight } from "lucide-react";
import CardProduct from "@/app/[locale]/(website)/products/_components/card-product";

// Types
type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
  createdAt: string;
  updatedAt?: string;
};

type Props = {
  occasions: Occasion[];
  products: Product[];
  locale: string;
};

export default function MostPopularClient({
  occasions,
  products: initialProducts,
  locale,
}: Props) {
  const t = useTranslations();

  const [selectedOccasion, setSelectedOccasion] = useState<string>(
    occasions[0]?._id || "",
  );
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  // Fetch products when occasion changes
  useEffect(() => {
    if (!selectedOccasion) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const prods = await MostPopularApi(selectedOccasion);
        setProducts(prods);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedOccasion]);

  // Navigate to products page with selected occasion
  function allProducts(occasion: string) {
    if (!occasion) return;

    const redirectUrl = new URL(`${location.origin}/products`);
    redirectUrl.searchParams.set("occasion", occasion);
    location.href = redirectUrl.toString();
  }

  return (
    <section className="flex flex-col items-center mt-20 w-full px-4 lg:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 w-full lg:flex-row lg:justify-between lg:items-center">
        <Subtitle title={t("mostpopular-title")} />

        {/* Occasions Tabs */}
        <ul className="flex gap-4 overflow-x-auto whitespace-nowrap w-full lg:w-auto pb-1">
          {occasions.slice(0, 4).map((occasion) => (
            <li
              key={occasion._id}
              onClick={() => setSelectedOccasion(occasion._id)}
              className={`cursor-pointer transition font-medium ${
                selectedOccasion === occasion._id
                  ? "text-maroon-600 dark:text-softPink-200"
                  : "text-zinc-700 dark:text-zinc-400 hover:text-maroon-600 dark:hover:text-softPink-200"
              }`}
            >
              {occasion.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Products / Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 dark:bg-gray-700 h-56"></div>
              <div className="space-y-3 p-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded w-3/4 h-4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded w-1/2 h-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {products.slice(0, 12).map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* View All */}
      <div className="flex justify-end items-center gap-2 mt-12 w-full font-semibold text-maroon-600 dark:text-softPink-200 cursor-pointer">
        <button onClick={() => allProducts(selectedOccasion)}>
          {t("mostpopular-view-btn")}
        </button>
        <span>{locale === "ar" ? <MoveLeft /> : <MoveRight />}</span>
      </div>
    </section>
  );
}
