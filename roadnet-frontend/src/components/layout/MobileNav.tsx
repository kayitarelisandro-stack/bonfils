import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import {
  LayoutDashboard, Compass, Users, Star, Sparkles, Briefcase, User
} from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const links = [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/connections', label: 'Connect', icon: Users },
    { to: '/moments', label: 'Moments', icon: Star },
    { to: '/experiences', label: 'Explore', icon: Sparkles },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                isActive ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {link.to === '/notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
