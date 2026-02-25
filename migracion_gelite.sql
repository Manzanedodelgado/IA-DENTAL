-- 📥 SCRIPT DE MIGRACIÓN: GELITE ➔ SUPABASE 📥
-- Este script es una plantilla para el volcado masivo de datos.
-- Los datos deben extraerse del archivo MDF y formatearse como INSERTs.
-- 1. DESACTIVAR TRIGGERS TEMPORALMENTE (Opcional, para velocidad)
-- ALTER TABLE "Clientes" DISABLE TRIGGER ALL;
-- ALTER TABLE "DCitas" DISABLE TRIGGER ALL;
-- 2. EJEMPLO DE VOLCADO DE PACIENTES (Tabla: Clientes)
-- Importante: El IdCli se inserta manualmente (OVERRIDING SYSTEM VALUE)
INSERT INTO "Clientes" (
        "IdCli",
        "NumPac",
        "Nombre",
        "Apellidos",
        "NIF",
        "TelMovil",
        "FecNacim",
        "FecAlta"
    ) OVERRIDING SYSTEM VALUE
VALUES (
        4095,
        '4095',
        'JUAN ANTONIO',
        'MANZANEDO DELGADO',
        '52982664W',
        '600000000',
        '1985-12-12',
        '2019-11-06'
    ),
    (
        1024,
        '1024',
        'MARIA',
        'GARCIA LOPEZ',
        '00000000X',
        '611222333',
        '1990-01-01',
        '2020-05-10'
    );
-- 3. EJEMPLO DE VOLCADO DE CITAS (Tabla: DCitas)
INSERT INTO "DCitas" (
        "IdCita",
        "IdPac",
        "Fecha",
        "HorConsul",
        "Duracion",
        "Texto",
        "IdSitC"
    ) OVERRIDING SYSTEM VALUE
VALUES (
        100001,
        4095,
        '2020-06-26',
        '18:30:00',
        30,
        'Extraccion de cordal y raspado',
        0
    ),
    (
        100002,
        4095,
        '2020-08-27',
        '13:00:00',
        30,
        'Limpieza o Tartrectomia',
        0
    ),
    (
        100003,
        1024,
        '2024-02-22',
        '10:00:00',
        60,
        'Revisión General',
        0
    );
-- 4. EJEMPLO DE HISTORIAL CLÍNICO (Tabla: AgdNotas)
-- Se usa el IdPac numérico para mantener la relación íntegra.
INSERT INTO "AgdNotas" ("IdNota", "IdPac", "Fecha", "Nota", "FecIns") OVERRIDING SYSTEM VALUE
VALUES (
        50001,
        4095,
        '2020-06-26',
        '[S] Paciente refiere dolor leve [O] Inflamación retro molar [A] Cordal impactado [P] Programar exodoncia',
        '2020-06-26 18:45:00'
    ),
    (
        50002,
        1024,
        '2024-02-22',
        '[S] Primera visita [O] Higiene buena [A] Caries en 46 [P] Obturación',
        '2024-02-22 10:30:00'
    );
-- 5. REINICIAR LAS SECUENCIAS
-- Esto asegura que los nuevos registros creados desde la web (donde no ponemos ID) 
-- comiencen por encima del ID más alto migrado.
SELECT setval(
        pg_get_serial_sequence('"Clientes"', 'IdCli'),
        coalesce(max("IdCli"), 1),
        max("IdCli") IS NOT null
    )
FROM "Clientes";
SELECT setval(
        pg_get_serial_sequence('"DCitas"', 'IdCita'),
        coalesce(max("IdCita"), 1),
        max("IdCita") IS NOT null
    )
FROM "DCitas";
SELECT setval(
        pg_get_serial_sequence('"AgdNotas"', 'IdNota'),
        coalesce(max("IdNota"), 1),
        max("IdNota") IS NOT null
    )
FROM "AgdNotas";
-- 6. VOLVER A ACTIVAR TRIGGERS
-- ALTER TABLE "Clientes" ENABLE TRIGGER ALL;
-- ALTER TABLE "DCitas" ENABLE TRIGGER ALL;
-- ✅ MIGRACIÓN COMPLETADA EXITOSAMENTE