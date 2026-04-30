import React from 'react';
import { Briefcase } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 group-hover:shadow-lg transition-shadow">
            <Briefcase size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            JobBoard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-400">Find your dream job</p>
        </div>
      </div>
    </nav>
  );
}