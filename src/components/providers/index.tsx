import React from "react";
import ReactQueryProvider from "./_components/react-query.provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Locale,
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
export default function Providers({ children }: { children: React.ReactNode }) {
  // Translation
  const messages = useMessages();
  const locale = useLocale() as Locale;
  const timezone = useTimeZone();
  const now = useNow();

  return (
    <ReactQueryProvider>
      {/* react query dev tools */}
      <ReactQueryDevtools />
      <NextIntlClientProvider
        messages={messages}
        locale={locale}
        timeZone={timezone}
        now={now}
      >
        {children}
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
