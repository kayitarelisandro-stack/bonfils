import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import MomentCard from '../../components/common/MomentCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import { momentsApi } from '../../api/moments';
import { useAuth } from '../../context/AuthContext';
import type { Moment } from '../../types';
import { Star, Image, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['All', 'Travel', 'Culture', 'Food', 'Adventure', 'Daily Life', 'Milestone'];

export default function MomentsPage() {
  const { user } = useAuth();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [caption, setCaption] = useState('');
  const [momentCategory, setMomentCategory] = useState('Daily Life');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchMoments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await momentsApi.getMoments();
      setMoments(res.data.moments);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoments();
  }, [fetchMoments]);

  const handleCreate = async () => {
    if (!caption.trim()) {
      toast.error('Please write a caption');
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('category', momentCategory);
      if (imageFile) formData.append('image', imageFile);
      await momentsApi.createMoment(formData);
      toast.success('Moment shared!');
      setCaption('');
      setImageFile(null);
      setShowCreate(false);
      fetchMoments();
    } catch {
      toast.error('Failed to share moment');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMoments = activeCategory === 'All'
    ? moments
    : moments.filter((m) => m.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Moments</h1>
            <p className="text-slate-500 mt-1">Share and explore experiences from around the world</p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="btn-primary flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Share Moment
          </button>
        </div>

        {showCreate && (
          <div className="card mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Share a Moment</h3>
            <div className="space-y-4">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="input min-h-[100px] resize-none"
                placeholder="What's on your mind? Share a moment from your day..."
              />
              <div className="flex items-center gap-4">
                <select
                  value={momentCategory}
                  onChange={(e) => setMomentCategory(e.target.value)}
                  className="input w-auto"
                >
                  {categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <label className="btn-ghost cursor-pointer flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  {imageFile ? imageFile.name : 'Add Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowCreate(false)} className="btn-ghost">
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!caption.trim() || submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sharing...' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingState count={3} />
        ) : filteredMoments.length === 0 ? (
          <EmptyState
            icon={<Star className="w-8 h-8 text-slate-400" />}
            title="No moments yet"
            description="Be the first to share a moment with the community"
            action={
              <button onClick={() => setShowCreate(true)} className="btn-primary">
                Share First Moment
              </button>
            }
          />
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {filteredMoments.map((moment) => (
              <MomentCard key={moment.id} moment={moment} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
