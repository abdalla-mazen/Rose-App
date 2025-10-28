import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeroPage from "./hero/page";
import BestSelling from "@/components/best-selling/best-seliing";
import MostPopular from "@/components/most-popular/most-popular";
import About from "@/components/about";
import Gallery from "@/components/gallery";
import TestimonialPage from "@/components/testimonial";
import Companies from "@/components/companies";

export default function Page({ params }: { params: { locale: string } }) {
  // Locale
  const locale = params.locale;

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center mx-auto max-w-7xl">
        <HeroPage />
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
