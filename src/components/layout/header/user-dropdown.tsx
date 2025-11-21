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
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

type Props = {
  userData: UserData | null;
};

export default function UserDropdown({ userData }: Props) {
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
      <DropdownMenuTrigger className="relative mx-6 focus:outline-none w-22 font-medium">
        <span className="block bottom-4 absolute text-zinc-500 text-xs text-start">
          {t("hello")}
        </span>
        <div className="flex items-center gap-2 text-zinc-500">
          <span className="text-maroon-700 dark:text-softPink-200">{userData?.firstName}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "dark:bg-zinc-700 w-56 font-medium text-sm",
          isArabic ? "text-right" : "text-left",
        )}
      >
        <DropdownMenuLabel className="text-maroon-700 dark:text-softPink-200 capitalize">
          {userData?.firstName} {userData?.lastName}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="dark:bg-zinc-600" />

        <Link href="/account">
          <DropdownMenuItem className={cn("capitalize", isArabic && "flex-row-reverse text-right")}>
            <User className={cn(isArabic ? "ml-2" : "mr-2")} /> {t("my-profile")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className={cn("capitalize", isArabic && "flex-row-reverse text-right")}>
          <MapPinHouse className={cn(isArabic ? "ml-2" : "mr-2")} /> {t("my-addresses")}
        </DropdownMenuItem>

        <DropdownMenuItem className={cn("capitalize", isArabic && "flex-row-reverse text-right")}>
          <ScrollText className={cn(isArabic ? "ml-2" : "mr-2")} /> {t("my-orders")}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="dark:bg-zinc-600" />

        <DropdownMenuItem className={cn("capitalize", isArabic && "flex-row-reverse text-right")}>
          <Link
            href="/dashboard"
            className={cn("flex items-center", isArabic && "flex-row-reverse")}
          >
            <Settings className={cn(isArabic ? "ml-2" : "mr-2")} />
            {t("dashboard")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="dark:bg-zinc-600" />

        <DropdownMenuItem
          onClick={logout}
          className={cn("capitalize", isArabic && "flex-row-reverse text-right")}
        >
          <LogOut className={cn(isArabic ? "ml-2" : "mr-2")} /> {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
