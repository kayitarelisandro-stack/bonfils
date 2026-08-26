import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import BookingModal from '../../components/common/BookingModal';
import ErrorState from '../../components/common/ErrorState';
import { experiencesApi } from '../../api/experiences';
import { useBookings } from '../../hooks/useBookings';
import type { Experience } from '../../types';
import {
  ArrowLeft, Star, Clock, MapPin, Wifi, Users, Check,
  Globe
} from 'lucide-react';

export default function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const { createBooking } = useBookings();

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await experiencesApi.getExperienceById(id);
        setExperience(res.data);
      } catch {
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  const handleBook = async (date: string, timeSlotId: string) => {
    if (!id) throw new Error('No experience ID');
    await createBooking(id, date, timeSlotId);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <div className="skeleton h-96 rounded-2xl mb-6" />
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !experience) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <ErrorState message={error || 'Experience not found'} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <Link to="/experiences" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Experiences
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[16/9]">
              {experience.imageUrl ? (
                <img src={experience.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Star className="w-16 h-16 text-slate-300" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-indigo-100 text-indigo-700">{experience.category}</span>
                {experience.isOnline && (
                  <span className="badge bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <Wifi className="w-3 h-3" /> Online
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{experience.title}</h1>
              {experience.provider && (
                <p className="text-sm text-slate-500">by {experience.provider.displayName}</p>
              )}
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-slate-900 mb-3">About this experience</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {experience.description}
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-sm font-semibold text-slate-900">{experience.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Rating</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {experience.rating.toFixed(1)} ({experience.reviewCount} reviews)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    {experience.isOnline ? (
                      <Globe className="w-5 h-5 text-amber-600" />
                    ) : (
                      <MapPin className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{experience.isOnline ? 'Platform' : 'Location'}</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {experience.isOnline ? 'Online' : experience.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Participants</p>
                    <p className="text-sm font-semibold text-slate-900">1-on-1 Session</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-slate-900 mb-3">What's included</h3>
              <div className="space-y-2">
                {['Personalized session', 'Recording (if applicable)', 'Follow-up resources', 'Certificate of completion'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card sticky top-24">
              <div className="text-center mb-4">
                <span className="text-3xl font-extrabold text-slate-900">${experience.price}</span>
                <span className="text-sm text-slate-500 ml-1">{experience.currency || 'USD'}</span>
              </div>
              <button
                onClick={() => setShowBooking(true)}
                className="btn-primary w-full mb-3"
              >
                Book Now
              </button>
              <p className="text-xs text-center text-slate-400">
                Demo payment · No real charges
              </p>
            </div>
          </div>
        </div>

        {showBooking && experience && (
          <BookingModal
            experience={experience}
            isOpen={showBooking}
            onClose={() => setShowBooking(false)}
            onBook={handleBook}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
