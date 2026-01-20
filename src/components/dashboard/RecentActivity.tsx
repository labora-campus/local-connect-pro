import { Lead } from '@/types/crm';
import { statusConfig } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
  leads: Lead[];
}

export function RecentActivity({ leads }: RecentActivityProps) {
  // Sort leads by last update (most recent first) and take top 5
  const recentLeads = [...leads]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        <h2 className="text-title text-foreground">Actividad Reciente</h2>
      </div>
      
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        {recentLeads.length > 0 ? (
          <div className="divide-y divide-border/50">
            {recentLeads.map((lead, index) => (
              <div 
                key={lead.id}
                className={cn(
                  "p-4 flex items-center justify-between hover:bg-muted/30 transition-colors animate-fade-in",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground truncate">
                      {lead.businessName}
                    </p>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold",
                      `bg-status-${lead.status}/10 text-status-${lead.status}`
                    )}>
                      {statusConfig[lead.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {lead.contactName}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                  <span className="text-xs text-muted-foreground capitalize">
                    {formatDistanceToNow(lead.updatedAt, { locale: es, addSuffix: true })}
                  </span>
                  {lead.status === 'cerrado' && (
                    <CheckCircle2 className="w-4 h-4 text-status-closed" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
             No hay actividad reciente
          </div>
        )}
      </div>
    </div>
  );
}
