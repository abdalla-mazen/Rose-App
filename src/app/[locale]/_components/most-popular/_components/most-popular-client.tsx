"use client";

import React, { useState, useEffect } from "react";
import Subtitle from "@/components/shared/subtitle";
import { MostPopularApi } from "@/lib/apis/product.api";
import { useTranslations } from "next-intl";
import DisplayProduct from "../../display-product";
import { MoveRight } from "lucide-react";

// Props type
type Props = {
  occasions: Occasion[];
  products: Product[];
};

export default function MostPopularClient({
  occasions,
  products: initialProducts,
}: Props) {
  // Translations
  const t = useTranslations();

  // Hooks
  const [selectedOccasion, setSelectedOccasion] = useState<string>(
    occasions[0]?._id || ""
  );
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  // Fetch products when selectedOccasion changes Effect
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

  // Navigation to all products page by search param(selected occasion)
  function allProducts(occasion: string) {
    if (!occasion) return;
    const redirectUrl = new URL(`${location.origin}/products`);
    redirectUrl.searchParams.set("occasion", occasion);
    location.href = redirectUrl.toString();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full my-40">
      <div className="flex items-center justify-between w-full mb-6">
        <Subtitle title={t("mostpopular-title")} />

        <ul className="flex gap-6">
          {occasions.slice(0, 4).map((occasion) => (
            <li
              key={occasion.name}
              onClick={() => setSelectedOccasion(occasion._id)}
              className={`cursor-pointer transition font-medium ${
                selectedOccasion === occasion._id
                  ? "text-[#A6252A]"
                  : "text-[#3F3F46] hover:text-[#A6252A]"
              }`}
            >
              {occasion.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Skeleton loader*/}
      {loading ? (
        <div className="grid grid-cols-4 gap-6 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-md overflow-hidden"
            >
              <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6 w-full">
          {products.slice(0, 12).map((product) => (
            <DisplayProduct key={product._id} {...product} />
          ))}
        </div>
      )}

      <div className="w-full mt-12 flex justify-end items-center gap-2 text-[#741C21] dark:text-[#FFC2D0] font-semibold">
        <button onClick={() => allProducts(selectedOccasion)}>
          {t("mostpopular-view-btn")}
        </button>
        <span>
          <MoveRight />
        </span>
      </div>
    </div>
  );
}
