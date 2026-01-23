# PRD: CRM Operativo Multicentros Comercial

**Versión:** 2.0  
**Fecha:** 21 de enero de 2026  
**Autor:** Operia  
**Estado:** Borrador para validación  

---

## Aviso importante

Este PRD contiene **suposiciones pendientes de validación** marcadas con el indicador:

> ⚠️ **SUPUESTO**

Estas secciones requieren confirmación con Multicentros Central antes de comenzar desarrollo. Los cambios en estos puntos pueden afectar significativamente la arquitectura, el alcance y el presupuesto.

---

## 1. Resumen ejecutivo

### 1.1 Producto

CRM Operativo interno para la red comercial de Multicentros (distribuidores y colaboradores). Funciona como "oficina virtual diaria" donde los usuarios gestionan leads, visualizan comisiones y ejecutan acciones comerciales.

### 1.2 Problema que resuelve

| Problema actual | Impacto | Solución CRM |
|-----------------|---------|--------------|
| Leads sin seguimiento sistemático | Pérdida de oportunidades | Pipeline con alertas y acciones obligatorias |
| Sin visibilidad de comisiones en tiempo real | Desmotivación, falta de foco | Dashboard económico con desglose por fuente |
| Central sin visión de territorio | Decisiones sin datos | Panel admin con métricas por provincia |
| Herramientas dispersas o inexistentes | Ineficiencia operativa | Sistema unificado de gestión |

### 1.3 Usuarios objetivo

- **Distribuidores:** ~15-20 usuarios con territorio amplio (múltiples provincias/portales)
- **Colaboradores:** ~10-15 usuarios con alcance limitado (algunos portales)
- **Admin Central:** 2-3 usuarios de gestión

### 1.4 Métricas de éxito

| Métrica | Objetivo | Plazo |
|---------|----------|-------|
| Adopción diaria | >80% usuarios activos/día | 3 meses post-lanzamiento |
| Tiempo contacto lead central | <24 horas | 2 meses post-lanzamiento |
| Leads con seguimiento completo | >90% | 3 meses post-lanzamiento |
| Visibilidad comisiones | 100% transacciones reflejadas | Lanzamiento MVP |

---

## 2. Alcance del producto

### 2.1 Incluido en MVP

| Módulo | Funcionalidad |
|--------|---------------|
| **Dashboard** | Resumen mensual, "qué hacer hoy", fuentes de ingreso, avisos central |
| **Leads** | Gestión leads propios + central, estados, acciones rápidas, notas |
| **Ventas** | Registro manual de altas/ventas comisionables |
| **Comisiones** | Cálculo automático, estados (pendiente/validada/liquidada), histórico |
| **Agenda** | Eventos de central (solo lectura), tareas propias básicas |
| **Admin** | Gestión usuarios, portales, servicios, comisiones, eventos |

### 2.2 Excluido de MVP (fases posteriores)

- Integración automática con sistemas de central (API)
- Integración Google Calendar
- IA copiloto / agente WhatsApp
- Proyecciones avanzadas
- BI / reportes complejos
- Sistema de pagos/facturación

### 2.3 Fuera de alcance permanente

- ERP
- Facturación contable
- Automatizaciones complejas sin validación previa
- Personalización por usuario

---

## 3. Arquitectura funcional

### 3.1 Diagrama de módulos

```
┌─────────────────────────────────────────────────────────────────┐
│                        CRM MULTICENTROS                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  DASHBOARD  │  │    LEADS    │  │   VENTAS    │             │
│  │             │  │             │  │             │             │
│  │ - Resumen   │  │ - Central   │  │ - Registro  │             │
│  │ - Acciones  │  │ - Propios   │  │ - Validación│             │
│  │ - Ingresos  │  │ - Pipeline  │  │ - Histórico │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ COMISIONES  │  │   AGENDA    │  │  PORTALES   │             │
│  │             │  │             │  │             │
│  │ - Cálculo   │  │ - Central   │  │ - Catálogo  │             │
│  │ - Estados   │  │ - Personal  │  │ - Servicios │             │
│  │ - Desglose  │  │ - Citas     │  │ - Planes    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                      PANEL ADMIN (CENTRAL)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Usuarios │ │ Portales │ │Comisiones│ │ Métricas │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Flujo principal de datos

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    LEAD      │────▶│    VENTA     │────▶│  COMISIÓN    │
│              │     │              │     │              │
│ - Captación  │     │ - Registro   │     │ - Cálculo    │
│ - Gestión    │     │ - Importe    │     │ - Validación │
│ - Cierre     │     │ - Servicio   │     │ - Liquidación│
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 4. Modelo de datos

### 4.1 Entidades principales

#### USUARIOS

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| email | String | Sí | Email (login) |
| nombre | String | Sí | Nombre completo |
| tipo | Enum | Sí | distribuidor, colaborador, admin |
| telefono | String | No | Teléfono contacto |
| activo | Boolean | Sí | Estado del usuario |
| created_at | Timestamp | Sí | Fecha alta |

#### PROVINCIAS_USUARIO (asignación territorial)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| usuario_id | FK | Sí | Referencia a usuario |
| provincia_codigo | String | Sí | Código provincia (01-52) |

> ⚠️ **SUPUESTO:** Un usuario puede tener múltiples provincias asignadas. No hay solapamiento (una provincia = un usuario). Pendiente confirmar con central.

#### PORTALES

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| nombre | String | Sí | Nombre del portal |
| descripcion | String | No | Descripción breve |
| url | String | No | URL del portal |
| estado | Enum | Sí | borrador, activo, inactivo |
| created_at | Timestamp | Sí | Fecha creación |

#### PORTALES_USUARIO (asignación de portales)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| usuario_id | FK | Sí | Referencia a usuario |
| portal_id | FK | Sí | Referencia a portal |

#### SERVICIOS

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| nombre | String | Sí | Nombre del servicio |
| tipo | Enum | Sí | suscripcion, publicidad, evento, producto, app, otro |
| portal_id | FK | No | Portal asociado (null = transversal) |
| periodicidad | Enum | Sí | recurrente, puntual |
| activo | Boolean | Sí | Estado |
| created_at | Timestamp | Sí | Fecha creación |

#### PLANES (por portal)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| portal_id | FK | Sí | Portal al que pertenece |
| nombre | String | Sí | Nombre del plan (básico, premium, etc.) |
| precio | Decimal | No | Precio (opcional en MVP) |
| descripcion | String | No | Prestaciones |
| activo | Boolean | Sí | Estado |

#### REGLAS_COMISION

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| servicio_id | FK | No | Servicio aplicable (null = todos) |
| plan_id | FK | No | Plan aplicable (null = todos) |
| portal_id | FK | No | Portal aplicable (null = todos) |
| tipo_comision | Enum | Sí | compartida, solo_distribuidor |
| porcentaje_distribuidor | Decimal | Sí | % para distribuidor |
| porcentaje_colaborador | Decimal | No | % para colaborador (si compartida) |
| activo | Boolean | Sí | Estado |
| prioridad | Integer | Sí | Para resolver conflictos (mayor = más específico) |

> ⚠️ **SUPUESTO:** Las comisiones se aplican por jerarquía: Plan > Servicio > Portal > General. Pendiente validar tabla real de comisiones.

#### LEADS

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| origen | Enum | Sí | central, propio |
| campaña_id | FK | No | Campaña de origen (si aplica) |
| nombre_contacto | String | Sí | Nombre del contacto |
| empresa | String | No | Nombre empresa |
| email | String | No | Email contacto |
| telefono | String | No | Teléfono contacto |
| provincia_codigo | String | Sí | Provincia del lead |
| usuario_id | FK | Sí | Usuario asignado |
| portal_id | FK | No | Portal de interés |
| estado | Enum | Sí | nuevo, contactado, seguimiento, cerrado_ganado, cerrado_perdido |
| proxima_accion | String | No | Descripción próxima acción |
| fecha_proxima_accion | Date | No | Fecha próxima acción |
| created_at | Timestamp | Sí | Fecha entrada |
| updated_at | Timestamp | Sí | Última actualización |
| fecha_primer_contacto | Timestamp | No | Cuándo se contactó por primera vez |

> ⚠️ **SUPUESTO:** Los leads de central llegan con: nombre, empresa, teléfono, email, provincia, portal de interés. Pendiente confirmar campos reales.

#### NOTAS_LEAD

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| lead_id | FK | Sí | Lead asociado |
| usuario_id | FK | Sí | Autor de la nota |
| texto | Text | Sí | Contenido |
| created_at | Timestamp | Sí | Fecha creación |

#### VENTAS

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| lead_id | FK | No | Lead de origen (si aplica) |
| cliente_nombre | String | Sí | Nombre cliente/empresa |
| cliente_nif | String | No | NIF/CIF |
| portal_id | FK | Sí | Portal de la venta |
| servicio_id | FK | Sí | Servicio vendido |
| plan_id | FK | No | Plan (si aplica) |
| importe | Decimal | Sí | Importe de la venta |
| fecha_venta | Date | Sí | Fecha de la venta |
| usuario_captacion_id | FK | Sí | Usuario que captó |
| usuario_colaborador_id | FK | No | Colaborador (si comisión compartida) |
| created_at | Timestamp | Sí | Fecha registro |

> ⚠️ **SUPUESTO:** En MVP las ventas se registran manualmente. Pendiente definir flujo de integración con sistemas de pago.

#### COMISIONES

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| venta_id | FK | Sí | Venta que genera la comisión |
| usuario_id | FK | Sí | Usuario comisionado |
| tipo | Enum | Sí | distribuidor, colaborador |
| porcentaje_aplicado | Decimal | Sí | % aplicado |
| importe | Decimal | Sí | Importe calculado |
| estado | Enum | Sí | pendiente, validada, liquidada |
| fecha_validacion | Date | No | Cuándo se validó |
| fecha_liquidacion | Date | No | Cuándo se liquidó |
| validado_por | FK | No | Admin que validó |
| created_at | Timestamp | Sí | Fecha cálculo |

#### EVENTOS_CENTRAL

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| nombre | String | Sí | Nombre del evento |
| tipo | Enum | Sí | feria_virtual, mercado_presencial, campaña, accion_especial |
| descripcion | Text | No | Descripción |
| fecha_inicio | Date | Sí | Inicio |
| fecha_fin | Date | Sí | Fin |
| servicio_id | FK | No | Servicio comisionable asociado |
| activo | Boolean | Sí | Estado |
| created_at | Timestamp | Sí | Fecha creación |

#### EVENTOS_PROVINCIAS (alcance territorial del evento)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| evento_id | FK | Sí | Evento |
| provincia_codigo | String | Sí | Provincia donde aplica |

#### CAMPAÑAS

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| nombre | String | Sí | Nombre de la campaña |
| tipo | Enum | Sí | email, redes_sociales, otro |
| fecha_inicio | Date | Sí | Inicio |
| fecha_fin | Date | No | Fin |
| descripcion | Text | No | Descripción |
| activo | Boolean | Sí | Estado |
| created_at | Timestamp | Sí | Fecha creación |

#### TAREAS_AGENDA

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| id | UUID | Sí | Identificador único |
| usuario_id | FK | Sí | Usuario propietario |
| lead_id | FK | No | Lead asociado (opcional) |
| tipo | Enum | Sí | llamada, reunion, seguimiento, tarea |
| titulo | String | Sí | Título |
| descripcion | Text | No | Descripción |
| fecha | Datetime | Sí | Fecha/hora |
| duracion_minutos | Integer | No | Duración |
| completada | Boolean | Sí | Estado |
| created_at | Timestamp | Sí | Fecha creación |

### 4.2 Diagrama de relaciones

```
USUARIOS ─────────┬───────────────────────────────────────────────┐
    │             │                                               │
    │ 1:N         │ 1:N                                           │ 1:N
    ▼             ▼                                               ▼
PROVINCIAS    PORTALES_                                       TAREAS_
_USUARIO      USUARIO                                         AGENDA
                  │                                               │
                  │                                               │
PORTALES ◄────────┴───────────────────┐                           │
    │                                 │                           │
    │ 1:N                             │                           │
    ▼                                 │                           │
PLANES ────────────────────┐          │                           │
    │                      │          │                           │
    │                      │          │                           │
SERVICIOS ◄────────────────┼──────────┤                           │
    │                      │          │                           │
    │                      │          │                           │
    ▼                      ▼          ▼                           │
REGLAS_COMISION ◄──────────┴──────────┘                           │
                                                                  │
CAMPAÑAS ─────────┐                                               │
    │             │                                               │
    │ 1:N         │                                               │
    ▼             │                                               │
LEADS ◄───────────┴───────────────────────────────────────────────┤
    │                                                             │
    │ 1:N                        1:N                              │
    ▼                            │                                │
NOTAS_LEAD                       │                                │
                                 │                                │
VENTAS ◄─────────────────────────┘                                │
    │                                                             │
    │ 1:N                                                         │
    ▼                                                             │
COMISIONES                                                        │
                                                                  │
EVENTOS_CENTRAL ──────────┐                                       │
    │                     │                                       │
    │ 1:N                 │                                       │
    ▼                     │                                       │
EVENTOS_PROVINCIAS        │                                       │
                          │                                       │
                          └───────────────────────────────────────┘
```

---

## 5. Especificaciones funcionales

### 5.1 Dashboard (usuario)

#### Propósito
Página principal que responde a: "¿Cómo va mi negocio?" y "¿Qué hago hoy?"

#### Bloques obligatorios

**Bloque 1: Resumen del mes**
- Ventas/altas del mes actual (cantidad)
- Comisión acumulada del mes (€)
- Comparativa vs mes anterior (si hay datos): +X% / -X%

**Bloque 2: Objetivos del mes**
- Objetivo definido por central (operativo o económico)
- Barra de progreso
- Pendiente para cumplir

> ⚠️ **SUPUESTO:** Central define objetivos mensuales por usuario o globales. Pendiente confirmar estructura de objetivos.

**Bloque 3: Qué hacer hoy (lista accionable)**
- Leads de central sin contactar (>24h)
- Seguimientos vencidos
- Tareas/reuniones de hoy
- Cada ítem con acción directa (llamar, ver, completar)

**Bloque 4: Fuentes de ingreso**
- Gráfico o tabla con desglose de comisiones por:
  - Portal
  - Tipo de servicio (suscripción/publicidad/evento/producto)

**Bloque 5: Avisos de central**
- Campañas activas (con enlace a leads de campaña)
- Eventos activos (con información e impacto)
- Materiales/comunicaciones

**Bloque 6: Actividad reciente**
- Últimos 10 cambios: cierres, cambios de estado, reuniones realizadas

#### Reglas de negocio

| Regla | Descripción |
|-------|-------------|
| SLA leads central | Alerta si lead central >24h sin contactar |
| Seguimiento vencido | Fecha próxima acción < hoy y estado = seguimiento |
| Cálculo comisión mes | Suma comisiones con fecha_venta en mes actual |

> ⚠️ **SUPUESTO:** SLA de 24 horas para contactar leads de central. Pendiente confirmar con central.

---

### 5.2 Gestión de Leads

#### Listado de leads

**Filtros obligatorios:**
- Origen: Central / Propios / Todos
- Estado: Nuevo / Contactado / Seguimiento / Cerrado / Descartado
- Portal de interés
- Fecha entrada (rango)

**Ordenación por defecto:** Fecha entrada descendente

**Columnas visibles:**
- Nombre contacto / Empresa
- Teléfono
- Portal interés
- Estado
- Próxima acción
- Días sin actividad

#### Estados del lead

```
┌─────────┐     ┌────────────┐     ┌─────────────┐
│  NUEVO  │────▶│ CONTACTADO │────▶│ SEGUIMIENTO │
└─────────┘     └────────────┘     └─────────────┘
                     │                    │
                     │                    │
                     ▼                    ▼
              ┌─────────────┐     ┌──────────────────┐
              │ DESCARTADO  │     │  CERRADO_GANADO  │
              └─────────────┘     └──────────────────┘
                     ▲                    │
                     │                    │
                     └────────────────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ CERRADO_PERDIDO  │
                     └──────────────────┘
```

**Transiciones válidas:**

| Desde | Hacia | Condición |
|-------|-------|-----------|
| Nuevo | Contactado | Usuario registra primer contacto |
| Nuevo | Descartado | Datos inválidos/duplicado |
| Contactado | Seguimiento | Se agenda próxima acción |
| Contactado | Cerrado_ganado | Venta realizada |
| Contactado | Cerrado_perdido | Cliente rechaza |
| Contactado | Descartado | No cualifica |
| Seguimiento | Cerrado_ganado | Venta realizada |
| Seguimiento | Cerrado_perdido | Cliente rechaza |
| Seguimiento | Descartado | No cualifica |

**No permitido:**
- Volver de Cerrado/Descartado a estados anteriores
- Saltar de Nuevo a Cerrado directamente

#### Acciones rápidas

| Acción | Comportamiento |
|--------|----------------|
| Llamar | Abre marcador con teléfono (tel:) |
| WhatsApp | Abre WhatsApp Web/App con número |
| Programar seguimiento | Modal: fecha + descripción → crea tarea |
| Agendar reunión | Modal: fecha/hora + duración → crea tarea tipo reunión |
| Añadir nota | Modal: texto libre → guarda nota |

#### Creación de lead propio

**Campos obligatorios:**
- Nombre contacto
- Teléfono O email (al menos uno)
- Provincia

**Campos opcionales:**
- Empresa
- Portal de interés
- Notas iniciales

#### Detalle del lead

Vista con:
- Datos del contacto (editables)
- Timeline de actividad (notas, cambios de estado, tareas)
- Próxima acción programada
- Botones de acción rápida
- Si cerrado_ganado: enlace a venta asociada

---

### 5.3 Registro de Ventas

#### Propósito
Registrar altas/ventas comisionables para calcular comisiones.

#### Flujo de registro

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  FORMULARIO     │────▶│  CÁLCULO AUTO   │────▶│   COMISIÓN      │
│  VENTA          │     │  COMISIÓN       │     │   PENDIENTE     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

#### Campos del formulario

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Lead origen | Selector | No | Si viene de lead gestionado |
| Cliente nombre | Texto | Sí | Nombre o empresa |
| Cliente NIF | Texto | No | NIF/CIF |
| Portal | Selector | Sí | Portal de la venta |
| Servicio | Selector | Sí | Servicio vendido (filtrado por portal) |
| Plan | Selector | Condicional | Si el servicio tiene planes |
| Importe | Número | Sí | Importe en € |
| Fecha venta | Fecha | Sí | Fecha de la transacción |

#### Cálculo automático de comisión

Al guardar:
1. Sistema busca regla de comisión aplicable (por prioridad)
2. Calcula importe comisión según porcentaje
3. Crea registro(s) de comisión en estado "pendiente"
4. Si comisión compartida y hay colaborador: crea dos registros

#### Listado de ventas

**Filtros:**
- Periodo (mes/trimestre/año/rango)
- Portal
- Estado comisión

**Columnas:**
- Fecha
- Cliente
- Portal / Servicio
- Importe venta
- Comisión calculada
- Estado comisión

---

### 5.4 Comisiones

#### Vista usuario

**Resumen:**
- Comisiones pendientes (registradas, no validadas)
- Comisiones validadas (aprobadas, pendientes de pago)
- Comisiones liquidadas (pagadas)
- Total del periodo seleccionado

**Desglose:**
- Por portal
- Por tipo de servicio
- Por mes (histórico)

**Detalle por comisión:**
- Venta asociada
- Porcentaje aplicado
- Importe
- Estado
- Fechas (registro, validación, liquidación)

#### Estados de comisión

```
┌───────────┐     ┌───────────┐     ┌────────────┐
│ PENDIENTE │────▶│ VALIDADA  │────▶│ LIQUIDADA  │
└───────────┘     └───────────┘     └────────────┘
      │                                    
      ▼                                    
┌───────────┐                              
│ RECHAZADA │                              
└───────────┘                              
```

> ⚠️ **SUPUESTO:** La validación es manual por admin. Pendiente confirmar si hay reglas automáticas o proceso de disputa.

---

### 5.5 Agenda

#### Tipos de eventos

| Tipo | Origen | Editable por usuario |
|------|--------|---------------------|
| Evento central | Admin crea | No (solo lectura) |
| Tarea | Usuario crea | Sí |
| Reunión | Usuario crea | Sí |
| Llamada | Usuario crea | Sí |
| Seguimiento | Generado desde lead | Sí |

#### Vistas

- **Día:** Lista de eventos del día
- **Semana:** Vista calendario 7 días
- **Mes:** Vista calendario mensual

#### Creación de evento personal

**Campos:**
- Tipo (llamada/reunión/tarea/seguimiento)
- Título
- Fecha y hora
- Duración (para reuniones)
- Lead asociado (opcional)
- Descripción

#### Eventos de central

Aparecen automáticamente según:
- Provincias del usuario
- Portales asignados

Solo lectura, con información del evento y materiales si aplica.

---

### 5.6 Portales y Servicios (vista usuario)

#### Propósito
Ver portales asignados y su rendimiento.

#### Información por portal

- Nombre y descripción
- Servicios disponibles
- Planes (si existen)
- Métricas del periodo:
  - Ventas realizadas
  - Importe total
  - Comisión generada

---

## 6. Panel de Administración

### 6.1 Gestión de Usuarios

**CRUD completo:**
- Alta de usuario (tipo, email, nombre, teléfono)
- Asignación de provincias
- Asignación de portales
- Activar/desactivar

**Listado:**
- Filtro por tipo (distribuidor/colaborador)
- Filtro por estado (activo/inactivo)
- Búsqueda por nombre/email

### 6.2 Gestión de Portales

**CRUD completo:**
- Nombre, descripción, URL
- Estado (borrador/activo/inactivo)
- Gestión de planes asociados

**Estados:**
- Borrador: no visible para usuarios
- Activo: disponible para asignación y ventas
- Inactivo: histórico conservado, no disponible para nuevas operaciones

### 6.3 Gestión de Servicios

**CRUD completo:**
- Nombre
- Tipo (suscripción/publicidad/evento/producto/app/otro)
- Portal asociado (o transversal)
- Periodicidad (recurrente/puntual)
- Estado activo/inactivo

### 6.4 Configuración de Comisiones

**Interfaz:**
- Crear regla de comisión
- Seleccionar ámbito (portal/servicio/plan o combinación)
- Definir tipo (compartida/solo distribuidor)
- Definir porcentajes
- Establecer prioridad

**Validaciones:**
- No permitir reglas conflictivas sin prioridad clara
- Mostrar preview de cálculo antes de guardar

### 6.5 Gestión de Eventos

**CRUD completo:**
- Nombre, tipo, descripción
- Fechas inicio/fin
- Provincias aplicables (multiselect)
- Servicio comisionable asociado (opcional)

### 6.6 Gestión de Campañas

**CRUD completo:**
- Nombre, tipo, descripción
- Fechas
- Estado activo/inactivo

**Funcionalidad adicional:**
- Ver leads asociados a campaña
- Métricas de campaña (leads, conversión)

### 6.7 Validación de Comisiones

**Listado:**
- Comisiones pendientes de validación
- Filtro por usuario, periodo, portal

**Acciones:**
- Validar (individual o masivo)
- Rechazar (con motivo)
- Marcar como liquidada

### 6.8 Métricas y Reporting

**Dashboard admin:**
- Leads por provincia (recibidos, trabajados, convertidos)
- Ventas por provincia
- Comisiones por usuario
- Comparativa entre provincias/usuarios

**Exportación:**
- CSV de leads
- CSV de ventas
- CSV de comisiones

> ⚠️ **SUPUESTO:** Las 5 métricas prioritarias son: leads recibidos, leads convertidos, ventas totales, comisiones generadas, tiempo medio de contacto. Pendiente confirmar con central.

---

## 7. Reglas de Negocio

### 7.1 Asignación de leads de central

```
IF lead.provincia IN usuario.provincias 
   AND lead.portal IN usuario.portales (o usuario tiene todos)
THEN asignar a usuario
ELSE marcar como sin asignar (alerta admin)
```

> ⚠️ **SUPUESTO:** No hay solapamiento de territorios. Si hubiera conflicto, se asigna al distribuidor (no colaborador). Pendiente confirmar.

### 7.2 Cálculo de comisiones

```
1. Buscar reglas donde:
   - regla.portal_id = venta.portal_id OR regla.portal_id IS NULL
   - regla.servicio_id = venta.servicio_id OR regla.servicio_id IS NULL
   - regla.plan_id = venta.plan_id OR regla.plan_id IS NULL

2. Ordenar por prioridad DESC

3. Tomar primera regla

4. Calcular:
   - comision_distribuidor = venta.importe * regla.porcentaje_distribuidor / 100
   - IF regla.tipo = 'compartida' AND venta.usuario_colaborador_id EXISTS:
       comision_colaborador = venta.importe * regla.porcentaje_colaborador / 100
```

### 7.3 Alertas automáticas

| Condición | Alerta | Destinatario |
|-----------|--------|--------------|
| Lead central >24h sin contactar | "Lead pendiente de contacto" | Usuario asignado |
| Seguimiento vencido | "Seguimiento vencido" | Usuario asignado |
| Comisión pendiente >7 días | "Comisiones pendientes de validar" | Admin |

---

## 8. Requisitos no funcionales

### 8.1 Rendimiento

| Métrica | Objetivo |
|---------|----------|
| Tiempo carga dashboard | <2 segundos |
| Tiempo carga listados | <1 segundo (hasta 100 registros) |
| Tiempo registro venta | <3 segundos (incluyendo cálculo comisión) |

### 8.2 Disponibilidad

- Uptime objetivo: 99.5%
- Ventana mantenimiento: domingos 02:00-06:00

### 8.3 Seguridad

- Autenticación: email + contraseña (mínimo 8 caracteres)
- Sesiones: expiración 24 horas de inactividad
- HTTPS obligatorio
- Logs de acceso y acciones críticas

### 8.4 Compatibilidad

| Dispositivo | Navegadores |
|-------------|-------------|
| Desktop | Chrome, Firefox, Edge (últimas 2 versiones) |
| Móvil | Chrome Android, Safari iOS |
| Tablet | Chrome, Safari |

**Requisito crítico:** Diseño mobile-first. El 60%+ de usuarios accederá desde móvil.

### 8.5 UX (perfil usuario)

- Botones de acción: mínimo 44x44px
- Textos: lenguaje llano, sin tecnicismos
- Flujos: máximo 3 clics para acciones frecuentes
- Campos obligatorios: mínimos imprescindibles
- Feedback: confirmación visual de acciones

---

## 9. Integraciones

### 9.1 MVP (sin integraciones externas)

| Función | Solución MVP |
|---------|--------------|
| Entrada de leads central | Importación CSV manual o formulario admin |
| Registro de ventas | Formulario manual en CRM |
| Calendario | Agenda interna básica |

### 9.2 Fase 2 (integraciones planificadas)

| Sistema | Tipo | Prioridad |
|---------|------|-----------|
| Sistemas de pago Multicentros | API/Webhook | Alta |
| Google Calendar | OAuth | Media |
| WhatsApp Business | API | Baja |

> ⚠️ **SUPUESTO:** Los sistemas de central tienen API disponible. Pendiente confirmar existencia y documentación.

---

## 10. Plan de fases

### Fase 1: MVP (8-12 semanas estimadas)

**Semanas 1-2: Setup y modelo de datos**
- Arquitectura técnica
- Base de datos
- Autenticación

**Semanas 3-5: Core usuario**
- Dashboard básico
- Gestión de leads
- Registro de ventas
- Cálculo de comisiones

**Semanas 6-8: Admin básico**
- Gestión usuarios
- Gestión portales/servicios
- Configuración comisiones
- Validación comisiones

**Semanas 9-10: Agenda y pulido**
- Agenda básica
- Eventos de central
- UX móvil
- Testing

**Semanas 11-12: Despliegue**
- Carga datos iniciales
- Formación usuarios
- Go-live

### Fase 2 (post-MVP)

- Integración sistemas de pago
- Google Calendar
- Reportes avanzados
- Proyecciones

### Fase 3 (futuro)

- IA copiloto
- Agente WhatsApp
- Automatizaciones

---

## 11. Datos iniciales requeridos

Para el lanzamiento del MVP se necesita:

| Dato | Fuente | Formato |
|------|--------|---------|
| Lista de usuarios (distribuidores/colaboradores) | Central | Excel: nombre, email, teléfono, tipo |
| Matriz de asignaciones | Central | Excel: usuario → provincias → portales |
| Catálogo de portales | Central | Excel: nombre, URL, estado |
| Catálogo de servicios por portal | Central | Excel: nombre, tipo, portal |
| Planes por portal (si existen) | Central | Excel: portal, plan, precio |
| Tabla de comisiones | Central | Excel: ámbito, tipo, porcentajes |
| Leads históricos (opcional) | Central | CSV con campos definidos |

---

## 12. Riesgos identificados

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Datos de central incompletos | Alta | Alto | Definir mínimos viables, aceptar entrada manual inicial |
| Adopción baja por usuarios | Media | Alto | UX extremadamente simple, formación, soporte inicial |
| Cambios en modelo de comisiones | Media | Medio | Diseño flexible con reglas configurables |
| Integraciones no disponibles | Alta | Medio | MVP sin dependencias externas |
| Resistencia al cambio | Media | Medio | Involucrar usuarios clave en validación |

---

## 13. Suposiciones pendientes de validación

| ID | Suposición | Impacto si cambia | Estado |
|----|------------|-------------------|--------|
| S01 | Un usuario puede tener múltiples provincias | Modelo de datos | Pendiente |
| S02 | No hay solapamiento de territorios | Lógica de asignación | Pendiente |
| S03 | Leads central llegan con: nombre, empresa, teléfono, email, provincia, portal | Formulario importación | Pendiente |
| S04 | SLA de contacto: 24 horas | Alertas y métricas | Pendiente |
| S05 | Comisiones se validan manualmente | Flujo de comisiones | Pendiente |
| S06 | Las 5 métricas prioritarias son las listadas | Dashboard admin | Pendiente |
| S07 | Sistemas de central tienen API disponible | Integraciones fase 2 | Pendiente |
| S08 | Ventas se registran manualmente en MVP | Flujo de ventas | Confirmado |
| S09 | 20-30 usuarios totales | Arquitectura | Confirmado |
| S10 | Colaborador puede operar independiente en algunos portales | Permisos | Confirmado |

---

## 14. Aprobaciones

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| Product Owner (Operia) | | | |
| Responsable Multicentros | | | |
| Lead Desarrollo | | | |

---

## Anexo A: Portales iniciales

| Portal | Estado previsto |
|--------|-----------------|
| Multicentros Comercial | Activo |
| Multicentro Servicios | Activo |
| TodoTiendas | Activo |
| TodoPaginas | Activo |
| AgroLocal | Activo |
| Inmovivir | Activo |
| Portal de Automoción | Borrador |
| Multicentros Eventos | Activo |
| Portal de Franquicias | Activo |
| Pixalo | Borrador |
| Portal de vídeo/streaming | Borrador |
| Social y Negocios | Borrador |

---

## Anexo B: Provincias (códigos)

Usar códigos INE estándar (01-52):
- 01: Álava
- 02: Albacete
- ...
- 52: Melilla

---

## Anexo C: Glosario

| Término | Definición |
|---------|------------|
| Distribuidor | Usuario con territorio amplio (múltiples provincias/portales) |
| Colaborador | Usuario con alcance limitado (algunos portales) |
| Lead central | Lead generado por campañas/acciones de la central |
| Lead propio | Lead captado directamente por el usuario |
| Comisión compartida | Comisión que se divide entre distribuidor y colaborador |
| Comisión única | Comisión que va solo al distribuidor |
| Validación | Aprobación de comisión por admin antes de pago |
| Liquidación | Pago efectivo de la comisión |
