import { Lead, Portal, Announcement, KPIData, User } from '@/types/crm';

export const mockUsers = {
  admin: {
    id: 'admin-1',
    name: 'Admin Central',
    email: 'admin@multicentros.es',
    province: 'Central',
    role: 'admin',
  } as User,
  distributor: {
    id: 'dist-1',
    name: 'María García',
    email: 'maria@multicentros.es',
    province: 'Segovia',
    role: 'agent', // Maps to Distributor
  } as User,
  collaborator: {
    id: 'collab-1',
    name: 'Juan Pérez',
    email: 'juan@multicentros.es',
    province: 'Segovia',
    role: 'supervisor', // Using supervisor as Collaborator for now to differentiate
  } as User
};

// Default user for backward compatibility
export const currentUser = mockUsers.distributor;

export const mockKPIs: KPIData = {
  altasRealizadas: 12,
  facturacion: 4850,
  portalesEnProvincia: 5,
  leadsNuevos: 8,
};

export const mockLeads: Lead[] = [
  {
    id: '1',
    businessName: 'Panadería El Horno',
    contactName: 'Antonio López',
    phone: '+34 621 234 567',
    email: 'antonio@elhorno.es',
    address: 'Calle Mayor 15, Segovia',
    province: 'Segovia',
    status: 'nuevo',
    portalType: 'comercio',
    notes: 'Interesado en visibilidad online',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    businessName: 'Fontanería Rápida',
    contactName: 'Carlos Martín',
    phone: '+34 622 345 678',
    address: 'Av. de la Constitución 42, Segovia',
    province: 'Segovia',
    status: 'contactado',
    portalType: 'servicios',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    businessName: 'Granja Los Pinos',
    contactName: 'Pedro Sánchez',
    phone: '+34 623 456 789',
    email: 'pedro@granjapinos.es',
    address: 'Camino Rural 8, Cuéllar',
    province: 'Segovia',
    status: 'seguimiento',
    portalType: 'agrolocal',
    notes: 'Llamar martes por la tarde',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    businessName: 'Taller Mecánico Rueda',
    contactName: 'José Rueda',
    phone: '+34 624 567 890',
    address: 'Polígono Industrial 3, Segovia',
    province: 'Segovia',
    status: 'cerrado',
    portalType: 'servicios',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    businessName: 'Floristería Rosa',
    contactName: 'Ana Flores',
    phone: '+34 625 678 901',
    address: 'Plaza del Azoguejo 5, Segovia',
    province: 'Segovia',
    status: 'descartado',
    portalType: 'comercio',
    notes: 'No interesado por ahora',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
  },
];

export const mockPortals: Portal[] = [
  {
    id: '1',
    name: 'Portal de Comercios Segovia',
    type: 'comercio',
    province: 'Segovia',
    isActive: true,
    subscribersCount: 45,
  },
  {
    id: '2',
    name: 'Agrolocal Segovia',
    type: 'agrolocal',
    province: 'Segovia',
    isActive: true,
    subscribersCount: 28,
  },
  {
    id: '3',
    name: 'Portal de Profesionales',
    type: 'profesionales',
    province: 'Segovia',
    isActive: true,
    subscribersCount: 32,
  },
  {
    id: '4',
    name: 'Servicios Locales',
    type: 'servicios',
    province: 'Segovia',
    isActive: true,
    subscribersCount: 56,
  },
  {
    id: '5',
    name: 'Portal de Eventos',
    type: 'eventos',
    province: 'Segovia',
    isActive: false,
    subscribersCount: 0,
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Nueva campaña de captación',
    content: 'Desde Central lanzamos la campaña "Primavera Digital" con descuentos especiales para nuevas altas.',
    priority: 'high',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '2',
    title: 'Actualización del sistema',
    content: 'El próximo viernes se realizará mantenimiento del sistema entre las 22:00 y las 02:00.',
    priority: 'medium',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '3',
    title: 'Nuevos materiales disponibles',
    content: 'Ya están disponibles los folletos actualizados para la campaña de servicios.',
    priority: 'low',
    createdAt: new Date('2024-01-16'),
  },
];

export const statusConfig = {
  nuevo: { label: 'Nuevo', color: 'status-new', order: 1 },
  contactado: { label: 'Contactado', color: 'status-contacted', order: 2 },
  seguimiento: { label: 'Seguimiento', color: 'status-followup', order: 3 },
  cerrado: { label: 'Cerrado', color: 'status-closed', order: 4 },
  descartado: { label: 'Descartado', color: 'status-discarded', order: 5 },
};

export const portalTypeConfig = {
  agrolocal: { label: 'Agrolocal', icon: '🌾' },
  servicios: { label: 'Servicios', icon: '🔧' },
  comercio: { label: 'Comercio', icon: '🏪' },
  eventos: { label: 'Eventos', icon: '🎉' },
  profesionales: { label: 'Profesionales', icon: '👔' },
};
