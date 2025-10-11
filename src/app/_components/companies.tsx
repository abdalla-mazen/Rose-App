import { useTranslations } from "next-intl";
import Image from "next/image";

const COMPANIES = [
  "/assets/images/about-logos/coconut.png",
  "/assets/images/about-logos/ginyardpng.png",
  "/assets/images/about-logos/ingoude.png",
  "/assets/images/about-logos/velvetpng.png",
  "/assets/images/about-logos/ingoude_2.png",
  "/assets/images/about-logos/habus.png",
];

export default function Companies() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center gap-10 bg-maroon-50 dark:bg-zinc-700 mx-auto my-32 px-6 py-10 rounded-2xl w-11/12 max-w-7xl h-52">
      <p className="font-bold text-maroon-700 dark:text-softPink-200 text-4xl capitalize">
        {t.rich("companies", {
          span: (chunk) => (
            <span className="text-softPink-500 dark:text-maroon-400">
              {chunk}
            </span>
          ),
        })}
      </p>

      <ul className="flex flex-wrap items-center gap-16">
        {COMPANIES.map((com) => {
          return (
            <Image
              src={com}
              alt="Company Name"
              key={com}
              width={150}
              height={50}
            />
          );
        })}
      </ul>
    </section>
  );
}
