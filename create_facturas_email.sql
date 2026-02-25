-- ─────────────────────────────────────────────────────────────────
--  facturas_email — Facturas de proveedores extraídas de Gmail
--  Ejecutar en Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.facturas_email (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    gmail_message_id text UNIQUE NOT NULL,
    enlace_gmail text,
    -- Proveedor
    proveedor text,
    proveedor_email text,
    -- Datos de la factura
    numero_factura text,
    concepto text,
    fecha_email timestamptz,
    fecha_factura date,
    -- Importes
    base_imponible numeric(12, 2),
    iva_pct numeric(5, 2),
    total numeric(12, 2),
    -- Meta
    tiene_adjunto boolean DEFAULT false,
    nombre_adjunto text,
    raw_snippet text,
    -- Conciliación con banco
    estado text DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'cruzado', 'descartado')),
    id_movimiento_banco text,
    -- FK libre a movimiento bancario
    -- Auditoría
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
-- Índices
CREATE INDEX IF NOT EXISTS idx_fe_fecha_email ON public.facturas_email (fecha_email DESC);
CREATE INDEX IF NOT EXISTS idx_fe_estado ON public.facturas_email (estado);
CREATE INDEX IF NOT EXISTS idx_fe_proveedor ON public.facturas_email (proveedor);
CREATE INDEX IF NOT EXISTS idx_fe_total ON public.facturas_email (total);
-- RLS: solo lectura/escritura para autenticados y anon (igual que el resto de tablas)
ALTER TABLE public.facturas_email ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_facturas_email" ON public.facturas_email;
CREATE POLICY "anon_read_facturas_email" ON public.facturas_email FOR
SELECT TO anon,
    authenticated USING (true);
DROP POLICY IF EXISTS "auth_write_facturas_email" ON public.facturas_email;
CREATE POLICY "auth_write_facturas_email" ON public.facturas_email FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_fe_updated_at ON public.facturas_email;
CREATE TRIGGER trg_fe_updated_at BEFORE
UPDATE ON public.facturas_email FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
-- Permitir service_role para upserts desde el backend
GRANT ALL ON public.facturas_email TO service_role;