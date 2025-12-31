import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  fullScreen = false,
  message = 'Yükleniyor...'
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Logo Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} border-4 border-blue-200 rounded-full animate-spin border-t-blue-600`}></div>
        
        {/* Inner Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-sm animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      {message && (
        <p className="text-sm text-gray-600 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
};

export default LoadingSpinner;












