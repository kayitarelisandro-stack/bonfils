import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AgeGate from '../../components/common/AgeGate';
import {
  Globe, ArrowRight, ArrowLeft, Check, Briefcase, Heart,
  Users, BookOpen, Compass, Sparkles, Camera
} from 'lucide-react';
import toast from 'react-hot-toast';

const accountPurposes = [
  { id: 'friendship', label: 'Make Friends', icon: Users, description: 'Find genuine friendships across borders' },
  { id: 'travel', label: 'Travel Companion', icon: Compass, description: 'Find travel buddies worldwide' },
  { id: 'language', label: 'Language Exchange', icon: BookOpen, description: 'Practice languages with native speakers' },
  { id: 'culture', label: 'Cultural Exchange', icon: Globe, description: 'Learn and share cultures' },
  { id: 'networking', label: 'Professional Network', icon: Briefcase, description: 'Build global professional connections' },
  { id: 'romance', label: 'Romance', icon: Heart, description: 'Find meaningful romantic connections' },
];

const accountTypes = [
  { id: 'individual', label: 'Individual', description: 'For personal use', icon: Users },
  { id: 'provider', label: 'Experience Provider', description: 'Offer services & experiences', icon: Sparkles },
  { id: 'couple', label: 'Couple', description: 'Register together', icon: Heart },
];

const intentions = [
  'Friendship', 'Language Exchange', 'Travel Companion', 'Cultural Exchange',
  'Mentorship', 'Professional Networking', 'Romance', 'Social Events',
  'Wellness & Healing', 'Creative Collaboration', 'Sports & Fitness', 'Food & Cooking',
];

const interests = [
  'Travel', 'Music', 'Food', 'Sports', 'Art', 'Technology', 'Nature', 'Photography',
  'Reading', 'Gaming', 'Fitness', 'Movies', 'Dance', 'Cooking', 'Languages',
  'Volunteering', 'Yoga', 'Meditation', 'Fashion', 'Science', 'History', 'Writing',
];

const geographicPrefs = [
  { id: 'local', label: 'My City / Region', description: 'Connect with people nearby' },
  { id: 'country', label: 'My Country', description: 'Connect within your country' },
  { id: 'international', label: 'International', description: 'Connect with people worldwide' },
  { id: 'open', label: 'Open to All', description: 'No geographic preference' },
];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Japan',
  'Australia', 'Brazil', 'India', 'South Africa', 'Nigeria', 'Kenya',
  'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway',
  'South Korea', 'China', 'Singapore', 'New Zealand', 'Argentina', 'Colombia',
];

const genders = ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say'];

const maritalStatuses = ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed', 'It\'s complicated'];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Portuguese',
  'Arabic', 'Hindi', 'Russian', 'Korean', 'Italian', 'Dutch', 'Swedish',
  'Swahili', 'Turkish', 'Thai', 'Vietnamese', 'Indonesian', 'Polish',
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountPurpose: '',
    accountType: '',
    displayName: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    region: '',
    languages: [] as string[],
    maritalStatus: '',
    profession: '',
    bio: '',
    email: '',
    password: '',
    intentions: [] as string[],
    interests: [] as string[],
    geographicPreference: '',
  });

  const totalSteps = 7;

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (field: 'languages' | 'intentions' | 'interests', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.accountPurpose;
      case 2: return !!formData.accountType;
      case 3: return !!formData.displayName && !!formData.dateOfBirth && !!formData.gender && !!formData.country;
      case 4: return formData.intentions.length > 0;
      case 5: return formData.interests.length > 0;
      case 6: return !!formData.geographicPreference;
      default: return true;
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register({
        ...formData,
        age: Math.floor((Date.now() - new Date(formData.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
      });
      toast.success('Welcome to ROAD.NET!');
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!ageConfirmed) {
    return <AgeGate onConfirm={() => setAgeConfirmed(true)} />;
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Join ROAD.NET</h2>
              <p className="text-slate-500">Let's set up your account in a few simple steps</p>
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateForm({ email: e.target.value })}
                className="input"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateForm({ password: e.target.value })}
                className="input"
                placeholder="Create a strong password"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What brings you here?</h2>
              <p className="text-slate-500">Choose the main purpose of your account</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {accountPurposes.map((purpose) => {
                const Icon = purpose.icon;
                return (
                  <button
                    key={purpose.id}
                    onClick={() => updateForm({ accountPurpose: purpose.id })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.accountPurpose === purpose.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${formData.accountPurpose === purpose.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <p className="text-sm font-semibold text-slate-900">{purpose.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{purpose.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Account type</h2>
              <p className="text-slate-500">How will you use ROAD.NET?</p>
            </div>
            <div className="space-y-3">
              {accountTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateForm({ accountType: type.id })}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 text-left transition-all ${
                      formData.accountType === type.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${formData.accountType === type.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{type.label}</p>
                      <p className="text-xs text-slate-500">{type.description}</p>
                    </div>
                    {formData.accountType === type.id && (
                      <Check className="w-5 h-5 text-indigo-600 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Tell us about yourself</h2>
              <p className="text-slate-500">This helps us find better matches for you</p>
            </div>
            <div>
              <label className="label">Display Name *</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => updateForm({ displayName: e.target.value })}
                className="input"
                placeholder="How should we call you?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateForm({ dateOfBirth: e.target.value })}
                  className="input"
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="label">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateForm({ gender: e.target.value })}
                  className="input"
                >
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g.toLowerCase()}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => updateForm({ country: e.target.value })}
                  className="input"
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Region / City</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => updateForm({ region: e.target.value })}
                  className="input"
                  placeholder="e.g. California"
                />
              </div>
            </div>
            <div>
              <label className="label">Languages</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleArrayItem('languages', lang)}
                    className={`badge cursor-pointer transition-all ${
                      formData.languages.includes(lang)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => updateForm({ maritalStatus: e.target.value })}
                  className="input"
                >
                  <option value="">Select</option>
                  {maritalStatuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => updateForm({ profession: e.target.value })}
                  className="input"
                  placeholder="What do you do?"
                />
              </div>
            </div>
            <div>
              <label className="label">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => updateForm({ bio: e.target.value })}
                className="input min-h-[100px] resize-none"
                placeholder="Tell us something about yourself..."
                maxLength={500}
              />
              <p className="text-xs text-slate-400 text-right mt-1">{formData.bio.length}/500</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Your intentions</h2>
              <p className="text-slate-500">What are you looking for? Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {intentions.map((intention) => (
                <button
                  key={intention}
                  onClick={() => toggleArrayItem('intentions', intention)}
                  className={`p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                    formData.intentions.includes(intention)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {formData.intentions.includes(intention) && (
                    <Check className="w-4 h-4 text-indigo-600 mb-1" />
                  )}
                  {intention}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Your interests</h2>
              <p className="text-slate-500">Select topics you're passionate about</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleArrayItem('interests', interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.interests.includes(interest)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            {formData.interests.length > 0 && (
              <p className="text-sm text-slate-500 text-center">
                Selected {formData.interests.length} interest{formData.interests.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Geographic preference</h2>
              <p className="text-slate-500">Where would you like to connect?</p>
            </div>
            <div className="space-y-3">
              {geographicPrefs.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => updateForm({ geographicPreference: pref.id })}
                  className={`w-full p-4 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                    formData.geographicPreference === pref.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{pref.label}</p>
                    <p className="text-xs text-slate-500">{pref.description}</p>
                  </div>
                  {formData.geographicPreference === pref.id && (
                    <Check className="w-5 h-5 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 badge bg-indigo-50 text-indigo-700 mb-4">
                <Camera className="w-4 h-4" />
                You can add a profile photo after registration
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4">ROAD.NET</h1>
          <p className="text-lg text-white/80 mb-8">Human Connection Beyond Borders</p>
          <div className="space-y-4 text-left max-w-sm mx-auto">
            {['Discover compatible people worldwide', 'Send meaningful introductions', 'Share unique experiences'].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-white/90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ROAD.NET</span>
          </div>

          {step > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Step {step} of {totalSteps - 1}</span>
                <span className="text-xs font-medium text-indigo-600">{Math.round((step / (totalSteps - 1)) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
                />
              </div>
            </div>
          )}

          {renderStep()}

          <div className="flex items-center gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-ghost flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <div className="flex-1" />
            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={!canProceed() || loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <Check className="w-4 h-4" />}
              </button>
            )}
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
