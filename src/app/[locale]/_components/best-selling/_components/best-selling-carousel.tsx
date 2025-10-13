"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import DisplayProduct from "../../display-product";

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
          <CarouselItem
            key={product._id}
            className="ps-4 md:basis-1/2 lg:basis-1/3"
          >
            {/* Display products in carousel */}
            <DisplayProduct {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {locale === "ar" ? (
        <>
          <CarouselNext className="me-8 bg-[#A6252A] dark:bg-[#CD2E33] text-white" />
          <CarouselPrevious className="ms-8 bg-[#A6252A] dark:bg-[#CD2E33] text-white" />
        </>
      ) : (
        <>
          <CarouselPrevious className="ms-8 bg-[#A6252A] dark:bg-[#CD2E33] text-white" />
          <CarouselNext className="me-8 bg-[#A6252A] dark:bg-[#CD2E33] text-white" />
        </>
      )}
    </Carousel>
  );
}
