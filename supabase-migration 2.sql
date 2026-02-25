-- ─────────────────────────────────────────────────────────────────
--  SmilePro — Migración Supabase
--  Ejecutar en: https://supabase.com → SQL Editor
-- ─────────────────────────────────────────────────────────────────
-- Medicaciones del paciente
CREATE TABLE IF NOT EXISTS patient_medications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id text NOT NULL,
    nombre text NOT NULL,
    dosis text,
    frecuencia text,
    importante boolean DEFAULT false,
    categoria text,
    nota text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
-- Alergias del paciente
CREATE TABLE IF NOT EXISTS patient_allergies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id text NOT NULL,
    nombre text NOT NULL,
    severidad text DEFAULT 'moderada',
    -- leve | moderada | grave
    created_at timestamptz DEFAULT now()
);
-- ── Row Level Security ─────────────────────────────────────────
ALTER TABLE patient_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_allergies ENABLE ROW LEVEL SECURITY;
-- Política abierta para la clínica (ajustar con auth.uid() cuando uses Auth)
CREATE POLICY "clinic_full_access_medications" ON patient_medications FOR ALL USING (true);
CREATE POLICY "clinic_full_access_allergies" ON patient_allergies FOR ALL USING (true);
-- ── Índices ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS patient_medications_paciente_id ON patient_medications(paciente_id);
CREATE INDEX IF NOT EXISTS patient_allergies_paciente_id ON patient_allergies(paciente_id);
-- ── Trigger updated_at ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER set_medications_updated_at BEFORE
UPDATE ON patient_medications FOR EACH ROW EXECUTE FUNCTION update_updated_at();