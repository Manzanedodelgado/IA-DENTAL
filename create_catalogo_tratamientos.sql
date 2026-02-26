-- ══════════════════════════════════════════════════════
--  CREAR TABLA catalogo_tratamientos + ALTER soap_notes
--  Ejecutar en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════
-- 1. Catálogo maestro de tratamientos
CREATE TABLE IF NOT EXISTS public.catalogo_tratamientos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    -- "OBTURACION", "LIMPIEZA"...
    categoria TEXT DEFAULT 'General',
    -- Implantología, Ortodoncia...
    tipo_aplicacion TEXT NOT NULL DEFAULT 'boca',
    -- 'pieza' | 'arcada' | 'cuadrante' | 'boca'
    precio NUMERIC(10, 2) DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    orden INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_cat_ttos_nombre ON public.catalogo_tratamientos(nombre);
CREATE INDEX IF NOT EXISTS idx_cat_ttos_categoria ON public.catalogo_tratamientos(categoria);
-- RLS abierto (herramienta interna)
ALTER TABLE public.catalogo_tratamientos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS rls_cat_ttos ON public.catalogo_tratamientos;
CREATE POLICY rls_cat_ttos ON public.catalogo_tratamientos FOR ALL TO anon,
authenticated USING (true) WITH CHECK (true);
GRANT ALL ON public.catalogo_tratamientos TO anon,
    authenticated;
GRANT USAGE,
    SELECT ON SEQUENCE catalogo_tratamientos_id_seq TO anon,
    authenticated;
-- 2. Añadir columnas de tratamiento a soap_notes
ALTER TABLE public.soap_notes
ADD COLUMN IF NOT EXISTS tratamiento_id INTEGER REFERENCES catalogo_tratamientos(id),
    ADD COLUMN IF NOT EXISTS tratamiento_nombre TEXT,
    -- snapshot del nombre al crear
ADD COLUMN IF NOT EXISTS pieza INTEGER,
    -- 11-48 si tipo=pieza
ADD COLUMN IF NOT EXISTS cuadrante INTEGER,
    -- 1-4 si tipo=cuadrante
ADD COLUMN IF NOT EXISTS arcada TEXT;
-- 'superior'|'inferior' si tipo=arcada