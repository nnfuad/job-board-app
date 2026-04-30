import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import DataDisplay from './components/DataDisplay';
import Toast from './components/Toast';

function App() {
  const [filters, setFilters] = useState({
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

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-3">
            <DataDisplay filters={filters} onToast={showToast} />
          </section>
        </div>
      </main>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;