import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ConnectionCard from '../../components/common/ConnectionCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { useConnections } from '../../hooks/useConnections';
import { Users, Send, Inbox, Check, X, Clock } from 'lucide-react';

export default function ConnectionsPage() {
  const {
    connections, sentIntroductions, receivedIntroductions,
    isLoading, respondToIntroduction
  } = useConnections();
  const [activeTab, setActiveTab] = useState<'connections' | 'sent' | 'received'>('connections');

  const tabs = [
    { id: 'connections' as const, label: 'Connections', count: connections.length },
    { id: 'sent' as const, label: 'Sent', count: sentIntroductions.length },
    { id: 'received' as const, label: 'Received', count: receivedIntroductions.filter((i) => i.status === 'pending').length },
  ];

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
          <h1 className="text-3xl font-extrabold text-slate-900">Connections</h1>
          <p className="text-slate-500 mt-1">Your global network of connections</p>
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 max-w-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1.5 badge bg-indigo-100 text-indigo-700 text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'connections' && (
          connections.length === 0 ? (
            <EmptyState
              icon={<Users className="w-8 h-8 text-slate-400" />}
              title="No connections yet"
              description="Start by discovering people and sending introductions"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {connections.map((conn) => (
                <ConnectionCard key={conn.id} connection={conn} />
              ))}
            </div>
          )
        )}

        {activeTab === 'sent' && (
          sentIntroductions.length === 0 ? (
            <EmptyState
              icon={<Send className="w-8 h-8 text-slate-400" />}
              title="No introductions sent"
              description="Discover people and send personalized introductions"
            />
          ) : (
            <div className="space-y-3">
              {sentIntroductions.map((intro) => (
                <div key={intro.id} className="card !p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-indigo-600">
                        {intro.toUser?.displayName?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        To: {intro.toUser?.displayName || 'Unknown'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{intro.message}</p>
                    </div>
                    <span className={`badge text-xs ${
                      intro.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                      intro.status === 'declined' ? 'bg-red-100 text-red-700' :
                      intro.status === 'maybe_later' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {intro.status === 'maybe_later' ? 'Maybe Later' : intro.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'received' && (
          receivedIntroductions.length === 0 ? (
            <EmptyState
              icon={<Inbox className="w-8 h-8 text-slate-400" />}
              title="No received introductions"
              description="When someone introduces themselves to you, it will appear here"
            />
          ) : (
            <div className="space-y-3">
              {receivedIntroductions.map((intro) => (
                <div key={intro.id} className="card">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-indigo-600">
                        {intro.fromUser?.displayName?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-900">
                          {intro.fromUser?.displayName || 'Unknown'}
                        </h3>
                        <span className="text-xs text-slate-500">
                          {new Date(intro.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{intro.message}</p>
                      {intro.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => respondToIntroduction(intro.id, 'accepted')}
                            className="btn-primary text-xs !py-1.5 !px-3 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Accept
                          </button>
                          <button
                            onClick={() => respondToIntroduction(intro.id, 'maybe_later')}
                            className="btn-secondary text-xs !py-1.5 !px-3 flex items-center gap-1"
                          >
                            <Clock className="w-3 h-3" />
                            Maybe Later
                          </button>
                          <button
                            onClick={() => respondToIntroduction(intro.id, 'declined')}
                            className="btn-ghost text-xs !py-1.5 !px-3 flex items-center gap-1 text-red-600"
                          >
                            <X className="w-3 h-3" />
                            Decline
                          </button>
                        </div>
                      )}
                      {intro.status !== 'pending' && (
                        <span className={`badge text-xs ${
                          intro.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                          intro.status === 'declined' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {intro.status === 'maybe_later' ? 'Maybe Later' : intro.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
}
