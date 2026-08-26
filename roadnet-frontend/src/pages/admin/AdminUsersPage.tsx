import { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import LoadingState from '../../components/common/LoadingState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { adminApi } from '../../api/admin';
import type { User } from '../../types';
import {
  Search, Shield, Ban, Check, UserX, ChevronLeft, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState<{ type: string; userId: string } | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminApi.getUsers(page, 20, search);
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAction = async () => {
    if (!confirmAction) return;
    try {
      switch (confirmAction.type) {
        case 'suspend':
          await adminApi.suspendUser(confirmAction.userId);
          toast.success('User suspended');
          break;
        case 'activate':
          await adminApi.activateUser(confirmAction.userId);
          toast.success('User activated');
          break;
        case 'verify':
          await adminApi.verifyUser(confirmAction.userId);
          toast.success('User verified');
          break;
        case 'delete':
          await adminApi.deleteUser(confirmAction.userId);
          toast.success('User deleted');
          break;
      }
      fetchUsers();
    } catch {
      toast.error('Action failed');
    }
    setConfirmAction(null);
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">User Management</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search users..."
              className="input !pl-10 !w-64"
            />
          </div>
        </div>

        {loading ? (
          <LoadingState count={5} />
        ) : (
          <>
            <div className="card overflow-hidden !p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">User</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Verified</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-indigo-600">
                                {user.displayName.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-slate-900">{user.displayName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`badge text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge text-xs ${user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {user.isActive ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {user.isVerified ? (
                            <Shield className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {user.isActive ? (
                              <button
                                onClick={() => setConfirmAction({ type: 'suspend', userId: user.id })}
                                className="p-1.5 hover:bg-amber-50 rounded-lg transition-all"
                                title="Suspend"
                              >
                                <Ban className="w-4 h-4 text-amber-600" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setConfirmAction({ type: 'activate', userId: user.id })}
                                className="p-1.5 hover:bg-emerald-50 rounded-lg transition-all"
                                title="Activate"
                              >
                                <Check className="w-4 h-4 text-emerald-600" />
                              </button>
                            )}
                            {!user.isVerified && (
                              <button
                                onClick={() => setConfirmAction({ type: 'verify', userId: user.id })}
                                className="p-1.5 hover:bg-indigo-50 rounded-lg transition-all"
                                title="Verify"
                              >
                                <Shield className="w-4 h-4 text-indigo-600" />
                              </button>
                            )}
                            <button
                              onClick={() => setConfirmAction({ type: 'delete', userId: user.id })}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete"
                            >
                              <UserX className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-slate-500">
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-slate-700">Page {page}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page * 20 >= total}
                  className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}

        <ConfirmDialog
          isOpen={!!confirmAction}
          title={`Confirm ${confirmAction?.type}`}
          message={`Are you sure you want to ${confirmAction?.type} this user?`}
          confirmLabel="Confirm"
          variant={confirmAction?.type === 'delete' ? 'danger' : 'warning'}
          onConfirm={handleAction}
          onCancel={() => setConfirmAction(null)}
        />
      </div>
    </AdminLayout>
  );
}
