import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  // Translation
  const t = useTranslations();

  // About statements
  const ABOUT_STATEMENTS: string[] = [
    t("about-statement-1"),
    t("about-statement-2"),
    t("about-statement-3"),
    t("about-statement-4"),
  ];

  return (
    <section className="items-center gap-20 grid grid-cols-2 mx-auto mt-32 w-11/12 max-w-7xl h-96">
      {/* Left side images */}
      <div className="flex items-center gap-2">
        <div className="relative w-[19rem] h-96">
          <Image
            src="/assets/images/about/1.png"
            alt="Opening Box"
            width={300}
            height={320}
            className="rounded-[7.5rem] rounded-tl-[3.125rem] max-w-[19rem] max-h-[21.5rem] object-cover translate-y-8"
          />

          <span className="-z-10 absolute border-4 border-maroon-600 dark:border-softPink-400 rounded-[7.5rem] rounded-tl-[3.125rem] rounded-tr-[7.5rem] w-72 h-[23rem] rotate-3 -translate-x-4 -translate-y-[330px]"></span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Image
            src="/assets/images/about/2.png"
            alt="Opening Box"
            width={193}
            height={193}
            className="rounded-full max-w-48 max-h-48"
          />

          <Image
            src="/assets/images/about/3.png"
            alt="Opening Box"
            width={193}
            height={144}
            className="rounded-r-[6.25rem] rounded-l-[3.125rem] max-w-48 max-h-36"
          />
        </div>
      </div>

      {/* Right side content */}
      <div className="flex flex-col space-y-6 max-w-xl">
        <span className="font-bold text-softPink-500 dark:text-maroon-400 text-base uppercase tracking-widest">
          {t("about")}{" "}
        </span>

        <h2 className="font-bold text-maroon-700 dark:text-softPink-200 [&>*]:dark:text-maroon-400 [&>*]:text-softPink-500 text-3xl capitalize">
          {t.rich("about-title", {
            span: (chunks) => <span>{chunks}</span>,
          })}
        </h2>

        {/* Main paragraph  */}
        <p className="dark:text-zinc-400 -translate-y-4">
          {t("about-paragraph")}
        </p>

        {/* Discover Link */}
        <Link
          className="flex items-center gap-2.5 bg-maroon-600 dark:bg-softPink-200 px-4 py-2.5 border-none rounded-xl outline-none w-32 text-white dark:text-zinc-800 capitalize -translate-y-4"
          href="/"
        >
          {t("discover")}

          {/* Arrow */}
          <ArrowRight className={"h-4 mt-1 rtl:rotate-180"} />
        </Link>

        {/* About statements */}
        <div className="gap-6 grid grid-cols-2 -translate-y-4">
          {ABOUT_STATEMENTS.map((statement) => (
            <div
              className="flex items-center gap-2 min-w-80 dark:text-zinc-800"
              key={statement}
            >
              {/* Check icon */}
              <span className="text-maroon-700 dark:text-softPink-400">
                <Check />
              </span>

              {/* Statement */}
              <p className="font-normal text-zinc-800 dark:text-zinc-50 text-base capitalize">
                {statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
