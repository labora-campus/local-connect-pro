import { Announcement } from '@/types/crm';
import { cn } from '@/lib/utils';
import { Bell, AlertCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const priorityConfig = {
  high: { icon: AlertCircle, className: 'border-l-destructive' },
  medium: { icon: Bell, className: 'border-l-warning' },
  low: { icon: Info, className: 'border-l-info' },
};

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const config = priorityConfig[announcement.priority];
  const Icon = config.icon;

  return (
    <div className={cn("announcement-card animate-fade-in", config.className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn(
          "w-5 h-5 flex-shrink-0 mt-0.5",
          announcement.priority === 'high' && "text-destructive",
          announcement.priority === 'medium' && "text-warning",
          announcement.priority === 'low' && "text-info"
        )} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground">{announcement.title}</h4>
            <time className="text-xs text-muted-foreground whitespace-nowrap">
              {format(announcement.createdAt, 'd MMM', { locale: es })}
            </time>
          </div>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {announcement.content}
          </p>
        </div>
      </div>
    </div>
  );
}
