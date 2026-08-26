import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConnectionJourney from '../../components/common/ConnectionJourney';
import CompatibilityCard from '../../components/common/CompatibilityCard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { connectionsApi } from '../../api/connections';
import type { Connection } from '../../types';
import { ArrowLeft, Shield, Calendar, MessageCircle } from 'lucide-react';

export default function ConnectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnection = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await connectionsApi.getConnectionById(id);
        setConnection(res.data);
      } catch {
        setError('Failed to load connection');
      } finally {
        setLoading(false);
      }
    };
    fetchConnection();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !connection) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <ErrorState message={error || 'Connection not found'} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <Link to="/connections" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Connections
        </Link>

        <div className="card mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">{connection.connectionId}</h1>
              <p className="text-sm text-slate-500">
                Created {new Date(connection.createdAt).toLocaleDateString()}
              </p>
            </div>
            <CompatibilityCard score={connection.compatibilityScore} size="sm" />
          </div>

          <ConnectionJourney steps={connection.journey} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[connection.user1, connection.user2].filter(Boolean).map((user) => (
            <div key={user!.id} className="card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
                  {user!.avatarUrl ? (
                    <img src={user!.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-indigo-600">
                      {user!.displayName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{user!.displayName}</h3>
                  <p className="text-sm text-slate-500">{user!.country}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{user!.bio}</p>
              <div className="flex flex-wrap gap-1">
                {user!.interests.slice(0, 4).map((i) => (
                  <span key={i} className="badge bg-slate-100 text-slate-600 text-xs">{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {connection.sharedInterests.length > 0 && (
          <div className="card mt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Shared Interests</h3>
            <div className="flex flex-wrap gap-2">
              {connection.sharedInterests.map((interest) => (
                <span key={interest} className="badge bg-indigo-100 text-indigo-700">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
