// Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  [key: string]: unknown;
}

export interface ActionResponse {
  message?: string;
  modifiedCount?: number;
  success: boolean;
}

export interface clearResponse {
  message?: string;
  deletedCount?: number;
  success: boolean;
}

export interface UnreadCountResponse {
  unreadCount: number;
  success: boolean;
}

export interface DeleteNotificationResponse {
  message: string;
  data: null;
  success: boolean;
}