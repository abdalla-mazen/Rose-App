import { getNotifications } from "@/lib/apis/notification.api";
import { useQuery } from "@tanstack/react-query";

export function useNotifications() {
  const {
    data,
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const notifications = data?.notifications;

  return { notifications, isNotificationsError, isNotificationsLoading };
}
