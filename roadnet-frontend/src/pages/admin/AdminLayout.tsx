import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Flag, Globe, Shield, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/reports', label: 'Reports', icon: Flag },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className={`fixed left-0 top-0 bottom-0 bg-slate-900 transition-all duration-300 z-40 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm font-bold text-white">ROAD.NET</span>
              <span className="text-[10px] text-slate-400 block">Admin Panel</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all ${collapsed ? 'justify-center' : ''}`}
          >
            <Shield className="w-5 h-5" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
          <button
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all ${collapsed ? 'justify-center' : ''}`}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <main className={`flex-1 min-h-screen transition-all ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <h2 className="text-sm font-semibold text-white">Admin Panel</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">{user?.displayName}</span>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{user?.displayName?.charAt(0)}</span>
            </div>
          </div>
        </header>
        <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
