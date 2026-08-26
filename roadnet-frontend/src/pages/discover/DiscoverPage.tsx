import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfileCard from '../../components/common/ProfileCard';
import CompatibilityCard from '../../components/common/CompatibilityCard';
import IntroductionModal from '../../components/common/IntroductionModal';
import SearchFilters from '../../components/common/SearchFilters';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { useDiscover } from '../../hooks/useDiscover';
import { useConnections } from '../../hooks/useConnections';
import type { DiscoverUser, SearchFiltersState } from '../../types';
import { Compass } from 'lucide-react';

export default function DiscoverPage() {
  const { users, isLoading, error, refetch } = useDiscover();
  const { sendIntroduction } = useConnections();
  const [introUser, setIntroUser] = useState<DiscoverUser | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilter = (filters: SearchFiltersState) => {
    refetch(filters);
  };

  const handleSendIntroduction = async (message: string) => {
    if (introUser) {
      await sendIntroduction(introUser.id, message);
    }
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <ErrorState message={error} onRetry={() => refetch()} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Discover</h1>
          <p className="text-slate-500 mt-1">Find people who share your intentions and interests</p>
        </div>

        <div className="mb-6">
          <SearchFilters onFilter={handleFilter} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            {users.length} people found
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingState count={6} />
        ) : users.length === 0 ? (
          <EmptyState
            icon={<Compass className="w-8 h-8 text-slate-400" />}
            title="No people found"
            description="Try adjusting your filters or search criteria to find more matches"
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <ProfileCard
                key={user.id}
                user={user}
                onIntroduce={setIntroUser}
                onSave={(id) => console.log('save', id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="card flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl font-bold text-slate-300">
                        {user.displayName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {user.displayName}, {user.age}
                    </h3>
                    <span className="text-xs text-slate-500">{user.country}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{user.bio}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.intentions.slice(0, 2).map((i) => (
                      <span key={i} className="badge bg-indigo-50 text-indigo-700 text-[10px]">{i}</span>
                    ))}
                  </div>
                </div>
                <CompatibilityCard score={user.compatibilityScore} size="sm" />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIntroUser(user)}
                    className="btn-primary text-xs !py-2 !px-3"
                  >
                    Introduce
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {introUser && (
          <IntroductionModal
            user={introUser}
            isOpen={!!introUser}
            onClose={() => setIntroUser(null)}
            onSend={handleSendIntroduction}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
