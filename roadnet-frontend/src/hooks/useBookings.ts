import { useState, useEffect, useCallback } from 'react';
import { bookingsApi } from '../api/bookings';
import type { Booking } from '../types';
import toast from 'react-hot-toast';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await bookingsApi.getMyBookings();
      setBookings(res.data.bookings);
      setTotal(res.data.total);
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (experienceId: string, date: string, timeSlotId: string) => {
    try {
      const res = await bookingsApi.createBooking(experienceId, date, timeSlotId);
      setBookings((prev) => [res.data, ...prev]);
      toast.success('Booking created successfully!');
      return res.data;
    } catch {
      toast.error('Failed to create booking');
      throw new Error('Failed to create booking');
    }
  };

  const confirmBooking = async (id: string) => {
    try {
      const res = await bookingsApi.confirmBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? res.data : b)));
      toast.success('Booking confirmed!');
    } catch {
      toast.error('Failed to confirm booking');
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      const res = await bookingsApi.cancelBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? res.data : b)));
      toast.success('Booking cancelled');
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const mockPayment = async (bookingId: string, cardNumber: string) => {
    try {
      await bookingsApi.mockPayment(bookingId, cardNumber);
      toast.success('Demo payment processed successfully!');
      await fetchBookings();
    } catch {
      toast.error('Payment failed');
      throw new Error('Payment failed');
    }
  };

  return {
    bookings,
    total,
    isLoading,
    createBooking,
    confirmBooking,
    cancelBooking,
    mockPayment,
    refetch: fetchBookings,
  };
}
