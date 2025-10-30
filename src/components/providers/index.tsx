import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Locale,
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
import ReactQueryProvider from "./_components/react-query.provider";
import { NextAuthProvider } from "./_components/next-auth.provider";
import RootLayout from "./_components/navbar-footer.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Translation
  const messages = useMessages();
  const locale = useLocale() as Locale;
  const timezone = useTimeZone();
  const now = useNow();

  return (
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
  );
}
