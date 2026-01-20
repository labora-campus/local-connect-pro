import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: 'default' | 'primary' | 'success';
  subtitle?: string;
  onClick?: () => void;
}

export function KPICard({ title, value, icon, variant = 'default', subtitle, onClick }: KPICardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "kpi-card animate-fade-in relative overflow-hidden",
        onClick && "cursor-pointer hover:shadow-md transition-all active:scale-[0.98]",
        variant === 'primary' && "kpi-card-primary",
        variant === 'success' && "kpi-card-success"
      )}
    >
      <div className="flex items-start justify-between relative z-10">
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
          "p-3 rounded-xl transition-colors",
          variant === 'default'
            ? "bg-primary/10 text-primary group-hover:bg-primary/20"
            : "bg-white/20"
        )}>
          {icon}
        </div>
      </div>

      {onClick && (
        <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
        </div>
      )}
    </div>
  );
}
