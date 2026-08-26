import { useState } from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

interface AgeGateProps {
  onConfirm: () => void;
}

export default function AgeGate({ onConfirm }: AgeGateProps) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Globe className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">ROAD.NET</h2>
        <p className="text-slate-500 mb-6">Human Connection Beyond Borders</p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <ShieldCheck className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <p className="text-sm text-slate-700 font-medium">
            Are you at least 18 years old?
          </p>
          <p className="text-xs text-slate-500 mt-1">
            You must be 18 or older to use ROAD.NET
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setConfirmed(true);
              onConfirm();
            }}
            className="btn-primary w-full"
          >
            Yes, I'm 18 or older
          </button>
          <button
            onClick={() => window.history.back()}
            className="btn-ghost w-full"
          >
            No, I'm under 18
          </button>
        </div>
      </div>
    </div>
  );
}
