import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import About from "./_components/about";
import Companies from "./_components/companies";
import Gallery from "./_components/gallery";
import BestSelling from "./_components/best-selling/best-seliing";
import MostPopular from "./_components/most-popular/most-popular";
import TestimonialPage from "./_components/testimonial";
import Services from "./hero/_components/service";
import Occasion from "./hero/_components/occasion";
import ValentineCarousel from "./hero/_components/carousel";

export default function Page({ params }: { params: { locale: string } }) {
  // Locale
  const locale = params.locale;

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
