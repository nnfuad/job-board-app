import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export default function FilterBar({ filters, onFilterChange }) {
  const [options, setOptions] = useState({
    jobTypes: [],
    experienceLevels: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/filters/options`);
      setOptions(response.data.data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    onFilterChange({
      [field]: value,
    });
  };

  const handleSkillToggle = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ skills: newSkills });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      jobType: '',
      experienceLevel: '',
      minSalary: '',
      maxSalary: '',
      remoteFriendly: false,
      skills: [],
      sortBy: 'posted_date',
      sortOrder: 'DESC',
    });
  };

  return (
    <div className="glass-effect-dark sticky top-24 rounded-xl p-6 space-y-6 h-fit">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Filters</h2>
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Job title, company..."
          value={filters.search}
          onChange={(e) => handleInputChange('search', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Job Type
        </label>
        <select
          value={filters.jobType}
          onChange={(e) => handleInputChange('jobType', e.target.value)}
          className="w-full"
        >
          <option value="">All Types</option>
          {options.jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Experience Level
        </label>
        <select
          value={filters.experienceLevel}
          onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
          className="w-full"
        >
          <option value="">All Levels</option>
          {options.experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Salary Range
        </label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min salary"
            value={filters.minSalary}
            onChange={(e) => handleInputChange('minSalary', e.target.value)}
            className="w-full"
          />
          <input
            type="number"
            placeholder="Max salary"
            value={filters.maxSalary}
            onChange={(e) => handleInputChange('maxSalary', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Remote Friendly */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="remote"
          checked={filters.remoteFriendly}
          onChange={(e) => handleInputChange('remoteFriendly', e.target.checked)}
          className="w-4 h-4 rounded cursor-pointer"
        />
        <label htmlFor="remote" className="text-sm font-medium cursor-pointer">
          Remote Friendly
        </label>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {options.skills.slice(0, 8).map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filters.skills.includes(skill)
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="border-t border-slate-700 pt-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleInputChange('sortBy', e.target.value)}
          className="w-full mb-2"
        >
          <option value="posted_date">Latest</option>
          <option value="salary_max">Highest Salary</option>
          <option value="title">Job Title</option>
        </select>

        <select
          value={filters.sortOrder}
          onChange={(e) => handleInputChange('sortOrder', e.target.value)}
          className="w-full"
        >
          <option value="DESC">Descending</option>
          <option value="ASC">Ascending</option>
        </select>
      </div>
    </div>
  );
}