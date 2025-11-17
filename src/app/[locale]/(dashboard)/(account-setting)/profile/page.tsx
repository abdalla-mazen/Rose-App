import React from "react";
import AccountEditProfile from "../../../account/_components/account-editprofile";
import { GetUserDataApi } from "@/lib/apis/get-user-data.api";
import { getTranslations } from "next-intl/server";

export default async function page() {
  // Transaltions
  const t = await getTranslations();

  // Get user data
  const userData = await GetUserDataApi();

  return (
    <div className="bg-zinc-50 max-w-5xl p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-zinc-800  mb-9 capitalize">
        {t("account-settings")}
      </h1>

      {/* Form  */}
      <div className=" bg-white max-w-5xl p-6 rounded-2xl">
        <AccountEditProfile userData={userData} showButtonChangePassword={true} />
      </div>
    </div>
  );
}
