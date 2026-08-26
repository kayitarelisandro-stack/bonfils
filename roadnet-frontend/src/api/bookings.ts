import api from './axios';
import type { Booking } from '../types';

export const bookingsApi = {
  getMyBookings: (page = 1, limit = 20) =>
    api.get<{ bookings: Booking[]; total: number }>('/bookings', {
      params: { page, limit },
    }),

  getBookingById: (id: string) =>
    api.get<Booking>(`/bookings/${id}`),

  createBooking: (experienceId: string, date: string, timeSlotId: string) =>
    api.post<Booking>('/bookings', { experienceId, date, timeSlotId }),

  confirmBooking: (id: string) =>
    api.put<Booking>(`/bookings/${id}/confirm`),

  cancelBooking: (id: string) =>
    api.put<Booking>(`/bookings/${id}/cancel`),

  completeBooking: (id: string) =>
    api.put<Booking>(`/bookings/${id}/complete`),

  mockPayment: (bookingId: string, cardNumber: string) =>
    api.post(`/bookings/${bookingId}/pay`, { cardNumber, demo: true }),
};
