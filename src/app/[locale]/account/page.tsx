import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import React from "react";
import AccountClient from "./_components/account-client";
import { AccountProfile } from "@/lib/types/account-profile";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  // Session
  const session = await getServerSession(authOptions);

  // Assign type to session
  const accountSettings: AccountProfile | null = session?.user
    ? (session.user as AccountProfile)
    : null;

  // Transaltions
  const t = await getTranslations();

  return (
    <div className="mx-auto mb-72 max-w-7xl text-zinc-800 dark:text-zinc-50">
      <h1 className="mt-16 mb-9 font-bold text-5xl capitalize">{t("update-profile")}</h1>

      <AccountClient session={accountSettings} />
    </div>
  );
}
