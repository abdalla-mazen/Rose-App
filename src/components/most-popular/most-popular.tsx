import { fetchOccasions } from "@/lib/apis/occasion.api";
import { MostPopularApi } from "@/lib/apis/product.api";
import MostPopularClient from "./components/most-popular-client";

export default async function MostPopular({ locale }: { locale: string }) {
  // API Call
  const occasions = await fetchOccasions();
  const selectedOccasion = occasions.occasions[0]?._id || "";
  const products = selectedOccasion ? await MostPopularApi(selectedOccasion) : [];

  return <MostPopularClient occasions={occasions?.occasions} products={products} locale={locale} />;
}
