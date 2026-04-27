import React from "react";
import AccountClient from "./_components/account-client";
import { getTranslations } from "next-intl/server";
import { GetUserDataApi } from "@/lib/apis/get-user-data.api";

export default async function Page() {
  // Transaltions
  const t = await getTranslations();

  // Get user data
  const userData = await GetUserDataApi();

  return (
    <div className="mx-auto mb-72 max-w-7xl text-zinc-800 dark:text-zinc-50 p-4">
      <h1 className="mt-16 mb-9 font-bold text-5xl capitalize">{t("update-profile")}</h1>

      <AccountClient userData={userData} />
    </div>
  );
}
