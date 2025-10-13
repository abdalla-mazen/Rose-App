import { useTranslations } from "next-intl";
import TestimonialSection from "./testimonial-section";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function TestimonialPage() {
  // Translation
  const t = useTranslations();

  return (
    <>
      <section className="flex justify-center gap-10 py-10 w-full">
        {/* header*/}
        <div className="flex flex-col items-center gap-2 w-2/5 h-16">
          <h2 className="gap-2 font-sarabun font-medium text-softPink-500 dark:text-maroon-400 text-base uppercase leading-[100%] tracking-wider">
            {t("testimonial-title")}
          </h2>

          <p className="z-10 relative h-10 font-sarabun font-bold text-maroon-700 dark:text-softPink-200 text-3xl align-middle leading-[100%] -tracking-normal">
            {t("testimonial-subtitle")}
            <span className="bottom-1 left-0 -z-10 absolute bg-softPink-100 dark:bg-zinc-700 opacity-100 rounded-tr-[20px] rounded-br-[20px] w-[71%] h-4" />

            <span className="bottom-1 left-0 -z-10 absolute bg-softPink-600 dark:bg-softPink-500 opacity-100 w-40 h-0.5" />
          </p>
        </div>
      </section>
      <Suspense
        fallback={
          <div className="flex justify-center items-center bg-maroon-50 dark:bg-zinc-700 w-full h-[550px]">
            <Loader2 className="w-10 h-10 text-maroon-700 animate-spin" />
          </div>
        }
      >
        <TestimonialSection />
      </Suspense>
    </>
  );
}
