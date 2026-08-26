import api from './axios';
import type { AdminDashboard, User, Report } from '../types';

export const adminApi = {
  getDashboard: () =>
    api.get<AdminDashboard>('/admin/dashboard'),

  getUsers: (page = 1, limit = 20, search?: string, status?: string) =>
    api.get<{ users: User[]; total: number }>('/admin/users', {
      params: { page, limit, search, status },
    }),

  suspendUser: (id: string) =>
    api.put(`/admin/users/${id}/suspend`),

  activateUser: (id: string) =>
    api.put(`/admin/users/${id}/activate`),

  verifyUser: (id: string) =>
    api.put(`/admin/users/${id}/verify`),

  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}`),

  getReports: (page = 1, limit = 20, status?: string) =>
    api.get<{ reports: Report[]; total: number }>('/admin/reports', {
      params: { page, limit, status },
    }),

  resolveReport: (id: string) =>
    api.put(`/admin/reports/${id}/resolve`),

  rejectReport: (id: string) =>
    api.put(`/admin/reports/${id}/reject`),
};
