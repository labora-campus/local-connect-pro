export type LeadStatus = 'nuevo' | 'contactado' | 'seguimiento' | 'cerrado' | 'descartado';

export interface Lead {
  id: string;
  businessName: string;
  contactName: string;
  phone: string;
  email?: string;
  address: string;
  province: string;
  status: LeadStatus;
  portalType: 'agrolocal' | 'servicios' | 'comercio';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portal {
  id: string;
  name: string;
  type: 'agrolocal' | 'servicios' | 'comercio' | 'eventos' | 'profesionales';
  province: string;
  isActive: boolean;
  subscribersCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface KPIData {
  altasRealizadas: number;
  facturacion: number;
  portalesEnProvincia: number;
  leadsNuevos: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  province: string;
  role: 'agent' | 'supervisor' | 'admin';
}
