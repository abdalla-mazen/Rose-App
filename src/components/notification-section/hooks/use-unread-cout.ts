import { getNotificationsUnreadCount } from "@/lib/apis/notification.api";
import { useQuery } from "@tanstack/react-query";

export function useUnreadCount() {
  const { data, isLoading: isUnreadCountLoading } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getNotificationsUnreadCount,
  });

  const unreadCount = data?.unreadCount;

  return { unreadCount, isUnreadCountLoading };
}
