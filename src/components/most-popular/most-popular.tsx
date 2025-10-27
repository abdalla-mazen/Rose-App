import Subtitle from "@/components/shared/subtitle";
import { FetchOccasions } from "@/lib/apis/occasion.api";
import { MostPopularApi } from "@/lib/apis/product.api";
import MostPopularClient from "./_components/most-popular-client";

export default async function MostPopular({ locale }: { locale: string }) {
  // API Call
  const occasions = await FetchOccasions();

  const selectedOccasion = occasions[0]?._id;
  const products = selectedOccasion
    ? await MostPopularApi(selectedOccasion)
    : [];

  return (
    <MostPopularClient
      occasions={occasions}
      products={products}
      locale={locale}
    />
  );
}
