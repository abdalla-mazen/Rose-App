"use client";

import React, { useState, useEffect } from "react";
import Subtitle from "@/components/features/subtitle";
import { MostPopularApi } from "@/lib/apis/product.api";
import { useTranslations } from "next-intl";

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

  function allProducts(occasion: string) {
    if (!occasion) return;

    const redirectUrl = new URL(`${location.origin}/products`);
    redirectUrl.searchParams.set("occasion", occasion);

    location.href = redirectUrl.toString();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full my-40">
      <div className="flex items-center justify-between w-full mb-6">
        {/* Title */}
        <Subtitle title={t("homepage.mostPopular.title")} />

        {/* Occasion list */}
        <ul className="flex gap-6">
          {occasions.slice(0, 4).map((occasion) => (
            <li
              key={occasion._id}
              onClick={() => setSelectedOccasion(occasion._id)}
              className={`cursor-pointer transition font-medium ${
                selectedOccasion === occasion._id
                  ? "text-red-700"
                  : "text-gray-500 hover:text-red-700"
              }`}
            >
              {occasion.name}
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        // Products grid
        <div className="grid grid-cols-4 gap-6 w-full">
          {products.slice(0, 12).map((product) => (
            <div key={product._id} className="relative">
              {/* Image */}
              <div className="group relative overflow-hidden w-full max-h-[270px] rounded-xl">
                <img src={product.imgCover} alt={product.description} />

                {/* Image label */}
                {product.quantity > 0 ? (
                  <span className="absolute top-2.5 end-2.5 bg-slate-50 text-xs px-2 rounded-lg">
                    {t("homepage.mostPopular.product.new")}
                  </span>
                ) : (
                  <span className="absolute top-2.5 end-2.5 bg-red-700 text-white text-xs px-2 rounded-lg">
                    {t("homepage.mostPopular.product.out-of-stock")}
                  </span>
                )}

                {/* Image overlay */}
                <div className="absolute top-0 start-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#E6507380] flex items-center justify-center gap-2.5">
                  <button className="bg-white text-black w-7 h-7 rounded-full">
                    1
                  </button>
                  <button className="bg-white text-black w-7 h-7 rounded-full">
                    2
                  </button>
                </div>
              </div>

              {/* Product info */}
              <p className="mt-5 font-semibold text-lg text-start">
                {product.title}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span>stars</span>
                  <p className="font-medium">
                    {product.price} EGP{" "}
                    <span className="line-through text-gray-400">
                      {product.priceAfterDiscount} EGP
                    </span>
                  </p>
                </div>
                <span className="w-10 h-10 bg-red-600 rounded-full text-white flex items-center justify-center">
                  cart
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full mt-12 flex justify-end gap-1">
        <button
          onClick={() => allProducts(selectedOccasion)}
          className="text-red-700 font-semibold"
        >
          {" "}
          {t("homepage.mostPopular.view-btn")}{" "}
        </button>
        <span></span>
      </div>
    </div>
  );
}
