-- ═══════════════════════════════════════════════════════════════════════════════
--  fix_foreign_tables_types.sql
--  Corrige los tipos de las foreign tables del MSSQL Wrapper.
--
--  PROBLEMA: Todas las columnas estaban definidas como 'text', pero SQL Server
--  usa int, float, datetime, bit, etc. El wrapper FDW no puede convertir
--  automáticamente int→text, causando errores como:
--    "Conversion error: cannot interpret I32(Some(5080)) as a String value"
--
--  SOLUCIÓN: Recrear las foreign tables con los tipos correctos que coinciden
--  con los tipos reales de SQL Server (int→bigint, float→double precision,
--  datetime→text [porque el wrapper no soporta timestamp nativo], bit→text).
--
--  INSTRUCCIONES:
--    1. Copiar este SQL completo
--    2. Ir a Supabase → SQL Editor
--    3. Pegar y ejecutar
--    4. Verificar con las queries de PASO 5
--
--  Server: mssql_wrapper_server (bbddsql.servemp3.com / GELITE)
-- ═══════════════════════════════════════════════════════════════════════════════
-- ─── PASO 1: DROP foreign tables actuales (son solo links, NO se borran datos) ─
DROP FOREIGN TABLE IF EXISTS public."TtosMed";
DROP FOREIGN TABLE IF EXISTS public."PRESUTTO";
DROP FOREIGN TABLE IF EXISTS public."DCitas";
DROP FOREIGN TABLE IF EXISTS public."Pacientes";
DROP FOREIGN TABLE IF EXISTS public."NV_CabFactura";
DROP FOREIGN TABLE IF EXISTS public."TColabos";
-- ─── PASO 2: Recrear con tipos correctos ────────────────────────────────────
-- ═══ 2.1 Pacientes ══════════════════════════════════════════════════════════
-- IdPac, FecNacim, FecAlta, IdCentro, IdMutua = int/datetime en SQL Server
CREATE FOREIGN TABLE public."Pacientes" (
    "IdPac" bigint,
    "NumPac" text,
    "Nombre" text,
    "Apellidos" text,
    "NIF" text,
    "Tel1" text,
    "Tel2" text,
    "TelMovil" text,
    "Email" text,
    "FecNacim" text,
    -- datetime en MSSQL, text en wrapper para evitar cast
    "Direccion" text,
    "CP" text,
    "Notas" text,
    "Sexo" text,
    "FecAlta" text,
    "IdCentro" bigint,
    "IdMutua" bigint,
    "NumMutua" text,
    "Observaciones" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.Pacientes');
-- ═══ 2.2 DCitas (Citas) ═════════════════════════════════════════════════════
-- Fecha, Hora, Duracion, IdSitC, IdPac, IdBox, IdOrden = int en SQL Server
CREATE FOREIGN TABLE public."DCitas" (
    "IdUsu" bigint,
    "IdOrden" bigint,
    "Fecha" bigint,
    -- formato numérico de fecha GELITE
    "Hora" bigint,
    -- formato numérico de hora GELITE
    "Duracion" bigint,
    "IdSitC" bigint,
    "Texto" text,
    "FlgBloqueo" text,
    "Contacto" text,
    "Movil" text,
    "IdPac" bigint,
    "HorLlegada" bigint,
    "Retraso" bigint,
    "BOX" text,
    "HorConsul" bigint,
    "NOTAS" text,
    "NUMPAC" text,
    "Confirmada" bigint,
    "Aceptada" text,
    "IdBox" bigint,
    "IdIcono" bigint,
    "IdMotivoAnulacion" bigint,
    "IdTarifa" bigint,
    "IdCol" bigint,
    "IdCentro" bigint,
    "IdTipoEspec" bigint
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.DCitas');
-- ═══ 2.3 TtosMed (Tratamientos Médicos / Historial) ════════════════════════
-- IdPac, NumTto, IdTto, IdCol, StaTto, Importe, etc. = int/numeric en SQL Server
CREATE FOREIGN TABLE public."TtosMed" (
    "IdPac" bigint,
    "NumTto" bigint,
    "IdTto" bigint,
    "IdCol" bigint,
    "IdUser" bigint,
    "StaTto" bigint,
    "FecIni" text,
    -- datetime
    "FecFin" text,
    -- datetime
    "Notas" text,
    "Importe" double precision,
    "PiezasAdu" double precision,
    "IdTipoEspec" bigint,
    "CId" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.TtosMed');
-- ═══ 2.4 PRESUTTO (Líneas de Presupuesto) ══════════════════════════════════
CREATE FOREIGN TABLE public."PRESUTTO" (
    "Ident" bigint,
    "Id_Presu" bigint,
    "IdPac" bigint,
    "Orden" bigint,
    "IdTto" bigint,
    "StaTto" bigint,
    "FecIni" text,
    -- datetime
    "IdTratamiento" bigint,
    "IdColabo" bigint,
    "ImportePre" double precision,
    "Notas" text,
    "BaseImponible" double precision,
    "TpcIVA" double precision,
    "ImporteIVA" double precision,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.PresuTTo');
-- ═══ 2.5 NV_CabFactura (Facturas) ══════════════════════════════════════════
CREATE FOREIGN TABLE public."NV_CabFactura" (
    "IdFactura" bigint,
    "NFactura" text,
    "Serie" text,
    "IdPac" bigint,
    "IdColabo" bigint,
    "Fecha" text,
    -- datetime
    "Concepto" text,
    "BaseImponible" double precision,
    "TpcIVA" double precision,
    "ImporteIVA" double precision,
    "Total" double precision,
    "IdFormaPago" bigint,
    "Notas" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.NV_CabFactura');
-- ═══ 2.6 TColabos (Doctores) ═══════════════════════════════════════════════
CREATE FOREIGN TABLE public."TColabos" (
    "IdCol" bigint,
    "Alias" text,
    "Nombre" text,
    "Apellidos" text,
    "NIF" text,
    "Especialidad" text,
    "Activo" text,
    "Email" text,
    "Telefono" text,
    "IdCentro" bigint,
    "Color" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.TColabos');
-- ─── PASO 3: Permisos ──────────────────────────────────────────────────────
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."Pacientes" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."DCitas" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."TtosMed" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."PRESUTTO" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."NV_CabFactura" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."TColabos" TO service_role;
GRANT SELECT ON public."Pacientes" TO anon;
GRANT SELECT ON public."DCitas" TO anon;
GRANT SELECT ON public."TtosMed" TO anon;
GRANT SELECT ON public."PRESUTTO" TO anon;
GRANT SELECT ON public."NV_CabFactura" TO anon;
GRANT SELECT ON public."TColabos" TO anon;
-- ─── PASO 4: Notificar a PostgREST que recargue el schema ──────────────────
NOTIFY pgrst,
'reload schema';
-- ─── PASO 5: Verificación ──────────────────────────────────────────────────
-- Ejecutar DESPUÉS de la migración, una por una:
--
-- SELECT "IdPac","NumPac","Nombre","Apellidos" FROM public."Pacientes" ORDER BY "Nombre" LIMIT 3;
-- SELECT "IdPac","NumTto","Notas","Importe","StaTto" FROM public."TtosMed" ORDER BY "NumTto" DESC LIMIT 3;
-- SELECT "IdPac","Notas","ImportePre","StaTto" FROM public."PRESUTTO" ORDER BY "Orden" LIMIT 3;
-- SELECT "IdPac","Fecha","Hora","Duracion","Texto" FROM public."DCitas" ORDER BY "Fecha" DESC LIMIT 3;
-- SELECT "IdPac","NFactura","Total","Fecha" FROM public."NV_CabFactura" LIMIT 3;
-- SELECT "IdCol","Nombre","Apellidos" FROM public."TColabos" LIMIT 3;