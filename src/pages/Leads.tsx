import { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { Lead, LeadStatus } from '@/types/crm';
import { mockLeads, statusConfig } from '@/data/mockData';
import { LeadCard } from '@/components/leads/LeadCard';
import { AddLeadDialog } from '@/components/leads/AddLeadDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, updatedAt: new Date() }
        : lead
    ));
    toast.success(`Estado actualizado a "${statusConfig[newStatus].label}"`);
  };

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const lead: Lead = {
      ...newLead,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLeads([lead, ...leads]);
    toast.success('Lead añadido correctamente');
  };

  const handleGenerateMessage = (lead: Lead) => {
    toast.info('Generando mensaje de venta con IA...', {
      description: 'Esta función estará disponible próximamente',
    });
  };

  const leadCounts = {
    all: leads.length,
    nuevo: leads.filter(l => l.status === 'nuevo').length,
    contactado: leads.filter(l => l.status === 'contactado').length,
    seguimiento: leads.filter(l => l.status === 'seguimiento').length,
    cerrado: leads.filter(l => l.status === 'cerrado').length,
    descartado: leads.filter(l => l.status === 'descartado').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-headline text-foreground">Leads</h1>
          <p className="text-muted-foreground">
            Gestiona tus prospectos y oportunidades
          </p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          size="lg"
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Añadir lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as LeadStatus | 'all')}
        >
          <SelectTrigger className="w-full sm:w-[200px] h-12">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos ({leadCounts.all})</SelectItem>
            <SelectItem value="nuevo">Nuevo ({leadCounts.nuevo})</SelectItem>
            <SelectItem value="contactado">Contactado ({leadCounts.contactado})</SelectItem>
            <SelectItem value="seguimiento">Seguimiento ({leadCounts.seguimiento})</SelectItem>
            <SelectItem value="cerrado">Cerrado ({leadCounts.cerrado})</SelectItem>
            <SelectItem value="descartado">Descartado ({leadCounts.descartado})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status Summary - Desktop */}
      <div className="hidden lg:flex items-center gap-2 p-4 bg-card rounded-xl border border-border/50">
        {Object.entries(statusConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key as LeadStatus)}
            className={`flex-1 p-3 rounded-lg transition-all ${
              statusFilter === key 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            <div className="text-2xl font-bold">{leadCounts[key as LeadStatus]}</div>
            <div className="text-sm">{config.label}</div>
          </button>
        ))}
      </div>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLeads.map((lead, index) => (
          <div
            key={lead.id}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <LeadCard
              lead={lead}
              onStatusChange={handleStatusChange}
              onGenerateMessage={handleGenerateMessage}
            />
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No se encontraron leads
          </p>
          <Button
            variant="outline"
            onClick={() => setIsAddDialogOpen(true)}
            className="mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir primer lead
          </Button>
        </div>
      )}

      {/* FAB for mobile */}
      <button
        onClick={() => setIsAddDialogOpen(true)}
        className="fab lg:hidden bottom-24 right-4"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddLeadDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddLead={handleAddLead}
      />
    </div>
  );
}
