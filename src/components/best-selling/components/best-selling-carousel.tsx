"use client";

import CardProduct from "@/app/[locale]/products/_components/card-product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

type Props = {
  products: Product[];
  locale: string;
};

export default function BestSellingCarousel({ products, locale }: Props) {
  return (
    <Carousel
      dir={locale === "ar" ? "rtl" : "ltr"}
      opts={{
        align: "start",
        slidesToScroll: 1,
      }}
      className="w-full max-w-[954px]"
    >
      <CarouselContent className="-ms-4">
        {products.map((product) => (
          <CarouselItem key={product._id} className="ps-4 basis-1/3">
            {/* Display products in carousel */}
            <CardProduct product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {locale === "ar" ? (
        <>
          <CarouselNext className="bg-maroon-600 dark:bg-maroon-500 me-8 text-white" />
          <CarouselPrevious className="bg-maroon-600 dark:bg-maroon-500 ms-8 text-white" />
        </>
      ) : (
        <>
          <CarouselPrevious className="bg-maroon-600 dark:bg-maroon-500 ms-8 text-white" />
          <CarouselNext className="bg-maroon-600 dark:bg-maroon-500 me-8 text-white" />
        </>
      )}
    </Carousel>
  );
}
