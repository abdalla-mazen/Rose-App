import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { BestSellingApi } from "@/lib/apis/product.api";
import { getLocale, getTranslations } from "next-intl/server";
import DisplayProduct from "../display-product";
import { ArrowRight } from "lucide-react";

export default async function BestSelling() {
  // Translations
  const t = await getTranslations("");
  const locale = await getLocale();
  const isRtl = locale === "ar";

  // API Call
  const products = await BestSellingApi();

  return (
    <div className="flex justify-between items-center w-full mt-10">
      <div className="max-w-[291px]">
        {/* Title */}
        <h2 className="uppercase font-bold text-[#FF668B] dark:text-[#D75458]">
          {t("bestselling-title")}
        </h2>

        {/* Sub-title */}
        <h2 className="font-bold text-3xl text-[#FF668B] dark:text-[#FFC2D0]">
          {t("bestselling-span1-sub-title")}{" "}
          <span className="text-[#A6252A] dark:text-[#FFC2D0]">
            {t("bestselling-sub-title")}{" "}
          </span>
          <span>{t("bestselling-span2-sub-title")} </span>
          <span className="text-[#A6252A] dark:text-[#FFC2D0]">
            {t("bestselling-span3-sub-title")}
          </span>
        </h2>

        {/* Paragraph */}
        <p className="font-normal text-[#757F95] dark:text-[#A1A1AA]">
          {t("bestselling-paragraph")}
        </p>

        {/* Explore button */}
        <button className="bg-[#A6252A] dark:bg-[#FFC2D0] text-white dark:text-[#27272A] font-normal px-5 py-2 mt-10 rounded-xl flex">
          {t("bestselling-explore-btn")}{" "}
          <span className="ms-2 w-4 h-4">
            <ArrowRight />
          </span>
        </button>
      </div>

      <Carousel
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
        {isRtl ? (
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
    </div>
  );
}
