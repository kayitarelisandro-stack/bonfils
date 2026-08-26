import api from './axios';
import type { Notification } from '../types';

export const notificationsApi = {
  getNotifications: (page = 1, limit = 20) =>
    api.get<{ notifications: Notification[]; total: number }>('/notifications', {
      params: { page, limit },
    }),

  getUnreadCount: () =>
    api.get<{ count: number }>('/notifications/unread-count'),

  markAsRead: (id: string) =>
    api.put(`/notifications/${id}/read`),

  markAllAsRead: () =>
    api.put('/notifications/read-all'),

  deleteNotification: (id: string) =>
    api.delete(`/notifications/${id}`),
};
