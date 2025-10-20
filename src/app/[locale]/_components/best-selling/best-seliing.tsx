import { BestSellingApi } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BestSellingCarousel from "./_components/best-selling-carousel";

export default async function BestSelling({ locale }: { locale: string }) {
  // Translations
  const t = await getTranslations();

  // API Call
  const products = await BestSellingApi();

  return (
    <div className="flex justify-between items-center mt-10 w-full">
      <div className="max-w-[291px]">
        {/* Title */}
        <h2 className="mb-2.5 font-bold text-[#FF668B] dark:text-[#D75458] uppercase tracking-[0.3rem]">
          {t("bestselling-title")}
        </h2>

        {/* Sub-title */}
        <h2 className="mb-2 font-bold text-[#FF668B] dark:text-[#FFC2D0] text-3xl">
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
        <button className="flex bg-[#A6252A] dark:bg-[#FFC2D0] mt-10 px-5 py-2 rounded-xl font-normal text-white dark:text-[#27272A]">
          {t("bestselling-explore-btn")}{" "}
          <span className="ms-2 w-4 h-4">
            {locale === "ar" ? <ArrowLeft /> : <ArrowRight />}
          </span>
        </button>
      </div>

      <BestSellingCarousel products={products} locale={locale} />
    </div>
  );
}
