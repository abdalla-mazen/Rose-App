import React from "react";
import ForgetPassword from "./forget-password-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ForgetPasswordSection() {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col justify-center items-center dark:bg-zinc-800 mx-10 py-10 w-406">
      <div className="flex flex-col">
        {/* Headline */}
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl capitalize">
          {t("foget-title")}
        </h1>

        {/* Subtitle */}
        <p className="mt-1 mb-6 font-normal text-zinc-800 dark:text-zinc-50 [&::first-letter]:uppercase">
          {t("forget-subtitle")}
        </p>

        {/* Forget component */}
        <ForgetPassword />

        {/* Register link */}
        <span className="mt-5 text-zinc-800 dark:text-zinc-50 text-sm text-center [&::first-letter]:uppercase">
          {t("forget-text-register")}{" "}
          <Link
            href="/register"
            className="font-bold text-maroon-700 dark:text-softPink-300"
          >
            {t("forget-text-register-link")}
          </Link>
        </span>
      </div>
    </section>
  );
}
