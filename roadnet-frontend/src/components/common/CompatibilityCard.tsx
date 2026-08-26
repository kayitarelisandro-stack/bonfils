interface CompatibilityCardProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function CompatibilityCard({ score, size = 'md' }: CompatibilityCardProps) {
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Excellent' };
    if (s >= 60) return { stroke: '#4f46e5', bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'Great' };
    if (s >= 40) return { stroke: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Good' };
    return { stroke: '#94a3b8', bg: 'bg-slate-50', text: 'text-slate-700', label: 'Fair' };
  };

  const colors = getColor(score);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-sm', font: 'text-lg', radius: 24, stroke: 4 },
    md: { container: 'w-24 h-24', text: 'text-xs', font: 'text-2xl', radius: 36, stroke: 5 },
    lg: { container: 'w-32 h-32', text: 'text-sm', font: 'text-3xl', radius: 48, stroke: 6 },
  };

  const s = sizes[size];

  return (
    <div className={`${s.container} relative`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r={s.radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={s.stroke}
        />
        <circle
          cx="50" cy="50" r={s.radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={s.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold ${s.font} text-slate-900`}>{score}%</span>
        {size !== 'sm' && (
          <span className={`text-[10px] font-semibold ${colors.text}`}>{colors.label}</span>
        )}
      </div>
    </div>
  );
}
