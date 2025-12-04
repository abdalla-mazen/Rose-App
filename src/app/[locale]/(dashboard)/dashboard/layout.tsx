// Dashboard Layout

import { hasLocale, NextIntlClientProvider } from "next-intl";
import DashboardClientLayout from "./_components/dashboard-client-layout";
import Providers from "@/components/providers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DashboardLayout({ children, params: { locale } }: Props) {
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <DashboardClientLayout>{children}</DashboardClientLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
