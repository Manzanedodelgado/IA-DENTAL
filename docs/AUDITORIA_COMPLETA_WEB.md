# 🔴 AUDITORÍA COMPLETA — SMILEPRO WEB
**Fecha:** 28 febrero 2026 — 23:17  
**Alcance:** TODA la aplicación (9 vistas, 15 servicios, 4 componentes, tipos, navegación)

---

## RESUMEN EJECUTIVO

| Módulo | Estado | Datos reales | Mock/Hardcoded | Escritura funciona |
|--------|--------|-------------|----------------|-------------------|
| **Agenda** | 🟡 Parcial | ✅ Lectura citas FDW | ❌ Tratamientos, doctores, estados, config | ❌ create/update/delete = stubs |
| **ConfiguracionAgenda** | 🔴 Maqueta | ❌ Nada | ❌ TODO fake | ❌ Botón guardar = noop |
| **Pacientes** | 🟢 Conectado | ✅ FDW + Supabase | ⚠️ Colores especialidad | ✅ SOAP notes, alergias, medicación |
| **Gestoria** | 🟢 Conectado | ✅ FDW facturas + banco | ⚠️ Stats KPIs hardcoded | ✅ Facturas, estado |
| **Dashboard** | 🔴 Maqueta | ❌ Nada | ❌ 100% hardcoded | ❌ |
| **Inventario** | 🟡 Parcial | ✅ Servicio conecta TArticulo/StckMov | ❌ Vista usa MOCK siempre | ⚠️ Servicio funciona, vista no lo usa bien |
| **Whatsapp** | 🟢 Conectado | ✅ Evolution API + Chatwoot | ⚠️ Mock fallback si no hay config | ✅ Enviar/recibir mensajes |
| **IA & Automatización** | 🟡 Shell | ⚠️ SaraConfig existe | ⚠️ Componentes parciales | ❌ Sin backend real |
| **Login** | 🟢 Funciona | ✅ Auth bypass + Supabase | — | ✅ |

---

## 1. AGENDA (`views/Agenda.tsx` — 1216 líneas)

### 1.1 Lectura de citas ✅
- `getCitasByFecha()` → FDW `DCitas` subquery → datos reales ✅
- Paciente, hora, notas, duración → columnas reales de `DCitas` ✅

### 1.2 Tratamientos ❌ TRIPLICADOS HARDCODED
| Ubicación | Qué tiene | Origen real |
|-----------|-----------|-------------|
| SQL subquery (CASE IdIcono) | 18 categorías (1→Control...19→Rx) | Debería leer `IconoTratAgenda` (19 registros) |
| Modal edición (línea 1110) | Array hardcoded de 18 strings | Debería leer `IconoTratAgenda` o `TUsuAOpc` |
| ConfiguracionAgenda tiempos | 5 placeholders inventados | Debería leer `TUsuAOpc` (103 registros = tratamientos por doctor) |

### 1.3 Doctores ❌ TRIPLICADOS HARDCODED
| Ubicación | Qué tiene | Origen real |
|-----------|-----------|-------------|
| SQL subquery (CASE IdUsu) | 6 doctores hardcoded | Debería leer `TUsuAgd` (13 registros) → `TColabos` |
| Modal edición (línea 1126) | 6 options hardcoded | Debería leer `TColabos` |
| ConfiguracionAgenda selector | 3 doctores INVENTADOS | Debería leer `TUsuAgd`/`TColabos` |
| Cabecera columnas agenda | "DRA. IRENE GARCIA" / "TC. JUAN ANTONIO MANZANEDO" hardcoded | Debería leer `TUsuAgd` |
| Vistas toggle labels | "Dr. Rubio" / "Dra. García" hardcoded | Debería leer `TUsuAgd` |

### 1.4 Estados de cita ❌ DUPLICADOS HARDCODED
| Ubicación | Qué tiene | Origen real |
|-----------|-----------|-------------|
| SQL subquery (CASE IdSitC) | 5 estados (0→Planificada...8→Cancelada) | Debería leer `TSitCita` (10 registros con color) |
| Modal dropdown (línea 1136) | 5 opciones hardcoded | Debería leer `TSitCita` |

### 1.5 Escritura ❌ STUBS
- `createCita()` → **return null** (línea 120-123)
- `updateCita()` → **return null** (línea 125-132)
- `updateEstadoCita()` → **return false** (línea 134-135)
- `deleteCita()` → **return false** (línea 137-138)
- FDW es solo lectura — necesita tabla Supabase intermedia o escritura directa

### 1.6 Config horario ❌ NO CONECTADO
- Horarios semanales → `const horariosBase` hardcodeado en `ConfiguracionAgenda.tsx:14-22`
- No se persiste en ninguna tabla
- No alimenta el grid de la agenda (rango fijo 10:15-19:45)
- Tabla GELITE relevante: `TCalCa` + `TSitCal` + `TSitCalH` (calendarios, horarios)

### 1.7 Bloqueos ❌ MAQUETA
- Bloqueos especiales → 2 cards hardcoded (Festivo Oct 12, Apertura Sábado Oct 14)
- Modal Bloquear/Desbloquear → abren pero no guardan en ningún sitio
- Tabla GELITE relevante: `TTipoBloqueo`, `DCitas.IdSitC`

### 1.8 Hora visual vs hora dato ❌ BUG
- RAUL MENENDEZ: grid muestra posición 10:15, modal dice 10:00

---

## 2. CONFIGURACIÓN AGENDA (`views/ConfiguracionAgenda.tsx` — 241 líneas)

**Estado: 🔴 100% MAQUETA — NADA conecta a ninguna tabla**

| Elemento | Tipo de dato | Conectado | Tabla real |
|----------|-------------|-----------|------------|
| 3 doctores | `useState` local | ❌ | `TUsuAgd` + `TColabos` |
| Horario L-D | `const` | ❌ | `TCalCa` + `TSitCalH` |
| 5 tratamientos tiempos | `const` | ❌ | `TUsuAOpc` (103 registros, con Duracion por doctor) |
| 2 bloqueos especiales | JSX estático | ❌ | `TTipoBloqueo` |
| Botón "Guardar Configuración" | `<button>` | ❌ sin handler | — |
| Botón "Replicar en Gabinetes" | `<button>` | ❌ sin handler | — |
| Botón "Añadir Excepción" | `<button>` | ❌ sin handler | — |
| Botón "+ Nuevo Tratamiento" | `<button>` | ❌ sin handler | — |

---

## 3. DASHBOARD (`views/Dashboard.tsx` — 235 líneas)

**Estado: 🔴 100% MAQUETA**

| Elemento | Valor | Real |
|----------|-------|------|
| Citas hoy: "24" | Hardcoded | ❌ Debería: `getCitasByFecha(hoy).length` |
| Revenue: "€14,820" | Hardcoded | ❌ Debería: `getGestoriaStats().ingresosBrutos` |
| Cancelaciones: "3" | Hardcoded | ❌ |
| Case Acceptance: "68%" | Hardcoded | ❌ |
| Heatmap (8 filas) | Hardcoded HEATMAP_DATA | ❌ Debería: contar citas por hora/día de la semana |
| Actividad reciente | No existe | ❌ |
| Gráfico tendencia | No existe | ❌ |

---

## 4. PACIENTES (`views/Pacientes.tsx` — 900 líneas)

**Estado: 🟢 MEJOR CONECTADO de la app**

| Función | Servicio | Tabla | Estado |
|---------|----------|-------|--------|
| Buscar paciente | `pacientes.service.ts` | FDW `Pacientes` | ✅ |
| Historial médico | `citas.service.ts` → `getEntradasMedicas` | FDW `TtosMed` | ✅ |
| Presupuestos | `citas.service.ts` → `getTratamientosPaciente` | FDW `PRESUTTO` | ✅ |
| SOAP notes | `soap.service.ts` | Supabase `soap_notes` | ✅ |
| Alergias | `supabase.service.ts` | Supabase `patient_allergies` | ✅ |
| Medicación | `supabase.service.ts` | Supabase `patient_medications` | ✅ |
| Odontograma | `components/pacientes/Odontograma.tsx` | ⚠️ Estado local | ⚠️ No persiste |
| Especialidad color | `especialidadConfig` hardcoded | ❌ | Debería leer `TEspecOMC` |

### Issues Pacientes:
- Colores por especialidad: hardcoded en `especialidadConfig` (línea 42-51)
- Odontograma: solo estado local, no guarda en `TTratamientos`
- `ESPEC_MAP` en `citas.service.ts:215-222`: hardcoded (debería leer `TEspecOMC`)

---

## 5. GESTORÍA (`views/Gestoria.tsx` — 1180 líneas)

**Estado: 🟢 BIEN CONECTADO**

| Función | Servicio | Tabla | Estado |
|---------|----------|-------|--------|
| Facturas | `facturacion.service.ts` | FDW `NV_CabFactura` | ✅ |
| Movimientos banco | `facturacion.service.ts` | FDW `BancoMov` | ✅ |
| Email facturas | `invoice-parser.service.ts` | Gmail API + Supabase `facturas_email` | ✅ |
| Stats KPIs | `getGestoriaStats()` | Calcula de facturas reales | ✅ |

### Issues Gestoría:
- Gastos e inversiones: tabs existen pero sin datos reales
- TBAI/TicketBAI: siempre muestra "Verificado" (hardcodeado, línea 69)
- Status factura: siempre "Liquidado" (hardcodeado, línea 67)
- Base imponible: cálculo aproximado `Total / 1.21` en vez de usar campo real

---

## 6. INVENTARIO (`views/Inventario.tsx` — 309 líneas)

**Estado: 🟡 SERVICIO EXISTE PERO VISTA USA MOCK**

| Capa | Estado |
|------|--------|
| `inventario.service.ts` | ✅ Conecta a FDW `TArticulo` y `StckMov` |
| `Inventario.tsx` vista | ❌ Usa `INITIAL_INVENTORY` mock (2 items falsos) |
| Trazabilidad | ❌ `TRAZABILIDAD_MOCK` hardcoded (2 entries falsas) |

```
// Inventario.tsx línea 27 — MOCK que se usa siempre
const INITIAL_INVENTORY: ItemInventario[] = [
    { id: "IMP-STR-41", nombre: "Implante Straumann BLX...", ... },
    { ... }
];
```

El servicio `getInventario()` existe y funciona, pero la vista **no lo llama correctamente** — carga los datos mock como fallback prioritario.

### Issues adicionales:
- `rowToItem` hardcodea `categoria: 'Desechable'` para todo (línea 29)
- `rowToItem` hardcodea `minimoReorden: 10` para todo (línea 32)
- `rowToLote` hardcodea `estado: 'OK'` y `ubicacion: 'Almacén Central'` (líneas 41-42)

---

## 7. WHATSAPP (`views/Whatsapp.tsx` — 335 líneas)

**Estado: 🟢 BIEN CONECTADO (con fallback mock)**

| Función | Servicio | API | Estado |
|---------|----------|-----|--------|
| Conversaciones | `evolution.service.ts` | Chatwoot API | ✅ |
| Mensajes | `evolution.service.ts` | Chatwoot API | ✅ |
| Enviar | `evolution.service.ts` | Evolution API | ✅ |
| QR conexión | `evolution.service.ts` | Evolution API | ✅ |
| Etiquetas | `evolution.service.ts` | Chatwoot API | ✅ |

### Issues:
- `MOCK_CONV` y `MOCK_MSGS` se usan solo si Evolution/Chatwoot no están configurados — correcto como fallback
- Las env vars deben estar en `.env.local` — verificar que existen

---

## 8. IA & AUTOMATIZACIÓN (`views/IAAutomatizacion.tsx` + `views/ia/`)

**Estado: 🟡 SHELL CON COMPONENTES PARCIALES**

| Sub-view | Archivo | Estado |
|----------|---------|--------|
| Asistente Sara | `ia/SaraConfig.tsx` | ⚠️ Config UI, sin backend IA |
| Automatizaciones | `ia/AutomationRules.tsx` | ⚠️ UI rules, sin motor de ejecución |
| Flujos | `ia/FlowsView.tsx` | ⚠️ UI flow builder, sin persistencia |
| Editor | `ia/AutomationEditor.tsx` | ⚠️ Editor visual, sin backend |
| Plantillas | `ia/Plantillas.tsx` | ⚠️ Templates, sin persistencia |

---

## 9. SERVICIOS — MAPA DE CONEXIONES

| Servicio | Lee de | Escribe en | Estado |
|----------|--------|-----------|--------|
| `db.ts` | Supabase REST API | Supabase REST API | ✅ Base layer |
| `auth.service.ts` | Supabase Auth | — | ✅ + bypass JMD/190582 |
| `pacientes.service.ts` | FDW `Pacientes` | — | ✅ Solo lectura |
| `citas.service.ts` | FDW `DCitas` subquery, `TtosMed`, `PRESUTTO` | ❌ Stubs | ⚠️ Lectura ✅, Escritura ❌ |
| `soap.service.ts` | Supabase `soap_notes` | Supabase `soap_notes` | ✅ CRUD completo |
| `supabase.service.ts` | Supabase (alergias, meds, RX) | Supabase | ✅ CRUD completo |
| `facturacion.service.ts` | FDW `NV_CabFactura`, `BancoMov` | Supabase | ✅ |
| `inventario.service.ts` | FDW `TArticulo`, `StckMov` | FDW `TArticulo` | ✅ Servicio bien |
| `tratamientos.service.ts` | Supabase `catalogo_tratamientos` | — | ⚠️ Tabla VACÍA, nadie lo llama |
| `evolution.service.ts` | Chatwoot + Evolution API | Chatwoot + Evolution | ✅ |
| `whatsapp.service.ts` | Re-export de evolution | — | ✅ Legacy wrapper |
| `invoice-parser.service.ts` | Gmail API + Supabase | Supabase `facturas_email` | ✅ |
| `gdrive.service.ts` | Google Drive API | — | ✅ |
| `gmail.service.ts` | Gmail API | — | ✅ |
| `romexis.service.ts` | Sistema ficheros local | — | ⚠️ Busca radiografías |

---

## 10. DATOS HARDCODED — INVENTARIO COMPLETO

| # | Archivo | Línea(s) | Dato | Debería venir de |
|---|---------|----------|------|-----------------|
| 1 | `Agenda.tsx` | 1110-1116 | 18 tratamientos | `IconoTratAgenda` / `TUsuAOpc` |
| 2 | `Agenda.tsx` | 1126-1131 | 6 doctores | `TColabos` / `TUsuAgd` |
| 3 | `Agenda.tsx` | 1136-1140 | 5 estados cita | `TSitCita` |
| 4 | `Agenda.tsx` | ~620-640 | Cabeceras columnas doctor | `TUsuAgd` |
| 5 | `Agenda.tsx` | ~680 | Labels Vista toggle | `TUsuAgd` |
| 6 | `Agenda.tsx` | 840 | Doctor default nueva cita | `TUsuAgd` |
| 7 | `ConfiguracionAgenda.tsx` | 8-11 | 3 doctores INVENTADOS | `TUsuAgd` + `TColabos` |
| 8 | `ConfiguracionAgenda.tsx` | 14-22 | Horarios semanales | `TCalCa` + `TSitCalH` |
| 9 | `ConfiguracionAgenda.tsx` | 24-30 | 5 tratamientos tiempo INVENTADOS | `TUsuAOpc` |
| 10 | `ConfiguracionAgenda.tsx` | 172-193 | 2 bloqueos especiales | `TTipoBloqueo` |
| 11 | `Dashboard.tsx` | 23-65 | 4 KPI cards | Calcular de FDW real |
| 12 | `Dashboard.tsx` | 67-76 | Heatmap data | Calcular de `DCitas` |
| 13 | `Inventario.tsx` | 27-64 | 2 items mock | `inventario.service.ts` YA EXISTE |
| 14 | `Inventario.tsx` | 67-70 | 2 trazabilidad mock | `StckMov` |
| 15 | `Pacientes.tsx` | 42-51 | Colores especialidad | `TEspecOMC` |
| 16 | `citas.service.ts` | 158-183 | DOCTOR_MAP (24 entries) | `TColabos` (ya se carga dinámico pero tiene fallback) |
| 17 | `citas.service.ts` | 215-222 | ESPEC_MAP (10 entries) | `TEspecOMC` |
| 18 | `citas.service.ts` | 38-62 | tratamientoToCategoria | `IconoTratAgenda` |
| 19 | `inventario.service.ts` | 29 | `categoria: 'Desechable'` siempre | Campo real de `TArticulo` |
| 20 | `inventario.service.ts` | 32 | `minimoReorden: 10` siempre | Campo real o config |
| 21 | `inventario.service.ts` | 41-42 | `estado: 'OK'`, `ubicacion: 'Almacén Central'` | Campos reales |
| 22 | `facturacion.service.ts` | 67 | `status: 'Liquidado'` siempre | Campo real de factura |
| 23 | `facturacion.service.ts` | 69 | `tbai: 'Verificado'` siempre | Campo real |
| 24 | SQL FDW subquery | CASE IdIcono | 18 tratamientos | `IconoTratAgenda` |
| 25 | SQL FDW subquery | CASE IdUsu | 6 doctores | `TColabos` / `TUsuAgd` |
| 26 | SQL FDW subquery | CASE IdSitC | 5 estados | `TSitCita` |

---

## 11. TABLAS GELITE DISPONIBLES PERO SIN FDW

| Tabla | Registros | Para qué | Usando en |
|-------|-----------|----------|-----------|
| `IconoTratAgenda` | ~19 | Tipos tratamiento agenda (nombre + icono) | Nada — hardcodeado en SQL CASE |
| `TUsuAOpc` | 103 | Opciones tto por doctor (nombre, duración, color) | Nada — hardcodeado |
| `TUsuAgd` | 13 | Doctores de agenda (gabinete, calendario) | Nada — hardcodeado |
| `TSitCita` | 10 | Estados de cita (nombre, color) | Nada — hardcodeado |
| `TTratamientos` | 953 | Tratamientos clínicos paciente (odontograma) | Nada |
| `TDiagnosticos` | ? | Diagnósticos por pieza | Nada |
| `TEspecOMC` | ? | Especialidades médicas | Nada — `ESPEC_MAP` hardcoded |
| `TCalCa` | ? | Calendarios base | Nada — horarios hardcoded |
| `TSitCalH` | ? | Horarios por calendario | Nada |

---

## 12. FUNCIONES QUE NO HACEN NADA (STUBS/NOOP)

| Función | Archivo | Qué hace | Qué debería hacer |
|---------|---------|----------|-------------------|
| `createCita()` | `citas.service.ts:120` | `return null` | Insertar en `DCitas` o tabla Supabase |
| `updateCita()` | `citas.service.ts:125` | `return null` | Actualizar `DCitas` |
| `updateEstadoCita()` | `citas.service.ts:134` | `return false` | Cambiar `IdSitC` |
| `deleteCita()` | `citas.service.ts:137` | `return false` | Eliminar/anular cita |
| Guardar Config | `ConfiguracionAgenda.tsx:232` | `<button>` sin onClick | Persistir en Supabase |
| Replicar Gabinetes | `ConfiguracionAgenda.tsx:138` | `<button>` sin onClick | Copiar horarios |
| Añadir Excepción | `ConfiguracionAgenda.tsx:169` | `<button>` sin onClick | Crear en tabla |
| + Nuevo Tratamiento | `ConfiguracionAgenda.tsx:221` | `<button>` sin onClick | Crear en tabla |
| Insertar Bloqueo | `Agenda.tsx` modal | Cierra modal | Crear bloqueo en DB |
| Confirmar Desbloqueo | `Agenda.tsx` modal | Cierra modal | Eliminar bloqueo de DB |

---

## 13. TABLAS SUPABASE CREADAS PERO VACÍAS/SIN USAR

| Tabla Supabase | SQL creación | Usada por | Estado |
|---------------|-------------|-----------|--------|
| `catalogo_tratamientos` | `create_catalogo_tratamientos.sql` | `tratamientos.service.ts` | ❌ VACÍA, nadie la alimenta |
| `Tratamientos` | `supabase-migration-gelite.sql:60` | Nadie | ❌ VACÍA |

---

## TOTAL ERRORES/ISSUES

| Severidad | Cantidad | Descripción |
|-----------|----------|-------------|
| 🔴 Crítico | 4 | ConfiguracionAgenda 100% fake, Dashboard 100% fake, Agenda stubs, Inventario vista mock |
| 🟠 Alto | 10 | Datos triplicados hardcoded (ttos, doctores, estados, mapas) |
| 🟡 Medio | 8 | Campos hardcoded en servicios, tabla vacía, botones noop |
| 🟢 Bajo | 4 | Horas desfasadas, badge oculto, labels desincronizados |
| **TOTAL** | **26 issues** | |
