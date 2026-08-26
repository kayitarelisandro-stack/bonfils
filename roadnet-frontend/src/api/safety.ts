import api from './axios';
import type { Report } from '../types';

export const safetyApi = {
  reportUser: (data: { reportedId: string; category: string; reason: string }) =>
    api.post<Report>('/safety/report', data),

  blockUser: (userId: string) =>
    api.post(`/safety/block/${userId}`),

  unblockUser: (userId: string) =>
    api.delete(`/safety/block/${userId}`),

  getBlockedUsers: () =>
    api.get<{ users: { id: string; displayName: string; avatarUrl: string }[] }>('/safety/blocked'),

  unmatchUser: (connectionId: string) =>
    api.post(`/safety/unmatch/${connectionId}`),

  getSafetyTips: () =>
    api.get<{ tips: string[] }>('/safety/tips'),
};
