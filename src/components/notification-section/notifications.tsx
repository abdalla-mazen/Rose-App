"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BrushCleaning, CheckCheck } from "lucide-react";
import NotificationsEmptyState from "./notifications-empty-state";
import NotificationItem from "./notification-item";
import {
  clearAllNotifications,
  markAllNotificationsRead,
} from "@/components/notification-section/actions/notifications.actions";
import { useTranslations } from "next-intl";
import { Notification } from "@/lib/types/notifications";
import { useUnreadCount } from "./hooks/use-unread-cout";
import { useNotifications } from "./hooks/use-notifications";
import { cn } from "@/lib/utils";

export default function Notifications() {
  const queryClient = useQueryClient();
  const t = useTranslations("notifications");

  // 📨 Fetch notifications
  const { notifications, isNotificationsLoading, isNotificationsError } = useNotifications();
  console.log("notifications", notifications);

  // 🔹 Fetch unread notifications count
  const { unreadCount, isUnreadCountLoading } = useUnreadCount();
  console.log("unreadCount", unreadCount);

  // 🧹 Clear all notifications
  const clearMutation = useMutation({
    mutationFn: () => clearAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  // ✅ Mark all notifications as read
  const markAllMutation = useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  return (
    <Card className="top-14 right-5 z-30 absolute shadow-md border-none rounded-2xl w-[360px]">
      {/* Header */}
      <CardHeader className="bg-[#741C21] px-4 py-3 rounded-t-2xl text-white">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl tracking-tight">
            {t("title")}{" "}
            <span className="font-semibold text-white">
              {isUnreadCountLoading ? "..." : t("unreadCount", { count: unreadCount })}
            </span>
          </h2>
        </div>
      </CardHeader>

      {/* Actions Bar */}
      <div className="flex justify-between items-center bg-white px-4 py-2 border-b text-zinc-800 text-sm">
        <button
          onClick={() => clearMutation.mutate()}
          disabled={notifications?.length === 0 || clearMutation.isPending}
          className={cn("flex items-center gap-1", {
            "cursor-not-allowed text-zinc-400":
              isNotificationsLoading || notifications?.length === 0,
          })}
        >
          <BrushCleaning size={14} />
          {t("clearAll")}
        </button>

        <button
          onClick={() => markAllMutation.mutate()}
          disabled={notifications?.length === 0 || markAllMutation.isPending}
          className={cn("flex items-center gap-1 hover:text-zinc-900", {
            "cursor-not-allowed text-zinc-400":
              isNotificationsLoading || notifications?.length === 0,
          })}
        >
          <CheckCheck size={14} />
          {markAllMutation.isPending ? t("markAllRead") + "..." : t("markAllRead")}
        </button>
      </div>

      {/* Notifications content */}
      <CardContent className="p-0 min-h-60">
        {isNotificationsLoading ? (
          <p className="text-gray-500 text-center translate-y-20">{t("loading")}</p>
        ) : isNotificationsError ? (
          <p className="py-6 text-red-500 text-center">{t("failedToLoad")}</p>
        ) : notifications?.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications?.map((n: Notification) => (
              <NotificationItem
                key={n.id}
                id={n.id}
                title={n.title}
                message={n.message}
                isRead={n.isRead}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
