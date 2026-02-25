-- ══════════════════════════════════════════════════════
--  Habilitar acceso anon a las tablas principales
--  Pegar en Supabase → SQL Editor → Run
-- ══════════════════════════════════════════════════════
-- Pacientes
ALTER TABLE public."Pacientes" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_pacientes" ON public."Pacientes";
CREATE POLICY "anon_read_pacientes" ON public."Pacientes" FOR
SELECT TO anon,
    authenticated USING (true);
-- DCitas
ALTER TABLE public."DCitas" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_dcitas" ON public."DCitas";
CREATE POLICY "anon_read_dcitas" ON public."DCitas" FOR
SELECT TO anon,
    authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_dcitas" ON public."DCitas";
CREATE POLICY "anon_insert_dcitas" ON public."DCitas" FOR
INSERT TO anon,
    authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_dcitas" ON public."DCitas";
CREATE POLICY "anon_update_dcitas" ON public."DCitas" FOR
UPDATE TO anon,
    authenticated USING (true);
DROP POLICY IF EXISTS "anon_delete_dcitas" ON public."DCitas";
CREATE POLICY "anon_delete_dcitas" ON public."DCitas" FOR DELETE TO anon,
authenticated USING (true);
-- Grant SELECT en Pacientes al rol anon
GRANT SELECT ON public."Pacientes" TO anon;
GRANT SELECT ON public."Pacientes" TO authenticated;
GRANT ALL ON public."DCitas" TO anon;
GRANT ALL ON public."DCitas" TO authenticated;