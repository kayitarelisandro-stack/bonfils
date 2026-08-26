import { Star, Clock, MapPin, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link
      to={`/experiences/${experience.id}`}
      className="card group overflow-hidden !p-0 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
        {experience.imageUrl ? (
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Star className="w-12 h-12 text-slate-300" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/90 backdrop-blur-sm text-slate-700 text-xs">
            {experience.category}
          </span>
        </div>
        {experience.isOnline && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-emerald-500/90 backdrop-blur-sm text-white text-xs flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              Online
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {experience.title}
        </h3>

        {experience.provider && (
          <p className="text-sm text-slate-500 mb-2">
            by {experience.provider.displayName}
          </p>
        )}

        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
          {experience.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {experience.rating.toFixed(1)} ({experience.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {experience.duration}
          </span>
          {!experience.isOnline && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {experience.location}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xl font-bold text-slate-900">
              ${experience.price}
            </span>
            <span className="text-xs text-slate-500 ml-1">
              {experience.currency || 'USD'}
            </span>
          </div>
          <button className="btn-primary text-sm !py-2 !px-4">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
}
