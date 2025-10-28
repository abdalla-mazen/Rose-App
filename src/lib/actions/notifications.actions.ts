"use server";

import {
  ActionResponse,
  clearResponse,
  DeleteNotificationResponse,
} from "../types/notifications";

// Constants (from environment variables)
const API_BASE = process.env.API!;
const TOKEN = process.env.NOTIFICATIONS_API_TOKEN!;

// Generic API helper
async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: (data as any)?.message || res.statusText || "API Request Failed",
      };
    }

    return { data: data as T };
  } catch (err: any) {
    return { error: err.message || "API Request Failed" };
  }
}

// Server Actions

export async function markNotificationRead(
  ids: string[]
): Promise<ActionResponse> {
  if (!ids || ids.length === 0)
    return { success: false, message: "Notification IDs are required" };

  const { data, error } = await fetchAPI<ActionResponse>(
    `${API_BASE}/mark-read`,
    {
      method: "POST",
      body: JSON.stringify({ notificationIds: ids }),
    }
  );

  if (error) return { success: false, message: error };
  return { ...data, success: true };
}

export async function markAllNotificationsRead(): Promise<ActionResponse> {
  const { data, error } = await fetchAPI<ActionResponse>(
    `${API_BASE}/mark-all-read`,
    { method: "POST" }
  );

  if (error) return { success: false, message: error };
  return { ...data, success: true };
}

export async function clearAllNotifications(): Promise<clearResponse> {
  const { data, error } = await fetchAPI<clearResponse>(
    `${API_BASE}/clear-all`,
    { method: "DELETE" }
  );

  if (error) return { success: false, message: error };
  return { ...data, success: true };
}

export async function deleteNotification(
  id: string
): Promise<DeleteNotificationResponse & { success: boolean }> {
  if (!id)
    return {
      success: false,
      message: "Notification ID is required",
      data: null,
    };

  const { data, error } = await fetchAPI<DeleteNotificationResponse>(
    `${API_BASE}/${id}`,
    { method: "DELETE" }
  );

  if (error) return { success: false, message: error, data: null };

  return {
    ...data,
    success: true,
    message: data?.message || "Notification deleted successfully",
    data: null,
  };
}
