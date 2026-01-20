import { Portal } from '@/types/crm';
import { portalTypeConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Users, CheckCircle2, XCircle } from 'lucide-react';

interface PortalCardProps {
  portal: Portal;
}

export function PortalCard({ portal }: PortalCardProps) {
  const config = portalTypeConfig[portal.type];

  return (
    <div className={cn(
      "portal-card animate-fade-in",
      !portal.isActive && "opacity-60"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{config.icon}</span>
          <div>
            <h3 className="font-semibold text-foreground">{portal.name}</h3>
            <p className="text-sm text-muted-foreground">{config.label}</p>
          </div>
        </div>
        {portal.isActive ? (
          <div className="flex items-center gap-1 text-success text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Activo</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <XCircle className="w-4 h-4" />
            <span>Inactivo</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">Suscriptores</span>
          </div>
          <span className="text-2xl font-bold text-foreground">
            {portal.subscribersCount}
          </span>
        </div>
      </div>
    </div>
  );
}
