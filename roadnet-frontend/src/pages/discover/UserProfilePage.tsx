import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CompatibilityCard from '../../components/common/CompatibilityCard';
import CompatibilityBreakdown from '../../components/common/CompatibilityBreakdown';
import IntroductionModal from '../../components/common/IntroductionModal';
import VerificationBadge from '../../components/common/VerificationBadge';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { discoverApi } from '../../api/discover';
import { useConnections } from '../../hooks/useConnections';
import type { DiscoverUser, CompatibilityResult } from '../../types';
import {
  ArrowLeft, MapPin, Globe, Heart, MessageCircle,
  Calendar, Briefcase, Languages as LanguagesIcon, Shield
} from 'lucide-react';

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<DiscoverUser | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const { sendIntroduction } = useConnections();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [userRes, compRes] = await Promise.all([
          discoverApi.getProfile(id),
          discoverApi.getCompatibility(id),
        ]);
        setUser(userRes.data);
        setCompatibility(compRes.data);
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSendIntroduction = async (message: string) => {
    if (id) await sendIntroduction(id, message);
    setShowIntroModal(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="skeleton h-96 rounded-2xl" />
            </div>
            <div>
              <div className="skeleton h-64 rounded-2xl" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !user) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <ErrorState message={error || 'User not found'} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <Link to="/discover" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 aspect-square rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-slate-300">
                        {user.displayName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                      {user.displayName}, {user.age}
                    </h1>
                    {user.isVerified && <VerificationBadge size="sm" />}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      International
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{user.bio}</p>

                  <div className="space-y-3">
                    {user.intentions.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-1.5">Intentions</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {user.intentions.map((i) => (
                            <span key={i} className="badge bg-indigo-50 text-indigo-700">{i}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {user.interests.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-1.5">Interests</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {user.interests.map((i) => (
                            <span key={i} className="badge bg-slate-100 text-slate-600">{i}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => setShowIntroModal(true)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Introduce Yourself
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {user.whyConnect && user.whyConnect.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Why you may connect</h3>
                <div className="space-y-2">
                  {user.whyConnect.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-indigo-600">{i + 1}</span>
                      </div>
                      <p className="text-sm text-slate-600">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {compatibility && (
              <div className="card">
                <div className="flex items-center justify-center mb-4">
                  <CompatibilityCard score={compatibility.score} size="lg" />
                </div>
                <p className="text-center text-sm text-slate-500 mb-4">Overall Compatibility</p>
                <CompatibilityBreakdown breakdown={compatibility.breakdown} />
              </div>
            )}
          </div>
        </div>

        {showIntroModal && (
          <IntroductionModal
            user={user}
            isOpen={showIntroModal}
            onClose={() => setShowIntroModal(false)}
            onSend={handleSendIntroduction}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
