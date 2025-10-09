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
  const t = await getTranslations("homepage.bestSelling");
  const locale = await getLocale();
  const isRtl = locale === "ar";

  // API Call
  const products = await BestSellingApi();

  return (
    <div className="flex justify-between items-center w-full mt-10">
      <div className="max-w-[291px]">
        <h2 className="uppercase font-bold">{t("title")}</h2>
        <h3 className="text-3xl font-bold">{t("sub-title")}</h3>
        <p className="font-normal">{t("paragraph")}</p>

        <button className="bg-red-700 font-normal px-5 py-2 mt-10 rounded-xl text-white flex">
          {t("explore-btn")}{" "}
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
            <CarouselNext className="me-8 bg-red-600 text-white" />
            <CarouselPrevious className="ms-8 bg-red-600 text-white" />
          </>
        ) : (
          <>
            <CarouselPrevious className="ms-8 bg-red-600 text-white" />
            <CarouselNext className="me-8 bg-red-600 text-white" />
          </>
        )}
      </Carousel>
    </div>
  );
}
