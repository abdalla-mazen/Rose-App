"use client";

import { Button } from "@/components/ui/button";
import { HeartPlus, Package, ShoppingCart, Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useAddToCart from "../_hooks/use-add-to-cart";

type Props = {
  product: Product;
};

type AddToCartFields = {
  product: string;
  quantity: number;
};

export default function ProductDetails({ product }: Props) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Hooks
  const [mainImage, setMainImage] = useState(product.imgCover);
  const { addToCart, error, isPending } = useAddToCart();
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in effect
  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLogged);
  }, []);

  // Add to cart as a guest functions
  const getCartAsGuest = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const addToCartAsGuest = (product: Product) => {
    const cart = getCartAsGuest();
    const existing = cart.find((item: Product) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(t("added-to-cart-successfully-as-a-guest"), {
      position: "bottom-right",
      duration: 2000,
    });
  };

  // Logged in user functions
  const submitAddToCart = ({ product, quantity }: AddToCartFields) => {
    addToCart({ product, quantity });
  };

  // Button handler if logged in or guest
  const handleAddToCart = () => {
    if (loggedIn) {
      submitAddToCart({ product: product._id, quantity: 1 });
    } else {
      addToCartAsGuest(product);
    }
  };

  return (
    <div className="flex gap-16 mx-auto mt-5 max-w-7xl h-[523px] text-zinc-800 dark:text-zinc-50">
      {error && (
        <p className="mb-2 text-red-600">
          Error adding to cart: {error.message}
        </p>
      )}
      {/* Gallery */}
      <div>
        {/* Main image */}
        <Image
          src={mainImage}
          alt={product.title}
          width={605}
          height={401}
          className="border rounded-xl max-h-[401px] object-contain"
        />

        {/* Thumbnails */}
        <div className="flex justify-center items-center gap-2.5 mt-2.5 max-h-[111px]">
          {/* Main image in thumbnails */}
          <div
            className="relative cursor-pointer"
            onClick={() => setMainImage(product.imgCover)}
          >
            <Image
              src={product.imgCover}
              alt="Image cover"
              width={91}
              height={111}
              className="rounded-lg h-[111px]"
            />

            {/* Overlay */}
            {mainImage === product.imgCover ? (
              <div className="absolute inset-0 opacity-50 border-2 border-maroon-600 rounded-lg transition-border duration-100"></div>
            ) : (
              <div className="absolute inset-0 bg-[#0000004D] hover:bg-[#0000001A] opacity-50 rounded-lg transition-bg duration-100"></div>
            )}
          </div>

          {/* Other images */}
          {product.images.map((image, index) => (
            <div
              className="relative cursor-pointer"
              onClick={() => setMainImage(image)}
              key={index}
            >
              <Image
                src={image}
                alt={product.title}
                width={91}
                height={111}
                className="rounded-lg h-[111px]"
              />

              {/* Overlay */}
              {mainImage === image ? (
                <div className="absolute inset-0 opacity-50 border-2 border-maroon-600 rounded-lg transition-border duration-100"></div>
              ) : (
                <div className="absolute inset-0 bg-[#0000004D] hover:bg-[#0000001A] opacity-50 rounded-lg transition-bg duration-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product details */}
      <div className="w-[605px] h-[523px]">
        {/* Product title */}
        <h1 className="font-semibold text-3xl">{product.title}</h1>

        <div className="flex gap-4 mt-2">
          {/* Product price */}
          <h2 className="font-bold text-3xl">
            <span className="text-zinc-300 dark:text-zinc-500 line-through">
              {product.price}
            </span>{" "}
            {product.priceAfterDiscount && (
              <span>
                {format.number(product.priceAfterDiscount, {
                  style: "currency",
                  currency: "EGP",
                })}
              </span>
            )}
          </h2>

          {/* Product quantity */}
          {product.quantity > 0 ? (
            <span className="flex justify-center items-center gap-2 bg-zinc-100 dark:bg-zinc-700 px-3 py-2 rounded-full font-medium text-sm">
              <Package />
              {product.quantity} {t("left-in-stock")}
            </span>
          ) : (
            <span className="flex justify-center items-center gap-2 bg-red-50 px-3 py-2 rounded-full font-medium text-red-600 text-sm">
              <Package />
              {t("out-of-stock")}
            </span>
          )}
        </div>

        {/* Product rating */}
        <p className="flex items-center gap-2 my-4 py-4 border-zinc-100 dark:border-zinc-700 border-t border-b">
          <Star className="fill-yellow-600 stroke-none w-5 h-5" /> {t("Rating")}
          : {product.rateAvg}
          /5{" "}
          <span className="text-blue-600">
            ({product.rateCount} {t("Ratings")})
          </span>
        </p>

        {/* Product description */}
        <p className="space-x-0 h-[307px] text-zinc-600 dark:text-zinc-400 leading-4">
          {product.description}
        </p>

        {/* Product buttons */}
        <div className="flex items-center gap-2.5">
          {/* Add to wishlist button */}
          <Button
            disabled={product.quantity <= 0}
            className="bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 dark:border dark:border-zinc-500 w-11 h-11 text-black dark:text-white"
          >
            <HeartPlus className="w-6 h-6" />
          </Button>

          {/* Add to cart button */}
          <Button
            disabled={product.quantity <= 0}
            className="bg-maroon-600 dark:bg-softPink-300 font-medium"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-6 h-6" />
            {t("add-to-cart")}
          </Button>
        </div>
      </div>
    </div>
  );
}
