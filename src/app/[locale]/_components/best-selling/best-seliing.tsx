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
    <div className="flex justify-between items-center w-full mt-10">
      <div className="max-w-[291px]">
        {/* Title */}
        <h2 className="uppercase tracking-[0.3rem] mb-2.5 font-bold text-[#FF668B] dark:text-[#D75458]">
          {t("bestselling-title")}
        </h2>

        {/* Sub-title */}
        <h2 className="font-bold mb-2 text-3xl text-[#FF668B] dark:text-[#FFC2D0]">
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
            {locale === "ar" ? <ArrowLeft /> : <ArrowRight />}
          </span>
        </button>
      </div>

      <BestSellingCarousel products={products} locale={locale} />
    </div>
  );
}
