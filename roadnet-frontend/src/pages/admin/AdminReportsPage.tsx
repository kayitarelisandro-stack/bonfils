import { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import LoadingState from '../../components/common/LoadingState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { adminApi } from '../../api/admin';
import type { Report } from '../../types';
import { Flag, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState<{ type: string; reportId: string } | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminApi.getReports(page, 20, statusFilter || undefined);
      setReports(res.data.reports);
      setTotal(res.data.total);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleAction = async () => {
    if (!confirmAction) return;
    try {
      if (confirmAction.type === 'resolve') {
        await adminApi.resolveReport(confirmAction.reportId);
        toast.success('Report resolved');
      } else {
        await adminApi.rejectReport(confirmAction.reportId);
        toast.success('Report rejected');
      }
      fetchReports();
    } catch {
      toast.error('Action failed');
    }
    setConfirmAction(null);
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    reviewing: 'bg-blue-100 text-blue-700',
    resolved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-slate-100 text-slate-600',
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Reports</h1>
          <div className="flex gap-2">
            {['', 'pending', 'reviewing', 'resolved', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => { setStatusFilter(f); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  statusFilter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f || 'All'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingState count={5} />
        ) : reports.length === 0 ? (
          <div className="card text-center py-12">
            <Flag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No reports found</p>
          </div>
        ) : (
          <>
            <div className="card overflow-hidden !p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Reporter</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Reported</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Reason</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {report.reporter?.displayName || 'Unknown'}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {report.reported?.displayName || 'Unknown'}
                        </td>
                        <td className="px-4 py-3">
                          <span className="badge bg-slate-100 text-slate-700 text-xs">{report.category}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{report.reason}</td>
                        <td className="px-4 py-3">
                          <span className={`badge text-xs ${statusColors[report.status] || ''}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {(report.status === 'pending' || report.status === 'reviewing') && (
                              <>
                                <button
                                  onClick={() => setConfirmAction({ type: 'resolve', reportId: report.id })}
                                  className="p-1.5 hover:bg-emerald-50 rounded-lg transition-all"
                                  title="Resolve"
                                >
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                </button>
                                <button
                                  onClick={() => setConfirmAction({ type: 'reject', reportId: report.id })}
                                  className="p-1.5 hover:bg-red-50 rounded-lg transition-all"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4 text-red-600" />
                                </button>
                              </>
                            )}
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
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} reports
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
          title={`${confirmAction?.type === 'resolve' ? 'Resolve' : 'Reject'} Report`}
          message={`Are you sure you want to ${confirmAction?.type} this report?`}
          confirmLabel={confirmAction?.type === 'resolve' ? 'Resolve' : 'Reject'}
          variant={confirmAction?.type === 'resolve' ? 'info' : 'danger'}
          onConfirm={handleAction}
          onCancel={() => setConfirmAction(null)}
        />
      </div>
    </AdminLayout>
  );
}
