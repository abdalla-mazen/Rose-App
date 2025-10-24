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
      <div className=" relative overflow-hidden w-full h-272 rounded-xl ">
        <Image
          src={product.imgCover!}
          alt={product.description || t("product-image")}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="flex mt-2.5 mx-2.5 justify-between">
          <HeartButton _id={product._id} />

          {/* Badges */}
          <div className=" relative ">
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
      <p className="mt-5 font-semibold text-lg text-start text-maroon-700 dark:text-softPink-200">
        {product.title.split(" ").length > 5
          ? `${product.title.split(" ").slice(0, 4).join(" ")} ...`
          : product.title}
      </p>

      {/* Product footer */}
      <div className=" flex items-center justify-between">
        <div>
          <div className="flex mt-1.5">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rateAvg) ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between ">
            <p className="font-medium text-maroon-700  dark:text-softPink-200 mt-2">
              {format.number(product.price, {
                style: "currency",
                currency: "EGP",
              })}{" "}
              {/* Price after discount if available */}
              {product.priceAfterDiscount && (
                <span className="line-through text-zinc-400">
                  {format.number(product.priceAfterDiscount, {
                    style: "currency",
                    currency: "EGP",
                  })}
                </span>
              )}
            </p>
          </div>
        </div>
        <span className="w-10 h-10 bg-maroon-600 dark:bg-maroon-500 rounded-full text-white flex items-center justify-center">
          <div className="relative ">
            <ShoppingCart size={24} />
            <span className="absolute bottom-wheel-bottom right-wheel-right w-[0.094rem] h-[0.094rem] bg-maroon-500 rounded-full"></span>
            <span className="absolute bottom-wheel-bottom left-wheel-left w-[0.094rem] h-[0.094rem] bg-maroon-500 rounded-full"></span>
          </div>
        </span>
      </div>
    </div>
  );
}
