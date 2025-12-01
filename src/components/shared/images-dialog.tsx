"use client";

import { type ReactNode, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  // DialogHeader,
  // DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type DialogProps = {
  trigger: ReactNode;
  images: { src: string; alt: string }[];
};

// Use these images as props from another component
// const Images = [
//   { src: "/assets/images/general/lock-shield.svg", alt: "Not authorized" },
//   {
//     src: "/assets/images/general/not-found.svg",
//     alt: "Not found",
//   },
//   { src: "/assets/images/general/server-down 1.svg", alt: "Server Down" },
// ];

export default function ImagesDialog({ trigger, images }: DialogProps) {
  // State
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Render Dots
  const renderDots = () => (
    <div className="flex items-center gap-3">
      {images.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          className={`h-3 w-3 rounded-full transition-colors ${
            currentSlide === index ? "bg-maroon-400" : "bg-zinc-300"
          }`}
          onClick={() => carouselApi?.scrollTo(index)}
        />
      ))}
    </div>
  );

  return (
    <Dialog>
      {/* Dialog trigger */}
      {trigger}

      {/* Content */}
      <DialogContent
        showCloseButton
        className="flex flex-col justify-between mx-auto px-4 border border-gray-300 rounded-xl sm:min-w-[58.25rem] sm:min-h-[43rem]"
      >
        {/* Description */}
        <DialogDescription className="flex flex-col items-center gap-8 w-full text-left">
          {/* Display single Image if the length is just 1 */}
          {images.length === 1 && (
            <div className="flex justify-center items-center bg-white shadow-sm mt-8 p-6 border border-zinc-200 rounded-xl w-full max-h-[90%]">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={640}
                height={900}
                className="rounded-2xl w-[24rem] h-[32rem]"
              />
            </div>
          )}

          {/* Display a carousel if the length is greater than 1 */}
          {images.length > 1 && (
            <div className="w-full max-w-[50rem]">
              <Carousel
                opts={{
                  align: "center",
                }}
                setApi={setCarouselApi}
                className="relative w-full"
              >
                <CarouselContent className="flex items-center px-4 py-6">
                  {images.map((img) => (
                    <CarouselItem key={img.alt} className="basis-full">
                      <Card className="bg-white shadow-sm mx-auto border border-zinc-200 rounded-xl">
                        <CardContent className="flex justify-center p-6">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={780}
                            height={480}
                            className="rounded-[2rem] w-[24rem] h-[32rem]"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="flex justify-between items-center gap-10">
                  {renderDots()}
                  <div className="flex items-center gap-3">
                    <CarouselPrevious className="top-auto left-auto !static bg-white hover:bg-zinc-100 border border-maroon-200 w-10 h-10 text-maroon-200 translate-y-0" />
                    <CarouselNext className="top-auto right-auto !static bg-white hover:bg-zinc-100 border border-maroon-200 w-10 h-10 text-maroon-200 translate-y-0" />
                  </div>
                </div>
              </Carousel>
            </div>
          )}
        </DialogDescription>

        {/* Footer */}
        <DialogFooter className="gap-2"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
