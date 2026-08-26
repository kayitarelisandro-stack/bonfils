import api from './axios';
import type { AuthResponse } from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  register: (data: Record<string, unknown>) =>
    api.post<AuthResponse>('/auth/register', data),

  me: () =>
    api.get<AuthResponse>('/auth/me'),

  logout: () =>
    api.post('/auth/logout'),
};
