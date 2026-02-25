-- ══════════════════════════════════════════════════════
--  CREAR TABLA soap_notes
--  Copiar y ejecutar en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.soap_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id TEXT NOT NULL,
    -- NUMPAC del paciente
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    doctor TEXT,
    especialidad TEXT DEFAULT 'General',
    subjetivo TEXT DEFAULT '',
    objetivo TEXT DEFAULT '',
    analisis TEXT DEFAULT '',
    plan TEXT DEFAULT '',
    eva INTEGER DEFAULT 0,
    firmada BOOLEAN DEFAULT false,
    alertas_detectadas TEXT [] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Índice para buscar notas de un paciente rápido
CREATE INDEX IF NOT EXISTS idx_soap_notes_paciente ON public.soap_notes(paciente_id);
-- Acceso total (herramienta interna de clínica)
ALTER TABLE public.soap_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS rls_soap_notes ON public.soap_notes;
CREATE POLICY rls_soap_notes ON public.soap_notes FOR ALL TO anon,
authenticated USING (true) WITH CHECK (true);
GRANT ALL ON public.soap_notes TO anon,
    authenticated;