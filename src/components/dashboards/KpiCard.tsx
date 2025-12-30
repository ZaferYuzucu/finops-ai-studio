// KPI Card Component - Professional Style
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  previousValue?: string;
  icon?: React.ReactNode;
  color?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit = '',
  change,
  previousValue,
  icon,
  color = '#10B981'
}) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Title */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide truncate">
          {title}
        </h3>
        {icon && <div style={{ color }}>{icon}</div>}
      </div>
      
      {/* Value */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-black text-gray-900">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-gray-500">
            {unit}
          </span>
        )}
      </div>
      
      {/* Trend */}
      {change !== undefined && (
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
            isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change).toFixed(1)}%
          </div>
          {previousValue && (
            <span className="text-xs text-gray-500">
              vs {previousValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;

