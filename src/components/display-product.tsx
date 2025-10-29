"use client";

import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import useAddToCart from "@/hooks/use-add-to-cart";

type AddToCartFields = {
  product: string;
  quantity: number;
};

export default function DisplayProduct(product: Product) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Hooks
  const [loggedIn, setLoggedIn] = useState(false);
  const { addToCart, error: addToCartError, isPending: isAddingToCart } = useAddToCart();
  const { addToWishList, error: addToWishListError, isPending: isAddingToWishList } = useWishlist();

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
    <div key={product._id} className="relative max-w-[19rem]">
      {/* Image */}
      <div className="group relative rounded-xl w-full h-[270px] overflow-hidden">
        <Image src={product.imgCover} alt={product.description || "product image"} fill />

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
          <Button
            disabled={product.quantity <= 0 || isAddingToWishList}
            onClick={() => addToWishList(product._id)}
            className="flex justify-center items-center bg-white hover:bg-gray-200 rounded-full w-7 h-8 text-maroon-600"
          >
            {/* <button className="flex justify-center items-center bg-white rounded-full w-7 h-7"> */}
            <Heart className="w-5 h-5" />
            {/* {} */}
            {/* </button> */}
            {/* <Heart className="w-5 h-5" /> */}
          </Button>
          <Button className="flex justify-center items-center bg-white hover:bg-gray-200 rounded-full w-7 h-8 text-maroon-600">
            <Link href={`/products/${product._id}`}>
              <Eye className="w-5 h-5" />
            </Link>
          </Button>
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

        {/* Add to cart button */}
        <Button
          disabled={product.quantity <= 0 || isAddingToCart}
          className="flex justify-center items-center bg-[#A6252A] dark:bg-[#CD2E33] rounded-full w-10 h-10 text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
}
