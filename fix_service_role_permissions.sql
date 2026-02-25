-- Otorgar permisos incondicionales al rol 'service_role' para esquivar el error 403
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL ROUTINES IN SCHEMA public TO service_role;
-- Asegurar que futuras tablas creadas tambien lo reciban
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO service_role;
-- Forzar el rol en cada tabla individualmente
DO $$
DECLARE r RECORD;
BEGIN FOR r IN (
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
) LOOP EXECUTE 'GRANT ALL PRIVILEGES ON TABLE public."' || r.tablename || '" TO service_role;';
END LOOP;
END;
$$;
-- Refrescar cache de esquemas de Supabase PostgREST para aplicar cambios instantaneamente
NOTIFY pgrst,
'reload schema';