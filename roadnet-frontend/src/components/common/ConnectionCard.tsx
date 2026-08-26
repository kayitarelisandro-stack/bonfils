import { Link } from 'react-router-dom';
import { Shield, Calendar } from 'lucide-react';
import type { Connection } from '../../types';

interface ConnectionCardProps {
  connection: Connection;
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
  const statusColors: Record<string, string> = {
    discovered: 'bg-slate-100 text-slate-700',
    introduction: 'bg-amber-100 text-amber-700',
    accepted: 'bg-emerald-100 text-emerald-700',
    connection: 'bg-indigo-100 text-indigo-700',
    shared_experience: 'bg-purple-100 text-purple-700',
  };

  return (
    <Link
      to={`/connections/${connection.id}`}
      className="card hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex -space-x-3">
          {connection.user1?.avatarUrl ? (
            <img
              src={connection.user1.avatarUrl}
              alt=""
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center">
              <span className="text-sm font-bold text-indigo-600">
                {connection.user1?.displayName?.charAt(0) || '?'}
              </span>
            </div>
          )}
          {connection.user2?.avatarUrl ? (
            <img
              src={connection.user2.avatarUrl}
              alt=""
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">
                {connection.user2?.displayName?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-900">
              {connection.connectionId}
            </h3>
            <span className={`badge text-[10px] ${statusColors[connection.status] || ''}`}>
              {connection.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-sm text-slate-600 truncate">
            {connection.user1?.displayName} & {connection.user2?.displayName}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {connection.compatibilityScore}% Match
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(connection.createdAt).toLocaleDateString()}
            </span>
          </div>
          {connection.sharedInterests.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {connection.sharedInterests.slice(0, 3).map((interest) => (
                <span key={interest} className="badge bg-indigo-50 text-indigo-700 text-[10px]">
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
