import AuthTitle from "@/components/shared/auth/auth-title";
import LoginForm from "./_components/login-form";
import AuthBottomLink from "@/components/shared/auth/auth-bottom-link";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  // Translations
  const t = await getTranslations();

  return (
    <main>
      {/* Login title */}
      <AuthTitle title="Welcome back!" />

      {/* Login form (client component) */}
      <LoginForm />

      {/* Login meassage , login link */}
      <AuthBottomLink message={t("login-mess")} linkHref="/register" linkText={t("login-link")} />
    </main>
  );
}
