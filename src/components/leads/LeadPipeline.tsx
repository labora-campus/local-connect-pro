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
    <div className="relative">
      <div className={cn(
        "flex items-center gap-1",
        compact ? "gap-0.5" : "gap-1"
      )}>
        {mainPipeline.map((status, index) => {
          const config = statusConfig[status];
          const isCompleted = !isDiscarded && statusOrder.indexOf(status) < currentIndex;
          const isCurrent = status === currentStatus;
          const isClickable = onStatusChange && !isDiscarded;

          return (
            <div key={status} className="flex-1 flex items-center">
              <button
                onClick={() => isClickable && onStatusChange(status)}
                disabled={!isClickable}
                className={cn(
                  "relative flex-1 h-2 rounded-full transition-all duration-300",
                  isCompleted && "bg-status-closed",
                  isCurrent && `pipeline-${status} bg-current`,
                  !isCompleted && !isCurrent && "bg-muted",
                  isClickable && "cursor-pointer hover:opacity-80",
                  !isClickable && "cursor-default",
                  // Current status special styling
                  isCurrent && status === 'nuevo' && "bg-status-new",
                  isCurrent && status === 'contactado' && "bg-status-contacted",
                  isCurrent && status === 'seguimiento' && "bg-status-followup",
                  isCurrent && status === 'cerrado' && "bg-status-closed",
                )}
                title={config.label}
              >
                {isCurrent && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap">
                    {config.label}
                  </span>
                )}
              </button>
              {index < mainPipeline.length - 1 && (
                <div className={cn(
                  "w-1 h-1 rounded-full mx-0.5",
                  isCompleted ? "bg-status-closed" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {isDiscarded && (
        <div className="mt-2 text-center">
          <span className="pipeline-badge pipeline-descartado text-xs">
            Descartado
          </span>
        </div>
      )}

      {onStatusChange && !compact && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => onStatusChange('descartado')}
            className={cn(
              "text-xs text-muted-foreground hover:text-destructive transition-colors",
              isDiscarded && "text-destructive font-medium"
            )}
          >
            {isDiscarded ? '✕ Descartado' : 'Marcar como descartado'}
          </button>
        </div>
      )}
    </div>
  );
}
