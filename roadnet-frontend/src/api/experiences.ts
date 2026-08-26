import api from './axios';
import type { Experience } from '../types';

export const experiencesApi = {
  getExperiences: (page = 1, limit = 20, category?: string) =>
    api.get<{ experiences: Experience[]; total: number }>('/experiences', {
      params: { page, limit, category },
    }),

  getExperienceById: (id: string) =>
    api.get<Experience>(`/experiences/${id}`),

  getMyExperiences: () =>
    api.get<Experience[]>('/experiences/my'),

  createExperience: (data: FormData) =>
    api.post<Experience>('/experiences', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  updateExperience: (id: string, data: Partial<Experience>) =>
    api.put<Experience>(`/experiences/${id}`, data),

  deleteExperience: (id: string) =>
    api.delete(`/experiences/${id}`),

  getAvailability: (id: string, month: string) =>
    api.get(`/experiences/${id}/availability`, { params: { month } }),
};
