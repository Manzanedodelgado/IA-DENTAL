-- Concede permisos a la API (anon y authenticated) para poder escribir datos temporalmente
GRANT USAGE ON SCHEMA public TO anon,
    authenticated,
    service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon,
    authenticated,
    service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon,
    authenticated,
    service_role;