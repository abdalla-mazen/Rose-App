"use client";

import HeartButton from "@/components/shared/heart-button";
import { ShoppingCart, Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useAddToCart from "@/hooks/use-add-to-cart";
import { WishlistResponse } from "@/lib/types/wishlist";
import { useDeleteWishlist } from "../hooks/use-delete-wishlist";

interface CardWishlistProps {
  data: WishlistResponse;
}

export default function CardWishlist({ data }: CardWishlistProps) {
  const t = useTranslations();
  const format = useFormatter();

  const [loggedIn, setLoggedIn] = useState(false);

  const { addToCart, error: addToCartError, isPending: isAddingToCart } = useAddToCart();

  const {  error: addToWishListError } = useWishlist();
  const { deleteFromWishList } = useDeleteWishlist();

  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLogged);
  }, []);

  const handleAddToCart = (productId: string) => {
    if (loggedIn) {
      addToCart({ product: productId, quantity: 1 });
    } else {
      toast.success(t("added-to-cart-successfully-as-a-guest"), {
        position: "bottom-right",
        duration: 2000,
      });
    }
  };

  return (
    <>
      {data.wishlist.products.map((product) => (
        <div key={product._id} className="relative">
          {/* Image */}
          <div className="relative rounded-xl w-full h-[272px] overflow-hidden">
            <Image
              src={product.imgCover}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div className="flex justify-between mx-2.5 mt-2.5">
           
              <div onClick={() => deleteFromWishList(product._id)}>
                <HeartButton _id={product._id} isInWishlist={true} />
              </div>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product._id}`}
            className="mt-5 block font-semibold text-maroon-700 dark:text-softPink-200 text-lg"
          >
            {product.title.length > 40 ? `${product.title.slice(0, 40)}...` : product.title}
          </Link>

          {/* Footer */}
          <div className="flex justify-between items-center mt-2">
            <div>
              {/* Rating */}
              <div className="flex mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(product.rateAvg)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-yellow-400"
                    }`}
                  />
                ))}
              </div>

              {/* Price */}
              <p className="mt-2 font-medium text-maroon-700 dark:text-softPink-200">
                {format.number(product.priceAfterDiscount || product.price, {
                  style: "currency",
                  currency: "EGP",
                })}

                {product.priceAfterDiscount && (
                  <span className="text-zinc-400 line-through ms-2">
                    {format.number(product.price, {
                      style: "currency",
                      currency: "EGP",
                    })}
                  </span>
                )}
              </p>
            </div>

            {/* Add To Cart */}
            <Button
              disabled={isAddingToCart}
              className="rounded-full w-10 h-10 bg-[#A6252A] dark:bg-[#CD2E33]"
              onClick={() => handleAddToCart(product._id)}
            >
              <ShoppingCart />
            </Button>
          </div>
        </div>
      ))}

      {/* Errors */}
      {addToCartError && toast.error(addToCartError.message)}
      {addToWishListError && toast.error(addToWishListError.message)}
    </>
  );
}
