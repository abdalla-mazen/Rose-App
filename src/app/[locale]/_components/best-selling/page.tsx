import { BestSellingApi } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function BestSelling() {
  // Translations
  const t = await getTranslations("homepage.bestSelling");

  // API Call
  const products = await BestSellingApi();

  return (
    <div className="flex justify-start items-center w-full h-[360px] bg-blue-200 mt-10">
      <div className="max-w-[291px] bg-yellow-300">
        <h2 className="uppercase font-bold">{t("title")}</h2>
        <h3 className="text-3xl font-bold">{t("sub-title")}</h3>
        <p className="font-normal">{t("paragraph")}</p>

        <button className="bg-red-700 px-5 py-2.5 rounded-lg text-white">
          {t("explore-btn")} <span className="ml-2"></span>
        </button>
      </div>
    </div>
  );
}
