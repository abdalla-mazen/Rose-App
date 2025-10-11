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
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone={timezone}
      now={now}
    >
      {children}
    </NextIntlClientProvider>
  );
}
