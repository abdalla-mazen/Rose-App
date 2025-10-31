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

// Slide data
const slides = [
  {
    image: "/images/choco.png",
    title: "Say It with Flowers",
    description: "Elegant gifts for every special moment.",
    buttonText: "I'm buying!",
    buttonStyle:
      "bg-[#fbeaea] text-[#4a0d0d] hover:bg-[#fbeaea] hover:text-[#4a0d0d] rounded-full px-6 py-2 w-fit",
  },
  {
    image: "/images/choco.png",
    title: "Sweet Surprises Await",
    description: "Beautiful roses and chocolates for your love.",
    buttonText: "I'm buying!",
    buttonStyle:
      "bg-[#fbeaea] text-[#4a0d0d] hover:bg-[#fbeaea] hover:text-[#4a0d0d] rounded-full px-6 py-2 w-fit",
  },
];

export default function ValentineCarousel() {
  return (
    <section dir="ltr" className="flex space-x-8 m-10 w-full">
      {/* Side card */}
      <CardS />

      {/* Main carousel */}
      <Carousel
        className="w-full h-[420px] rounded-2xl overflow-hidden"
        plugins={[
          Autoplay({
            delay: 3000, // Auto delay
          }),
        ]}
      >
        <CarouselContent>
          {/* Slides */}
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[420px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay text and button */}
                <div dir="auto" className="absolute inset-0 flex flex-col justify-end bg-black/40 pb-16 pl-20 rounded-xl text-white">
                  <h2 className="mb-3 max-w-md font-bold text-4xl">
                    {slide.title}
                  </h2>

                  <p className="opacity-90 mb-5 max-w-md text-lg">
                    {slide.description}
                  </p>

                  <Button className={cn(slide.buttonStyle, "rounded-[10px] pb-4")}>
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="left-6 bottom-5 absolute bg-white/80 text-[#4a0d0d]" />
        <CarouselNext className="right-6 bottom-5 absolute bg-white/80 text-[#4a0d0d]" />
      </Carousel>
    </section>
  );
}
