import { TrendingUp, CheckCircle2, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockKPIs, mockAnnouncements, currentUser, mockLeads } from '@/data/mockData';
import { mockEvents } from '@/data/mockAgendaData';
import { mockCommissions, mockSales } from '@/data/mockSalesData';
import { AnnouncementCard } from '@/components/dashboard/AnnouncementCard';
import { format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Dashboard() {
  const navigate = useNavigate();

  // 1. Monthly Goal Calculation
  const monthlyGoal = 5000;
  const currentSales = mockKPIs.facturacion;
  const progressPercentage = Math.min((currentSales / monthlyGoal) * 100, 100);

  // 2. Actionable Items (Fake logic for demo)
  const todaysEvents = mockEvents.filter(e => isToday(e.start));
  const pendingLeads = mockLeads.filter(l => l.status === 'nuevo').slice(0, 3);

  // 3. Income Breakdown (Mock data aggregation)
  const incomeByPortal = mockSales.reduce((acc, sale) => {
    const portalId = sale.portalId;
    acc[portalId] = (acc[portalId] || 0) + sale.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8 animate-fade-in pb-20 lg:pb-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          ¡Hola, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Vamos a por los objetivos de {format(new Date(), 'MMMM', { locale: es })}.
        </p>
      </div>

      {/* BLOCK 1: Objetivos del Mes */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Objetivo Mensual</CardTitle>
            <span className="text-sm font-bold text-primary">{progressPercentage.toFixed(0)}%</span>
          </div>
          <CardDescription>Facturación acumulada vs Objetivo (€{monthlyGoal})</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3 bg-muted" />
          <div className="mt-2 flex justify-between text-sm">
            <span className="font-semibold">€{currentSales.toLocaleString()}</span>
            <span className="text-muted-foreground">Faltan €{(monthlyGoal - currentSales).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BLOCK 2: Qué hacer hoy (Actionable Items) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Qué hacer hoy
          </h2>

          <div className="grid gap-4">
            {/* Events Today */}
            {todaysEvents.map(event => (
              <Card key={event.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="p-2 bg-purple-50 rounded-full text-purple-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(event.start, 'HH:mm')} • {event.type === 'central' ? 'Evento Central' : 'Tarea Personal'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/agenda')}>
                    Ver
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Pending Leads */}
            {pendingLeads.map(lead => (
              <Card key={lead.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="p-2 bg-orange-50 rounded-full text-orange-600">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{lead.businessName}</p>
                      <p className="text-sm text-muted-foreground">
                        Lead Nuevo • {lead.province}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/leads?id=${lead.id}`)}>
                    Contactar
                  </Button>
                </CardContent>
              </Card>
            ))}

            {todaysEvents.length === 0 && pendingLeads.length === 0 && (
              <div className="p-8 text-center bg-muted/20 rounded-lg border border-dashed text-muted-foreground">
                ¡Todo al día! No tienes tareas urgentes pendientes.
              </div>
            )}

            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => navigate('/agenda')}>
              Ver agenda completa <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Announcements (Moved here) */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Avisos de Central
            </h2>
            <div className="space-y-3">
              {mockAnnouncements.slice(0, 2).map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>

        {/* BLOCK 3: Desglose Ingresos & Accesos Rápidos */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Resumen Económico</h2>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground">Comisiones este mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">€682.45</div>
              <p className="text-xs text-muted-foreground mt-1">+12% vs mes anterior</p>

              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium">Por Portal</h4>
                {/* Mock breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Comercios Segovia</span>
                    <span className="font-medium">€320.00</span>
                  </div>
                  <Progress value={65} className="h-1.5" />

                  <div className="flex justify-between text-sm mt-3">
                    <span>Agrolocal</span>
                    <span className="font-medium">€180.50</span>
                  </div>
                  <Progress value={35} className="h-1.5 bg-blue-100" />

                  <div className="flex justify-between text-sm mt-3">
                    <span>Servicios Prof.</span>
                    <span className="font-medium">€181.95</span>
                  </div>
                  <Progress value={25} className="h-1.5 bg-green-100" />
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline" onClick={() => navigate('/comisiones')}>
                Ver Detalle Comisiones
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats Mini */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => navigate('/leads?filter=nuevo')}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{mockKPIs.leadsNuevos}</div>
                <div className="text-xs text-muted-foreground">Leads Nuevos</div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate('/ventas')}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-xs text-muted-foreground">Ventas Hoy</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
