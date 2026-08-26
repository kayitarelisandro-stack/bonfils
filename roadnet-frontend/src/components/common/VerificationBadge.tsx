import { Shield, CheckCircle } from 'lucide-react';

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VerificationBadge({ size = 'md', className = '' }: VerificationBadgeProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`inline-flex items-center gap-1 badge bg-indigo-50 text-indigo-700 ${className}`}
      title="Verified User"
    >
      <CheckCircle className={sizes[size]} />
      {size !== 'sm' && <span className="text-xs font-semibold">Verified</span>}
    </div>
  );
}
