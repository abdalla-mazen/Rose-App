import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import About from "../_components/about";
import Companies from "../_components/companies";
import Gallery from "../_components/gallery";
import BestSelling from "./_components/best-selling/best-seliing";
import MostPopular from "./_components/most-popular/most-popular";
import TestimonialPage from "./_components/testimonial";

export default function Page({ params }: { params: { locale: string } }) {
  // Locale
  const locale = params.locale;

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto max-w-[1280px]">
        <About />
        <Gallery />
        <Companies />
        <BestSelling locale={locale} />
        <MostPopular locale={locale} />
        <TestimonialPage />
      </div>
      <Footer />
    </>
  );
}
