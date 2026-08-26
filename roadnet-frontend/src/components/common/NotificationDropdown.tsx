import { Bell, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 badge bg-indigo-100 text-indigo-700">{unreadCount}</span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No notifications yet</p>
        </div>
      ) : (
        <>
          {notifications.slice(0, 5).map((notif) => (
            <button
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-all ${
                !notif.isRead ? 'bg-indigo-50/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    !notif.isRead ? 'bg-indigo-600' : 'bg-transparent'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
          <Link
            to="/notifications"
            className="block px-4 py-3 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50 border-t border-slate-100"
          >
            View All Notifications
          </Link>
        </>
      )}
    </div>
  );
}
