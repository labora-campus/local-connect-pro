import { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lead } from '@/types/crm';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface AIMessageDialogProps {
    lead: Lead | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const templates: Record<string, string[]> = {
    comercio: [
        "Hola [CONTACTO], he visto [NEGOCIO] y creo que tienen un potencial enorme en Segovia. Estamos lanzando una campaña para comercios locales y me encantaría contarte cómo podemos atraer más clientes a tu tienda.",
        "¿Qué tal [CONTACTO]? Soy María de Multicentros. Me gustaría proponerte una colaboración para dar más visibilidad a [NEGOCIO] entre los vecinos de la zona.",
    ],
    servicios: [
        "Hola [CONTACTO], he notado que [NEGOCIO] ofrece un servicio excelente. Me gustaría presentarte nuestra plataforma para profesionales, donde conectamos expertos como tú con clientes locales.",
        "Buenos días [CONTACTO]. Muchos vecinos buscan servicios como el tuyo en [NEGOCIO]. ¿Tienes 5 minutos para ver cómo podemos ayudarte a captar esos clientes?",
    ],
    agrolocal: [
        "Hola [CONTACTO], en Multicentros estamos apostando fuerte por el producto local. Me encantaría que [NEGOCIO] formara parte de nuestra red de productores de Segovia.",
    ],
    default: [
        "Hola [CONTACTO], me gustaría hablar contigo sobre cómo podemos ayudar a [NEGOCIO] a crecer en su zona.",
    ],
};

export function AIMessageDialog({ lead, open, onOpenChange }: AIMessageDialogProps) {
    const [generatedText, setGeneratedText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const fullTextRef = useRef('');
    const indexRef = useRef(0);

    useEffect(() => {
        if (open && lead) {
            generateMessage();
        } else {
            resetState();
        }
    }, [open, lead]);

    const resetState = () => {
        setGeneratedText('');
        setIsGenerating(false);
        setIsDone(false);
        setHasCopied(false);
        indexRef.current = 0;
    };

    const generateMessage = () => {
        resetState();
        if (!lead) return;

        setIsGenerating(true);

        // Select template
        const leadTemplates = templates[lead.portalType] || templates.default;
        const template = leadTemplates[Math.floor(Math.random() * leadTemplates.length)];

        // Personalize
        fullTextRef.current = template
            .replace('[CONTACTO]', lead.contactName.split(' ')[0])
            .replace('[NEGOCIO]', lead.businessName);

        // Start typing effect
        const intervalId = setInterval(() => {
            if (indexRef.current < fullTextRef.current.length) {
                setGeneratedText((prev) => prev + fullTextRef.current.charAt(indexRef.current));
                indexRef.current++;
            } else {
                clearInterval(intervalId);
                setIsGenerating(false);
                setIsDone(true);
            }
        }, 30); // Typing speed

        return () => clearInterval(intervalId);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        setHasCopied(true);
        toast.success('Mensaje copiado al portapapeles');
        setTimeout(() => setHasCopied(false), 2000);
    };

    if (!lead) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        Asistente de Ventas IA
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-muted/30 p-4 rounded-xl border border-border/50 min-h-[150px] relative">
                        {generatedText ? (
                            <p className="text-base leading-relaxed whitespace-pre-wrap animate-fade-in">
                                {generatedText}
                                {isGenerating && (
                                    <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse align-middle" />
                                )}
                            </p>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm italic">
                                Pensando el mejor mensaje...
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        {isDone && (
                            <>
                                <Button variant="outline" size="sm" onClick={generateMessage} className="gap-2">
                                    <RefreshCw className="w-4 h-4" />
                                    Regenerar
                                </Button>
                                <Button size="sm" onClick={handleCopy} className="gap-2">
                                    {hasCopied ? (
                                        <>
                                            <Check className="w-4 h-4" /> Copiado
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" /> Copiar texto
                                        </>
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
