import { useState } from 'react';
import { X, Flag, Ban, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface SafetyModalProps {
  userId: string;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onBlock?: (userId: string) => void;
  onReport?: (userId: string, category: string, reason: string) => void;
}

const reportCategories = [
  'Inappropriate Content',
  'Harassment or Bullying',
  'Fake Profile',
  'Spam or Scam',
  'Safety Concern',
  'Other',
];

export default function SafetyModal({ userId, userName, isOpen, onClose, onBlock, onReport }: SafetyModalProps) {
  const [activeTab, setActiveTab] = useState<'report' | 'block'>('report');
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleReport = async () => {
    if (!category || !reason.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    onReport?.(userId, category, reason);
    toast.success('Report submitted. Thank you for helping keep ROAD.NET safe.');
    setCategory('');
    setReason('');
    setSubmitting(false);
    onClose();
  };

  const handleBlock = () => {
    onBlock?.(userId);
    toast.success(`${userName} has been blocked`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Safety Actions</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'report'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Flag className="w-4 h-4" />
            Report
          </button>
          <button
            onClick={() => setActiveTab('block')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'block'
                ? 'border-red-500 text-red-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Ban className="w-4 h-4" />
            Block
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'report' ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Help us understand what's happening. Your report will be reviewed confidentially.
              </p>
              <div>
                <label className="label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  <option value="">Select a category</option>
                  {reportCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Details</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="input min-h-[100px] resize-none"
                  placeholder="Please describe the issue..."
                />
              </div>
              <button
                onClick={handleReport}
                disabled={!category || !reason.trim() || submitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                Submit Report
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Block {userName}?</h4>
                  <p className="text-xs text-red-700 mt-1">
                    They won't be able to see your profile, send you messages, or see your moments.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="btn-ghost flex-1">
                  Cancel
                </button>
                <button onClick={handleBlock} className="btn-danger flex-1">
                  Block User
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
