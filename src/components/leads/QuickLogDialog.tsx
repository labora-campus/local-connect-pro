import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Lead } from '@/types/crm';
import { toast } from 'sonner';

interface QuickLogDialogProps {
    lead: Lead | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actionType: 'call' | 'whatsapp' | null;
    onLog: (leadId: string, type: 'call' | 'whatsapp', result: string, notes: string) => void;
}

export function QuickLogDialog({
    lead,
    open,
    onOpenChange,
    actionType,
    onLog
}: QuickLogDialogProps) {
    const [result, setResult] = useState<string>('contactado');
    const [notes, setNotes] = useState('');

    if (!lead) return null;

    const handleSubmit = () => {
        if (actionType) {
            onLog(lead.id, actionType, result, notes);
            toast.success('Interacción registrada', {
                description: `Se ha guardado el registro de ${actionType === 'call' ? 'llamada' : 'WhatsApp'}`,
            });
            onOpenChange(false);
            setNotes('');
            setResult('contactado');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Registrar {actionType === 'call' ? 'Llamada' : 'WhatsApp'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-3">
                        <Label>Resultado</Label>
                        <RadioGroup value={result} onValueChange={setResult}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="contactado" id="r1" />
                                <Label htmlFor="r1">Contactado con éxito</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no_contesta" id="r2" />
                                <Label htmlFor="r2">No contesta / Buzón</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="interesado" id="r3" />
                                <Label htmlFor="r3">Muy interesado (Agendar)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="rechazado" id="r4" />
                                <Label htmlFor="r4">No interesado</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>Notas rápidas (opcional)</Label>
                        <Textarea
                            placeholder="Ej: Quiere que le llame el martes..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="resize-none"
                        />
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        Guardar registro
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
