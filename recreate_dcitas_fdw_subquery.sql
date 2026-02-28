-- ═══════════════════════════════════════════════════════════════════
--  Recrear DCitas como FDW con subquery que transforma TODOS los campos
--  Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════
DROP FOREIGN TABLE IF EXISTS public."DCitas";
CREATE FOREIGN TABLE public."DCitas" (
    "Registro" text,
    "NumPac" text,
    "Apellidos" text,
    "Nombre" text,
    "TelMovil" text,
    "Fecha" text,
    "Hora" text,
    "EstadoCita" text,
    "Tratamiento" text,
    "Odontologo" text,
    "Notas" text,
    "Duracion" integer
) SERVER mssql_wrapper_server OPTIONS (
    table '(SELECT
        CAST(IdCita AS varchar(50)) AS Registro,
        NUMPAC AS NumPac,
        CASE
            WHEN CHARINDEX('','', Texto) > 0 THEN LTRIM(RTRIM(LEFT(Texto, CHARINDEX('','', Texto) - 1)))
            ELSE NULL
        END AS Apellidos,
        CASE
            WHEN CHARINDEX('','', Texto) > 0 THEN LTRIM(RTRIM(SUBSTRING(Texto, CHARINDEX('','', Texto) + 1, LEN(Texto))))
            ELSE Texto
        END AS Nombre,
        Movil AS TelMovil,
        CONVERT(VARCHAR(10), DATEADD(DAY, Fecha - 2, ''1900-01-01''), 23) AS Fecha,
        CONVERT(VARCHAR(5), DATEADD(SECOND, Hora, 0), 108) AS Hora,
        CASE
            WHEN IdSitC = 0 THEN ''Planificada''
            WHEN IdSitC = 1 THEN ''Anulada''
            WHEN IdSitC = 5 THEN ''Finalizada''
            WHEN IdSitC = 7 THEN ''Confirmada''
            WHEN IdSitC = 8 THEN ''Cancelada''
            ELSE ''Desconocido''
        END AS EstadoCita,
        CASE
            WHEN CAST(IdIcono AS int) = 1 THEN ''Control''
            WHEN CAST(IdIcono AS int) = 2 THEN ''Urgencia''
            WHEN CAST(IdIcono AS int) = 3 THEN ''Protesis Fija''
            WHEN CAST(IdIcono AS int) = 4 THEN ''Cirugia/Injerto''
            WHEN CAST(IdIcono AS int) = 6 THEN ''Retirar Ortodoncia''
            WHEN CAST(IdIcono AS int) = 7 THEN ''Protesis Removible''
            WHEN CAST(IdIcono AS int) = 8 THEN ''Colocacion Ortodoncia''
            WHEN CAST(IdIcono AS int) = 9 THEN ''Periodoncia''
            WHEN CAST(IdIcono AS int) = 10 THEN ''Cirugia de Implante''
            WHEN CAST(IdIcono AS int) = 11 THEN ''Mensualidad Ortodoncia''
            WHEN CAST(IdIcono AS int) = 12 THEN ''Ajuste Prot/tto''
            WHEN CAST(IdIcono AS int) = 13 THEN ''Primera Visita''
            WHEN CAST(IdIcono AS int) = 14 THEN ''Higiene Dental''
            WHEN CAST(IdIcono AS int) = 15 THEN ''Endodoncia''
            WHEN CAST(IdIcono AS int) = 16 THEN ''Reconstruccion''
            WHEN CAST(IdIcono AS int) = 17 THEN ''Exodoncia''
            WHEN CAST(IdIcono AS int) = 18 THEN ''Estudio Ortodoncia''
            WHEN CAST(IdIcono AS int) = 19 THEN ''Rx/escaner''
            ELSE ''Otros''
        END AS Tratamiento,
        CASE
            WHEN IdUsu = 3 THEN ''Dr. Mario Rubio''
            WHEN IdUsu = 4 THEN ''Dra. Irene Garcia''
            WHEN IdUsu = 8 THEN ''Dra. Virginia Tresgallo''
            WHEN IdUsu = 13 THEN ''Dr. Ignacio Ferrero''
            WHEN IdUsu = 12 THEN ''Tc. Juan Antonio Manzanedo''
            WHEN IdUsu = 10 THEN ''Dra. Miriam Carrasco''
            ELSE ''Odontologo''
        END AS Odontologo,
        CAST(CAST(NOTAS AS NVARCHAR(4000)) AS VARCHAR(4000)) AS Notas,
        CAST(CAST(Duracion AS DECIMAL(10, 2)) / 60 AS INT) AS Duracion
    FROM dbo.DCitas)'
);