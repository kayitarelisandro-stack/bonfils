import { Link } from 'react-router-dom';
import { MapPin, Heart, Shield } from 'lucide-react';
import type { DiscoverUser } from '../../types';

interface ProfileCardProps {
  user: DiscoverUser;
  onSave?: (userId: string) => void;
  onIntroduce?: (user: DiscoverUser) => void;
}

export default function ProfileCard({ user, onSave, onIntroduce }: ProfileCardProps) {
  return (
    <div className="card group">
      <div className="relative mb-4">
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-100">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-300">
                {user.displayName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {user.isVerified && (
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
              <Shield className="w-4 h-4 text-indigo-600 fill-indigo-100" />
            </div>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                {user.displayName}, {user.age}
              </h3>
              {user.compatibilityScore > 0 && (
                <span className="badge bg-indigo-100 text-indigo-700">
                  {user.compatibilityScore}% Match
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {user.country}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {user.whyConnect && user.whyConnect.length > 0 && (
          <p className="text-sm text-slate-600 line-clamp-2">
            <span className="font-semibold text-slate-800">Why you may connect: </span>
            {user.whyConnect[0]}
          </p>
        )}

        {user.intentions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {user.intentions.slice(0, 3).map((intention) => (
              <span
                key={intention}
                className="badge bg-indigo-50 text-indigo-700 text-xs"
              >
                {intention}
              </span>
            ))}
            {user.intentions.length > 3 && (
              <span className="badge bg-slate-100 text-slate-600 text-xs">
                +{user.intentions.length - 3}
              </span>
            )}
          </div>
        )}

        {user.interests.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {user.interests.slice(0, 4).map((interest) => (
              <span
                key={interest}
                className="badge bg-slate-100 text-slate-600 text-xs"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Link
            to={`/discover/${user.id}`}
            className="flex-1 btn-secondary text-center text-sm !py-2"
          >
            View Profile
          </Link>
          {onSave && (
            <button
              onClick={() => onSave(user.id)}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-red-500 transition-all"
              title="Save"
            >
              <Heart className="w-4 h-4" />
            </button>
          )}
          {onIntroduce && (
            <button
              onClick={() => onIntroduce(user)}
              className="btn-primary text-sm !py-2 !px-4"
            >
              Introduce
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
