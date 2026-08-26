import api from './axios';
import type { DiscoverUser, CompatibilityResult, SearchFiltersState } from '../types';

export const discoverApi = {
  getDiscover: (page = 1, limit = 20) =>
    api.get<{ users: DiscoverUser[]; total: number }>(`/discover?page=${page}&limit=${limit}`),

  getCompatibility: (userId: string) =>
    api.get<CompatibilityResult>(`/discover/${userId}/compatibility`),

  search: (filters: SearchFiltersState) =>
    api.get<{ users: DiscoverUser[]; total: number }>('/discover/search', { params: filters }),

  getProfile: (userId: string) =>
    api.get<DiscoverUser>(`/discover/${userId}`),

  saveUser: (userId: string) =>
    api.post(`/discover/${userId}/save`),

  unsaveUser: (userId: string) =>
    api.delete(`/discover/${userId}/save`),
};
