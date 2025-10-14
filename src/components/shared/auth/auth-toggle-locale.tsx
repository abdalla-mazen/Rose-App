"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function AuthToggleLocale() {
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
    <div className="ms-auto mt-10 w-10">
      <button
        onClick={toggleLocale}
        className="px-3 py-2 outline-none text-zinc-700 dark:text-zinc-50"
      >
        {locale === "ar" ? "English" : "العربية"}
      </button>
    </div>
  );
}
