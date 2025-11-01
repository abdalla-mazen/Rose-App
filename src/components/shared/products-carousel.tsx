"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import CardProduct from "@/app/[locale]/products/_components/card-product";

type Props = {
  products?: Product[];
};

export default function ProductsCarousel({ products = [] }: Props) {
  // hooks
  const pathname = usePathname();
  const isProduct = pathname.includes("product");

  const locale = useLocale();

  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Carousel
      dir={locale === "ar" ? "rtl" : "ltr"}
      opts={{
        align: "start",
        slidesToScroll: 1,
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
      className="w-full"
    >
      <CarouselContent className="-ms-4">
        {products.map((product) => (
          <CarouselItem key={product._id} className="ps-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            {/* Display products in carousel */}
            <CardProduct product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {locale === "ar" ? (
        <>
          <CarouselNext
            className={cn(
              "bg-[#A6252A] dark:bg-[#CD2E33] text-white",
              isProduct ? "-translate-x-8" : "me-8",
            )}
          />
          <CarouselPrevious
            className={cn(
              "bg-[#A6252A] dark:bg-[#CD2E33] text-white",
              isProduct ? "translate-x-8" : "ms-8",
            )}
          />
        </>
      ) : (
        <>
          <CarouselPrevious className={cn("bg-[#A6252A] dark:bg-[#CD2E33] ms-8 text-white")} />
          <CarouselNext
            className={cn("bg-[#A6252A] dark:bg-[#CD2E33] text-white", isProduct ? "me-9" : "me-8")}
          />
        </>
      )}
    </Carousel>
  );
}
