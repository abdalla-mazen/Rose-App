"use client";

import { BellOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotificationsEmptyState() {
  const t = useTranslations("notifications");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <BellOff size={40} className="mb-2" />
      <p className="text-sm">{t("emptyState")}</p>
    </div>
  );
}
