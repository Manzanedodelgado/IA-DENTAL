-- ═══════════════════════════════════════════════════════════════════════════════
--  actualizar_fdw_a_vistas.sql
--  EJECUTAR EN SUPABASE SQL EDITOR (después de crear las vistas en SQL Server)
--
--  Redefine las foreign tables para que apunten a las vistas _v
--  en vez de a las tablas directas. Las vistas ya hacen CAST de
--  tinyint→int, numeric→varchar, smalldatetime→varchar.
-- ═══════════════════════════════════════════════════════════════════════════════
-- ─── PASO 1: DROP foreign tables actuales ───────────────────────────────────
DROP FOREIGN TABLE IF EXISTS public."Pacientes";
DROP FOREIGN TABLE IF EXISTS public."TtosMed";
DROP FOREIGN TABLE IF EXISTS public."PRESUTTO";
DROP FOREIGN TABLE IF EXISTS public."DCitas";
DROP FOREIGN TABLE IF EXISTS public."NV_CabFactura";
DROP FOREIGN TABLE IF EXISTS public."TColabos";
-- ─── PASO 2: Recrear apuntando a las vistas _v ─────────────────────────────
-- ═══ Pacientes (apunta a dbo.Pacientes_v) ═══════════════════════════════════
CREATE FOREIGN TABLE public."Pacientes" (
    "IdPac" integer,
    "NumPac" text,
    "Nombre" text,
    "Apellidos" text,
    "NIF" text,
    "Tel1" text,
    "Tel2" text,
    "TelMovil" text,
    "Email" text,
    "FecNacim" text,
    -- ya convertida a varchar en la vista
    "Direccion" text,
    "CP" text,
    "Notas" text,
    "Sexo" text,
    "FecAlta" text,
    -- ya convertida a varchar en la vista
    "IdCentro" integer,
    "Observaciones" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.Pacientes_v');
-- ═══ TtosMed (apunta a dbo.TtosMed_v) ══════════════════════════════════════
CREATE FOREIGN TABLE public."TtosMed" (
    "IdPac" integer,
    "NumTto" integer,
    "IdTto" integer,
    "IdCol" integer,
    "IdUser" integer,
    "StaTto" integer,
    -- tinyint→int en la vista
    "FecIni" text,
    -- smalldatetime→varchar en la vista
    "FecFin" text,
    -- smalldatetime→varchar en la vista
    "Notas" text,
    "Importe" text,
    -- numeric→varchar en la vista
    "Dto" integer,
    "Pendiente" text,
    -- float→varchar en la vista
    "IdTipoOdg" integer,
    "Actos" integer,
    -- tinyint→int en la vista
    "Tiempo" integer,
    "Ident" integer,
    "Autoriz" text,
    "IdCentro" integer,
    "ImporteDto" text,
    -- numeric→varchar en la vista
    "SesRealiz" integer,
    "CId" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.TtosMed_v');
-- ═══ PRESUTTO (apunta a dbo.PresuTTo_v) ═════════════════════════════════════
CREATE FOREIGN TABLE public."PRESUTTO" (
    "IdPac" integer,
    "NumSerie" integer,
    "NumPre" integer,
    "LinPre" integer,
    "IdTto" integer,
    "StaTto" integer,
    -- tinyint→int en la vista
    "FecIni" text,
    -- smalldatetime→varchar en la vista
    "IdCol" integer,
    "Unidades" integer,
    "ImportePre" text,
    -- numeric→varchar en la vista
    "Dto" integer,
    "Notas" text,
    "IdTipoOdg" integer,
    "BaseImponible" text,
    -- numeric→varchar en la vista
    "TpcIVA" text,
    -- numeric→varchar en la vista
    "ImporteIVA" text,
    -- numeric→varchar en la vista
    "ImporteUni" text,
    -- numeric→varchar en la vista
    "ImporteDto" text,
    -- numeric→varchar en la vista
    "Ident" integer,
    "Orden" integer,
    "IdTratamiento" integer,
    "Id_Presu" integer,
    "IdColAux" integer,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.PresuTTo_v');
-- ═══ DCitas (apunta a dbo.DCitas_v) ═════════════════════════════════════════
CREATE FOREIGN TABLE public."DCitas" (
    "IdUsu" integer,
    "IdOrden" integer,
    "Fecha" integer,
    "Hora" integer,
    "Duracion" integer,
    "IdSitC" integer,
    "Texto" text,
    "FlgBloqueo" text,
    "Contacto" text,
    "Movil" text,
    "IdPac" integer,
    "HorLlegada" integer,
    "Retraso" integer,
    "BOX" text,
    "HorConsul" integer,
    "HorFinal" integer,
    "NOTAS" text,
    "NUMPAC" text,
    "Recordada" integer,
    -- tinyint→int en la vista
    "Confirmada" integer,
    -- tinyint→int en la vista
    "IdBox" integer,
    "NumOcur" integer,
    "IdUserIns" integer,
    "IdCol" integer,
    "IdCentro" integer,
    "IdIcono" integer,
    "IdMotivoAnulacion" integer,
    "IdTarifa" integer,
    "IdTipoEspec" integer,
    "NIF" text,
    "Email" text,
    "FecAlta" text,
    -- smalldatetime→varchar en la vista
    "Aceptada" text,
    -- smalldatetime→varchar en la vista
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.DCitas_v');
-- ═══ NV_CabFactura (apunta a dbo.NV_CabFactura_v) ══════════════════════════
CREATE FOREIGN TABLE public."NV_CabFactura" (
    "IdFactura" integer,
    "NFactura" text,
    "Serie" text,
    "IdPac" integer,
    "IdColabo" integer,
    "Fecha" text,
    -- datetime→varchar en la vista
    "Concepto" text,
    "BaseImponible" text,
    -- numeric→varchar en la vista
    "TpcIVA" text,
    -- numeric→varchar en la vista
    "ImporteIVA" text,
    -- numeric→varchar en la vista
    "Total" text,
    -- numeric→varchar en la vista
    "IdFormaPago" integer,
    "Notas" text,
    "Guid_Tenant" text
) SERVER mssql_wrapper_server OPTIONS (table 'dbo.NV_CabFactura_v');
-- ═══ TColabos (esta no cambia, no tiene tipos problemáticos) ════════════════
CREATE FOREIGN TABLE public."TColabos" (
    "IdCol" integer,
    "Alias" text,
    "Nombre" text,
    "Apellidos" text,
    "NIF" text,
    "Especialidad" text,
    "Activo" text,
    "Email" text,
    "Telefono" text,
    "IdCentro" integer,
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
    DELETE ON public."TtosMed" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."PRESUTTO" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."DCitas" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."NV_CabFactura" TO service_role;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON public."TColabos" TO service_role;
GRANT SELECT ON public."Pacientes" TO anon;
GRANT SELECT ON public."TtosMed" TO anon;
GRANT SELECT ON public."PRESUTTO" TO anon;
GRANT SELECT ON public."DCitas" TO anon;
GRANT SELECT ON public."NV_CabFactura" TO anon;
GRANT SELECT ON public."TColabos" TO anon;
-- ─── PASO 4: Recargar schema PostgREST ──────────────────────────────────────
NOTIFY pgrst,
'reload schema';
-- ─── PASO 5: Verificación ──────────────────────────────────────────────────
-- Ejecutar DESPUÉS para confirmar:
-- SELECT "IdPac","NumPac","Nombre","FecNacim","FecAlta" FROM public."Pacientes" LIMIT 3;
-- SELECT "IdPac","NumTto","StaTto","FecIni","Importe","Notas" FROM public."TtosMed" LIMIT 3;
-- SELECT "IdPac","Notas","ImportePre","StaTto","FecIni" FROM public."PRESUTTO" LIMIT 3;
-- SELECT "IdPac","Fecha","Hora","Texto","Confirmada","FecAlta" FROM public."DCitas" LIMIT 3;
-- SELECT "IdPac","NFactura","Total","Fecha" FROM public."NV_CabFactura" LIMIT 3;