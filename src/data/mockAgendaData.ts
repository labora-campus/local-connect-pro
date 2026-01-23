import { CalendarEvent } from '@/types/crm';

export const mockEvents: CalendarEvent[] = [
    // Eventos de Central
    {
        id: 'e1',
        title: 'Lanzamiento Campaña Primavera',
        description: 'Presentación de nuevos materiales y objetivos.',
        start: new Date(new Date().setHours(10, 0, 0, 0)), // Hoy a las 10
        end: new Date(new Date().setHours(11, 30, 0, 0)),
        type: 'central',
        isCentral: true,
    },
    {
        id: 'e2',
        title: 'Formación de Producto: Agrolocal',
        description: 'Webinar obligatorio para distribuidores.',
        start: new Date(new Date().setDate(new Date().getDate() + 2)), // En 2 días
        type: 'central',
        isCentral: true,
    },

    // Tareas Propias
    {
        id: 't1',
        title: 'Llamada seguimiento: Panadería El Horno',
        start: new Date(new Date().setHours(12, 0, 0, 0)), // Hoy a las 12
        type: 'call',
        isCentral: false,
        leadId: '1',
        completed: false,
    },
    {
        id: 't2',
        title: 'Visita presencial: Granja Los Pinos',
        start: new Date(new Date().setHours(16, 0, 0, 0)), // Hoy a las 16
        end: new Date(new Date().setHours(17, 0, 0, 0)),
        type: 'meeting',
        isCentral: false,
        leadId: '3',
        completed: false,
    },
];
