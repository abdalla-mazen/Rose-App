// import { useTranslations } from "next-intl";
// import TestimonialSection from "./testimonial-section";
// import { Suspense } from "react";
// import { Loader2 } from "lucide-react";

// export default function TestimonialPage() {
//   // Translation
//   const t = useTranslations();

//   return (
//     <>
//       <section className="flex justify-center gap-10 dark:bg-transparent py-10 w-full">
//         {/* header*/}
//         <div className="flex flex-col items-center gap-2 w-2/5 h-16">
//           <h2 className="gap-2 font-sarabun font-medium text-softPink-500 dark:text-maroon-400 text-base uppercase leading-[100%] tracking-wider">
//             {t("testimonial-title")}
//           </h2>

//           <p className="z-10 relative h-10 font-sarabun font-bold text-maroon-700 dark:text-softPink-200 text-3xl align-middle leading-[100%] -tracking-normal">
//             {t("testimonial-subtitle")}
//             <span className="bottom-1 left-0 -z-10 absolute bg-softPink-100 dark:bg-zinc-700 opacity-100 rounded-tr-[20px] rounded-br-[20px] w-[71%] h-4" />

//             <span className="bottom-1 left-0 -z-10 absolute bg-softPink-600 dark:bg-softPink-500 opacity-100 w-40 h-0.5" />
//           </p>
//         </div>
//       </section>
//       <Suspense
//         fallback={
//           <div className="flex justify-center items-center bg-maroon-50 dark:bg-zinc-700 w-full h-[550px]">
//             <Loader2 className="w-10 h-10 text-maroon-700 animate-spin" />
//           </div>
//         }
//       >
//         <TestimonialSection />
//       </Suspense>
//     </>
//   );
// }

import { useTranslations } from "next-intl";
import TestimonialSection from "./testimonial-section";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function TestimonialPage() {
  const t = useTranslations();

  return (
    <>
      {/* Header */}
      <section className="flex justify-center py-10 w-full">
        <div
          className="
            flex flex-col items-center gap-3
            w-full px-4
            lg:w-2/5
          "
        >
          <h2 className="font-sarabun font-medium text-softPink-500 dark:text-maroon-400 text-sm uppercase tracking-wider">
            {t("testimonial-title")}
          </h2>

          <p
            className="
              relative font-sarabun font-bold
              text-maroon-700 dark:text-softPink-200
              text-2xl sm:text-3xl text-center
            "
          >
            {t("testimonial-subtitle")}

            {/* Background highlight */}
            <span
              className="
                absolute bottom-1 left-1/2 -translate-x-1/2 -z-10
                bg-softPink-100 dark:bg-zinc-700
                rounded-tr-[20px] rounded-br-[20px]
                w-[80%] sm:w-[70%] h-4
              "
            />

            {/* Underline */}
            <span
              className="
                absolute bottom-0 left-1/2 -translate-x-1/2 -z-10
                bg-softPink-600 dark:bg-softPink-500
                w-32 sm:w-40 h-0.5
              "
            />
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center bg-maroon-50 dark:bg-zinc-700 w-full h-[400px] sm:h-[550px]">
            <Loader2 className="w-10 h-10 text-maroon-700 animate-spin" />
          </div>
        }
      >
        <TestimonialSection />
      </Suspense>
    </>
  );
}
