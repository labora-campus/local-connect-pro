import { useState } from 'react';
import { Lead } from '@/types/crm';
import { currentUser } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, User, Phone, Mail, MapPin, FileText } from 'lucide-react';

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

type FormStep = 'business' | 'contact' | 'details';

export function AddLeadDialog({ open, onOpenChange, onAddLead }: AddLeadDialogProps) {
  const [step, setStep] = useState<FormStep>('business');
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
    portalType: '' as Lead['portalType'] | '',
    notes: '',
  });

  const handleSubmit = () => {
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.portalType) {
      return;
    }

    onAddLead({
      ...formData,
      portalType: formData.portalType as Lead['portalType'],
      province: currentUser.province,
      status: 'nuevo',
    });

    // Reset form
    setFormData({
      businessName: '',
      contactName: '',
      phone: '',
      email: '',
      address: '',
      portalType: '',
      notes: '',
    });
    setStep('business');
    onOpenChange(false);
  };

  const canProceed = () => {
    switch (step) {
      case 'business':
        return formData.businessName.length > 0;
      case 'contact':
        return formData.contactName.length > 0 && formData.phone.length > 0;
      case 'details':
        return formData.portalType !== '';
      default:
        return false;
    }
  };

  const steps = [
    { key: 'business', label: 'Negocio', icon: Building2 },
    { key: 'contact', label: 'Contacto', icon: User },
    { key: 'details', label: 'Detalles', icon: FileText },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Añadir nuevo lead</DialogTitle>
          <DialogDescription>
            Completa los datos del prospecto encontrado
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          {steps.map((s, index) => (
            <div key={s.key} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  index <= currentStepIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <s.icon className="w-4 h-4" />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-1 ${
                    index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="space-y-4 py-4">
          {step === 'business' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-base font-medium">
                  Nombre del negocio *
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="businessName"
                    placeholder="Ej: Panadería El Horno"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'contact' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-base font-medium">
                  Persona de contacto *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="contactName"
                    placeholder="Ej: Antonio López"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">
                  Teléfono *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email (opcional)
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@ejemplo.es"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-medium">
                  Dirección
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="Calle, número, localidad"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="portalType" className="text-base font-medium">
                  Tipo de portal *
                </Label>
                <Select
                  value={formData.portalType}
                  onValueChange={(value) => setFormData({ ...formData, portalType: value as Lead['portalType'] })}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Selecciona el tipo de portal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercio">🏪 Comercio</SelectItem>
                    <SelectItem value="servicios">🔧 Servicios</SelectItem>
                    <SelectItem value="agrolocal">🌾 Agrolocal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-medium">
                  Notas (opcional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Información adicional sobre el prospecto..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="min-h-[80px] text-base"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 'contact') setStep('business');
              else if (step === 'details') setStep('contact');
            }}
            disabled={step === 'business'}
          >
            Anterior
          </Button>
          {step === 'details' ? (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              Guardar lead
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (step === 'business') setStep('contact');
                else if (step === 'contact') setStep('details');
              }}
              disabled={!canProceed()}
            >
              Siguiente
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
