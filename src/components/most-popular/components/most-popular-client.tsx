"use client";

import React, { useState, useEffect } from "react";
import Subtitle from "@/components/shared/subtitle";
import { MostPopularApi } from "@/lib/apis/product.api";
import { useTranslations } from "next-intl";
import { MoveLeft, MoveRight } from "lucide-react";
import CardProduct from "@/app/[locale]/products/_components/card-product";

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
        console.log(prods);

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
                  ? "text-maroon-600 dark:text-softPink-200"
                  : "dark:text-zinc-400 text-zinc-700 dark:hover:text-softPink-200 hover:text-maroon-600"
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
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-end items-center gap-2 mt-12 w-full font-semibold text-maroon-600 dark:text-softPink-200 cursor-pointer">
        <button onClick={() => allProducts(selectedOccasion)}>{t("mostpopular-view-btn")}</button>
        <span>{locale === "ar" ? <MoveLeft /> : <MoveRight />}</span>
      </div>
    </div>
  );
}
