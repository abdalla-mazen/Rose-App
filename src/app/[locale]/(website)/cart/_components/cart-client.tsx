"use client";

import { useState, useEffect } from "react";
import {
  Trash2,
  ShoppingBag,
  Tag,
  MoveRight,
  MoveLeft,
  Loader2,
  BrushCleaning,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CartResponse, CartItem } from "@/lib/types/cart";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import EmptyCart from "./empty-cart";
import useClearCart from "../_hooks/use-clear-cart";
import useUpdateQuantity from "../_hooks/use-update-quantity";
import { useTranslations } from "next-intl";
import useRemoveItem from "../_hooks/use-remove-item";

interface CartClientProps {
  dataCart: CartResponse;
}

function StarRating({ avg, count }: { avg: number; count: number }) {
  return (
    <div className="flex items-center gap-1 mt-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${
            star <= Math.round(avg)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-0.5">({count})</span>
    </div>
  );
}

export default function CartClient({ dataCart }: CartClientProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { clear, isPending } = useClearCart();
  const { removeItem, isPending: isRemovePending, variables: removeVariables } = useRemoveItem();
  const { updateQuantity, isPending: isUpdatePending } = useUpdateQuantity();

  const [cartItems, setCartItems] = useState<CartItem[]>(dataCart?.cart?.cartItems || []);

  // Effects
  useEffect(() => {
    setCartItems(dataCart?.cart?.cartItems || []);
  }, [dataCart]);

  // Update quantity
  const updateQty = (id: string, productId: string, delta: number) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    // Optimistic Update
    setCartItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantity: newQuantity } : i)));

    // Call API
    updateQuantity(
      { productId, quantity: newQuantity },
      {
        onError: () => {
          // Revert optimistic update on failure
          setCartItems((prev) =>
            prev.map((i) => (i._id === id ? { ...i, quantity: item.quantity } : i)),
          );
        },
      },
    );
  };

  // const removeItem = (id: string) => {
  //   setCartItems((prev) => prev.filter((item) => item._id !== id));
  // };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.priceAfterDiscount * item.quantity,
    0,
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const savings = originalTotal - subtotal;

  return (
    <div className="min-h-screen bg-rose-50/50">
      {/* Header */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-rose-500 w-6 h-6" />
            <h1 className="capitalize text-2xl font-bold text-gray-900">{t("cart")}</h1>
            {cartItems.length > 0 && (
              <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-100 border-0 px-3 font-bold">
                {cartItems.length} <span className="p-2">{t("cart-products")}</span>
              </Badge>
            )}
          </div>
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => clear()}
              className="capitalize bg-maroon-50 text-maroon-600 hover:bg-maroon-100 gap-2 w-fit"
            >
              <BrushCleaning className="w-3.5 h-3.5" />
              {t("clear-cart")} {isPending && <Loader2 className="animate-spin" />}
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Items List */}
        <div className="flex-1 space-y-3">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            cartItems.map((item) => {
              const hasDiscount = item.product.priceAfterDiscount < item.product.price;
              const lineTotal = item.product.priceAfterDiscount * item.quantity;

              return (
                <Card
                  key={item._id}
                  className="border-rose-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div className="relative rounded-xl overflow-hidden flex-shrink-0 bg-rose-50 border border-rose-100">
                        <Image
                          src={item.product.imgCover}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                        {hasDiscount && (
                          <Badge className="absolute top-1 left-1 bg-rose-500 text-white text-[9px] px-1 py-0 h-3.5 rounded-sm border-0">
                            {t("sale")}
                          </Badge>
                        )}
                      </div>

                      {/* Title + Rating + Price */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
                          {item.product.title}
                        </p>
                        <StarRating avg={item.product.rateAvg} count={item.product.rateCount} />
                        <div className="flex items-baseline gap-2 mt-1.5">
                          <span className="font-bold text-gray-900">
                            {item.product.priceAfterDiscount.toLocaleString()} EGP
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-gray-400 line-through">
                              {item.product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Remove + Qty + Line total */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem({ productId: item.product._id })}
                          disabled={
                            isRemovePending && removeVariables?.productId === item.product._id
                          }
                          className="flex items-center gap-2 px-3 py-2 text-sm capitalize bg-red-600 text-white hover:bg-red-700 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" /> {t("remove")}{" "}
                          {isRemovePending && removeVariables?.productId === item.product._id && (
                            <Loader2 className="animate-spin" />
                          )}
                        </button>

                        {/* Qty Control */}
                        <div className="flex items-center border border-rose-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQty(item._id, item.product._id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-rose-400 hover:bg-rose-50 transition-colors text-lg font-medium"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-gray-800 border-x border-rose-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, item.product._id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-rose-400 hover:bg-rose-50 transition-colors text-lg font-medium"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-rose-500">
                          {lineTotal.toLocaleString()} EGP
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}

          {cartItems.length > 0 && (
            <Button
              asChild
              variant="outline"
              className="md:w-1/3 w-full gap-2 bg-maroon-600 hover:bg-maroon-700 hover:text-white text-white rounded-xl mt-1"
            >
              <Link href="/" className="capitalize flex items-center gap-2">
                <MoveLeft className="w-4 h-4" />
                {t("continue-shopping")}
              </Link>
            </Button>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-72 flex-shrink-0">
            <Card className="border-rose-100 shadow-sm sticky top-24">
              <CardContent className="p-5 space-y-4">
                <h2 className="capitalize font-bold text-gray-900 text-base">
                  {t("order-summary")}
                </h2>

                <div className="space-y-2.5 text-sm">
                  <div className="capitalize flex justify-between text-gray-500">
                    <span>{t("original-price")}</span>
                    <span className="line-through text-gray-400">
                      {originalTotal.toLocaleString()} EGP
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {t("discount")}
                      </span>
                      <span className="text-green-600 font-medium">
                        − {savings.toLocaleString()} EGP
                      </span>
                    </div>
                  )}
                  <div className="capitalize flex justify-between text-gray-500">
                    <span>{t("shipping")}</span>
                    <span className="text-green-500 font-medium">{t("free")}</span>
                  </div>
                </div>

                <Separator className="bg-rose-100" />

                <div className="flex justify-between font-bold text-gray-900">
                  <span>{t("total")}</span>
                  <span className="text-rose-600 text-lg">{subtotal.toLocaleString()} EGP</span>
                </div>

                {savings > 0 && (
                  <div className="capitalize bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-xs text-green-700 font-medium text-center">
                    {t("you-saved")} {savings.toLocaleString()} EGP!
                  </div>
                )}

                <Button
                  asChild
                  className="capitalize w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold h-11 rounded-xl shadow-md shadow-rose-100 transition-all"
                >
                  <Link href="/addresses" className="flex items-center gap-2">
                    {t("to-checkout")} <MoveRight />
                  </Link>
                </Button>

                <p className="text-center text-xs text-gray-400">{t("secure-checkout")}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
