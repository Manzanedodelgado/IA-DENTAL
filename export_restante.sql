-- SCRIPT DE EXTRACCION DE DATOS RESTANTES (GELITE)
-- Ejecutar en SQL Server Management Studio o vía sqlcmd para exportar a CSV
-- 1. HISTORIAL CLINICO (SOAP / Evolutivos)
SELECT *
FROM AgdNotas;
-- 2. TRATAMIENTOS REALIZADOS (Odontograma/Historial Médico)
SELECT *
FROM TtosMed;
-- 3. CABECERA DE PRESUPUESTOS
SELECT *
FROM Presu;
-- 4. LINEAS DE PRESUPUESTO (Detalle de Tratamientos)
SELECT *
FROM PresuTto;
-- 5. FACTURAS / CAJA (Movimientos Económicos)
SELECT *
FROM NV_CabFactura;
SELECT *
FROM PagoCli;
-- 6. ALERTAS MEDICAS (Alergias / Condiciones)
SELECT *
FROM AlertPac;
-- 7. COMUNICACIONES Y MENSAJERIA (SMS / Recordatorios)
SELECT *
FROM ATMT_Coms;