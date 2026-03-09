import { CategorySkeletonCard } from "@/components/skeletons/category.skeletons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOccasions } from "@/lib/apis/occasion.api";
import React, { Suspense } from "react";
import Image from "next/image";
import Subtitle from "@/components/shared/subtitle";
import { Occasion } from "@/lib/types/occasion";
import { getTranslations } from "next-intl/server";
export default async function Page() {
    // Translation
    const t = await getTranslations();

    // Fetch occasions
  const response = await fetchOccasions();
  return (
    <>
      <div className="text-center py-4 w-fit   mx-auto">
        <Subtitle title={t("occasions")} />
      </div>

      <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
        {response?.occasions.map((occasion: Occasion) => (
          <Suspense key={occasion?._id} fallback={<CategorySkeletonCard />}>
            <Card
              key={occasion?._id}
              className="group mx-auto w-full max-w-sm overflow-hidden border transition-all duration-300 hover:border-rose-500/70  dark:hover:border-softPink-300/70  hover:shadow-[0_0_25px_rgba(244,63,94,0.7)] "
            >
              {/* Neon frame */}
              <div
                className="
      pointer-events-none absolute inset-0
      opacity-0 
      transition-opacity duration-300
      shadow-[inset_0_0_25px_rgba(244,63,94,0.6)]
    "
              />

              <Image
                src={`https://flower.elevateegy.com/uploads/${occasion.image}`}
                alt={occasion.name}
                width={500}
                height={500}
                className="aspect-video w-full object-cover"
              />

              <CardHeader>
                <CardTitle
                  className="
        text-center capitalize
        text-maroon-600 
        dark:text-softPink-500
        group-hover:text-rose-600
        group-hover:dark:text-softPink-400
        transition-colors
        drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]
      "
                >
                  {occasion.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Suspense>
        ))}
      </div>
    </>
  );
}
