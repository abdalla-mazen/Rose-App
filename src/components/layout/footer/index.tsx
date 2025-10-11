import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default function Footer() {
  // translations
  const t = useTranslations();

  // links
  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/categories", label: t("categories") },
    { href: "/occasions", label: t("occasions") },
    { href: "/contact", label: t("contact") },
    { href: "/about", label: t("aboutLink") },
    { href: "/AboutTerms & Conditions", label: t("aboutTerms") },
    { href: "/Privacy Policy", label: t("privacyPolicy") },
    { href: "/FAQs", label: t("faqs") },
  ];

  return (
    <>
      <div className="flex  justify-between  bg-zinc-800 dark:text-zinc-50 dark:bg-zinc-900">
        {/*  Left side logo and navigation links  */}
        <div className="flex items-center  bg-zinc-800 dark:text-zinc-50 dark:bg-zinc-900">
          <div className="flex flex-col items-center py-10  ms-20 me-4">
            <Image
              src="/assets/images/logo.png"
              width={240}
              height={240}
              alt="logo of the website"
              className="ms-9 mt-1 me-4 "
            />
            <h2 className="text-softPink-300 fonst-semibold text-lg">
              Rose E-Commerce App
            </h2>
            <p className="text-sm text-zinc-100">
              {t("copyright")} | {new Date().getFullYear()}
            </p>
          </div>

          {/* Discover section with links */}
          <div className="ps-4">
            <h3 className="text-softPink-300 fonst-semibold text-lg">
              {t("discoverOur")}
            </h3>
            <ul className="py-1.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-zinc-100 hover:text-softPink-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*  Right side newsletter subscription*/}
        <div className="me-20 items-start flex flex-col w-[23.438rem] mt-10   ">
          <p className="text-softPink-300 fonst-semibold text-xl">
            {t.rich("getCoupon", {
              span: (chunks) => (
                <span className="text-maroon-50 font-semibold text-xl">
                  {chunks}
                </span>
              ),
            })}
          </p>
          <span className="text-zinc-500 text-sm">{t("subscribe")}</span>
          <div className="mt-5 w-full relative ">
            <Input
              placeholder={t("emailInputPlaceholder")}
              type="email"
              className="rounded-full w-full  bg-zinc-700 border-none text-zinc-50 placeholder:text-zinc-400 ps-4  pe-4 "
            />
            <Button
              variant={"secondary"}
              className="absolute top-1/2 -translate-y-1/2 right-0 rounded-full h-full w-32 ps-4 pe-2.5 rtl:right-auto rtl:left-0 dark:bg-softPink-300 dark:text-zinc-800 dark:hover:bg-softPink-400 hover:dark:text-zinc-800"
            >
              {t("subscribeButton")}
              <ArrowRight size={16} className="rtl:rotate-180" />{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
