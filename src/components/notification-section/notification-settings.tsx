"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Check, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  markNotificationRead,
} from "@/components/notification-section/actions/notifications.actions";
import { useTranslations } from "next-intl";

export default function NotificationMenu({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const t = useTranslations("notifications");

  // Mark a specific notification as read
  const markAsRead = useMutation({
    mutationFn: (ids: string[]) => markNotificationRead(ids),
    onSuccess: () => {
      // Refresh notifications and unread count after success
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  // Delete a specific notification
  const deleteNotif = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      // Refresh notifications and unread count after deletion
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  return (
    <DropdownMenu>
      {/* Three-dots trigger icon */}
      <DropdownMenuTrigger asChild>
        <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <EllipsisVertical size={16} />
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent align="end" className="w-48">
        {/* Mark as read option */}
        <DropdownMenuItem
          onClick={() => markAsRead.mutate([id])}
          disabled={markAsRead.isPending}
          className="flex rtl:flex-row-reverse items-center gap-2"
        >
          <Check className="w-4 h-4 text-gray-600" />
          <span>{markAsRead.isPending ? t("marking") : t("markAsRead")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete notification option */}
        <DropdownMenuItem
          onClick={() => deleteNotif.mutate(id)}
          disabled={deleteNotif.isPending}
          className="flex rtl:flex-row-reverse items-center gap-2 text-red-600 focus:text-red-700"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
          <span>{deleteNotif.isPending ? t("deleting") : t("deleteNotification")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
