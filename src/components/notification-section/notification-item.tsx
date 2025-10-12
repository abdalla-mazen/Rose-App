"use client";

import { cn } from "@/lib/utils";
import NotificationMenu from "./notification-settings";

type NotificationItemProps = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
};

export default function NotificationItem({
  id,
  title,
  message,
  isRead,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "relative p-4 transition-colors",
        !isRead && "bg-zinc-200 border border-t-zinc-300 border-b-zinc-300"
      )}
    >
      {/* Three-dots menu (notification actions) */}
      <div className="absolute top-2 right-2 z-10">
        <NotificationMenu id={id} />
      </div>

      {/* Notification content */}
      <div className="pr-6">
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-600 text-sm mt-1 leading-snug">{message}</p>
      </div>
    </div>
  );
}
