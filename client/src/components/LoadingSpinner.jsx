import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-spin" />
        <div className="absolute inset-1 bg-slate-950 rounded-full" />
      </div>
      <p className="text-slate-400 text-sm animate-pulse">Loading jobs...</p>
    </div>
  );
}