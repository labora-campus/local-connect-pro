# PRD Completo: CRM Operativo Multicentros - Distribuidores y Colaboradores

## 1. Visión del Producto
El **CRM Operativo Multicentros** es una herramienta de gestión interna diseñada para optimizar la actividad comercial del ecosistema **Multicentros Comercial**. Su objetivo principal es dotar a la red de ventas (Distribuidores y Colaboradores) de una interfaz simplificada y móvil para gestionar sus prospectos (leads) y monitorizar el estado de su territorio en tiempo real.

### 1.1 Propósito
Transformar la gestión comercial de un proceso manual o disperso a un flujo digital unificado, permitiendo:
- Visualización inmediata del rendimiento territorial.
- Estandarización del ciclo de vida de los leads.
- Acceso a información clave de los portales activos e inactivos.

## 2. Alcance del Proyecto
El sistema se centra exclusivamente en la **operativa comercial** y **visualización de estado**.
- **INCLUYE:** Dashboard de métricas, Gestión de Leads (CRUD simple), Listado de Portales, y asistentes de IA (opcionales).
- **EXCLUYE:** Funcionalidades de facturación compleja, gestión de usuarios finales (clientes de los comercios), o administración global de la plataforma (rol Central).

## 3. Personas y Roles de Usuario

### 3.1 Central (Administrador)
* **Perfil:** Equipo gestor de Operia/Labora.
* **Responsabilidades:** Configuración global, asignación de territorios, importación masiva de leads.
* **Interacción con el sistema:** Fuente de datos (API/Backend). No es el usuario principal de este frontend.

### 3.2 Distribuidor
* **Perfil:** Responsable comercial de una o más provincias.
* **Necesidades:** Visión macro de su territorio, gestión de su equipo (colaboradores) y seguimiento de leads de alto valor.
* **Funcionalidades Clave:** Dashboard completo, filtrado de leads por estado y provincia.

### 3.3 Colaborador
* **Perfil:** Agente comercial de campo con bajo perfil tecnológico.
* **Necesidades:** Simplicidad absoluta. "Saber a quién llamar hoy y registrar qué pasó".
* **Funcionalidades Clave:** Lista de leads asignados, cambio rápido de estados, visualización de portales "vendibles".

## 4. Requisitos Funcionales

### 4.1 Dashboard (Panel de Control)
**Objetivo:** Ofrecer una "foto" instantánea de la salud del negocio.
* **Métricas Principales:**
    * **Total Suscriptores:** Suma de suscriptores en portales activos.
    * **Portales Activos:** Cantidad de comercios operativos.
    * **Media por Portal:** Indicador de rendimiento promedio.
    * **Por Activar:** Oportunidades pendientes (portales inactivos).
* **Componentes UI:** Tarjetas de resumen (Stats Cards), Gráficos simples (opcional/futuro).

### 4.2 Gestión de Leads (CRM)
**Objetivo:** Administrar el ciclo de vida de los prospectos comerciales.
* **Entidades de Datos (Lead):**
    * ID, Nombre Negocio, Nombre Contacto, Estado, Fecha Creación, Notas.
* **Flujo de Estados:**
    1.  **Nuevo:** Lead importado o creado, sin interacción.
    2.  **Contactado:** Se ha realizado el primer contacto.
    3.  **Seguimiento:** En negociación activa.
    4.  **Cerrado:** Venta exitosa (Alta en el sistema).
    5.  **Descartado:** No interesado o inviable.
* **Funcionalidades:**
    * Crear Lead (Manual).
    * Listar Leads (con búsqueda y filtros).
    * Cambiar Estado (acción rápida).
    * Editar información del Lead.

### 4.3 Portales (Inventario)
**Objetivo:** Mostrar qué activos tiene el distribuidor en su zona.
* **Visualización:** Grid de tarjetas.
* **Información por Portal:** Logo/Imagen, Nombre, Estado (Activo/Inactivo), Nº Suscriptores, Provincia.
* **Separación Visual:** Distinción clara entre "Activos" (generando valor) y "Próximamente/Inactivos" (oportunidad de venta).

### 4.4 Inteligencia Artificial (Asistente)
**Objetivo:** Apoyo en tareas de comunicación.
* **Estado Actual:** Placeholder/Mockup.
* **Funcionalidad Prevista:** Generación de mensajes de introducción ("Cold Opener"), respuestas a objeciones.
* **Restricción:** Activación manual ("Bajo demanda").

## 5. Requisitos No Funcionales (Técnicos & UX)

### 5.1 Diseño y Experiencia de Usuario (UX)
* **Mobile-First:** La interfaz debe ser completamente funcional en pantallas de 375px+ (smartphones).
* **Simplicidad Radical:** Evitar menús anidados profundos. Terminología de negocio ("Colaborador", "Portal") vs técnica.
* **Feedback Inmediato:** Uso de "Toasts" (notificaciones emergentes) para confirmar acciones (ej: "Lead guardado").

### 5.2 Stack Tecnológico
* **Frontend:** React 18+ (Vite).
* **Lenguaje:** TypeScript (Tipado estricto para modelos de datos).
* **Estilos:** Tailwind CSS (Sistema de diseño utilitario).
* **Componentes:** shadcn/ui (basado en Radix UI) para consistencia y accesibilidad.
* **Iconografía:** Lucide React.
* **Enrutamiento:** React Router DOM.

### 5.3 Datos e Integración
* **Fase Actual (Prototipo):** Datos simulados (`mockData`) en el cliente.
* **Fase Futura:** Integración con API REST/Supabase para persistencia de datos y autenticación real.

## 6. Modelo de Datos (Referencia Técnica)

```typescript
// Lead Model
interface Lead {
  id: string;
  businessName: string;
  contactName: string;
  email?: string;
  phone?: string;
  status: 'nuevo' | 'contactado' | 'seguimiento' | 'cerrado' | 'descartado';
  source: 'manual' | 'importado';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

// Portal Model
interface Portal {
  id: string;
  name: string;
  category: string;
  province: string;
  subscribersCount: number;
  isActive: boolean;
  imageUrl?: string;
}
```

## 7. Roadmap de Implementación

1.  **Fase 1: Prototipado (Actual)**
    * Estructura de navegación.
    * Vistas estáticas con datos mock.
    * Interactividad básica (filtros, formularios sin backend).
2.  **Fase 2: Conexión a Backend (Pendiente)**
    * Autenticación de usuarios.
    * CRUD real contra base de datos.
3.  **Fase 3: Funcionalidades Avanzadas**
    * Módulo de IA real.
    * Reportes históricos.
