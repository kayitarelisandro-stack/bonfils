import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Calendar, Clock, CreditCard, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function BookingsPage() {
  const { user } = useAuth();
  const { bookings, isLoading, confirmBooking, cancelBooking } = useBookings();
  const [filter, setFilter] = useState('all');
  const [cancelId, setCancelId] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-indigo-100 text-indigo-700',
    cancelled: 'bg-slate-100 text-slate-600',
  };

  const paymentColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    refunded: 'bg-slate-100 text-slate-600',
  };

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const handleCancel = async () => {
    if (cancelId) {
      await cancelBooking(cancelId);
      setCancelId(null);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <LoadingState count={4} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Bookings</h1>
          <p className="text-slate-500 mt-1">Manage your experience bookings</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all capitalize ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <EmptyState
            icon={<Briefcase className="w-8 h-8 text-slate-400" />}
            title="No bookings yet"
            description="Browse experiences and make your first booking"
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="card">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    {booking.experience?.imageUrl ? (
                      <img
                        src={booking.experience.imageUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Briefcase className="w-6 h-6 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900">
                      {booking.experience?.title || 'Experience'}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {booking.timeSlot}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-slate-900">${booking.paymentAmount}</p>
                    <span className={`badge text-[10px] mt-1 ${statusColors[booking.status] || ''}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-slate-400" />
                    <span className={`badge text-[10px] ${paymentColors[booking.paymentStatus] || ''}`}>
                      Payment: {booking.paymentStatus}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {booking.status === 'pending' && user?.role === 'admin' && (
                      <button
                        onClick={() => confirmBooking(booking.id)}
                        className="btn-primary text-xs !py-1.5 !px-3 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Confirm
                      </button>
                    )}
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <button
                        onClick={() => setCancelId(booking.id)}
                        className="btn-ghost text-xs !py-1.5 !px-3 flex items-center gap-1 text-red-600"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={!!cancelId}
          title="Cancel Booking"
          message="Are you sure you want to cancel this booking? This action cannot be undone."
          confirmLabel="Cancel Booking"
          variant="danger"
          onConfirm={handleCancel}
          onCancel={() => setCancelId(null)}
        />
      </div>
    </DashboardLayout>
  );
}
