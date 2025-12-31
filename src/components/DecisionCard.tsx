import { AlertTriangle, TrendingUp, TrendingDown, AlertCircle, Info } from 'lucide-react';

export interface DecisionCardProps {
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  impact: string;
  description?: string;
  actionable?: boolean;
}

const typeConfig = {
  warning: {
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    textColor: 'text-yellow-800',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600'
  },
  danger: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-400',
    textColor: 'text-red-800',
    icon: TrendingDown,
    iconColor: 'text-red-600'
  },
  info: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-600'
  },
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-400',
    textColor: 'text-green-800',
    icon: TrendingUp,
    iconColor: 'text-green-600'
  }
};

export default function DecisionCard({ type, title, impact, description, actionable = true }: DecisionCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-lg p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-3">
        <Icon className={`${config.iconColor} h-6 w-6 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`${config.textColor} font-bold text-sm mb-1`}>{title}</h4>
          <p className={`${config.textColor} font-semibold text-lg mb-1`}>{impact}</p>
          {description && (
            <p className={`${config.textColor} text-xs opacity-80 leading-relaxed`}>{description}</p>
          )}
          {actionable && (
            <div className="mt-2">
              <span className={`${config.textColor} text-xs font-semibold inline-flex items-center gap-1`}>
                <AlertCircle className="h-3 w-3" />
                Aksiyon gerekli
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DecisionCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {children}
    </div>
  );
}



