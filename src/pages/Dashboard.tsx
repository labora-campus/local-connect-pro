import { TrendingUp, Euro, Globe, UserPlus, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { KPICard } from '@/components/dashboard/KPICard';
import { AnnouncementCard } from '@/components/dashboard/AnnouncementCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { mockKPIs, mockAnnouncements, currentUser, mockLeads } from '@/data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-headline text-foreground">
          ¡Hola, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-body-lg text-muted-foreground">
          Aquí tienes el pulso de tu zona hoy
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Altas Realizadas"
          value={mockKPIs.altasRealizadas}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="primary"
          subtitle="Este mes"
          onClick={() => navigate('/leads?filter=cerrado')}
        />
        <KPICard
          title="Facturación"
          value={`${mockKPIs.facturacion.toLocaleString('es-ES')}€`}
          icon={<Euro className="w-6 h-6" />}
          variant="success"
          subtitle="Este mes"
        />
        <KPICard
          title="Portales en Provincia"
          value={mockKPIs.portalesEnProvincia}
          icon={<Globe className="w-6 h-6" />}
          subtitle="Activos"
          onClick={() => navigate('/portales')}
        />
        <KPICard
          title="Leads Nuevos"
          value={mockKPIs.leadsNuevos}
          icon={<UserPlus className="w-6 h-6" />}
          subtitle="Pendientes de contactar"
          onClick={() => navigate('/leads?filter=nuevo')}
        />
      </div>

      {/* Recent Activity & Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <RecentActivity leads={mockLeads} />

        {/* Announcements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            <h2 className="text-title text-foreground">Avisos de Central</h2>
          </div>
          <div className="space-y-3">
            {mockAnnouncements.map((announcement, index) => (
              <div
                key={announcement.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AnnouncementCard announcement={announcement} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
