"use server";

import getToken from "@/lib/utils/get-token";
import { AUTHORIZATION_HEADER, JSON_HEADER } from "@/lib/constants/shared.constant";

// Api
const API = process.env.API;

// User Token
async function userToken() {
  const jwt = await getToken();
  const token = jwt?.accessToken;

  return token;
}

// Generic Api Request function
async function apiRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  options?: {
    body?: unknown;
    useJsonHeader?: boolean;
    useAuthHeader?: boolean;
  },
) {
  // Get user token
  const token = await userToken();
  if (!token) return "unauthorized user";

  // Headers
  const headers = {
    ...(options?.useJsonHeader ? JSON_HEADER : {}),
    ...(options?.useAuthHeader ? AUTHORIZATION_HEADER(token) : {}),
  };

  // Response
  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    return { message: "Something went wrong", code: res.status };
  }

  const payload = await res.json();

  return payload;
}

// Clear all notifications
export async function clearAllNotifications() {
  return apiRequest("/notifications/clear-all", "DELETE", {
    useAuthHeader: true,
  });
}

// Delete Notification
export async function deleteNotification(id: string) {
  return apiRequest(`/notifications/${id}`, "DELETE", {
    useAuthHeader: true,
  });
}

// Mark Notification Read
export async function markNotificationRead(ids: string[]) {
  if (!ids?.length) return { success: false, message: "Notification IDs are required" };

  return apiRequest("/notifications/mark-read", "POST", {
    body: { notificationIds: ids },
    useJsonHeader: true,
    useAuthHeader: true,
  });
}

//  Mark All Notifications Read
export async function markAllNotificationsRead() {
  return apiRequest("/notifications/mark-all-read", "POST", {
    useAuthHeader: true,
  });
}
