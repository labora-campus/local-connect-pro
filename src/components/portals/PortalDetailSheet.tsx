import { Portal } from '@/types/crm';
import { portalTypeConfig } from '@/data/mockData';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, BarChart3, FileText, Banknote } from 'lucide-react';

interface PortalDetailSheetProps {
    portal: Portal | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PortalDetailSheet({ portal, open, onOpenChange }: PortalDetailSheetProps) {
    if (!portal) return null;

    const config = portalTypeConfig[portal.type];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{config.icon}</span>
                        <div>
                            <SheetTitle className="text-xl">{portal.name}</SheetTitle>
                            <SheetDescription>{config.label} • {portal.province}</SheetDescription>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {portal.isActive ? (
                            <Badge variant="default" className="bg-success hover:bg-success/90">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Activo
                            </Badge>
                        ) : (
                            <Badge variant="secondary">
                                <XCircle className="w-3 h-3 mr-1" /> Inactivo
                            </Badge>
                        )}
                        <Badge variant="outline">
                            {portal.subscribersCount} Suscriptores
                        </Badge>
                    </div>
                </SheetHeader>

                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 mb-6">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="sales">Ventas</TabsTrigger>
                        <TabsTrigger value="stats">Métricas</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="space-y-4 animate-fade-in">
                        <div className="space-y-4">
                            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Descripción
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Portal especializado en {config.label.toLowerCase()} para la zona de {portal.province}.
                                    Conecta negocios locales con vecinos interesados en ofertas de proximidad.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3">Características incluidas</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Ficha de negocio verificada
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Publicación ilimitada de ofertas
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        Ranking en búsquedas locales
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="sales" className="space-y-4 animate-fade-in">
                        <div className="space-y-4">
                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                                    <Banknote className="w-4 h-4" />
                                    Plan de Comisiones
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Alta Nueva</span>
                                        <span className="font-semibold">50€</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Renovación Anual</span>
                                        <span className="font-semibold">20€</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Argumentario Rápido</h4>
                                <div className="space-y-3">
                                    <div className="p-3 bg-muted rounded text-sm italic border-l-2 border-primary">
                                        "¿Sabías que el 80% de tus vecinos buscan en internet antes de comprar? Con este portal apareces justo cuando te buscan."
                                    </div>
                                    <div className="p-3 bg-muted rounded text-sm italic border-l-2 border-primary">
                                        "Es la única plataforma exclusiva de {portal.province} que no cobra comisiones por venta."
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full">Descargar Dossier PDF</Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-card border rounded-xl text-center">
                                <div className="text-2xl font-bold text-primary">+12%</div>
                                <div className="text-xs text-muted-foreground">Visitas este mes</div>
                            </div>
                            <div className="p-4 bg-card border rounded-xl text-center">
                                <div className="text-2xl font-bold text-primary">4.8/5</div>
                                <div className="text-xs text-muted-foreground">Valoración media</div>
                            </div>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-xl border border-border/50 flex items-center justify-center h-40">
                            <div className="flex flex-col items-center text-muted-foreground">
                                <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
                                <span className="text-sm">Gráfico de visitas detallado</span>
                                <span className="text-xs opacity-70">(Próximamente)</span>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    );
}
