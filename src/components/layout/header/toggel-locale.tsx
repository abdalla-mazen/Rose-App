"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function ToggleLocale() {
  // Translation
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    router.push(`${pathname}${location.search}`, {
      locale: locale === "ar" ? "en" : "ar",
    });
  }

  return (
    <button
      onClick={toggleLocale}
      className="bg-white dark:bg-zinc-700 px-3 py-2 outline-none  hover:bg-zinc-700 dark:hover:bg-white text-zinc-700 dark:text-white border-l border-zinc-400"
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
