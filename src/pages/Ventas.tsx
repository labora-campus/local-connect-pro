import { useState } from 'react';
import { mockSales, mockServices } from '@/data/mockSalesData';
import { mockPortals } from '@/data/mockData';
import { Sale } from '@/types/crm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Calendar, DollarSign, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SaleForm } from '@/components/sales/SaleForm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Ventas() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sales] = useState<Sale[]>(mockSales); // In real app, this would come from an API

    const getServiceName = (id: string) => mockServices.find(s => s.id === id)?.name || 'Desconocido';
    const getPortalName = (id: string) => mockPortals.find(p => p.id === id)?.name || 'Portal invi.';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCommissionBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50">Comisión Pendiente</Badge>;
            case 'validated': return <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">Comisión Validada</Badge>;
            case 'liquidated': return <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">Cobrada</Badge>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 pb-20 lg:pb-0 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Registro de Ventas</h1>
                    <p className="text-muted-foreground">Gestiona tus ventas y altas comisionables.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Nueva Venta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Registrar Venta</DialogTitle>
                            <DialogDescription>
                                Introduce los datos de la venta para calcular tu comisión automáticamente.
                            </DialogDescription>
                        </DialogHeader>
                        <SaleForm onSuccess={() => setIsDialogOpen(false)} onCancel={() => setIsDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* KPI Resumen Rápido */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Ventas Mes</p>
                            <h3 className="text-2xl font-bold">€229.80</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Operaciones</p>
                            <h3 className="text-2xl font-bold">3</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por cliente o servicio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                </Button>
            </div>

            {/* Sales List */}
            <div className="grid gap-4">
                {sales.map((sale) => (
                    <Card key={sale.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{sale.clientName}</h3>
                                        <Badge variant="secondary" className="text-xs font-normal">
                                            {format(sale.date, 'd MMM yyyy', { locale: es })}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {getServiceName(sale.serviceId)} • {getPortalName(sale.portalId)}
                                    </p>
                                </div>

                                <div className="flex flex-col md:items-end gap-2">
                                    <span className="text-xl font-bold text-primary">
                                        €{sale.amount.toFixed(2)}
                                    </span>
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(sale.status)}`}>
                                            {sale.status === 'completed' ? 'Venta Completa' : sale.status}
                                        </span>
                                        {getCommissionBadge(sale.commissionStatus)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
