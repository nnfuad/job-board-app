import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info' }) {
  const [isExiting, setIsExiting] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 2700);
    return () => clearTimeout(timer);
  }, []);

  const icons = {
    success: <CheckCircle size={20} className="text-green-400" />,
    error: <AlertCircle size={20} className="text-red-400" />,
    info: <Info size={20} className="text-blue-400" />,
  };

  const colors = {
    success: 'bg-green-500/20 border-green-500/50 text-green-100',
    error: 'bg-red-500/20 border-red-500/50 text-red-100',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-100',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md transition-all duration-300 ${
        colors[type]
      } ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
    >
      {icons[type]}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}