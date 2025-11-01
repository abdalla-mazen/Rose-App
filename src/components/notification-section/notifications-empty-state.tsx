import { BellOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotificationsEmptyState() {
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center text-gray-500 translate-y-20">
      <BellOff size={40} className="mb-2" />
      <p className="text-sm">{t("notifications.notificationsEmptyState")}</p>
    </div>
  );
}
