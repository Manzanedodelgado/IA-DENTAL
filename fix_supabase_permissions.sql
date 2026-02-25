-- Forzar limpieza profunda de permisos al rol ANON y autenticado en Supabase public schema:
GRANT USAGE ON SCHEMA public TO anon,
    authenticated;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon,
    authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon,
    authenticated;
GRANT ALL PRIVILEGES ON ALL ROUTINES IN SCHEMA public TO anon,
    authenticated;
-- Forzar permisos a cada tabla individual
DO $$
DECLARE r RECORD;
BEGIN FOR r IN (
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
) LOOP EXECUTE 'GRANT ALL PRIVILEGES ON TABLE public."' || r.tablename || '" TO anon, authenticated;';
END LOOP;
END;
$$;
-- Refrescar la caché interna
NOTIFY pgrst,
'reload schema';