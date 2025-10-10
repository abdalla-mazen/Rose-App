"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Testimonial } from "@/lib/types/testimonial";
import { useTranslations } from "next-intl";

export function TestemonialCard({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations();

  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
      plugins={[autoplay.current]}
      className="max-w-6xl mx-auto"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
      onFocus={() => autoplay.current.stop()}
    >
      <CarouselContent className="-ml-4">
        {testimonials.map((item, i) => (
          <CarouselItem
            key={i}
            className="lg:basis-1/3 flex justify-center pl-0"
          >
            <div className="relative w-[404px] h-[433px]">
              {/* vector */}
              <div className="absolute w-[120px] h-[120px] top-[44.5px] left-[142.5px] rounded-full border-[3px] border-white overflow-hidden z-10">
                <Image
                  src={item.user.photo}
                  alt={item.user.firstName}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* card content */}
              <div className="absolute top-[119.5px] left-7 w-[343px] h-[250px] bg-white rounded-3xl shadow-[0px_4px_50.5px_0px_rgba(116,28,33,0.1)] flex flex-col items-center text-center px-5 pt-[55px] pb-5 gap-3">
                <h3 className="font-sarabun font-semibold leading-[100%] text-zinc-800 text-base">
                  {item.user.firstName} {item.user.lastName}
                </h3>

                <div className="flex justify-center gap-1 text-yellow-500 text-sm">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <span key={idx}>{idx < item.rating ? "★" : "☆"}</span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("testimonial-content")}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
