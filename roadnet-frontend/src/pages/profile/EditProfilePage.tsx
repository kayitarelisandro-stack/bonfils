import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useProfile } from '../../hooks/useProfile';
import LoadingState from '../../components/common/LoadingState';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const intentions = [
  'Friendship', 'Language Exchange', 'Travel Companion', 'Cultural Exchange',
  'Mentorship', 'Professional Networking', 'Romance', 'Social Events',
];

const interests = [
  'Travel', 'Music', 'Food', 'Sports', 'Art', 'Technology', 'Nature', 'Photography',
  'Reading', 'Gaming', 'Fitness', 'Movies', 'Dance', 'Cooking', 'Languages',
  'Volunteering', 'Yoga', 'Meditation', 'Fashion', 'Science',
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Portuguese',
  'Arabic', 'Hindi', 'Russian', 'Korean', 'Italian', 'Dutch', 'Swedish',
];

export default function EditProfilePage() {
  const { profile, isLoading, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
    profession: profile?.profession || '',
    region: profile?.region || '',
    maritalStatus: profile?.maritalStatus || '',
    intentions: profile?.intentions || [] as string[],
    interests: profile?.interests || [] as string[],
    languages: profile?.languages || [] as string[],
  });
  const [saving, setSaving] = useState(false);

  const toggleItem = (field: 'intentions' | 'interests' | 'languages', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(formData);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="page-container">
          <LoadingState count={2} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <Link to="/profile" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Edit Profile</h1>

          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Display Name</label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="input min-h-[120px] resize-none"
                    maxLength={500}
                  />
                  <p className="text-xs text-slate-400 text-right mt-1">{formData.bio.length}/500</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Profession</label>
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Region</label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Marital Status</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="input"
                  >
                    <option value="">Select</option>
                    {['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Intentions</h2>
              <div className="flex flex-wrap gap-2">
                {intentions.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleItem('intentions', i)}
                    className={`badge cursor-pointer transition-all ${
                      formData.intentions.includes(i)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleItem('interests', i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.interests.includes(i)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleItem('languages', l)}
                    className={`badge cursor-pointer transition-all ${
                      formData.languages.includes(l)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/profile" className="btn-ghost">
                Cancel
              </Link>
              <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
