SET NOCOUNT ON;
PRINT '==============================================';
PRINT '===== AGENDA Y CITAS (DCitas) ================';
PRINT '==============================================';
SELECT *
FROM DCitas
WHERE IdPac IN (4095, 4911);
PRINT '==============================================';
PRINT '===== NOTAS CLINICAS (AgdNotas) ==============';
PRINT '==============================================';
SELECT *
FROM AgdNotas
WHERE IdUsu IN (4095, 4911)
    OR IdCentro IN (4095, 4911);
PRINT '==============================================';
PRINT '===== DIAGNOSTICOS (TDiagnosticos) ===========';
PRINT '==============================================';
SELECT *
FROM TDiagnosticos
WHERE IdPac IN (4095, 4911);
PRINT '==============================================';
PRINT '===== TRATAMIENTOS REALIZADOS (TtosMed) ======';
PRINT '==============================================';
SELECT *
FROM TtosMed
WHERE IdCli IN (4095, 4911);
PRINT '==============================================';
PRINT '===== PRESUPUESTOS (Presu) ===================';
PRINT '==============================================';
SELECT *
FROM Presu
WHERE IdPac IN (4095, 4911);
PRINT '==============================================';
PRINT '===== FACTURAS EMITIDAS (NV_CabFactura) ======';
PRINT '==============================================';
SELECT *
FROM NV_CabFactura
WHERE [No Empresa] IN ('4095', '4911')
    OR [Venta a No Cliente] LIKE '%Manzanedo%';
PRINT '==============================================';
PRINT '===== RECIBOS DE PAGO (PagoCli) ==============';
PRINT '==============================================';
SELECT *
FROM PagoCli
WHERE IdCli IN (4095, 4911);
PRINT '==============================================';
PRINT '===== ALERTAS MEDICAS Y ADMIN (AlertPac / AlertCli)';
PRINT '==============================================';
SELECT *
FROM AlertPac
WHERE IdPac IN (4095, 4911);
SELECT *
FROM AlertCli
WHERE IdCli IN (4095, 4911);
PRINT '==============================================';
PRINT '===== SMS / WHATSAPP / EMAILS (ATMT_Coms) ====';
PRINT '==============================================';
SELECT *
FROM ATMT_Coms
WHERE IdPac IN (4095, 4911);