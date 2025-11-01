import { BestSellingApi } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductsCarousel from "../shared/products-carousel";
import BestSellingCarousel from "./components/best-selling-carousel";

export default async function BestSelling({ locale }: { locale: string }) {
  // Translations
  const t = await getTranslations();

  // API Call
  const products = await BestSellingApi();

  return (
    <div className="flex justify-between items-center mt-10 w-full">
      <div className="max-w-[291px]">
        {/* Title */}
        <h2 className="mb-2.5 font-bold text-softPink-500 dark:text-maroon-400 uppercase tracking-[0.3rem]">
          {t("bestselling-title")}
        </h2>

        {/* Sub-title */}
        <h2 className="mb-2 font-bold text-softPink-500 dark:text-softPink-200 text-3xl">
          {t("bestselling-span1-sub-title")}{" "}
          <span className="text-maroon-600 dark:text-softPink-200">
            {t("bestselling-sub-title")}{" "}
          </span>
          <span>{t("bestselling-span2-sub-title")} </span>
          <span className="text-maroon-600 dark:text-softPink-200">
            {t("bestselling-span3-sub-title")}
          </span>
        </h2>

        {/* Paragraph */}
        <p className="font-normal text-zinc-500 dark:text-zinc-400">{t("bestselling-paragraph")}</p>

        {/* Explore button */}
        <button className="flex bg-maroon-600 dark:bg-softPink-200 mt-10 px-5 py-2 rounded-xl font-normal text-white dark:text-zinc-800">
          {t("bestselling-explore-btn")}{" "}
          <span className="ms-2 w-4 h-4">{locale === "ar" ? <ArrowLeft /> : <ArrowRight />}</span>
        </button>
      </div>

      <div className="max-w-[954px]">
        {" "}
        <BestSellingCarousel products={products} locale={locale} />
      </div>
    </div>
  );
}
