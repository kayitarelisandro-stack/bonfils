import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import VerificationBadge from '../../components/common/VerificationBadge';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../hooks/useAuth';
import {
  Edit, MapPin, Globe, Calendar, Briefcase, Heart,
  Shield, Star, Users
} from 'lucide-react';

export default function MyProfilePage() {
  const { user } = useAuth();
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <div className="skeleton h-96 rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <ErrorState message={error} />
        </div>
      </DashboardLayout>
    );
  }

  const p = profile || {
    displayName: user?.displayName || 'User',
    country: 'Not specified',
    bio: 'No bio yet',
    age: 0,
    gender: '',
    profession: '',
    languages: [] as string[],
    intentions: [] as string[],
    interests: [] as string[],
    maritalStatus: '',
    isVerified: false,
    photos: [] as string[],
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 bg-indigo-100 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                {p.photos && p.photos.length > 0 ? (
                  <img src={p.photos[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-indigo-600">
                    {p.displayName.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-extrabold text-slate-900">{p.displayName}</h1>
                  {p.isVerified && <VerificationBadge size="sm" />}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                  {p.age > 0 && <span>{p.age} years old</span>}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {p.country}
                  </span>
                  {p.profession && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {p.profession}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-4">{p.bio}</p>
                <Link to="/profile/edit" className="btn-primary inline-flex items-center gap-2 text-sm">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {p.intentions.length > 0 && (
              <div className="card">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Intentions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.intentions.map((i) => (
                    <span key={i} className="badge bg-indigo-50 text-indigo-700">{i}</span>
                  ))}
                </div>
              </div>
            )}

            {p.interests.length > 0 && (
              <div className="card">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.interests.map((i) => (
                    <span key={i} className="badge bg-slate-100 text-slate-600">{i}</span>
                  ))}
                </div>
              </div>
            )}

            {p.languages.length > 0 && (
              <div className="card">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.languages.map((l) => (
                    <span key={l} className="badge bg-emerald-50 text-emerald-700">{l}</span>
                  ))}
                </div>
              </div>
            )}

            {p.maritalStatus && (
              <div className="card">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  Status
                </h3>
                <p className="text-sm text-slate-600">{p.maritalStatus}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
