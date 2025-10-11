import { useTranslations } from "next-intl";
import Image from "next/image";

// Gallery Images
const GALLERY = [
  [
    { id: 1, src: "/assets/images/gallery/1.png", alt: "Gift boxes" },
    { id: 2, src: "/assets/images/gallery/4.png", alt: "Roses and chocolates" },
  ],
  [
    { id: 3, src: "/assets/images/gallery/2.png", alt: "Red gift box" },
    {
      id: 4,
      src: "/assets/images/gallery/5.png",
      alt: "Ring in box with flowers",
    },
  ],
  [
    { id: 5, src: "/assets/images/gallery/3.png", alt: "Ring with flowers" },
    {
      id: 6,
      src: "/assets/images/gallery/6.png",
      alt: "Engagement card and ring",
    },
  ],
];

export default function Gallery() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center gap-10 mx-auto my-32 w-11/12 max-w-7xl text-center">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 w-full font-bold">
        {/* Title */}
        <span className="text-softPink-500 dark:text-maroon-400 text-base uppercase tracking-widest">
          {t("gallery")}
        </span>

        {/* Heading */}
        <h2 className="flex justify-center items-center gap-2 text-maroon-700 dark:text-softPink-200 text-4xl capitalize">
          {t.rich("gallery-title", {
            span: (chunk) => (
              <span className="before:bottom-1 before:left-1 before:-z-10 before:absolute relative flex items-center gap-2 before:bg-softPink-100 before:dark:bg-zinc-700 py-1 ps-1 before:rounded-e-2xl before:w-[95%] before:h-4">
                {chunk}
              </span>
            ),
            span1: (chunk) => (
              <span className="after:block after:bg-softPink-600 dark:after:bg-softPink-500 after:w-full after:h-[2px] after:content-[''] after:translate-y-1">
                {chunk}
              </span>
            ),
          })}
        </h2>
      </div>

      {/* Images */}
      <div className="gap-4 grid grid-cols-3">
        {GALLERY.map((col) => (
          <div key={col[0].id} className="flex flex-col gap-4">
            {col.map((img) => (
              <Image
                key={img.id}
                src={img.src}
                alt={img.alt}
                width={420}
                height={500}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
