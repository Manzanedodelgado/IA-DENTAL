-- ═══════════════════════════════════════════════════════════════════════════════
--  migrate_to_foreign_tables.sql
--  Migra TODAS las tablas GELITE a Foreign Tables vía MSSQL Wrapper
--  Servidor: mssql_wrapper_server (bbddsql.servemp3.com / GELITE)
--
--  Estrategia:
--    1. Renombrar tablas BASE existentes → _migrated (backup)
--    2. Eliminar foreign table existente dbo.DCitas
--    3. Crear nuevas Foreign Tables en schema public (PostgREST-compatible)
--    4. Conceder permisos a service_role y anon
--
--  Tablas Supabase-nativas que NO se tocan:
--    - catalogo_tratamientos (creada en Supabase)
--    - soap_notes (creada en Supabase)
--    - facturas_email (creada en Supabase)
-- ═══════════════════════════════════════════════════════════════════════════════
-- ─── PASO 0: Preparación ───────────────────────────────────────────────────
-- Asegurar que la extensión wrappers está habilitada
CREATE EXTENSION IF NOT EXISTS wrappers WITH SCHEMA extensions;
-- ─── PASO 1: Renombrar tablas BASE existentes (backup) ─────────────────────
-- Solo renombramos las que existen y van a ser reemplazadas por foreign tables
ALTER TABLE IF EXISTS public."DCitas"
    RENAME TO "DCitas_migrated";
ALTER TABLE IF EXISTS public."Pacientes"
    RENAME TO "Pacientes_migrated";
ALTER TABLE IF EXISTS public."TtosMed"
    RENAME TO "TtosMed_migrated";
ALTER TABLE IF EXISTS public."PRESUTTO"
    RENAME TO "PRESUTTO_migrated";
ALTER TABLE IF EXISTS public."NV_CabFactura"
    RENAME TO "NV_CabFactura_migrated";
-- ─── PASO 2: Eliminar foreign table existente en dbo ───────────────────────
DROP FOREIGN TABLE IF EXISTS dbo."DCitas";
DROP SCHEMA IF EXISTS dbo;
-- ─── PASO 3: Crear Foreign Tables en schema public ─────────────────────────
-- Nota: Todos los tipos se mapean como text/bigint ya que MSSQL wrapper
-- convierte internamente. Usamos text para flexibilidad máxima.
-- ═══ 3.1 DCitas (Agenda / Citas) ═══════════════════════════════════════════
CREATE FOREIGN TABLE public."DCitas" (
    "IdCita" text,
    "IdUsu" text,
    "IdOrden" text,
    "Fecha" text,
    "Hora" text,
    "Duracion" text,
    "IdSitC" text,
    "IdSHC" text,
    "Texto" text,
    "FlgBloqueo" text,
    "Contacto" text,
    "Movil" text,
    "IdPac" text,
    "NUMPAC" text,
    "IdBox" text,
    "IdIcono" text,
    "Confirmada" text,
    "Aceptada" text,
    "NOTAS" text,
    "HorConsul" text,
    "HorLlegada" text,
    "BOX" text,
    "Retraso" text,
    "HorConsu" text,
    "IdMotivoAnulacion" text,
    "IdTarifa" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.DCitas');
-- ═══ 3.2 Pacientes ═════════════════════════════════════════════════════════
CREATE FOREIGN TABLE public."Pacientes" (
    "IdPac" text,
    "NumPac" text,
    "Nombre" text,
    "Apellidos" text,
    "NIF" text,
    "Tel1" text,
    "Tel2" text,
    "TelMovil" text,
    "Email" text,
    "FecNacim" text,
    "Direccion" text,
    "CP" text,
    "Poblacion" text,
    "Provincia" text,
    "Observaciones" text,
    "Notas" text,
    "Sexo" text,
    "FecAlta" text,
    "IdCentro" text,
    "IdMutua" text,
    "NumMutua" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.Pacientes');
-- ═══ 3.3 TColabos (Doctores / Colaboradores) ══════════════════════════════
CREATE FOREIGN TABLE public."TColabos" (
    "IdCol" text,
    "Alias" text,
    "Nombre" text,
    "Apellidos" text,
    "NIF" text,
    "Especialidad" text,
    "Activo" text,
    "Email" text,
    "Telefono" text,
    "IdCentro" text,
    "Color" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.TColabos');
-- ═══ 3.4 TtosMed (Tratamientos Médicos / Historial Clínico) ═══════════════
CREATE FOREIGN TABLE public."TtosMed" (
    "IdTto" text,
    "IdPac" text,
    "NumTto" text,
    "IdCol" text,
    "IdUser" text,
    "StaTto" text,
    "FecIni" text,
    "FecFin" text,
    "Notas" text,
    "Importe" text,
    "PiezasAdu" text,
    "IdTipoEspec" text,
    "CId" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.TtosMed');
-- ═══ 3.5 PRESUTTO (Líneas de Presupuesto) ═════════════════════════════════
CREATE FOREIGN TABLE public."PRESUTTO" (
    "Ident" text,
    "Id_Presu" text,
    "IdPac" text,
    "Orden" text,
    "IdTto" text,
    "StaTto" text,
    "FecIni" text,
    "IdTratamiento" text,
    "IdColabo" text,
    "Diente" text,
    "ImportePre" text,
    "Importe" text,
    "Notas" text,
    "BaseImponible" text,
    "TpcIVA" text,
    "ImporteIVA" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.PresuTTo');
-- ═══ 3.6 NV_CabFactura (Facturas) ═════════════════════════════════════════
CREATE FOREIGN TABLE public."NV_CabFactura" (
    "IdFactura" text,
    "NFactura" text,
    "Serie" text,
    "IdPac" text,
    "IdColabo" text,
    "Fecha" text,
    "Concepto" text,
    "BaseImponible" text,
    "TpcIVA" text,
    "ImporteIVA" text,
    "Total" text,
    "IdFormaPago" text,
    "Notas" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.NV_CabFactura');
-- ═══ 3.7 TArticulo (Inventario / Artículos) ═══════════════════════════════
CREATE FOREIGN TABLE public."TArticulo" (
    "IdArticulo" text,
    "Nombre" text,
    "Codigo" text,
    "SKU" text,
    "StockFisico" text,
    "PrecioCompra" text,
    "IdFamilia" text,
    "Activo" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.TArticulo');
-- ═══ 3.8 StckMov (Movimientos de Stock / Lotes) ═══════════════════════════
CREATE FOREIGN TABLE public."StckMov" (
    "IdMov" text,
    "IdArticulo" text,
    "Lote" text,
    "FecCaducidad" text,
    "Cantidad" text,
    "FecMov" text,
    "TipoMov" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.StckMov');
-- ═══ 3.9 BancoMov (Movimientos Bancarios) ═════════════════════════════════
CREATE FOREIGN TABLE public."BancoMov" (
    "Apunte" text,
    "Fecha" text,
    "Concepto" text,
    "Importe" text,
    "Tipo" text,
    "IdBanco" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.BancoMov');
-- ─── PASO 4: Permisos ─────────────────────────────────────────────────────
-- service_role (usado por la app)
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."DCitas" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."Pacientes" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."TColabos" TO service_role;
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
    DELETE ON public."TArticulo" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."StckMov" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."BancoMov" TO service_role;
-- anon (lectura pública)
GRANT SELECT ON public."DCitas" TO anon;
GRANT SELECT ON public."Pacientes" TO anon;
GRANT SELECT ON public."TColabos" TO anon;
GRANT SELECT ON public."TtosMed" TO anon;
GRANT SELECT ON public."PRESUTTO" TO anon;
GRANT SELECT ON public."NV_CabFactura" TO anon;
GRANT SELECT ON public."TArticulo" TO anon;
GRANT SELECT ON public."StckMov" TO anon;
GRANT SELECT ON public."BancoMov" TO anon;
-- ─── PASO 5: Verificación rápida ──────────────────────────────────────────
-- Ejecutar después de la migración para confirmar que todo funciona:
-- SELECT COUNT(*) AS total_citas       FROM public."DCitas";
-- SELECT COUNT(*) AS total_pacientes   FROM public."Pacientes";
-- SELECT COUNT(*) AS total_colabos     FROM public."TColabos";
-- SELECT COUNT(*) AS total_ttosmed     FROM public."TtosMed";
-- SELECT COUNT(*) AS total_presutto    FROM public."PRESUTTO";
-- SELECT COUNT(*) AS total_facturas    FROM public."NV_CabFactura";
-- SELECT COUNT(*) AS total_articulos   FROM public."TArticulo";
-- SELECT COUNT(*) AS total_stckmov     FROM public."StckMov";
-- SELECT COUNT(*) AS total_bancomov    FROM public."BancoMov";