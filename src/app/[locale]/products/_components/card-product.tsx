import HeartButton from "@/components/shared/heart-button";
import { ProductBadge } from "@/lib/utils/product-badge.util";
import { ShoppingCart, Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function CardProduct({ product }: { product: Product }) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Variables
  const badges = ProductBadge(product);

  return (
    <div key={product._id} className="relative">
      {/* Image */}
      <div className="relative rounded-xl w-full h-272 overflow-hidden">
        <Image
          src={product.imgCover!}
          alt={product.description || t("product-image")}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="flex justify-between mx-2.5 mt-2.5">
          <HeartButton _id={product._id} />

          {/* Badges */}
          <div className="relative">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={`text-xs font-semibold px-2 py-1 rounded-full me-1.5 ${
                  badge === t("new")
                    ? "bg-zinc-100 text-zinc-700"
                    : badge === t("hot")
                      ? "bg-maroon-50 text-maroon-600"
                      : badge === t("out-of-stock")
                        ? "bg-red-600 text-softPink-50"
                        : ""
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product header */}
      <p className="mt-5 font-semibold text-maroon-700 dark:text-softPink-200 text-lg text-start">
        {product.title.split(" ").length > 5
          ? `${product.title.split(" ").slice(0, 4).join(" ")} ...`
          : product.title}
      </p>

      {/* Product footer */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex mt-1.5">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rateAvg) ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="mt-2 font-medium text-maroon-700 dark:text-softPink-200">
              {format.number(product.price, {
                style: "currency",
                currency: "EGP",
              })}{" "}
              {/* Price after discount if available */}
              {product.priceAfterDiscount && (
                <span className="text-zinc-400 line-through">
                  {format.number(product.priceAfterDiscount, {
                    style: "currency",
                    currency: "EGP",
                  })}
                </span>
              )}
            </p>
          </div>
        </div>
        <span className="flex justify-center items-center bg-maroon-600 dark:bg-maroon-500 rounded-full w-10 h-10 text-white">
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="right-wheel-right bottom-wheel-bottom absolute bg-maroon-500 rounded-full w-[0.094rem] h-[0.094rem]"></span>
            <span className="bottom-wheel-bottom left-wheel-left absolute bg-maroon-500 rounded-full w-[0.094rem] h-[0.094rem]"></span>
          </div>
        </span>
      </div>
    </div>
  );
}
