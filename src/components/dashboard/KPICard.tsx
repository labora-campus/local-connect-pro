import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: 'default' | 'primary' | 'success';
  subtitle?: string;
}

export function KPICard({ title, value, icon, variant = 'default', subtitle }: KPICardProps) {
  return (
    <div 
      className={cn(
        "kpi-card animate-fade-in",
        variant === 'primary' && "kpi-card-primary",
        variant === 'success' && "kpi-card-success"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            variant === 'default' ? "text-muted-foreground" : "opacity-90"
          )}>
            {title}
          </p>
          <p className="text-3xl lg:text-4xl font-bold tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              "text-sm",
              variant === 'default' ? "text-muted-foreground" : "opacity-80"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          variant === 'default' 
            ? "bg-primary/10 text-primary" 
            : "bg-white/20"
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
