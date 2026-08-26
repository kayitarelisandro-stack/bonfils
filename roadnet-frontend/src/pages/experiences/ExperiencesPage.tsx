import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ExperienceCard from '../../components/common/ExperienceCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import { experiencesApi } from '../../api/experiences';
import type { Experience } from '../../types';
import { Sparkles } from 'lucide-react';

const categories = [
  'All', 'Wellness', 'Massage', 'Travel', 'Cultural', 'Events',
  'Social', 'Couple', 'Local', 'Online'
];

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const res = await experiencesApi.getExperiences(1, 20, activeCategory === 'All' ? undefined : activeCategory);
      setExperiences(res.data.experiences);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Experiences</h1>
          <p className="text-slate-500 mt-1">Discover and book unique experiences worldwide</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingState count={6} />
        ) : experiences.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="w-8 h-8 text-slate-400" />}
            title="No experiences found"
            description="Check back later for new experiences in this category"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
