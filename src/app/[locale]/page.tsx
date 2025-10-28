import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import HeroPage from "./hero/page";

export default function Page({ params }: { params: { locale: string } }) {
  // Locale
  const locale = params.locale;

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center mx-auto max-w-7xl">
        <HeroPage />
        {/* <BestSelling locale={locale} />
        <MostPopular locale={locale} />
        <About />
        <Gallery />
        <TestimonialPage />
        <Companies /> */}
      </div>
      <Footer />
    </>
  );
}
