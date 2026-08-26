import api from './axios';
import type { Moment, Comment } from '../types';

export const momentsApi = {
  getMoments: (page = 1, limit = 20) =>
    api.get<{ moments: Moment[]; total: number }>(`/moments?page=${page}&limit=${limit}`),

  getMomentById: (id: string) =>
    api.get<Moment>(`/moments/${id}`),

  createMoment: (data: FormData) =>
    api.post<Moment>('/moments', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteMoment: (id: string) =>
    api.delete(`/moments/${id}`),

  likeMoment: (id: string) =>
    api.post(`/moments/${id}/like`),

  unlikeMoment: (id: string) =>
    api.delete(`/moments/${id}/like`),

  getComments: (momentId: string) =>
    api.get<Comment[]>(`/moments/${momentId}/comments`),

  addComment: (momentId: string, content: string) =>
    api.post<Comment>(`/moments/${momentId}/comments`, { content }),

  deleteComment: (momentId: string, commentId: string) =>
    api.delete(`/moments/${momentId}/comments/${commentId}`),

  reactToMoment: (id: string, type: string) =>
    api.post(`/moments/${id}/reactions`, { type }),

  bookmarkMoment: (id: string) =>
    api.post(`/moments/${id}/bookmark`),

  unbookmarkMoment: (id: string) =>
    api.delete(`/moments/${id}/bookmark`),
};
