"use client";

import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Locale,
  NextIntlClientProvider,
} from "next-intl";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./_components/react-query.provider";
import { NextAuthProvider } from "./_components/next-auth.provider";
import RootLayout from "./_components/navbar-footer.provider";

type ProvidersProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: Record<string, any>;
  timezone: string;
  now: Date;
};

export default function Providers({
  children,
  locale,
  messages,
  timezone,
  now,
}: ProvidersProps) {
  return (
<<<<<<< HEAD
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone={timezone}
          now={now}
        >
          <ReactQueryProvider>
            <ReactQueryDevtools />
            {children}
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </SessionProvider>
=======
    <NextAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* Next Intl Provider */}
        <NextIntlClientProvider messages={messages} locale={locale} timeZone={timezone} now={now}>
          <ReactQueryProvider>
            {/* react query dev tools */}
            <ReactQueryDevtools />
            <RootLayout>{children}</RootLayout>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </NextAuthProvider>
>>>>>>> 44e944afedfc7f0dfffa4980bd4119e6e32f4359
  );
}
