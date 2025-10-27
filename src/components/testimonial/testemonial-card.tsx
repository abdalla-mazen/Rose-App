"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

// function for RTL / LTR classes
function rtlClass(ltrClass: string, rtlClass: string, locale: string) {
  return locale === "ar" ? rtlClass : ltrClass;
}

export function TestemonialCard({
  testimonials,
}: {
  testimonials: (Testimonial & { __key: string })[];
}) {
  // Translation
  const t = useTranslations();
  //locale
  const locale = useLocale();
  // Ref
  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
        containScroll: "trimSnaps",
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
      plugins={[autoplay.current]}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="mx-auto max-w-6xl"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
      onFocus={() => autoplay.current.stop()}
    >
      <CarouselContent className="-ml-4" dir={locale === "ar" ? "rtl" : "ltr"}>
        {testimonials.map((item, i) => (
          <CarouselItem key={`${item._id}-${i}`} className="pl-4 basis-96">
            <div className="relative w-96 h-[433px]">
              {/* vector */}
              <div
                className={`absolute w-28 h-28 top-11 ${rtlClass(
                  "left-36",
                  "right-36",
                  locale
                )} rounded-full border-4 border-white overflow-hidden z-10`}
              >
                <Image
                  src={item.user.photo || "/placeholder.svg"}
                  alt={item.user.firstName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* card content */}
              <div
                className={`absolute top-28 ${rtlClass(
                  "left-7",
                  "right-7",
                  locale
                )} w-80 h-60 bg-white rounded-3xl shadow-[0px_4px_50.5px_0px_rgba(116,28,33,0.1)] flex flex-col items-center text-center px-5 pt-14 pb-5 gap-3`}
              >
                <h3 className="font-sarabun font-semibold text-zinc-800 text-base leading-[100%]">
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

                <p className="text-gray-400 text-xs">
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
