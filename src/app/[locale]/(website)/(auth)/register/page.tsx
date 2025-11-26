import AuthBottomLink from "@/components/shared/auth/auth-bottom-link";
import AuthTitle from "@/components/shared/auth/auth-title";
import React from "react";
import RegisterForm from "./_components/register-form";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  // Translations
  const t = await getTranslations();

  return (
    <main>
      {/* Register title */}
      <AuthTitle title="Become part of our family!" />

      {/* Register form (client component) */}
      <RegisterForm />

      {/* Register meassage , login link */}
      <AuthBottomLink
        message={t("register-mess")}
        linkHref="/login"
        linkText={t("register-link")}
      />
    </main>
  );
}
