"use client";

import React from "react";
import CouponForm from "./coupon-form";
import { useQuery } from "@tanstack/react-query";
import { Cart } from "@/lib/types/discount";
import { useFormatter, useTranslations } from "next-intl";

export default function Summary() {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Query
  const { data: cart } = useQuery<Cart | null>({
    queryKey: ["cart"],
    queryFn: () => fetch(`${process.env.API}/cart`).then((res) => res.json()),
    initialData: null,
  });

  // Variables
  const subtotal = cart?.totalPrice ?? 0;
  const discount = cart?.discount ?? 0;
  const total = cart?.totalPriceAfterDiscount ?? subtotal;

  return (
    <div className="w-458 mb-5">
      {/* Header */}
      <h2 className="font-semibold text-3xl text-black">{t("summary")}</h2>

      {/* Coupon Form */}
      <div className="bg-zinc-50 p-4 rounded-md w-full">
        <div className="flex items-center gap-1 w-full">
          <CouponForm />
        </div>

        <div className="h-64 border border-zinc-300 flex items-center justify-center">
          <p>{t("no_coupons")}</p>
        </div>

        {/* If discount */}
        {discount > 0 && (
          <div className="relative py-2.5">
            <div className="flex items-center justify-between border-b border-zinc-300 pb-3">
              <span>{t("subtotal")}</span>
              <span>{format.number(subtotal, { style: "currency", currency: "EGP" })}</span>
            </div>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-zinc-50 px-2">
              {format.number(discount, { style: "currency", currency: "EGP" })} {t("discount")}
            </p>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between text-zinc-800 font-bold text-2xl pb-3 mt-2.5">
          <span>{t("total")}</span>
          <span>{format.number(total, { style: "currency", currency: "EGP" })}</span>
        </div>
      </div>
    </div>
  );
}
