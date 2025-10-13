"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardS from "./card";

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonStyle: string;
}

const slides: Slide[] = [
  {
    image: "/images/choco.png",
    title: "Say It with Flowers",
    description: "Elegant gifts for every special moment.",
    buttonText: "I’m buying!",
    buttonStyle:
      "bg-[#fbeaea] text-[#4a0d0d] hover:bg-[#fbeaea] hover:text-[#4a0d0d] rounded-full px-6 py-2 w-fit",
  },
  {
    image: "/images/choco.png",
    title: "Sweet Surprises Await",
    description: "Beautiful roses and chocolates for your love.",
    buttonText: "Explore now",
    buttonStyle:
      "bg-[#fbeaea] text-[#4a0d0d] hover:bg-[#fbeaea] hover:text-[#4a0d0d] rounded-full px-6 py-2 w-fit",
  },
];

export default function ValentineCarousel(): JSX.Element {
  const [current, setCurrent] = useState(0);

  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="flex items-center justify-between space-x-8">
      <CardS/>
      <Carousel className="w-full rounded-2xl overflow-hidden relative">
        <CarouselContent
          className="transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-full">
              <div className="relative w-full h-[420px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-xl bg-black/40 flex flex-col justify-end pl-20 pb-16 text-white">
                  <h2 className="text-4xl font-bold mb-3 max-w-md">
                    {slide.title}
                  </h2>
                  <p className="text-lg mb-5 max-w-md opacity-90">
                    {slide.description}
                  </p>
                  <Button className={slide.buttonStyle}>
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots (top-right corner) */}
        <div className="absolute top-5 right-6 flex gap-2 z-10">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                current === index ? "bg-[#8b1e1e]" : "bg-white/60"
              }`}
            ></span>
          ))}
        </div>

        {/* Custom navigation buttons (bottom-right corner) */}
        <div className="absolute bottom-5 right-6 flex gap-3 z-10">
          <button
            onClick={handlePrev}
            className="bg-white/80 hover:bg-white text-[#4a0d0d] rounded-full p-2 shadow-md transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white/80 hover:bg-white text-[#4a0d0d] rounded-full p-2 shadow-md transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Carousel>
    </section>
  );
}
