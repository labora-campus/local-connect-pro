import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { mockPortals } from '@/data/mockData';
import { mockServices, mockPlans } from '@/data/mockSalesData';
import { toast } from 'sonner';

interface SaleFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function SaleForm({ onSuccess, onCancel }: SaleFormProps) {
    const [formData, setFormData] = useState({
        clientName: '',
        clientNif: '',
        portalId: '',
        serviceId: '',
        planId: '',
        amount: '',
    });

    const selectedService = mockServices.find(s => s.id === formData.serviceId);
    const portalPlans = mockPlans.filter(p => p.portalId === formData.portalId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulating API call and calculation
        console.log('Registering sale:', formData);

        // Simulate commission calculation (10% flat for demo)
        const amount = Number(formData.amount);
        const commission = amount * 0.10;

        toast.success('Venta registrada correctamente', {
            description: `Comisión estimada generada: €${commission.toFixed(2)}`,
            duration: 5000,
        });

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="clientName">Cliente / Empresa</Label>
                    <Input
                        id="clientName"
                        placeholder="Ej. Panadería Pepe"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="clientNif">NIF / CIF</Label>
                    <Input
                        id="clientNif"
                        placeholder="Opcional"
                        value={formData.clientNif}
                        onChange={(e) => setFormData({ ...formData, clientNif: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="portal">Portal</Label>
                <Select
                    onValueChange={(val) => setFormData({ ...formData, portalId: val })}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona el portal" />
                    </SelectTrigger>
                    <SelectContent>
                        {mockPortals.filter(p => p.isActive).map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="service">Servicio Vendido</Label>
                <Select
                    onValueChange={(val) => {
                        const service = mockServices.find(s => s.id === val);
                        setFormData({
                            ...formData,
                            serviceId: val,
                            amount: service?.price ? service.price.toString() : ''
                        });
                    }}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona servicio" />
                    </SelectTrigger>
                    <SelectContent>
                        {mockServices.map(s => (
                            <SelectItem key={s.id} value={s.id}>
                                {s.name} ({s.periodicidad})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {selectedService?.type === 'suscripcion' && portalPlans.length > 0 && (
                <div className="space-y-2">
                    <Label htmlFor="plan">Plan</Label>
                    <Select
                        onValueChange={(val) => {
                            const plan = mockPlans.find(p => p.id === val);
                            if (plan) {
                                setFormData({ ...formData, planId: val, amount: plan.price.toString() });
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona plan" />
                        </SelectTrigger>
                        <SelectContent>
                            {portalPlans.map(p => (
                                <SelectItem key={p.id} value={p.id}>
                                    {p.name} - {p.price}€
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="amount">Importe Venta (€)</Label>
                <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
            </div>

            <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">Registrar Venta</Button>
            </DialogFooter>
        </form>
    );
}
