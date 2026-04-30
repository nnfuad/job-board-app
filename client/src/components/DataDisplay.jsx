import React from 'react';
import useApiData from '../hooks/useApiData';
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export default function DataDisplay({ filters, onToast }) {
  const [page, setPage] = React.useState(1);

  const queryParams = new URLSearchParams({
    page,
    limit: 12,
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '' && v !== false && v.length > 0)
    ),
  });

  const { data, loading, error } = useApiData(
    `${API_URL}/jobs?${queryParams.toString()}`
  );

  React.useEffect(() => {
    setPage(1);
  }, [filters]);

  React.useEffect(() => {
    if (error) {
      onToast('Failed to load jobs. Please try again.', 'error');
    }
  }, [error]);

  if (loading) return <LoadingSpinner />;

  if (error && !data) {
    return <EmptyState title="Error loading jobs" description={error} />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        description="Try adjusting your filters to find more opportunities"
      />
    );
  }

  const { data: jobs, pagination } = data;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            {pagination.total} Jobs Found
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Showing {(page - 1) * 12 + 1} to {Math.min(page * 12, pagination.total)}
          </p>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg glass-effect-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                const pageNum =
                  pagination.totalPages <= 5
                    ? i + 1
                    : Math.max(1, page - 2) + i;
                if (pageNum > pagination.totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      page === pageNum
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'glass-effect-dark hover:bg-slate-700/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="p-2 rounded-lg glass-effect-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}