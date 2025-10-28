"use client";

import DisplayProduct from "@/components/display-product";
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
          <CarouselItem key={product._id} className="ps-4 md:basis-1/2 lg:basis-1/3">
            {/* Display products in carousel */}
            <DisplayProduct {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {locale === "ar" ? (
        <>
          <CarouselNext className="bg-[#A6252A] dark:bg-[#CD2E33] me-8 text-white" />
          <CarouselPrevious className="bg-[#A6252A] dark:bg-[#CD2E33] ms-8 text-white" />
        </>
      ) : (
        <>
          <CarouselPrevious className="bg-[#A6252A] dark:bg-[#CD2E33] ms-8 text-white" />
          <CarouselNext className="bg-[#A6252A] dark:bg-[#CD2E33] me-8 text-white" />
        </>
      )}
    </Carousel>
  );
}
