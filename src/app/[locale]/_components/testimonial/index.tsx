import { useTranslations } from "next-intl";
import TestimonialSection from "./testimonial-section";

export default function TestimonialPage() {
  const t = useTranslations();
  return (
    <>
      <section className="flex justify-center w-full gap-10 py-10 dark:bg-zinc-900 ">
        {/* header*/}
        <div className=" flex flex-col items-center  w-2/5 h-16 gap-2">
          <h2 className=" font-sarabun font-medium text-base  leading-[100%] tracking-wider uppercase text-softPink-500 dark:text-maroon-400 gap-2">
            {t("testimonial-title")}
          </h2>

          <p className=" relative h-10 font-sarabun font-bold text-3xl leading-[100%] -tracking-normal  text-maroon-700 dark:text-softPink-200 align-middle z-10">
            {t("testimonial-subtitle")}
            <span className="absolute bottom-1 left-0 h-4 w-[71%] bg-softPink-100 dark:bg-zinc-700 rounded-tr-[20px] rounded-br-[20px] opacity-100 -z-10" />

            <span className="absolute bottom-1 left-0  h-0.5 w-40 bg-softPink-600 dark:bg-softPink-500 opacity-100 -z-10" />
          </p>
        </div>
      </section>
      <TestimonialSection />
    </>
  );
}
