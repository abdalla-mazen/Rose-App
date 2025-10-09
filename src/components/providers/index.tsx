import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "./shared/_components/react-query.provider";
import { ThemeProvider } from "next-themes";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
