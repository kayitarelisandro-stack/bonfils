import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    searchVisibility: true,
    locationVisibility: true,
    whoCanSendIntroductions: 'everyone',
    momentVisibility: 'public',
    internationalVisibility: true,
  });

  const toggle = (key: 'searchVisibility' | 'locationVisibility' | 'internationalVisibility') => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Privacy settings updated');
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <Link to="/settings" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Settings
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Privacy Settings</h1>

          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Profile Visibility</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Control who can see your full profile</p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => {
                    setSettings({ ...settings, profileVisibility: e.target.value });
                    toast.success('Privacy settings updated');
                  }}
                  className="input !w-auto"
                >
                  <option value="public">Everyone</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Only Me</option>
                </select>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Search Visibility</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Allow others to find you in search</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.searchVisibility}
                    onChange={() => toggle('searchVisibility')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Location Visibility</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Show your country to others</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.locationVisibility}
                    onChange={() => toggle('locationVisibility')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Who Can Send Introductions</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Control who can send you introductions</p>
                </div>
                <select
                  value={settings.whoCanSendIntroductions}
                  onChange={(e) => {
                    setSettings({ ...settings, whoCanSendIntroductions: e.target.value });
                    toast.success('Privacy settings updated');
                  }}
                  className="input !w-auto"
                >
                  <option value="everyone">Everyone</option>
                  <option value="verified">Verified Users Only</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Moment Visibility</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Control who sees your moments</p>
                </div>
                <select
                  value={settings.momentVisibility}
                  onChange={(e) => {
                    setSettings({ ...settings, momentVisibility: e.target.value });
                    toast.success('Privacy settings updated');
                  }}
                  className="input !w-auto"
                >
                  <option value="public">Everyone</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Only Me</option>
                </select>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">International Visibility</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Show your profile to people in other countries</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.internationalVisibility}
                    onChange={() => toggle('internationalVisibility')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
