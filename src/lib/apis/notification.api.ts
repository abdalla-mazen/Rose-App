// Get user notifications
export async function getNotifications() {
  const res = await fetch("/api/notifications", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load notifications");

  const payload = await res.json();

  return payload;
}

// Get unread user notifications
export async function getNotificationsUnreadCount() {
  const res = await fetch("/api/notifications/unread-count", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load notifications");

  const payload = await res.json();

  return payload;
}
