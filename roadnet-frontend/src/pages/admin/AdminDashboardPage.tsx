import { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import LoadingState from '../../components/common/LoadingState';
import { adminApi } from '../../api/admin';
import type { AdminDashboard } from '../../types';
import {
  Users, UserCheck, Activity, Briefcase, AlertTriangle,
  TrendingUp, Globe, Shield
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminApi.getDashboard();
      setData(res.data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="page-container">
          <LoadingState count={4} />
        </div>
      </AdminLayout>
    );
  }

  if (!data) return null;

  const stats = [
    { label: 'Total Users', value: data.totalUsers, icon: Users, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Active Users', value: data.activeUsers, icon: UserCheck, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Connections', value: data.totalConnections, icon: Activity, color: 'bg-amber-100 text-amber-600' },
    { label: 'Bookings', value: data.totalBookings, icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { label: 'Pending Reports', value: data.pendingReports, icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
    { label: 'Verified Users', value: data.verifiedUsers, icon: Shield, color: 'bg-cyan-100 text-cyan-600' },
  ];

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of ROAD.NET platform</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card">
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{stat.value.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Users by Country</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.usersByCountry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="country" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Registration Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.registrationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {data.recentActivity.slice(0, 10).map((activity, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'user' ? 'bg-indigo-500' :
                  activity.type === 'connection' ? 'bg-emerald-500' :
                  activity.type === 'booking' ? 'bg-purple-500' :
                  'bg-amber-500'
                }`} />
                <p className="text-sm text-slate-700 flex-1">{activity.description}</p>
                <p className="text-xs text-slate-400">{new Date(activity.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
