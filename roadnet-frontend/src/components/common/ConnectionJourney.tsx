import { Check, Circle } from 'lucide-react';
import type { ConnectionJourneyStep } from '../../types';

interface ConnectionJourneyProps {
  steps: ConnectionJourneyStep[];
}

export default function ConnectionJourney({ steps }: ConnectionJourneyProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200" />
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step.completed
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : index === steps.findIndex((s) => !s.completed)
                  ? 'bg-white border-indigo-600 text-indigo-600'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {step.completed ? (
                <Check className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-xs font-semibold ${
                  step.completed ? 'text-indigo-700' : 'text-slate-500'
                }`}
              >
                {step.label}
              </p>
              {step.date && (
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {new Date(step.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
