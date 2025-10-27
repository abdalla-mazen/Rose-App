import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DisplayProduct(product: Product) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  return (
    <div key={product._id} className="relative">
      {/* Image */}
      <div className="group relative rounded-xl w-full h-[270px] overflow-hidden">
        <Image
          src={product.imgCover}
          alt={product.description || "product image"}
          fill
        />

        {/* Image label */}
        {product.quantity > 0 ? (
          <span className="top-2.5 absolute bg-[#F4F4F5] px-2 rounded-lg text-xs uppercase end-2.5">
            {t("new")}
          </span>
        ) : (
          <span className="top-2.5 absolute bg-[#DC2626] px-2 rounded-lg text-white text-xs uppercase end-2.5">
            {t("out-of-stock")}
          </span>
        )}

        {/* Image overlay */}
        <div className="top-0 absolute flex justify-center items-center gap-2.5 bg-[#E6507380] opacity-0 group-hover:opacity-100 w-full h-full text-red-600 transition-opacity duration-300 start-0">
          <button className="flex justify-center items-center bg-white rounded-full w-7 h-7">
            <Heart className="w-5 h-5" />
          </button>
          <Link
            href={`/products/${product._id}`}
            className="flex justify-center items-center bg-white rounded-full w-7 h-7"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Product info */}
      {/* Product header */}
      <p className="mt-5 font-semibold text-[#741C21] dark:text-[#FFC2D0] text-lg text-start">
        {product.title.split(" ").length > 5
          ? `${product.title.split(" ").slice(0, 4).join(" ")} ...`
          : product.title}
      </p>

      {/* Product footer */}
      <div className="flex justify-between items-center">
        <div>
          <span>{t("stars")}</span>
          <p className="font-medium text-[#F05454] dark:text-[#FFC2D0]">
            {format.number(product.price, {
              style: "currency",
              currency: "EGP",
            })}{" "}
            {/* Price after discount if available */}
            {product.priceAfterDiscount && (
              <span className="text-gray-400 line-through">
                {format.number(product.priceAfterDiscount, {
                  style: "currency",
                  currency: "EGP",
                })}
              </span>
            )}
          </p>
        </div>
        <span className="flex justify-center items-center bg-[#A6252A] dark:bg-[#CD2E33] rounded-full w-10 h-10 text-white">
          <ShoppingCart />
        </span>
      </div>
    </div>
  );
}
