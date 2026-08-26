import api from './axios';
import type { Profile } from '../types';

export const profileApi = {
  getMyProfile: () =>
    api.get<Profile>('/profile/me'),

  getProfileById: (id: string) =>
    api.get<Profile>(`/profile/${id}`),

  updateProfile: (data: Partial<Profile>) =>
    api.put<Profile>('/profile/me', data),

  uploadPhoto: (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post<{ url: string }>('/profile/me/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deletePhoto: (photoUrl: string) =>
    api.delete('/profile/me/photo', { data: { url: photoUrl } }),
};
