import type { CompatibilityBreakdown as BreakdownType } from '../../types';

interface CompatibilityBreakdownProps {
  breakdown: BreakdownType;
}

export default function CompatibilityBreakdown({ breakdown }: CompatibilityBreakdownProps) {
  const categories = [
    { key: 'intentions', label: 'Intentions', color: 'bg-indigo-500' },
    { key: 'geography', label: 'Geography', color: 'bg-emerald-500' },
    { key: 'interests', label: 'Interests', color: 'bg-amber-500' },
    { key: 'lifestyle', label: 'Lifestyle', color: 'bg-purple-500' },
    { key: 'languages', label: 'Languages', color: 'bg-cyan-500' },
    { key: 'distance', label: 'Distance', color: 'bg-rose-500' },
    { key: 'other', label: 'Other', color: 'bg-slate-400' },
  ] as const;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-slate-900">Compatibility Breakdown</h4>
      {categories.map(({ key, label, color }) => {
        const value = breakdown[key] || 0;
        return (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{label}</span>
              <span className="text-xs font-bold text-slate-900">{value}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
