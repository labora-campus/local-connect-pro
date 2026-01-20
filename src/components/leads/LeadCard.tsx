import { useState } from 'react';
import { Lead } from '@/types/crm';
import { statusConfig, portalTypeConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadPipeline } from './LeadPipeline';
import { QuickLogDialog } from './QuickLogDialog';

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (leadId: string, newStatus: Lead['status']) => void;
  onGenerateMessage?: (lead: Lead) => void;
  onInteractionLog?: (leadId: string, type: 'call' | 'whatsapp', result: string, notes: string) => void;
}

export function LeadCard({ lead, onStatusChange, onGenerateMessage, onInteractionLog }: LeadCardProps) {
  const portalConfig = portalTypeConfig[lead.portalType];
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logAction, setLogAction] = useState<'call' | 'whatsapp' | null>(null);

  const handleAction = (type: 'call' | 'whatsapp') => {
    // Open system dialer/whatsapp
    if (type === 'call') {
      window.location.href = `tel:${lead.phone}`;
    } else {
      window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`, '_blank');
    }

    // Open log dialog after a short delay to allow the system action to trigger
    setTimeout(() => {
      setLogAction(type);
      setIsLogOpen(true);
    }, 500);
  };

  return (
    <>
      <div className="lead-card animate-fade-in group">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{portalConfig.icon}</span>
              <h3 className="font-semibold text-foreground truncate text-lg">{lead.businessName}</h3>
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

        <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between gap-4">
          <button
            onClick={() => onGenerateMessage?.(lead)}
            className="magic-wand-btn flex-1 justify-center"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">IA Mensaje</span>
            <span className="sm:hidden">IA</span>
          </button>

          <div className="flex gap-2 flex-1 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none border-green-600/20 hover:border-green-600/50 hover:bg-green-50 text-green-700"
              onClick={() => handleAction('whatsapp')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>

            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => handleAction('call')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Llamar
            </Button>
          </div>
        </div>
      </div>

      <QuickLogDialog
        lead={lead}
        open={isLogOpen}
        onOpenChange={setIsLogOpen}
        actionType={logAction}
        onLog={onInteractionLog || (() => { })}
      />
    </>
  );
}
