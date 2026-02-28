# SmilePro 2026 — RUBIO GARCÍA DENTAL

Ecosistema dental inteligente. Aplicación web SPA (React + TypeScript + Vite + Tailwind CSS) conectada a Supabase con FDW a SQL Server (GELITE).

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Estilos | Tailwind CSS, CSS custom (`index.css`) |
| Iconos | Lucide React |
| Backend/BD | Supabase (PostgreSQL) + FDW a SQL Server (GELITE) |
| Auth | Supabase Auth (`context/AuthContext.tsx`) |
| DB Helper | `services/db.ts` → wrapper `dbSelect` / `dbInsert` contra Supabase |

---

## Estructura del Proyecto

### Punto de entrada

| Archivo | Descripción |
|---------|-------------|
| `index.html` | HTML base, carga Vite, título y meta |
| `index.tsx` | Monta `<App />` en `#root` |
| `index.css` | Estilos globales (fuentes, scrollbars, text-shadow) |
| `App.tsx` | Router principal: Login ↔ Layout (Header + Sidebar + Vista activa) |
| `types.ts` | Tipos compartidos: `Area`, `Cita`, `EstadoCita`, `Paciente`, `SOAPNote`, `KPI`, etc. |
| `navigation.ts` | Definición de menú lateral: áreas, sub-áreas, iconos |

### Configuración

| Archivo | Descripción |
|---------|-------------|
| `vite.config.ts` | Configuración Vite (puerto, alias) |
| `tsconfig.json` | Config TypeScript |
| `tailwind.config.js` | Tema Tailwind personalizado |
| `package.json` | Dependencias: react, lucide-react, @supabase/supabase-js, etc. |
| `.env.local` | Variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |

---

### `/components/` — Componentes reutilizables

| Archivo | Descripción |
|---------|-------------|
| `Header.tsx` | Barra superior: logo SVG muela, navegación principal (7 áreas), búsqueda, notificaciones, logout. Botones activos con gradiente azul `#1d4ed8→#2563eb` |
| `Sidebar.tsx` | Panel lateral colapsable con hover. Sub-navegación contextual por área activa. Items activos con gradiente azul |
| `UI.tsx` | Componentes UI genéricos: `StatCard`, `Badge`, etc. |

#### `/components/pacientes/` — Subcomponentes de Pacientes

| Archivo | Descripción |
|---------|-------------|
| `PatientSearchModal.tsx` | Modal búsqueda de pacientes (por nombre, NumPac, DNI) |
| `SOAPEditor.tsx` | Editor de notas SOAP (Subjetivo, Objetivo, Análisis, Plan) |
| `Odontograma.tsx` | Gráfico dental interactivo (32 piezas) |
| `Periodontograma.tsx` | Gráfico periodontal |
| `Economica.tsx` | Pestaña económica del paciente (presupuestos, facturas) |
| `Documentos.tsx` | Gestión documentos y consentimientos |
| `AlertasPanel.tsx` | Panel de alertas médicas/legales/financieras |

---

### `/views/` — Vistas principales (páginas)

| Archivo | Descripción |
|---------|-------------|
| `Login.tsx` | Página de acceso. Formulario email/password. Icono ShieldCheck, gradiente azul en botón |
| `Dashboard.tsx` | Panel resumen: KPIs, gráficos, métricas del día |
| `Agenda.tsx` | **ARCHIVO PRINCIPAL (~1060 líneas)**. Agenda semántica con doble gabinete (Doctores/Sanitarios). Ver detalle abajo |
| `ConfiguracionAgenda.tsx` | Configuración de horarios, reglas de la agenda |
| `Pacientes.tsx` | Vista completa del paciente: datos, historial SOAP, odontograma, economía, documentos |
| `Inventario.tsx` | Gestión de stock, lotes, trazabilidad |
| `Gestoria.tsx` | Módulo contable: facturas, Gmail, Google Drive |
| `IAAutomatizacion.tsx` | Hub de IA y automatización |
| `Whatsapp.tsx` | Mensajería WhatsApp via Evolution API |

#### `/views/ia/` — Sub-vistas IA

| Archivo | Descripción |
|---------|-------------|
| `AutomationRules.tsx` | Reglas de automatización configurables |
| `AutomationEditor.tsx` | Editor visual de reglas |
| `FlowsView.tsx` | Flujos de trabajo automatizados |
| `Plantillas.tsx` | Plantillas de mensajes/documentos |
| `SaraConfig.tsx` | Configuración del asistente IA "Sara" |

#### `/views/agenda/`

| Archivo | Descripción |
|---------|-------------|
| `types.ts` | Tipos específicos de la agenda |
| `data.ts` | Datos mock / constantes de la agenda |

---

### `/services/` — Capa de datos y APIs

| Archivo | Descripción |
|---------|-------------|
| `db.ts` | **Core**: wrapper Supabase (`dbSelect`, `dbInsert`, `dbUpdate`). Detecta tablas FDW vs nativas |
| `supabase.service.ts` | Cliente Supabase inicializado, helpers de conexión |
| `auth.service.ts` | `signIn`, `signOut`, `onAuthChange` |
| `citas.service.ts` | **Clave**: `getCitasByDate()` → consulta `DCitas` FDW, mapea `CitaRow → Cita`. Convierte fechas OLE, resuelve doctor por `IdCol`, categoriza tratamientos. Incluye `updateCita()` |
| `pacientes.service.ts` | `getPacientes()`, `getPacienteByNumPac()` → consulta `Pacientes` FDW |
| `tratamientos.service.ts` | `getTratamientosPaciente()` → consulta `PRESUTTO` FDW |
| `soap.service.ts` | CRUD notas SOAP (tabla nativa Supabase `soap_notes`) |
| `facturacion.service.ts` | Facturación: consulta `NV_CabFactura` FDW |
| `inventario.service.ts` | Stock: consulta `TArticulo`, `StckMov` FDW |
| `evolution.service.ts` | API Evolution (WhatsApp): enviar/recibir mensajes |
| `whatsapp.service.ts` | Helpers WhatsApp |
| `gmail.service.ts` | Integración Gmail API: leer emails, enviar |
| `gdrive.service.ts` | Integración Google Drive: listar archivos |
| `invoice-parser.service.ts` | Parser de facturas (OCR/AI) |
| `romexis.service.ts` | Integración Planmeca Romexis (radiografías) |

---

### `/context/`

| Archivo | Descripción |
|---------|-------------|
| `AuthContext.tsx` | Context React para auth: `user`, `login()`, `logout()`, `isAuthenticated` |

---

## Detalle: `Agenda.tsx` — Arquitectura

Este es el archivo más complejo. Estructura interna:

### Layout de la Agenda (vista "ALL" = doble gabinete)

```
Header:  [90px HORA] [flex-1 DOCTORES] [90px HORA] [flex-1 SANITARIOS]
Body:    [90px timeline1] [flex-1 slotsG1] [90px timeline2] [flex-1 slotsG2]
```

**Ambos usan flex directo (NO grid-cols-2) para garantizar alineación pixel-perfect.**

### Componentes internos del archivo

| Sección | Líneas aprox. | Descripción |
|---------|--------------|-------------|
| Imports y estado | 1–50 | useState/useRef: `citas`, `selectedDate`, `editingCita`, `vistaGabinete`, `pxPerHour`, etc. |
| `getTreatmentColor()` | 60–100 | Colores por tratamiento: `Primera Visita` → rojo, `Finalizada` → gris, resto → azul-700 |
| `useEffect` data fetch | ~110–200 | Carga citas via `getCitasByDate()`, manejo de errores y loading |
| `useEffect` render | ~230–450 | Renderizado imperativo del timeline y tarjetas de citas (DOM directo). Lógica de solapamiento con columnas |
| Toolbar | ~520–720 | Barra superior: navegación de fecha, búsqueda, filtro doctores, tabs Día/Semana, settings |
| Column headers | ~730–755 | Encabezados de columnas (HORA + DOCTORES + HORA + SANITARIOS) |
| Scrollable body | ~760–845 | Timeline refs + gabinete divs con background repeating-gradient |
| Block modal | ~850–930 | Modal para bloquear tramos horarios |
| Edit modal | ~930–1060 | Modal edición de cita: Paciente, Tratamiento (dropdown), Doctor, Hora (15min), Duración, Situación Cita (dropdown), Notas |

### Campos del modal de edición de citas

| Campo | Tipo | Valores |
|-------|------|---------|
| Paciente | Input texto | Nombre libre |
| Tratamiento | Select dropdown | Ajuste Prot/tto, Cirugia de Implante, Cirugia/Injerto, Colocacion Ortodoncia, Control, Endodoncia, Estudio Ortodoncia, Exodoncia, Higiene Dental, Mensualidad Ortodoncia, Periodoncia, Primera Visita, Protesis Fija, Protesis Removible, Reconstruccion, Retirar Ortodoncia, Rx/escaner, Urgencia |
| Doctor | Select dropdown | Dr. Mario Rubio, Dra. Irene Garcia, Dra. Virginia Tresgallo, Dr. Ignacio Ferrero, Dra. Miriam Carrasco, Tc. Juan Antonio Manzanedo |
| Hora Inicio | Select dropdown | 08:00 a 21:45 en intervalos de 15 min |
| Duración | Select dropdown | 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180 minutos |
| Situación Cita | Select dropdown | Planificada, Confirmada, En Sala de Espera, En Gabinete, Finalizada, No Show / Fallada, Anulada, Cancelada |
| Notas | Textarea | Texto libre (mapeado desde `DCitas.NOTAS` de SQL) |

### Colores de citas

| Condición | Color fondo | Texto |
|-----------|-------------|-------|
| Primera Visita | `#FF4B68` (rojo coral) | Blanco |
| Finalizada | `#d1d5db` (gris) | Azul oscuro |
| Resto | `#1d4ed8` (azul-700) | Blanco |

### Tipos de estado (`EstadoCita`)

```typescript
'planificada' | 'confirmada' | 'espera' | 'gabinete' | 'finalizada' | 'fallada' | 'anulada' | 'cancelada' | 'desconocido' | 'bloqueo_bio'
```

---

## Diseño Visual (Identidad Corporativa)

| Elemento | Valor |
|----------|-------|
| Color primario header | `#051650` (navy oscuro) |
| Gradiente activo | `linear-gradient(135deg, #1d4ed8, #2563eb)` |
| Acento | `#0ea5e9` (cyan) |
| Punto indicador | Gradiente azul (antes era verde emerald) |
| Texto global | `text-shadow` micro-borde oscuro (`index.css`) |
| Fuente | System default + Tailwind |
| Botones/tabs activos | Gradiente azul (Header, Sidebar, Agenda tabs Día/Semana) |
| Login | Fondo blanco, botón con gradiente azul, icono ShieldCheck |

---

## Base de Datos: FDW (Foreign Data Wrapper)

Tablas GELITE accesibles via Supabase FDW:

| Tabla FDW | Uso |
|-----------|-----|
| `DCitas` | Citas: fecha, hora, paciente, tratamiento, doctor, estado, notas, duración |
| `Pacientes` | Datos paciente: NumPac, nombre, apellidos, DNI, teléfono, nacimiento |
| `TColabos` | Colaboradores/doctores: IdCol → nombre |
| `TSitCita` | Situaciones de cita: IdSitC → descripción (Planificada, Confirmada, etc.) |
| `TtosMed` | Tratamientos médicos |
| `PRESUTTO` | Presupuestos: tratamientos por paciente, precios, estado |
| `NV_CabFactura` | Cabeceras de facturas |
| `TArticulo` | Artículos del inventario |
| `StckMov` | Movimientos de stock |
| `BancoMov` | Movimientos bancarios |

### Tabla nativa Supabase

| Tabla | Uso |
|-------|-----|
| `soap_notes` | Notas SOAP del historial clínico |
| `catalogo_tratamientos` | Catálogo de tratamientos (migrado desde GELITE) |

---

## Cómo ejecutar

```bash
npm install
npm run dev
```

Requiere `.env.local` con:
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Build producción

```bash
npm run build   # genera dist/
```
