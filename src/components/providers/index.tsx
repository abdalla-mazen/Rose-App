"use client";

import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Locale,
  NextIntlClientProvider,
} from "next-intl";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./_components/react-query.provider";

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
  );
}
