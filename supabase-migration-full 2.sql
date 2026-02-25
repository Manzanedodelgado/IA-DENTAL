-- ═══════════════════════════════════════════════════════════════════
--  SmilePro — Migración Completa Supabase
--  Ejecutar en: https://supabase.com → SQL Editor
--  Orden: las FK requieren crear tablas en el orden listado
-- ═══════════════════════════════════════════════════════════════════
-- ── 0. Extensiones ────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
-- búsqueda de texto fuzzy
-- ── 1. PACIENTES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pacientes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_historia serial UNIQUE,
    -- número correlativo clínica
    nombre text NOT NULL,
    apellidos text NOT NULL,
    dni text UNIQUE,
    telefono text,
    email text,
    fecha_nacimiento date,
    tutor text,
    direccion text,
    ciudad text,
    codigo_postal text,
    profesion text,
    foto_url text,
    deuda boolean DEFAULT false,
    consentimientos_firmados boolean DEFAULT false,
    observaciones text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS pacientes_nombre_trgm ON pacientes USING gin((nombre || ' ' || apellidos) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS pacientes_dni ON pacientes(dni);
CREATE INDEX IF NOT EXISTS pacientes_telefono ON pacientes(telefono);
-- ── 2. ALERGIAS (ya existía, ampliar si es necesario) ─────────────
CREATE TABLE IF NOT EXISTS patient_allergies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
    nombre text NOT NULL,
    severidad text DEFAULT 'moderada',
    -- leve | moderada | grave
    created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS patient_allergies_paciente_id ON patient_allergies(paciente_id);
-- ── 3. MEDICACIONES (ya existía) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS patient_medications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid REFERENCES pacientes(id) ON DELETE CASCADE,
    nombre text NOT NULL,
    dosis text,
    frecuencia text,
    importante boolean DEFAULT false,
    categoria text,
    nota text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS patient_medications_paciente_id ON patient_medications(paciente_id);
-- ── 4. NOTAS SOAP ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS soap_notes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    fecha date NOT NULL DEFAULT CURRENT_DATE,
    doctor text NOT NULL,
    especialidad text NOT NULL DEFAULT 'General',
    subjetivo text DEFAULT '',
    objetivo text DEFAULT '',
    analisis text DEFAULT '',
    plan text DEFAULT '',
    firmada boolean DEFAULT false,
    eva integer DEFAULT 0 CHECK (
        eva BETWEEN 0 AND 10
    ),
    alertas_detectadas text [] DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS soap_notes_paciente_id ON soap_notes(paciente_id);
CREATE INDEX IF NOT EXISTS soap_notes_fecha ON soap_notes(fecha DESC);
-- ── 5. ODONTOGRAMA ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS odontograma_piezas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    numero_pieza integer NOT NULL,
    -- Notación FDI: 11-48
    estado text DEFAULT 'sano',
    -- sano, caries, tratado, ausente, implante, corona, puente, fractura
    color text,
    notas text,
    updated_at timestamptz DEFAULT now(),
    UNIQUE(paciente_id, numero_pieza)
);
CREATE INDEX IF NOT EXISTS odontograma_paciente_id ON odontograma_piezas(paciente_id);
-- ── 6. CITAS (AGENDA) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS citas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid REFERENCES pacientes(id) ON DELETE
    SET NULL,
        nombre_paciente text NOT NULL,
        gabinete text NOT NULL DEFAULT 'G1',
        fecha date NOT NULL,
        hora_inicio time NOT NULL,
        duracion_minutos integer NOT NULL DEFAULT 30,
        tratamiento text,
        categoria text DEFAULT 'Diagnostico',
        -- Cirugía, Higiene, Ortodoncia, Diagnostico, Urgencia, Protesis
        estado text DEFAULT 'planificada',
        -- planificada, confirmada, espera, gabinete, finalizada, fallada, bloqueo_bio
        doctor text,
        alertas_medicas text [] DEFAULT '{}',
        alertas_legales text [] DEFAULT '{}',
        alertas_financieras boolean DEFAULT false,
        presupuesto_pendiente boolean DEFAULT false,
        pruebas_pendientes boolean DEFAULT false,
        trabajo_laboratorio boolean DEFAULT false,
        es_padre_desinfeccion boolean DEFAULT false,
        notas text,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS citas_fecha ON citas(fecha);
CREATE INDEX IF NOT EXISTS citas_paciente_id ON citas(paciente_id);
CREATE INDEX IF NOT EXISTS citas_gabinete_fecha ON citas(gabinete, fecha);
-- ── 7. CONFIGURACIÓN AGENDA ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS configuracion_agenda (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dia_semana integer NOT NULL,
    -- 0=Dom, 1=Lun ... 6=Sáb
    hora_inicio_am time,
    hora_fin_am time,
    hora_inicio_pm time,
    hora_fin_pm time,
    activo boolean DEFAULT true,
    UNIQUE(dia_semana)
);
-- Horario por defecto clínica Rubio García
INSERT INTO configuracion_agenda (
        dia_semana,
        hora_inicio_am,
        hora_fin_am,
        hora_inicio_pm,
        hora_fin_pm,
        activo
    )
VALUES (1, '10:00', '14:00', '16:00', '20:00', true),
    -- Lunes
    (2, '10:00', '14:00', '16:00', '20:00', true),
    -- Martes
    (3, '10:00', '14:00', '16:00', '20:00', true),
    -- Miércoles
    (4, '10:00', '14:00', '16:00', '20:00', true),
    -- Jueves
    (5, '10:00', '14:00', NULL, NULL, true),
    -- Viernes (solo mañana)
    (6, NULL, NULL, NULL, NULL, false),
    -- Sábado (cerrado)
    (0, NULL, NULL, NULL, NULL, false) -- Domingo (cerrado)
    ON CONFLICT (dia_semana) DO NOTHING;
-- ── 8. BLOQUEOS AGENDA ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bloqueos_agenda (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    motivo text,
    gabinete text,
    -- NULL = todos los gabinetes
    created_at timestamptz DEFAULT now()
);
-- ── 9. PRESUPUESTOS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS presupuestos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid REFERENCES pacientes(id) ON DELETE
    SET NULL,
        numero serial UNIQUE,
        descripcion text,
        estado text DEFAULT 'pendiente',
        -- pendiente, aceptado, rechazado, completado
        total numeric(10, 2) DEFAULT 0,
        doctor text,
        fecha_emision date DEFAULT CURRENT_DATE,
        fecha_aceptacion date,
        notas text,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS presupuestos_paciente_id ON presupuestos(paciente_id);
CREATE TABLE IF NOT EXISTS presupuesto_lineas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    presupuesto_id uuid NOT NULL REFERENCES presupuestos(id) ON DELETE CASCADE,
    descripcion text NOT NULL,
    cantidad integer DEFAULT 1,
    precio_unitario numeric(10, 2) DEFAULT 0,
    subtotal numeric(10, 2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    pieza_dental text,
    created_at timestamptz DEFAULT now()
);
-- ── 10. FACTURAS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS facturas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_factura text UNIQUE NOT NULL,
    paciente_id uuid REFERENCES pacientes(id) ON DELETE
    SET NULL,
        nombre_cliente text NOT NULL,
        nif_cliente text,
        presupuesto_id uuid REFERENCES presupuestos(id),
        concepto text,
        base_imponible numeric(10, 2) DEFAULT 0,
        iva_porcentaje numeric(5, 2) DEFAULT 0,
        total numeric(10, 2) DEFAULT 0,
        fecha date NOT NULL DEFAULT CURRENT_DATE,
        estado_cobro text DEFAULT 'pendiente',
        -- liquidado, pendiente, impagado
        estado_aeat text DEFAULT 'pendiente',
        -- verificado, enviando, error, pendiente
        metodo_pago text,
        -- efectivo, tarjeta, transferencia, financiado
        notas text,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS facturas_paciente_id ON facturas(paciente_id);
CREATE INDEX IF NOT EXISTS facturas_fecha ON facturas(fecha DESC);
-- ── 11. GASTOS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gastos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    concepto text NOT NULL,
    proveedor text,
    base_imponible numeric(10, 2),
    iva_porcentaje numeric(5, 2) DEFAULT 21,
    total numeric(10, 2),
    fecha date NOT NULL DEFAULT CURRENT_DATE,
    categoria text,
    -- suministros, alquiler, nominas, laboratorio...
    created_at timestamptz DEFAULT now()
);
-- ── 12. MOVIMIENTOS BANCO ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS movimientos_banco (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    descripcion text NOT NULL,
    importe numeric(10, 2) NOT NULL,
    tipo text NOT NULL,
    -- 'entrada' | 'salida'
    fecha date NOT NULL,
    factura_id uuid REFERENCES facturas(id),
    reconciliado boolean DEFAULT false,
    entidad_bancaria text,
    created_at timestamptz DEFAULT now()
);
-- ── 13. INVENTARIO ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventario_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre text NOT NULL,
    sku text UNIQUE,
    categoria text DEFAULT 'Desechable',
    -- Implante, Desechable, Instrumental
    stock_fisico integer DEFAULT 0,
    stock_virtual integer DEFAULT 0,
    minimo_reorden integer DEFAULT 0,
    precio_medio numeric(10, 2),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS inventario_lotes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id uuid NOT NULL REFERENCES inventario_items(id) ON DELETE CASCADE,
    batch_id text UNIQUE,
    lote_fabricante text,
    fecha_caducidad date,
    cantidad integer DEFAULT 0,
    estado text DEFAULT 'OK',
    -- OK, Caducidad_Proxima, Caducado, Cuarentena_Sanitaria
    ubicacion text,
    temperatura_alerta boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inventario_lotes_item_id ON inventario_lotes(item_id);
CREATE INDEX IF NOT EXISTS inventario_lotes_caducidad ON inventario_lotes(fecha_caducidad);
-- ── 14. TRAZABILIDAD ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trazabilidad_consumos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id uuid REFERENCES inventario_items(id),
    lote_id uuid REFERENCES inventario_lotes(id),
    paciente_id uuid REFERENCES pacientes(id),
    cita_id uuid REFERENCES citas(id),
    doctor text,
    cantidad integer DEFAULT 1,
    tipo text DEFAULT 'Consumo',
    -- Consumo, Devolución, Merma
    fecha timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS trazabilidad_paciente ON trazabilidad_consumos(paciente_id);
CREATE INDEX IF NOT EXISTS trazabilidad_fecha ON trazabilidad_consumos(fecha DESC);
-- ── 15. CONVERSACIONES WHATSAPP ───────────────────────────────────
CREATE TABLE IF NOT EXISTS conversaciones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid REFERENCES pacientes(id),
    telefono text NOT NULL,
    nombre_contacto text,
    ultimo_mensaje text,
    ultima_actividad timestamptz DEFAULT now(),
    sara_activa boolean DEFAULT true,
    no_leidos integer DEFAULT 0,
    UNIQUE(telefono)
);
CREATE TABLE IF NOT EXISTS mensajes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversacion_id uuid NOT NULL REFERENCES conversaciones(id) ON DELETE CASCADE,
    contenido text NOT NULL,
    emisor text NOT NULL DEFAULT 'sara',
    -- 'paciente' | 'sara' | 'clinica'
    timestamp timestamptz DEFAULT now(),
    leido boolean DEFAULT false,
    tipo text DEFAULT 'texto' -- texto, imagen, documento
);
CREATE INDEX IF NOT EXISTS mensajes_conversacion ON mensajes(conversacion_id, timestamp DESC);
-- ── 16. PLANTILLAS IA ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plantillas_mensaje (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre text NOT NULL,
    contenido text NOT NULL,
    trigger_evento text,
    -- planificada, cierre_cirugia, bienvenida_1visita...
    activa boolean DEFAULT true,
    canal text DEFAULT 'whatsapp',
    created_at timestamptz DEFAULT now()
);
-- Plantillas por defecto
INSERT INTO plantillas_mensaje (nombre, contenido, trigger_evento)
VALUES (
        'Bienvenida 1ª Visita',
        'Hola {{nombre}}, te confirmamos tu primera cita en Rubio García Dental el {{fecha}} a las {{hora}}. Si necesitas algo, escríbenos. ¡Hasta pronto!',
        'planificada'
    ),
    (
        'Pack Post-Quirúrgico',
        'Hola {{nombre}}, esperamos que te encuentres bien tras tu intervención de hoy. Recuerda: {{instrucciones}}. Cualquier duda, contacta con nosotros inmediatamente.',
        'cierre_cirugia'
    ),
    (
        'Recordatorio Cita',
        'Hola {{nombre}}, te recordamos que mañana tienes cita en Rubio García Dental a las {{hora}}. Confirma respondiendo SÍ.',
        'recordatorio_24h'
    ) ON CONFLICT DO NOTHING;
-- ── 17. DOCUMENTOS PACIENTE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS documentos_paciente (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    paciente_id uuid NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    nombre text NOT NULL,
    tipo text,
    -- consentimiento, radiografia, presupuesto, informe...
    url text,
    -- ruta en Supabase Storage
    firmado boolean DEFAULT false,
    fecha date DEFAULT CURRENT_DATE,
    created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS documentos_paciente_id ON documentos_paciente(paciente_id);
-- ═══════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY — política abierta para la clínica
--  Ajustar con auth.uid() cuando se implemente autenticación de staff
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE soap_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE odontograma_piezas ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion_agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE bloqueos_agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuestos ENABLE ROW LEVEL SECURITY;
ALTER TABLE presupuesto_lineas ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimientos_banco ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario_lotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE trazabilidad_consumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE plantillas_mensaje ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos_paciente ENABLE ROW LEVEL SECURITY;
-- Políticas de acceso total para la clínica (anon key con acceso controlado)
DO $$
DECLARE t text;
BEGIN FOR t IN
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public' LOOP EXECUTE format(
        'CREATE POLICY IF NOT EXISTS "clinic_access_%s" ON %I FOR ALL USING (true)',
        t,
        t
    );
END LOOP;
END $$;
-- ═══════════════════════════════════════════════════════════════════
--  TRIGGERS updated_at automático
-- ═══════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DO $$
DECLARE t text;
BEGIN FOR t IN
SELECT table_name
FROM information_schema.columns
WHERE column_name = 'updated_at'
    AND table_schema = 'public' LOOP EXECUTE format(
        'DROP TRIGGER IF EXISTS set_%s_updated_at ON %I',
        t,
        t
    );
EXECUTE format(
    'CREATE TRIGGER set_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
    t,
    t
);
END LOOP;
END $$;