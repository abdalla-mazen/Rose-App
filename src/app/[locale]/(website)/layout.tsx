<<<<<<< HEAD:src/app/[locale]/layout.tsx
import { hasLocale } from "next-intl";
import { getMessages, getNow, getTimeZone, setRequestLocale } from "next-intl/server";
=======
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
>>>>>>> 44e944afedfc7f0dfffa4980bd4119e6e32f4359:src/app/[locale]/(website)/layout.tsx
import { Tajawal, Sarabun } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const sarabun = Sarabun({
  subsets: ["latin"],
  variable: "--font-sarabun",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Pick<Props, "params">) {
<<<<<<< HEAD:src/app/[locale]/layout.tsx
  const messages = await getMessages({ locale });
=======
  const t = await getTranslations({ locale });

>>>>>>> 44e944afedfc7f0dfffa4980bd4119e6e32f4359:src/app/[locale]/(website)/layout.tsx
  return {
    title: messages.title ?? "App",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
<<<<<<< HEAD:src/app/[locale]/layout.tsx
=======
  // Ensure that the incoming `locale` is valid
>>>>>>> 44e944afedfc7f0dfffa4980bd4119e6e32f4359:src/app/[locale]/(website)/layout.tsx
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

<<<<<<< HEAD:src/app/[locale]/layout.tsx
  // 👇 نجيب البيانات من السيرفر
  const messages = await getMessages({ locale });
  const timezone = await getTimeZone();
  const now = await getNow();
=======
  const messages = await getMessages({ locale });
>>>>>>> 44e944afedfc7f0dfffa4980bd4119e6e32f4359:src/app/[locale]/(website)/layout.tsx

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          sarabun.variable,
          tajawal.variable,
          locale === "ar" ? "font-tajawal" : "font-sarabun",
          "antialiased",
        )}
      >
<<<<<<< HEAD:src/app/[locale]/layout.tsx
        {/* Providers */}
        <Providers locale={locale} messages={messages} timezone={timezone} now={now}>
          {children}
        </Providers>
=======
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
>>>>>>> 44e944afedfc7f0dfffa4980bd4119e6e32f4359:src/app/[locale]/(website)/layout.tsx
      </body>
    </html>
  );
}
