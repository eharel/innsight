import type { ReactNode } from 'react';

type MetricCardProps = {
  title: string;
  value: ReactNode;
  // Additional optional props for future extensibility
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

/**
 * MetricCard component for displaying dashboard metrics
 * 
 * @param title - The title of the metric
 * @param value - The value to display (can be string, number, or more complex ReactNode)
 * @param icon - Optional icon to display with the metric
 * @param trend - Optional trend data to show change over time
 * @param className - Optional additional CSS classes
 */
export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  className = '' 
}: MetricCardProps) {
  return (
    <div className={`card bg-bg-surface ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        {icon && <div className="text-text-muted">{icon}</div>}
      </div>
      
      <div className="flex items-end">
        <p className="text-3xl font-bold text-primary">{value}</p>
        
        {trend && (
          <span className={`ml-2 text-sm font-medium flex items-center px-2 py-0.5 rounded-full ${trend.isPositive 
            ? 'text-success bg-success/10' 
            : 'text-error bg-error/10'}`}
          >
            <span className="text-base mr-0.5">{trend.isPositive ? '↑' : '↓'}</span> {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
