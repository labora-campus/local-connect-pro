import { Sale, Commission, Service, Plan } from '@/types/crm';

export const mockServices: Service[] = [
    { id: 's1', name: 'Suscripción Básica', type: 'suscripcion', periodicidad: 'recurrente', price: 29.90 },
    { id: 's2', name: 'Suscripción Premium', type: 'suscripcion', periodicidad: 'recurrente', price: 49.90 },
    { id: 's3', name: 'Banner Principal', type: 'publicidad', periodicidad: 'puntual', price: 150.00 },
    { id: 's4', name: 'Patrocinio Evento', type: 'evento', periodicidad: 'puntual', price: 300.00 },
];

export const mockPlans: Plan[] = [
    { id: 'p1', portalId: '1', name: 'Plan Visibilidad', price: 29.90, description: 'Ficha básica + 1 foto' },
    { id: 'p2', portalId: '1', name: 'Plan Destacado', price: 49.90, description: 'Ficha completa, fotos ilimitadas y destacados' },
];

export const mockSales: Sale[] = [
    {
        id: 'v1',
        clientName: 'Panadería El Horno',
        portalId: '1',
        serviceId: 's1',
        planId: 'p1',
        amount: 29.90,
        date: new Date('2024-01-20'),
        status: 'completed',
        commissionStatus: 'pending',
    },
    {
        id: 'v2',
        clientName: 'Restaurante Casa Pepe',
        portalId: '1',
        serviceId: 's2',
        planId: 'p2',
        amount: 49.90,
        date: new Date('2024-01-18'),
        status: 'completed',
        commissionStatus: 'validated',
    },
    {
        id: 'v3',
        clientName: 'Talleres Martínez',
        portalId: '4',
        serviceId: 's3',
        amount: 150.00,
        date: new Date('2024-01-15'),
        status: 'completed',
        commissionStatus: 'liquidated',
    },
];

export const mockCommissions: Commission[] = [
    {
        id: 'c1',
        saleId: 'v1',
        amount: 2.99, // 10%
        percentage: 10,
        status: 'pending',
        date: new Date('2024-01-20'),
    },
    {
        id: 'c2',
        saleId: 'v2',
        amount: 4.99, // 10%
        percentage: 10,
        status: 'validated',
        date: new Date('2024-01-18'),
    },
    {
        id: 'c3',
        saleId: 'v3',
        amount: 22.50, // 15%
        percentage: 15,
        status: 'liquidated',
        date: new Date('2024-01-15'),
    },
];
