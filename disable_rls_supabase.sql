-- Desactiva inmediatamente la seguridad de filas (RLS) en todas las tablas
-- Esto permitirá a la API cargar los millones de datos de la migración sin restricciones.
DO $$
DECLARE r RECORD;
BEGIN FOR r IN (
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
) LOOP EXECUTE 'ALTER TABLE public."' || r.tablename || '" DISABLE ROW LEVEL SECURITY;';
END LOOP;
END;
$$;