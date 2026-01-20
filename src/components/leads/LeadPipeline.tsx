import { LeadStatus } from '@/types/crm';
import { statusConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface LeadPipelineProps {
  currentStatus: LeadStatus;
  onStatusChange?: (status: LeadStatus) => void;
  compact?: boolean;
}

const statusOrder: LeadStatus[] = ['nuevo', 'contactado', 'seguimiento', 'cerrado', 'descartado'];

export function LeadPipeline({ currentStatus, onStatusChange, compact = false }: LeadPipelineProps) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  // For the pipeline view, we show the main progression (excluding descartado which is a branch)
  const mainPipeline: LeadStatus[] = ['nuevo', 'contactado', 'seguimiento', 'cerrado'];
  const isDiscarded = currentStatus === 'descartado';

  return (
    <div className="relative pt-6 pb-2">
      <div className={cn(
        "flex items-center gap-1.5",
        compact ? "gap-1" : "gap-1.5"
      )}>
        {mainPipeline.map((status, index) => {
          const config = statusConfig[status];
          const isCompleted = !isDiscarded && statusOrder.indexOf(status) < currentIndex;
          const isCurrent = status === currentStatus;
          const isClickable = onStatusChange && !isDiscarded;

          return (
            <div key={status} className="flex-1 flex items-center relative group">
              <button
                onClick={() => isClickable && onStatusChange(status)}
                disabled={!isClickable}
                className={cn(
                  "relative flex-1 h-3 rounded-full transition-all duration-300 isolate",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  isCompleted && "bg-status-closed/80 hover:bg-status-closed",
                  isCurrent && `pipeline-${status} bg-current scale-y-125 shadow-sm`,
                  !isCompleted && !isCurrent && "bg-muted hover:bg-muted/80",
                  isClickable && "cursor-pointer",
                  !isClickable && "cursor-default",
                  // Current status special styling
                  isCurrent && status === 'nuevo' && "bg-status-new",
                  isCurrent && status === 'contactado' && "bg-status-contacted",
                  isCurrent && status === 'seguimiento' && "bg-status-followup",
                  isCurrent && status === 'cerrado' && "bg-status-closed",
                )}
                aria-label={`Cambiar estado a ${config.label}`}
                title={config.label}
              >
                {/* Touch target expansion */}
                <span className="absolute inset-0 -top-4 -bottom-4 z-10 block content-['']" />

                {isCurrent && (
                  <span className={cn(
                    "absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded-full shadow-sm z-20",
                    "bg-background text-foreground border border-border animate-fade-in"
                  )}>
                    {config.label}
                  </span>
                )}
              </button>

              {/* Connector */}
              {index < mainPipeline.length - 1 && (
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full mx-0.5 transition-colors",
                  isCompleted ? "bg-status-closed/50" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {isDiscarded && (
        <div className="mt-2 text-center animate-fade-in">
          <span className="pipeline-badge pipeline-descartado text-xs font-medium px-3 py-1">
            Descartado
          </span>
        </div>
      )}

      {onStatusChange && !compact && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => onStatusChange('descartado')}
            className={cn(
              "text-xs px-3 py-2 rounded-lg transition-colors touch-none",
              "hover:bg-destructive/10 active:bg-destructive/20",
              isDiscarded
                ? "text-destructive font-bold bg-destructive/10"
                : "text-muted-foreground hover:text-destructive"
            )}
          >
            {isDiscarded ? '✕ Lead Descartado' : 'Marcar como descartado'}
          </button>
        </div>
      )}
    </div>
  );
}
