import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { SearchFiltersState } from '../../types';

interface SearchFiltersProps {
  onFilter: (filters: SearchFiltersState) => void;
  initialFilters?: Partial<SearchFiltersState>;
}

const countries = [
  'Any Country', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France',
  'Japan', 'Australia', 'Brazil', 'India', 'South Africa', 'Nigeria', 'Kenya',
  'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway',
];

const intentions = [
  'Any Intention', 'Friendship', 'Language Exchange', 'Travel Companion',
  'Cultural Exchange', 'Mentorship', 'Professional Networking', 'Romance',
];

const genders = ['Any Gender', 'Male', 'Female', 'Non-binary', 'Other'];

const interests = [
  'Travel', 'Music', 'Food', 'Sports', 'Art', 'Technology', 'Nature',
  'Photography', 'Reading', 'Gaming', 'Fitness', 'Movies', 'Dance',
  'Cooking', 'Languages', 'Volunteering',
];

export default function SearchFilters({ onFilter, initialFilters }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<SearchFiltersState>({
    country: initialFilters?.country || '',
    ageMin: initialFilters?.ageMin || 18,
    ageMax: initialFilters?.ageMax || 80,
    gender: initialFilters?.gender || '',
    intention: initialFilters?.intention || '',
    language: initialFilters?.language || '',
    interests: initialFilters?.interests || [],
    sortBy: initialFilters?.sortBy || 'compatibility',
  });

  const handleSearch = () => {
    onFilter({ ...filters, country: filters.country === 'Any Country' ? '' : filters.country });
  };

  const toggleInterest = (interest: string) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people..."
            className="input !pl-10"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
            isOpen ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        <button onClick={handleSearch} className="btn-primary">
          Search
        </button>
      </div>

      {isOpen && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
                className="input"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value }))}
                className="input"
              >
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Intention</label>
              <select
                value={filters.intention}
                onChange={(e) => setFilters((prev) => ({ ...prev, intention: e.target.value }))}
                className="input"
              >
                {intentions.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Age Range: {filters.ageMin} - {filters.ageMax}</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={18}
                  max={80}
                  value={filters.ageMin}
                  onChange={(e) => setFilters((prev) => ({ ...prev, ageMin: Number(e.target.value) }))}
                  className="flex-1"
                />
                <input
                  type="range"
                  min={18}
                  max={80}
                  value={filters.ageMax}
                  onChange={(e) => setFilters((prev) => ({ ...prev, ageMax: Number(e.target.value) }))}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="label">Interests</label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`badge cursor-pointer transition-all ${
                    filters.interests.includes(interest)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setFilters({
                  country: '', ageMin: 18, ageMax: 80, gender: '',
                  intention: '', language: '', interests: [], sortBy: 'compatibility',
                });
              }}
              className="btn-ghost text-sm"
            >
              Clear All
            </button>
            <button onClick={handleSearch} className="btn-primary text-sm">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
