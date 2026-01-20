import { useState } from 'react';
import { Portal } from '@/types/crm';
import { portalTypeConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Users, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { PortalDetailSheet } from './PortalDetailSheet';

interface PortalCardProps {
  portal: Portal;
}

export function PortalCard({ portal }: PortalCardProps) {
  const config = portalTypeConfig[portal.type];
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsDetailsOpen(true)}
        className={cn(
          "portal-card animate-fade-in group cursor-pointer hover:border-primary/50 transition-all",
          !portal.isActive && "opacity-60 hover:opacity-100"
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl transition-transform group-hover:scale-110 duration-300">{config.icon}</span>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{portal.name}</h3>
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

        <div className="mt-4 pt-4 border-t border-border group-hover:border-primary/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">Suscriptores</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-foreground">
                {portal.subscribersCount}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>

      <PortalDetailSheet
        portal={portal}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
}
