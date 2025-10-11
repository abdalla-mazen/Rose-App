import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function DisplayProduct(product: Product) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  return (
    <div key={product._id} className="relative">
      {/* Image */}
      <div className="group relative overflow-hidden w-full h-[270px] rounded-xl">
        <Image
          src={product.imgCover}
          alt={product.description || "product image"}
          fill
        />

        {/* Image label */}
        {product.quantity > 0 ? (
          <span className="absolute uppercase top-2.5 end-2.5 bg-[#F4F4F5] text-xs px-2 rounded-lg">
            {t("new")}
          </span>
        ) : (
          <span className="absolute uppercase top-2.5 end-2.5 bg-[#DC2626] text-white text-xs px-2 rounded-lg">
            {t("out-of-stock")}
          </span>
        )}

        {/* Image overlay */}
        <div className="absolute top-0 start-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#E6507380] text-red-600 flex items-center justify-center gap-2.5">
          <button className="bg-white w-7 h-7 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-white w-7 h-7 rounded-full flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product info */}
      {/* Product header */}
      <p className="mt-5 font-semibold text-lg text-start text-[#741C21] dark:text-[#FFC2D0]">
        {product.title.split(" ").length > 5
          ? `${product.title.split(" ").slice(0, 4).join(" ")} ...`
          : product.title}
      </p>

      {/* Product footer */}
      <div className="flex items-center justify-between">
        <div>
          <span>{t("stars")}</span>
          <p className="font-medium text-[#F05454] dark:text-[#FFC2D0]">
            {format.number(product.price, {
              style: "currency",
              currency: "EGP",
            })}{" "}
            {/* Price after discount if available */}
            {product.priceAfterDiscount && (
              <span className="line-through text-gray-400">
                {format.number(product.priceAfterDiscount, {
                  style: "currency",
                  currency: "EGP",
                })}
              </span>
            )}
          </p>
        </div>
        <span className="w-10 h-10 bg-[#A6252A] dark:bg-[#CD2E33] rounded-full text-white flex items-center justify-center">
          <ShoppingCart />
        </span>
      </div>
    </div>
  );
}
