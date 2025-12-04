import { hasLocale, NextIntlClientProvider } from "next-intl";
import Providers from "@/components/providers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import GeneralPages from "@/components/shared/general-pages";

type Props = {
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function NotAuthorized({ params: { locale } }: Props) {
  // Translation
  const t = await getTranslations();

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
            <GeneralPages
              src="/assets/images/general/lock-shield.svg"
              alt="Not authorized"
              width={360}
              height={360}
              primaryText={t("not-authorized-primary")}
              secondaryText={t("not-authorized-secondary")}
              button={true}
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
