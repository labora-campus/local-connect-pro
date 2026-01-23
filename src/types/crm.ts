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

export interface Service {
  id: string;
  name: string;
  type: 'suscripcion' | 'publicidad' | 'evento' | 'producto' | 'app' | 'otro';
  periodicidad: 'recurrente' | 'puntual';
  price?: number;
}

export interface Plan {
  id: string;
  portalId: string;
  name: string;
  price: number;
  description: string;
}

export interface Sale {
  id: string;
  clientName: string;
  portalId: string;
  serviceId: string;
  planId?: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  commissionStatus: 'pending' | 'validated' | 'liquidated';
}

export interface Commission {
  id: string;
  saleId: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'validated' | 'liquidated';
  date: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  type: 'central' | 'meeting' | 'call' | 'task' | 'followup';
  isCentral: boolean;
  leadId?: string;
  completed?: boolean;
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
