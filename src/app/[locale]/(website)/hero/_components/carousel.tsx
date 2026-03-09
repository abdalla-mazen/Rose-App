"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardS from "./card";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

export default function ValentineCarousel() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Slides
  const slides = [
    {
      image: "/images/choco.png",
      title: t("valentine-carousel-title-1"),
      description: t("valentine-carousel-description-1"),
      buttonText: t("valentine-carousel-button-text"),
      buttonStyle:
        "bg-[#fbeaea] text-[#4a0d0d] hover:bg-[#fbeaea] hover:text-[#4a0d0d] rounded-full px-6 py-2 w-fit",
    },
    {
      image: "/images/choco.png",
      title: t("valentine-carousel-title-2"),
      description: t("valentine-carousel-description-2"),
      buttonText: t("valentine-carousel-button-text"),
      buttonStyle:
        "bg-[#fbeaea] text-[#4a0d0d] hover:bg-[#fbeaea] hover:text-[#4a0d0d] rounded-full px-6 py-2 w-fit",
    },
  ];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="
        flex flex-col gap-6 px-4  py-5 lg:py-0
        md:flex-row lg:gap-8 lg:m-10 lg:px-0 md:items-center
        w-full
      "
    >
      {/* Side card */}
      <div className="w-full flex justify-center  md:w-auto">
        <CardS />
      </div>

      {/* Carousel */}
      <Carousel
        className="
          w-full overflow-hidden rounded-2xl
          h-[260px] sm:h-[320px] lg:h-[420px]
        "
        plugins={[
          Autoplay({
            delay: 30000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[420px]">
                <Image
                  src={slide?.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end bg-black/40 text-white rounded-xl",
                    "pb-6 sm:pb-10 lg:pb-16",
                    "space-y-3 sm:space-y-4 lg:space-y-6",
                    isRTL ? "pr-4 sm:pr-8 lg:pr-20 text-right" : "pl-4 sm:pl-8 lg:pl-20 text-left",
                  )}
                >
                  <h2
                    className="
                      max-w-md font-bold
                      text-xl sm:text-2xl lg:text-4xl
                      leading-snug
                    "
                  >
                    {slide.title}
                  </h2>

                  <p
                    className="
                      max-w-md opacity-90
                      text-sm sm:text-base lg:text-lg
                      leading-relaxed
                    "
                  >
                    {slide.description}
                  </p>

                  <Button
                    className="
                      bg-[#fbeaea] text-[#4a0d0d]
                      hover:bg-[#fbeaea] hover:text-[#4a0d0d]
                      rounded-full px-5 py-2
                      text-sm sm:text-base
                      w-fit
                    "
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Nav buttons */}
        <CarouselPrevious
          className="
            absolute bottom-4 left-4
            lg:bottom-5 lg:left-6
            bg-white/80 text-[#4a0d0d]
            scale-90 lg:scale-100
          "
        />
        <CarouselNext
          className="
            absolute bottom-4 right-4
            lg:bottom-5 lg:right-6
            bg-white/80 text-[#4a0d0d]
            scale-90 lg:scale-100
          "
        />
      </Carousel>
    </section>
  );
}
