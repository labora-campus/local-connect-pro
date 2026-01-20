import { Lead } from '@/types/crm';
import { statusConfig, portalTypeConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadPipeline } from './LeadPipeline';

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (leadId: string, newStatus: Lead['status']) => void;
  onGenerateMessage?: (lead: Lead) => void;
}

export function LeadCard({ lead, onStatusChange, onGenerateMessage }: LeadCardProps) {
  const portalConfig = portalTypeConfig[lead.portalType];

  return (
    <div className="lead-card animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{portalConfig.icon}</span>
            <h3 className="font-semibold text-foreground truncate">{lead.businessName}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{lead.contactName}</p>
        </div>
        <span className={cn("pipeline-badge", `pipeline-${lead.status}`)}>
          {statusConfig[lead.status].label}
        </span>
      </div>

      <LeadPipeline currentStatus={lead.status} onStatusChange={(status) => onStatusChange?.(lead.id, status)} />

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">
            {lead.phone}
          </a>
        </div>
        {lead.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors truncate">
              {lead.email}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{lead.address}</span>
        </div>
      </div>

      {lead.notes && (
        <p className="mt-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-2 italic">
          "{lead.notes}"
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onGenerateMessage?.(lead)}
          className="magic-wand-btn"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generar mensaje</span>
        </button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`tel:${lead.phone}`}>Llamar</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
