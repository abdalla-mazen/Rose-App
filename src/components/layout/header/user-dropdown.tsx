"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, MapPinHouse, ScrollText, Settings, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { AccountProfile } from "@/lib/types/account-profile";
import { useTranslations, useLocale } from "next-intl";

type Props = {
  session: AccountProfile | null;
};

export default function UserDropdown({ session }: Props) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Logout function
  function logout() {
    localStorage.removeItem("isLoggedIn");
    signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative mx-6 focus:outline-none w-16 font-medium">
        <span className="block bottom-4 absolute text-zinc-500 text-xs text-start">
          {t("hello")}
        </span>
        <div className="flex items-center gap-2 text-zinc-500">
          <span className="text-maroon-700 dark:text-softPink-200">{session?.firstName}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={`w-56 font-medium text-sm ${isArabic ? "text-right" : "text-left"} dark:bg-zinc-700`}
      >
        <DropdownMenuLabel className="text-maroon-700 dark:text-softPink-200 capitalize">
          {session?.firstName} {session?.lastName}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="dark:bg-zinc-600" />

        <Link href="/account">
          <DropdownMenuItem
            className={`capitalize ${isArabic ? "flex-row-reverse text-right" : ""}`}
          >
            <User className={`${isArabic ? "ml-2" : "mr-2"}`} /> {t("my-profile")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className={`capitalize ${isArabic ? "flex-row-reverse text-right" : ""}`}>
          <MapPinHouse className={`${isArabic ? "ml-2" : "mr-2"}`} /> {t("my-addresses")}
        </DropdownMenuItem>

        <DropdownMenuItem className={`capitalize ${isArabic ? "flex-row-reverse text-right" : ""}`}>
          <ScrollText className={`${isArabic ? "ml-2" : "mr-2"}`} /> {t("my-orders")}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="dark:bg-zinc-600" />

        <DropdownMenuItem className={`capitalize ${isArabic ? "flex-row-reverse text-right" : ""}`}>
          <Settings className={`${isArabic ? "ml-2" : "mr-2"}`} /> {t("dashboard")}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="dark:bg-zinc-600" />

        <DropdownMenuItem
          onClick={logout}
          className={`capitalize ${isArabic ? "flex-row-reverse text-right" : ""}`}
        >
          <LogOut className={`${isArabic ? "ml-2" : "mr-2"}`} /> {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
