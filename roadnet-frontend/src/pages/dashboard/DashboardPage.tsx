import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Users, UserCheck, Sparkles, Calendar, Bell, Compass,
  MessageCircle, Star, ArrowRight, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Compatible People', value: '24', icon: Users, color: 'bg-indigo-100 text-indigo-600', trend: '+3 this week' },
    { label: 'Pending Introductions', value: '5', icon: MessageCircle, color: 'bg-amber-100 text-amber-600', trend: '2 new' },
    { label: 'Active Connections', value: '12', icon: UserCheck, color: 'bg-emerald-100 text-emerald-600', trend: '+1 today' },
    { label: 'Upcoming Experiences', value: '3', icon: Calendar, color: 'bg-purple-100 text-purple-600', trend: 'Next: Tomorrow' },
    { label: 'Unread Notifications', value: '8', icon: Bell, color: 'bg-rose-100 text-rose-600', trend: 'Check now' },
  ];

  const quickActions = [
    { label: 'Discover People', icon: Compass, to: '/discover', color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' },
    { label: 'View Connections', icon: Users, to: '/connections', color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
    { label: 'Share a Moment', icon: Star, to: '/moments', color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
    { label: 'Browse Experiences', icon: Sparkles, to: '/experiences', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  ];

  const recentActivity = [
    { type: 'connection', text: 'You and Maria from Spain are now connected!', time: '2 hours ago' },
    { type: 'introduction', text: 'Kenji from Japan sent you an introduction', time: '5 hours ago' },
    { type: 'moment', text: 'Your moment received 12 reactions', time: '1 day ago' },
    { type: 'experience', text: 'Wellness Session with Sarah is confirmed', time: '2 days ago' },
    { type: 'system', text: 'Your profile is 85% complete', time: '3 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Welcome back, {user?.displayName || 'there'} 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here's what's happening with your ROAD.NET connections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
                <p className="text-[10px] text-indigo-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="section-title mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      className={`${action.color} rounded-xl p-4 text-center transition-all group`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-semibold">{action.label}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="section-title mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="card !p-4 flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'connection' ? 'bg-emerald-500' :
                      activity.type === 'introduction' ? 'bg-amber-500' :
                      activity.type === 'moment' ? 'bg-indigo-500' :
                      activity.type === 'experience' ? 'bg-purple-500' :
                      'bg-slate-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700">{activity.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
              <h3 className="text-lg font-bold mb-2">Complete Your Profile</h3>
              <p className="text-sm text-white/80 mb-4">
                Add more details to increase your compatibility score
              </p>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/70">Profile completion</span>
                  <span className="text-xs font-bold">85%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <Link to="/profile/edit" className="block text-center bg-white/20 rounded-xl py-2 text-sm font-semibold hover:bg-white/30 transition-all">
                Edit Profile
              </Link>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Top Matches</h3>
              <div className="space-y-3">
                {[
                  { name: 'Maria, 28', country: 'Spain', score: 92 },
                  { name: 'Kenji, 32', country: 'Japan', score: 88 },
                  { name: 'Aisha, 25', country: 'Kenya', score: 85 },
                ].map((match) => (
                  <div key={match.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-indigo-600">
                        {match.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{match.name}</p>
                      <p className="text-xs text-slate-500">{match.country}</p>
                    </div>
                    <span className="badge bg-indigo-50 text-indigo-700 text-xs">
                      {match.score}%
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/discover"
                className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-3 pt-3 border-t border-slate-100"
              >
                View All Matches →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
