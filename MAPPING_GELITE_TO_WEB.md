# 🗺️ CORRELACIÓN: TABLAS GELITE ➞ FRONTEND WEB SIMULADO

A continuación se presenta el puente lógico entre los datos extraídos de la base de datos SQL Server (GELITE) y las interfaces TypeScript definidas en `types.ts` o empleadas en los componentes React de la nueva web.

## 1️⃣ Entidad: PACIENTES
**Tabla Origen:** `Pacientes`, `Clientes`
**Interfaz Destino (`types.ts`):** `Paciente`

| Columna GELITE | Atributo Web | Rol / Transformación |
|---|---|---|
| `IdPac` / `IdCli` | `id` | Clave primaria unificada (UUID en Supabase) |
| `NumPac` | `numPac` | Historial / Número de expediente |
| `Nombre` | `nombre` | Nombre de pila |
| `Apellidos` | `apellidos` | Apellidos completos |
| `NIF` / `CIP` | `dni` | Documento de identidad |
| `TelMovil` / `Tel1` | `telefono` | Contacto principal |
| `FecNacim` | `fechaNacimiento` | Formateado a YYYY-MM-DD |
| `IdCliTutor` | `tutor` | FK hacia otra ficha en caso de menores |
| `AceptaLOPD` / `AceptaGDPR` | `consentimientosFirmados` | Booleano consolidado de permisos legales |

---

## 2️⃣ Entidad: AGENDA Y CITAS
**Tabla Origen:** `DCitas`
**Interfaz Destino (`types.ts`):** `Cita`

| Columna GELITE | Atributo Web | Rol / Transformación |
|---|---|---|
| `IdCita` / `IdOrden` | `id` | Clave primaria de la cita |
| `IdPac` | `pacienteId` | FK vinculante al Paciente |
| `BOX` / `IdBox` | `gabinete` | Asignación de sillón/box clínico |
| `Fecha` + `HorConsul` | `horaInicio` | Timestamp combinado (DateTime ISO) |
| `Duracion` | `duracionMinutos` | Entero en minutos para el renderizado del calendario |
| `Texto` / `NOTAS` | `tratamiento` | Descripción general del acto médico |
| `IdSitC` / `Confirmada` | `estado` | Mapeo a Enum: `planificada`, `confirmada`, `espera`, `gabinete`, `finalizada` |
| `IdCol` / `IdUserIns` | `doctor` | FK hacia TColabos (Doctor asignado) |

---

## 3️⃣ Entidad: TRATAMIENTOS E HISTORIAL
**Tabla Origen:** `TtosMed`, `AgdNotas`
**Interfaz Destino (`types.ts`):** `SOAPNote` / Tratamientos realizados

| Columna GELITE | Atributo Web | Rol / Transformación |
|---|---|---|
| `Ident` (TtosMed) / `IdNota` (AgdNotas) | `id` | Identificador único del acto médico/nota |
| `FecIni` | `fecha` | Fecha de ejecución clínica |
| `IdCol` | `doctor` | Doctor ejecutante (Firma) |
| `Notas` / `Nota` | `subjetivo` / `plan` | Desglose del texto histórico a formato SOAP simulado |
| `PiezasAdu` / `ZonasBoca` | `objetivo` | Odontograma relacional |

---

## 4️⃣ Entidad: PRESUPUESTOS Y FACTURACIÓN
**Tabla Origen:** `Presu`, `PresuTto`, `Facturas`, `PagoCli`
**Interfaz Destino:** (Módulos financieros / Estado `deuda` de Paciente)

| Columna GELITE | Atributo Web | Rol / Transformación |
|---|---|---|
| `NumPre` (Presu) | `idPresupuesto` | Referencia comercial |
| `ImportePre` (PresuTto) | `importeTotal` | Sumatoria económica |
| `Estado` (Presu) | `estadoAceptacion` | 0 = Rechazado, 1 = Pendiente, 2 = Aceptado |
| `Pagado` (PagoCli) | `pagado` | Historial de cobros / Remesas bancarias |
| Calculado (Facturado - Pagado) | `Paciente.deuda` | Flag de alerta roja en HUD del paciente (Alertas financieras) |

---

## 5️⃣ Entidad: INVENTARIO (EXTRÍNSECO)
**Tablas Referencia:** `TArticulo`, `Almacenes`, `Proveedores`
**Interfaz Destino (`types.ts`):** `ItemInventario`, `Lote`

| Origen Lógico GELITE | Atributo Web | Rol / Transformación |
|---|---|---|
| `TArticulo.IdArticulo` | `id` | Código maestro del producto |
| `TArticulo.Descripcion` | `nombre` | Nombre comercial del consumible/implante |
| `Almacenes.Stock` | `stockFisico` | Unidades disponibles en clínica |
| `Proveedores.Nombre` | `proveedor` | Origen de compras |
| (Lotes personalizados) | `lotes` | Fechas de caducidad para alertas de `AlertasStockBajo.tsx` |
