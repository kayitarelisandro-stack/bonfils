import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  User, Bell, Shield, Globe, Eye, MapPin, Users, Star,
  Settings as SettingsIcon, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Settings</h1>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <nav className="space-y-1">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'privacy', label: 'Privacy', icon: Shield },
                  { id: 'account', label: 'Account', icon: SettingsIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="md:col-span-3">
              {activeSection === 'profile' && (
                <div className="card space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Profile Settings</h2>
                  <p className="text-sm text-slate-500">Manage how others see your profile</p>
                  <Link to="/profile/edit" className="btn-secondary inline-flex items-center gap-2">
                    Edit Profile
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="card space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Notification Preferences</h2>
                  {[
                    { label: 'New introductions', description: 'When someone sends you an introduction', default: true },
                    { label: 'Connection updates', description: 'When your connection status changes', default: true },
                    { label: 'New messages', description: 'When you receive a message', default: true },
                    { label: 'Experience updates', description: 'Updates about your booked experiences', default: true },
                    { label: 'Marketing emails', description: 'Tips and news about ROAD.NET', default: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'privacy' && (
                <div className="card space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Privacy Settings</h2>
                  <p className="text-sm text-slate-500">Control your privacy and visibility</p>
                  <Link to="/settings/privacy" className="btn-secondary inline-flex items-center gap-2">
                    Manage Privacy Settings
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {activeSection === 'account' && (
                <div className="card space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Account Settings</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Email</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Password</p>
                        <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                      </div>
                      <button className="btn-ghost text-sm">Change</button>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          logout();
                          toast.success('Signed out successfully');
                        }}
                        className="btn-danger w-full"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
