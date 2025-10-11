import About from "../_components/about";
import Companies from "../_components/companies";
import Gallery from "../_components/gallery";
import BestSelling from "./_components/best-selling/best-seliing";
import MostPopular from "./_components/most-popular/most-popular";
import ToggleLocale from "@/components/layout/header/toggel-locale";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[1280px]">
      <About />
      <Gallery />
      <Companies />
      <ToggleLocale />
      <BestSelling />
      <MostPopular />
    </div>
  );
}
