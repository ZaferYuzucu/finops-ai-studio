// FINOPS KPI Card - Modular Component for Custom Dashboards
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface FinopsKpiCardProps {
  label: string;
  value: string | number;
  change?: number;
  target?: number;
  icon?: React.ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  sparklineData?: number[];
  unit?: string;
  previousValue?: string;
  note?: string;
}

export const FinopsKpiCard: React.FC<FinopsKpiCardProps> = ({
  label,
  value,
  change,
  target,
  icon,
  status,
  sparklineData,
  unit = '',
  previousValue,
  note
}) => {
  // Determine color based on status or change
  const getStatusColor = () => {
    if (status === 'success') return 'var(--status-success)';
    if (status === 'warning') return 'var(--status-warning)';
    if (status === 'danger') return 'var(--status-danger)';
    if (status === 'neutral') return 'var(--text-secondary)';
    
    // Auto-detect from change if no explicit status
    if (change !== undefined) {
      if (change > 5) return 'var(--status-success)';
      if (change < -5) return 'var(--status-danger)';
      if (Math.abs(change) > 2) return 'var(--status-warning)';
    }
    
    return 'var(--finops-ocean)';
  };

  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus size={14} />;
    return change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
  };

  const getTrendClass = () => {
    if (change === undefined || change === 0) return 'text-gray-500';
    return change > 0 ? 'finops-metric-positive' : 'finops-metric-negative';
  };

  return (
    <div className="finops-card pdf-avoid-break h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </div>
        {icon && (
          <div style={{ color: getStatusColor() }}>
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end gap-1 mb-2">
        <div className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
          {value}
        </div>
        {unit && (
          <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
            {unit}
          </div>
        )}
      </div>

      {/* Change & Previous Value */}
      {change !== undefined && (
        <div className="flex items-center gap-2 mb-1">
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${getTrendClass()}`}>
            {getTrendIcon()}
            {Math.abs(change).toFixed(1)}%
          </div>
          {previousValue && (
            <span className="text-xs" style={{ color: 'var(--text-light)' }}>
              vs {previousValue}
            </span>
          )}
        </div>
      )}

      {/* Target Progress */}
      {target !== undefined && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
            <span>Hedef</span>
            <span className="font-semibold">{target}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${Math.min(target, 100)}%`,
                backgroundColor: target >= 100 ? 'var(--status-success)' : target >= 70 ? 'var(--status-warning)' : 'var(--status-danger)'
              }}
            />
          </div>
        </div>
      )}

      {/* Sparkline (Simple SVG) */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-2 h-8">
          <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={getStatusColor()}
              strokeWidth="2"
              points={sparklineData.map((val, idx) => {
                const x = (idx / (sparklineData.length - 1)) * 100;
                const maxVal = Math.max(...sparklineData);
                const minVal = Math.min(...sparklineData);
                const y = 30 - ((val - minVal) / (maxVal - minVal)) * 25;
                return `${x},${y}`;
              }).join(' ')}
            />
          </svg>
        </div>
      )}

      {/* Note */}
      {note && (
        <div className="text-xs mt-2 pt-2 border-t" style={{ color: 'var(--text-secondary)', borderColor: 'var(--bg-card-border)' }}>
          {note}
        </div>
      )}
    </div>
  );
};

export default FinopsKpiCard;
