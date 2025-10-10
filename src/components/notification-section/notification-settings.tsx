"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Check, Trash2, EllipsisVertical } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  markNotificationRead,
} from "@/lib/actions/notifications.actions";
import { useTranslations } from "next-intl";

export default function NotificationMenu({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const t = useTranslations("notifications"); // namespace للترجمات

  // 🟢 Mutation باستخدام الدالة markNotificationRead
  const markAsRead = useMutation({
    mutationFn: (ids: string[]) => markNotificationRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  // 🟢 Mutation لحذف Notification
  const deleteNotif = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <EllipsisVertical size={16} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => markAsRead.mutate([id])}
          disabled={markAsRead.isPending}
          className="flex items-center gap-2 rtl:flex-row-reverse"
        >
          <Check className="h-4 w-4 text-gray-600" />
          <span>{markAsRead.isPending ? t("marking") : t("markAsRead")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => deleteNotif.mutate(id)}
          disabled={deleteNotif.isPending}
          className="flex items-center gap-2 text-red-600 focus:text-red-700 rtl:flex-row-reverse"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
          <span>
            {deleteNotif.isPending ? t("deleting") : t("deleteNotification")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
