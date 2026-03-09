import { NextIntlClientProvider } from "next-intl";
import DashboardClientLayout from "./_components/dashboard-client-layout";
import Providers from "@/components/providers";
import { redirect } from "next/navigation";

import { getMessages, setRequestLocale } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function DashboardLayout({ children, params: { locale } }: Props) {
  if (locale !== "en") {
    redirect("/en/dashboard");
  }

  setRequestLocale("en");

  const messages = await getMessages({ locale: "en" });

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale="en">
          <Providers>
            <DashboardClientLayout>{children}</DashboardClientLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
