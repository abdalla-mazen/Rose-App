import Services from "./hero/_components/service";
import Occasion from "./hero/_components/occasion";
import ValentineCarousel from "./hero/_components/carousel";
import TestimonialPage from "@/components/testimonial";
import BestSelling from "@/components/best-seliing";
import MostPopular from "@/components/most-popular/most-popular";
import About from "@/components/about";
import Gallery from "@/components/gallery";
import Companies from "@/components/companies";

export default function Page({ params }: { params: { locale: string } }) {
  // Locale
  const locale = params.locale;

  return (
    <div className="flex flex-col justify-center items-center mx-auto max-w-7xl">
      <ValentineCarousel />
      <Occasion />
      <Services />
      <BestSelling locale={locale} />
      <MostPopular locale={locale} />
      <About />
      <Gallery />
      <TestimonialPage />
      <Companies />
    </div>
  );
}
