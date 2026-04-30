import React from 'react';
import {
  MapPin,
  DollarSign,
  Briefcase,
  TrendingUp,
  Zap,
  Globe,
} from 'lucide-react';

export default function JobCard({ job }) {
  const formatSalary = (salary) => {
    if (!salary) return 'Negotiable';
    return `$${(salary / 1000).toFixed(0)}K`;
  };

  return (
    <div className="glass-effect rounded-xl p-6 card-hover group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {job.featured && (
              <span className="inline-block px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-xs font-semibold text-yellow-300">
                ⭐ Featured
              </span>
            )}
            {job.remote_friendly && (
              <span className="inline-block px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-xs font-semibold text-blue-300 flex items-center gap-1">
                <Globe size={12} /> Remote
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-slate-400">{job.company}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-cyan-400/70" />
          <span className="text-slate-300">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={16} className="text-green-400/70" />
          <span className="text-slate-300">
            {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase size={16} className="text-purple-400/70" />
          <span className="text-slate-300">{job.job_type}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp size={16} className="text-orange-400/70" />
          <span className="text-slate-300">{job.experience_level}</span>
        </div>
      </div>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-yellow-400/70" />
            <span className="text-xs font-semibold text-slate-400">Required Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-slate-800/50 border border-slate-700 rounded text-slate-300 hover:border-cyan-500/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button className="w-full btn-gradient text-white">
        View Details
      </button>
    </div>
  );
}