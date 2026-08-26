import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import { useNotifications } from '../../hooks/useNotifications';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
  const {
    notifications, isLoading, unreadCount,
    markAsRead, markAllAsRead, deleteNotification
  } = useNotifications();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <LoadingState count={5} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Notifications</h1>
            <p className="text-slate-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'You\'re all caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            icon={<Bell className="w-8 h-8 text-slate-400" />}
            title="No notifications"
            description="When you receive notifications, they'll appear here"
          />
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`card !p-4 flex items-center gap-4 ${
                  !notif.isRead ? 'border-l-4 border-l-indigo-600 bg-indigo-50/30' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  !notif.isRead ? 'bg-indigo-100' : 'bg-slate-100'
                }`}>
                  <Bell className={`w-5 h-5 ${!notif.isRead ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">{notif.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-all"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 text-slate-500" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
