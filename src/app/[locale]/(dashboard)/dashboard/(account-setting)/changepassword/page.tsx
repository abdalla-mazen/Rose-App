import React from "react";
import AccountChangePassword from "../../../account/_components/account-changepassword";
import { useTranslations } from "next-intl";

export default function Page() {
  // Translations
  const t = useTranslations();

  return (
    <div className="bg-zinc-50 max-w-5xl p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-zinc-800  mb-9  capitalize">
        {" "}
        {t("change-password")}
      </h1>

      {/* Form */}
      <div className=" bg-white max-w-5xl p-6 rounded-2xl">
        <AccountChangePassword />
      </div>
    </div>
  );
}
