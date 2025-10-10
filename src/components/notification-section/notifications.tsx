"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BrushCleaning, CheckCheck } from "lucide-react";
import NotificationsEmptyState from "./notifications-empty-state";
import NotificationItem from "./notification-item";
import {
  clearAllNotifications,
  markAllNotificationsRead,
} from "@/lib/actions/notifications.actions";
import { useTranslations } from "next-intl";

export default function Notifications() {
  const queryClient = useQueryClient();
  const t = useTranslations("notifications");

  // 📨 Fetch notifications
  const {
    data: notifications = [],
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ["notifications"],
    refetchInterval: 10_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (!res.ok) throw new Error(t("failedToLoad"));
      const data = await res.json();
      return Array.isArray(data?.notifications) ? data.notifications : [];
    },
  });

  // 🔹 Fetch unread notifications count
  const {
    data: unreadCount = 0,
    isLoading: isUnreadCountLoading,
    refetch: refetchUnreadCount,
  } = useQuery({
    queryKey: ["unread-count"],
    refetchInterval: 10_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await fetch("/api/notifications/unread-count", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(t("failedToLoad"));
      const data = await res.json();
      return typeof data?.unreadCount === "number" ? data.unreadCount : 0;
    },
  });

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
    <Card className="w-[360px] rounded-2xl shadow-md border overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-[#741C21] text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("title")}{" "}
            <span className="font-semibold text-white">
              {isUnreadCountLoading
                ? "..."
                : t("unreadCount", { count: unreadCount })}
            </span>
          </h2>
        </div>
      </CardHeader>

      {/* Actions Bar */}
      <div className="flex items-center justify-between bg-white text-sm text-gray-700 px-4 py-2 border-b">
        <button
          onClick={() => clearMutation.mutate()}
          disabled={clearMutation.isPending}
          className="flex items-center gap-1"
        >
          <BrushCleaning size={14} /> {/* الأيقونة الجديدة */}
          {t("clearAll")}
        </button>

        <button
          onClick={() => markAllMutation.mutate()}
          disabled={markAllMutation.isPending}
          className="flex items-center gap-1 hover:text-gray-900"
        >
          <CheckCheck size={14} /> {/* الأيقونة الجديدة */}
          {markAllMutation.isPending
            ? t("markAllRead") + "..."
            : t("markAllRead")}
        </button>
      </div>

      {/* Notifications content */}
      <CardContent className="p-0">
        {isNotificationsLoading ? (
          <p className="text-center py-6 text-gray-500">{t("loading")}</p>
        ) : isNotificationsError ? (
          <p className="text-center py-6 text-red-500">{t("failedToLoad")}</p>
        ) : notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((n: any) => (
              <NotificationItem
                key={n._id}
                id={n._id}
                title={n.title}
                message={n.body}
                isRead={n.isRead}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
