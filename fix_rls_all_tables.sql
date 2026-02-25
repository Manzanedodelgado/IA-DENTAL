-- ═══════════════════════════════════════════════════════════════════
--  fix_rls_all_tables.sql
--  Otorga permisos de lectura al rol `anon` y `authenticated` sobre
--  todas las tablas clínicas de GELITE que actualmente devuelven 401.
--
--  EJECUTAR EN: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════
-- ─── 1. GRANT SELECT a nivel de esquema ────────────────────────────
GRANT USAGE ON SCHEMA public TO anon,
    authenticated;
-- ─── 2. Tablas clínicas y de pacientes ────────────────────────────
GRANT SELECT ON public."Pacientes" TO anon,
    authenticated;
GRANT SELECT ON public."TtosMed" TO anon,
    authenticated;
GRANT SELECT ON public."TtosMedFases" TO anon,
    authenticated;
GRANT SELECT ON public."TtosMedImplantes" TO anon,
    authenticated;
GRANT SELECT ON public."PRESUTTO" TO anon,
    authenticated;
GRANT SELECT ON public."PRESU" TO anon,
    authenticated;
GRANT SELECT ON public."DCitas" TO anon,
    authenticated;
GRANT SELECT ON public."DCitasGrp" TO anon,
    authenticated;
GRANT SELECT ON public."DCitasLogSit" TO anon,
    authenticated;
GRANT SELECT ON public."DCitasPeriod" TO anon,
    authenticated;
GRANT SELECT ON public."DCitasTto" TO anon,
    authenticated;
GRANT SELECT ON public."ExplPerio" TO anon,
    authenticated;
GRANT SELECT ON public."PacPerio" TO anon,
    authenticated;
GRANT SELECT ON public."PacientesPublic" TO anon,
    authenticated;
GRANT SELECT ON public."Pacientes_Conversaciones" TO anon,
    authenticated;
GRANT SELECT ON public."Pacientes_Tarifas" TO anon,
    authenticated;
-- ─── 3. Facturación y documentos ─────────────────────────────────
GRANT SELECT ON public."NV_CabFactura" TO anon,
    authenticated;
GRANT SELECT ON public."NV_DetFactura" TO anon,
    authenticated;
GRANT SELECT ON public."DocsFirmados" TO anon,
    authenticated;
GRANT SELECT ON public."Digit_PdfPresupuestos" TO anon,
    authenticated;
GRANT SELECT ON public."DocsPublicados_CPS" TO anon,
    authenticated;
GRANT SELECT ON public."EdDocs" TO anon,
    authenticated;
GRANT SELECT ON public."TDocsAdjuntos" TO anon,
    authenticated;
GRANT SELECT ON public."RecetasCab" TO anon,
    authenticated;
GRANT SELECT ON public."RecetasDet" TO anon,
    authenticated;
GRANT SELECT ON public."PagoCli" TO anon,
    authenticated;
GRANT SELECT ON public."DeudaPago" TO anon,
    authenticated;
-- ─── 4. Tablas maestras / configuración ──────────────────────────
GRANT SELECT ON public."Centros" TO anon,
    authenticated;
GRANT SELECT ON public."TColabos" TO anon,
    authenticated;
GRANT SELECT ON public."TUsers" TO anon,
    authenticated;
GRANT SELECT ON public."TForPago" TO anon,
    authenticated;
GRANT SELECT ON public."TCentros" TO anon,
    authenticated;
GRANT SELECT ON public."TDiagnosticos" TO anon,
    authenticated;
GRANT SELECT ON public."CCDiagnosticos" TO anon,
    authenticated;
GRANT SELECT ON public."Clientes" TO anon,
    authenticated;
GRANT SELECT ON public."AGDNOTAS" TO anon,
    authenticated;
-- ─── 5. SOAP notes (ya tiene permisos, confirmamos) ──────────────
GRANT SELECT,
    INSERT,
    UPDATE ON public."soap_notes" TO anon,
    authenticated;
-- ─── 6. Activar RLS en cada tabla (si no está ya activado) ────────
ALTER TABLE public."Pacientes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TtosMed" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TtosMedFases" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TtosMedImplantes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."PRESUTTO" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."PRESU" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."DCitas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."DCitasTto" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ExplPerio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."PacPerio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."NV_CabFactura" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."NV_DetFactura" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."DocsFirmados" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."RecetasCab" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."RecetasDet" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."PagoCli" ENABLE ROW LEVEL SECURITY;
-- ─── 7. Políticas de lectura pública (SELECT) ─────────────────────
-- Nota: DROP IF EXISTS primero para no duplicar si ya existen
DO $$
DECLARE tbl TEXT;
tables TEXT [] := ARRAY [
    'Pacientes','TtosMed','TtosMedFases','TtosMedImplantes',
    'PRESUTTO','PRESU','DCitas','DCitasTto',
    'ExplPerio','PacPerio',
    'NV_CabFactura','NV_DetFactura','DocsFirmados',
    'RecetasCab','RecetasDet','PagoCli','DeudaPago',
    'Centros','TColabos','TUsers','TForPago','CCDiagnosticos',
    'TDiagnosticos','Clientes','AGDNOTAS'
  ];
BEGIN FOREACH tbl IN ARRAY tables LOOP EXECUTE format(
    '
      DROP POLICY IF EXISTS "anon_read_%s" ON public."%s";
      CREATE POLICY "anon_read_%s"
        ON public."%s"
        FOR SELECT
        TO anon, authenticated
        USING (true);
    ',
    tbl,
    tbl,
    tbl,
    tbl
);
END LOOP;
END $$;
-- ─── Verificación rápida ──────────────────────────────────────────
SELECT schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename IN (
        'Pacientes',
        'TtosMed',
        'PRESUTTO',
        'DCitas',
        'ExplPerio',
        'NV_CabFactura',
        'DocsFirmados',
        'RecetasCab',
        'PagoCli'
    )
ORDER BY tablename;