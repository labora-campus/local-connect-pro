# PRD: CRM Operativo Multicentros - Distribuidores y Colaboradores

## 1. Visión General del Proyecto
[cite_start]Este proyecto consiste en el desarrollo de un **CRM operativo interno** diseñado para gestionar la actividad comercial diaria del ecosistema **Multicentros Comercial**[cite: 199, 202]. [cite_start]El sistema no es un producto comercial externo, sino una herramienta para que la red de ventas gestione leads y visualice el estado de su negocio territorial[cite: 200, 202].

### 1.1 ¿Qué es Multicentros Comercial?
[cite_start]Es un ecosistema digital compuesto por múltiples portales (comercios, servicios, productores agrícolas, etc.) orientado a dar visibilidad y captación a negocios locales bajo un **modelo de suscripción** (sin comisiones por venta)[cite: 6, 9].

## 2. Arquitectura de Usuarios (Roles)
El sistema debe filtrar la información y las acciones basándose en tres figuras clave:

* [cite_start]**Central (Administrador):** Orquesta el ecosistema, define provincias, reparte leads automáticamente y analiza métricas globales [cite: 72-86, 234-240].
* [cite_start]**Distribuidor:** Motor comercial responsable de una o varias provincias [cite: 87-92, 241-243]. [cite_start]Necesita gestionar leads, ver sus portales activos y métricas de facturación [cite: 93-98, 244-248].
* [cite_start]**Colaborador:** Perfil de apoyo al distribuidor con alcance territorial limitado [cite: 108-112, 250-252]. [cite_start]Requiere **simplicidad extrema** debido a su bajo nivel tecnológico [cite: 113-116, 259-261].

## 3. Requisitos Funcionales Core

### 3.1 Dashboard de Negocio
* [cite_start]Visualización clara de **Nº de altas**, **Portales activos**, **Facturación acumulada** y **Leads en curso** [cite: 266-269].
* [cite_start]Resumen visual del estado del negocio y mensajes directos de la Central[cite: 270, 271].

### 3.2 Gestión de Leads (Interesados)
* [cite_start]**Entrada de leads:** Sincronización de leads desde la central y capacidad de introducir prospectos manuales [cite: 50, 56, 61, 273-275].
* [cite_start]**Reparto Territorial:** Los leads se asignan automáticamente por **provincia**[cite: 65, 238, 276].
* [cite_start]**Estados del Lead:** Flujo simple: Nuevo, Contactado, En seguimiento, Cerrado, Descartado [cite: 277-282].

### 3.3 Inteligencia Artificial (Módulo Modular)
* [cite_start]**Asistente de Ventas:** Apoyo opcional para redactar correos, responder emails y preparar mensajes comerciales [cite: 152-155, 293-296].
* [cite_start]**Invisibilidad:** La IA debe ser activable solo si el usuario lo desea y nunca obligatoria [cite: 157-159, 301].

## 4. Stack Tecnológico (Lovable)
* **Frontend:** React con Vite y TypeScript.
* **Estilos:** Tailwind CSS.
* **Componentes UI:** shadcn-ui.
* **Enfoque:** Mobile-first (para comerciales en calle) que escala a vista de CRM profesional en escritorio.

## 5. Principios de Diseño (Críticos para el Desarrollo)
* [cite_start]**Simplicidad Radical:** Pocos clics, pocos campos y terminología de negocio (no técnica) [cite: 123-127, 309].
* [cite_start]**Usabilidad:** Debe ser "usable por alguien que apenas sabe adjuntar un archivo"[cite: 129, 262].
* [cite_start]**Enfoque en Beneficio:** El usuario debe saber siempre "¿Cómo voy?", "¿Cuánto llevo?" y "¿Qué tengo pendiente?" [cite: 131-134].

## 6. Fuera de Alcance (Exclusiones)
* [cite_start]**NO** es un portal para clientes finales[cite: 24, 163, 229].
* [cite_start]**NO** es un sistema de facturación complejo ni un ERP[cite: 162, 164, 230, 231].
* [cite_start]**NO** debe replicar herramientas administrativas de la central que ya existen[cite: 166].

## 7. Responsabilidades y Propiedad
* [cite_start]**Propietario e Infraestructura:** Operia[cite: 174, 176, 317, 318].
* [cite_start]**Desarrollador:** Labora[cite: 173, 316].
* [cite_start]**Operación:** Multicentros Comercial[cite: 175, 319].