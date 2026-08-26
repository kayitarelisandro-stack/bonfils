import api from './axios';
import type { Connection, IntroductionRequest } from '../types';

export const connectionsApi = {
  getConnections: (page = 1, limit = 20) =>
    api.get<{ connections: Connection[]; total: number }>(`/connections?page=${page}&limit=${limit}`),

  getConnectionById: (id: string) =>
    api.get<Connection>(`/connections/${id}`),

  sendIntroduction: (toUserId: string, message: string) =>
    api.post<IntroductionRequest>('/connections/introduce', { toUserId, message }),

  getSentIntroductions: () =>
    api.get<IntroductionRequest[]>('/connections/introductions/sent'),

  getReceivedIntroductions: () =>
    api.get<IntroductionRequest[]>('/connections/introductions/received'),

  respondToIntroduction: (id: string, status: 'accepted' | 'declined' | 'maybe_later') =>
    api.put<IntroductionRequest>(`/connections/introductions/${id}`, { status }),

  getSavedUsers: () =>
    api.get('/connections/saved'),
};
