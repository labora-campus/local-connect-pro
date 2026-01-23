import { mockCommissions, mockSales } from '@/data/mockSalesData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarChart, Clock, CheckCircle2, DollarSign, Wallet } from 'lucide-react';

export default function Comisiones() {
    // Calculations
    const totalPending = mockCommissions
        .filter(c => c.status === 'pending')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalValidated = mockCommissions
        .filter(c => c.status === 'validated')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalLiquidated = mockCommissions
        .filter(c => c.status === 'liquidated')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const getSaleDetails = (saleId: string) => mockSales.find(s => s.id === saleId);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50">Pendiente</Badge>;
            case 'validated': return <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">Validada</Badge>;
            case 'liquidated': return <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">Pagada</Badge>;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 pb-20 lg:pb-0 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Mis Comisiones</h1>
                <p className="text-muted-foreground">Control y seguimiento de tus ingresos.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-yellow-400">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">Pendientes</span>
                            <Clock className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-700">€{totalPending.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Esperando validación</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-400">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">Validadas</span>
                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold text-blue-700">€{totalValidated.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Próximo pago</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-400">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">Cobradas</span>
                            <Wallet className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-green-700">€{totalLiquidated.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total histórico</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="pending">Pendientes</TabsTrigger>
                    <TabsTrigger value="validated">Validadas</TabsTrigger>
                </TabsList>

                <div className="mt-4 space-y-4">
                    {/* Mock list, filtering logic would handle real data */}
                    {mockCommissions.map((commission) => {
                        const sale = getSaleDetails(commission.saleId);
                        return (
                            <Card key={commission.id} className="hover:bg-muted/20 transition-colors">
                                <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                                    <div className="space-y-1">
                                        <p className="font-medium">{sale?.clientName || 'Cliente desconocido'}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Venta: {format(commission.date, 'd MMM yyyy', { locale: es })} •
                                            Ref: {sale?.id}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="text-right">
                                            <p className="font-bold text-lg">€{commission.amount.toFixed(2)}</p>
                                            <p className="text-xs text-muted-foreground">{commission.percentage}% com.</p>
                                        </div>
                                        {getStatusBadge(commission.status)}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </Tabs>
        </div>
    );
}
