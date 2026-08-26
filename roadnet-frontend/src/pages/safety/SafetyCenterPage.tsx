import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Shield, AlertTriangle, Ban, Heart, BookOpen, Phone,
  MessageCircle, Flag
} from 'lucide-react';
import { safetyApi } from '../../api/safety';
import toast from 'react-hot-toast';

export default function SafetyCenterPage() {
  const [blockedUsers, setBlockedUsers] = useState<{ id: string; displayName: string; avatarUrl: string }[]>([]);
  const [reportCategory, setReportCategory] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportUserId, setReportUserId] = useState('');

  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const res = await safetyApi.getBlockedUsers();
        setBlockedUsers(res.data.users);
      } catch {
        // silent
      }
    };
    fetchBlocked();
  }, []);

  const handleReport = async () => {
    if (!reportCategory || !reportReason.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await safetyApi.reportUser({
        reportedId: reportUserId || 'demo-user',
        category: reportCategory,
        reason: reportReason,
      });
      toast.success('Report submitted. Our team will review it.');
      setReportCategory('');
      setReportReason('');
    } catch {
      toast.error('Failed to submit report');
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await safetyApi.unblockUser(userId);
      setBlockedUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success('User unblocked');
    } catch {
      toast.error('Failed to unblock user');
    }
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900">Safety Center</h1>
            <p className="text-slate-500 mt-1">Your safety is our top priority</p>
          </div>

          <div className="space-y-6">
            {/* Safety Tips */}
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Safety Tips
              </h2>
              <div className="space-y-3">
                {[
                  'Never share personal financial information with someone you just met',
                  'Meet in public places for the first time and tell a friend your plans',
                  'Trust your instincts — if something feels off, it probably is',
                  'Take your time getting to know someone before sharing private details',
                  'Report any suspicious behavior immediately',
                  'Use video calls before meeting in person to verify identity',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-sm text-slate-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report User */}
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Flag className="w-5 h-5 text-amber-600" />
                Report a User
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Help us maintain a safe community by reporting suspicious or inappropriate behavior.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="label">User ID or Name (optional)</label>
                  <input
                    type="text"
                    value={reportUserId}
                    onChange={(e) => setReportUserId(e.target.value)}
                    className="input"
                    placeholder="Enter user ID or display name"
                  />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="input"
                  >
                    <option value="">Select a category</option>
                    {[
                      'Inappropriate Content',
                      'Harassment or Bullying',
                      'Fake Profile',
                      'Spam or Scam',
                      'Safety Concern',
                      'Other',
                    ].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="input min-h-[120px] resize-none"
                    placeholder="Please describe the issue in detail..."
                  />
                </div>
                <button onClick={handleReport} className="btn-primary">
                  Submit Report
                </button>
              </div>
            </div>

            {/* Emergency */}
            <div className="card bg-red-50 border border-red-200">
              <h2 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                Emergency Contact
              </h2>
              <p className="text-sm text-red-700 mb-3">
                If you're in immediate danger, please contact your local emergency services.
              </p>
              <div className="flex gap-3">
                <a href="tel:911" className="btn-danger text-sm">
                  Call 911 (US)
                </a>
                <a href="tel:112" className="btn-secondary text-sm border-red-200 text-red-700">
                  Call 112 (EU)
                </a>
              </div>
            </div>

            {/* Blocked Users */}
            {blockedUsers.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Ban className="w-5 h-5 text-red-600" />
                  Blocked Users
                </h2>
                <div className="space-y-3">
                  {blockedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-slate-600">
                            {user.displayName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-slate-900">{user.displayName}</span>
                      </div>
                      <button
                        onClick={() => handleUnblock(user.id)}
                        className="btn-ghost text-sm text-indigo-600"
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
