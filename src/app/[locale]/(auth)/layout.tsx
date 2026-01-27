import AuthToggleLocale from "@/components/shared/auth/auth-toggle-locale";
import Image from "next/image";
import React from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
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

// export default async function Layout({ children, params: { locale } }: Props) {
//   // Ensure that the incoming `locale` is valid
//   if (!hasLocale(routing.locales, locale)) {
//     notFound();
//   }

//   // Enable static rendering
//   setRequestLocale(locale);

//   const messages = await getMessages({ locale });
//   return (
//     <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
//       <body>
//         <NextIntlClientProvider messages={messages} locale={locale}>
//           <Providers>
//             <div className="flex">
//               {/* Left side: Auth Content */}
//               <div className="flex justify-center items-center bg-white dark:bg-zinc-800 w-1/2 min-h-screen text-maroon-700 dark:text-softPink-300">
//                 <div className="w-full max-w-[406px]">
//                   {/* Locale toggle button */}
//                   <AuthToggleLocale />

//                   {/* Top separator */}
//                   <Image
//                     src="/assets/images/auth/authLayoutSepa.png"
//                     alt="Layout separator"
//                     width={280}
//                     height={45}
//                     className="mx-auto my-10"
//                   />

//                   {children}

//                   {/* bottom Separator */}
//                   <Image
//                     src="/assets/images/auth/authLayoutSepa.png"
//                     alt="Layout separator"
//                     width={280}
//                     height={45}
//                     className="mx-auto my-10 scale-y-[-1] transform"
//                   />
//                 </div>
//               </div>

//               {/* Right side: Background image */}
//               <div className="relative w-1/2">
//                 <Image
//                   src="/assets/images/auth/authLayout.png"
//                   alt="Authentication Layout Image"
//                   fill
//                   priority
//                 />
//               </div>
//             </div>
//           </Providers>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }


export default async function Layout({ children, params: { locale } }: Props) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <div className="flex min-h-screen flex-col lg:flex-row">
              
              {/* Auth Content */}
              <div
                className="
                  flex w-full lg:w-1/2
                  justify-center items-center
                  bg-white dark:bg-zinc-800
                  text-maroon-700 dark:text-softPink-300
                  px-4 sm:px-6
                "
              >
                <div className="w-full max-w-[406px] py-10">
                  <AuthToggleLocale />

                  <Image
                    src="/assets/images/auth/authLayoutSepa.png"
                    alt="Layout separator"
                    width={280}
                    height={45}
                    className="mx-auto my-8"
                  />

                  {children}

                  <Image
                    src="/assets/images/auth/authLayoutSepa.png"
                    alt="Layout separator"
                    width={280}
                    height={45}
                    className="mx-auto my-8 scale-y-[-1]"
                  />
                </div>
              </div>

              {/* Background Image */}
              <div className="relative hidden lg:block w-1/2">
                <Image
                  src="/assets/images/auth/authLayout.png"
                  alt="Authentication Layout Image"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 0"
                />
              </div>

            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
