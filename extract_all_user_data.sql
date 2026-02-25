SET NOCOUNT ON;
PRINT '===== CITAS (DCitas) =====';
SELECT IdCita,
    Fecha,
    HorConsul,
    Duracion,
    IdBox,
    Texto,
    NOTAS,
    Confirmada,
    IdSitC
FROM DCitas
WHERE IdPac IN (4095, 4911);
PRINT '===== NOTAS SOAP / EVOLUTIVOS (AgdNotas) =====';
SELECT *
FROM AgdNotas
WHERE IdPac IN (4095, 4911)
    OR IdUsu IN (4095, 4911);
PRINT '===== TRATAMIENTOS Y ODONTOGRAMA (Tratamientos / TDiagnosticos) =====';
SELECT 'TTratamientos' as Tabla,
    *
FROM TTratamientos
WHERE IdPac IN (4095, 4911);
SELECT 'TDiagnosticos' as Tabla,
    IdDiag,
    Descripcion,
    Comentario,
    Fecha,
    IdVisita
FROM TDiagnosticos
WHERE IdPac IN (4095, 4911);
SELECT 'TtosMed' as Tabla,
    *
FROM TtosMed
WHERE IdCli IN (4095, 4911);
PRINT '===== PRESUPUESTOS (Presu / PresuTto) =====';
SELECT p.NumPre,
    p.FecPresup,
    p.Estado,
    p.Notas,
    pt.IdTto,
    pt.Importe,
    pt.Unidades
FROM Presu p
    LEFT JOIN PresuTto pt ON p.NumPre = pt.NumPre
WHERE p.IdPac IN (4095, 4911)
    OR p.IdCli IN (4095, 4911);
PRINT '===== FACTURACION Y RECIBOS (NV_CabFactura / PagoCli) =====';
SELECT *
FROM PagoCli
WHERE IdCli IN (4095, 4911);
SELECT *
FROM NV_CabFactura
WHERE [No Empresa] IN ('4095', '4911')
    OR [Venta a No Cliente] LIKE '%Manzanedo%';
PRINT '===== ALERTIAS MEDICAS (AlertPac / AlertCli) =====';
SELECT *
FROM AlertPac
WHERE IdPac IN (4095, 4911);
SELECT *
FROM AlertCli
WHERE IdCli IN (4095, 4911);
PRINT '===== COMUNICACIONES SMS/WHATSAPP (ATMT_Coms) =====';
SELECT *
FROM ATMT_Coms
WHERE IdPac IN (4095, 4911);