"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function CardS() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div>
      {/* Card container */}
      <Card className="text-white w-[280px] h-[420px] rounded-2xl overflow-hidden flex flex-col justify-between relative">
        {/* Bg image */}
        <div className="absolute inset-0">
          <Image
            src="/images/gifts.png"
            alt={t("gift-card-alt-text")}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6">
          {/* Price */}
          <p className="text-sm bg-red-50 text-red-800 w-fit px-2 rounded-full mb-2">
            {t("gift-card-price")}
          </p>

          {/* Title */}
          <h3 className="text-xl font-semibold leading-tight mb-2">
            {t("gift-card-title")}
          </h3>

          {/* Button */}
          <Button className="bg-red-50 text-red-800 font-semibold hover:bg-red-50 rounded-xl px-5 mt-5 w-fit flex items-center">
            {t("gift-card-button-text")}
            {isRTL ? (
              <ArrowLeft className="mr-2 w-4 h-4" />
            ) : (
              <ArrowRight className="ml-2 w-4 h-4" />
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
