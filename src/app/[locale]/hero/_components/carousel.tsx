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
import { useTranslations } from "next-intl";

export default function ValentineCarousel() {
  const t = useTranslations();

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
    <section className="flex gap-8 m-10 w-full">
      {/* Side card */}
      <CardS />

      {/* Carousel */}
      <Carousel
        className="w-full h-[420px] rounded-2xl overflow-hidden"
        plugins={[
          Autoplay({
            delay: 30000, // 30s
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div
                dir={t("valentine-carousel-dir")}
                className="relative w-full h-[420px]"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />

                {/* Text & Button */}
                <div className="absolute inset-0 flex flex-col justify-end bg-black/40 pb-16 pr-20 rounded-xl text-white space-y-6">
                  <h2 className="max-w-md font-bold text-4xl leading-snug">
                    {slide.title}
                  </h2>

                  <p className="opacity-90 max-w-md text-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <Button className={cn(slide.buttonStyle, "rounded-[10px]")}>
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Nav buttons */}
        <CarouselPrevious className="left-6 bottom-5 absolute bg-white/80 text-[#4a0d0d]" />
        <CarouselNext className="right-6 bottom-5 absolute bg-white/80 text-[#4a0d0d]" />
      </Carousel>
    </section>
  );
}
