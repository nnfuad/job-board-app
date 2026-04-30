import React from 'react';
import { Search } from 'lucide-react';

export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 glass-effect rounded-xl">
      <div className="p-4 rounded-full bg-slate-800/50 mb-4">
        <Search size={32} className="text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 text-center max-w-md">{description}</p>
    </div>
  );
}