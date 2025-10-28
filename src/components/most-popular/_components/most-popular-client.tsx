"use client";

import React, { useState, useEffect } from "react";
import Subtitle from "@/components/shared/subtitle";
import { MostPopularApi } from "@/lib/apis/product.api";
import { useTranslations } from "next-intl";
import DisplayProduct from "../../display-product";
import { MoveLeft, MoveRight } from "lucide-react";

// Props type
type Props = {
  occasions: Occasion[];
  products: Product[];
  locale: string;
  // product: Product;
};

export default function MostPopularClient({ occasions, products: initialProducts, locale }: Props) {
  // Translations
  const t = useTranslations();

  // Hooks
  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasions[0]?._id || "");
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
    <div className="flex flex-col justify-center items-center my-40 w-full">
      <div className="flex justify-between items-center mb-6 w-full">
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
        <div className="gap-6 grid grid-cols-4 w-full">
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
        <div className="gap-6 grid grid-cols-4 w-full">
          {products.slice(0, 12).map((product) => (
            <DisplayProduct key={product._id} {...product} />
          ))}
        </div>
      )}

      <div className="flex justify-end items-center gap-2 mt-12 w-full font-semibold text-[#741C21] dark:text-[#FFC2D0] cursor-pointer">
        <button onClick={() => allProducts(selectedOccasion)}>{t("mostpopular-view-btn")}</button>
        <span>{locale === "ar" ? <MoveLeft /> : <MoveRight />}</span>
      </div>
    </div>
  );
}
