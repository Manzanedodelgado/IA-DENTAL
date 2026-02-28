-- ═══════════════════════════════════════════════════════════════════════════════
--  crear_vistas_fdw.sql
--  EJECUTAR EN SQL SERVER (DESPACHO\INFOMED → GELITE)
--
--  Crea vistas que convierten tinyint, numeric, smalldatetime y float
--  a int y varchar, que son los tipos que el wrapper MSSQL de Supabase
--  puede leer correctamente.
--
--  Después de crear estas vistas, hay que actualizar las foreign tables
--  en Supabase para que apunten a las vistas en vez de a las tablas.
-- ═══════════════════════════════════════════════════════════════════════════════
USE GELITE;
GO -- ═══ Vista TtosMed_v ═════════════════════════════════════════════════════════
    CREATE
    OR ALTER VIEW dbo.TtosMed_v AS
SELECT IdPac,
    NumTto,
    IdTto,
    IdCol,
    IdUser,
    CAST(StaTto AS int) AS StaTto,
    CONVERT(varchar(19), FecIni, 120) AS FecIni,
    CONVERT(varchar(19), FecFin, 120) AS FecFin,
    Notas,
    CAST(Importe AS varchar(20)) AS Importe,
    CAST(Dto AS int) AS Dto,
    CAST(Pendiente AS varchar(20)) AS Pendiente,
    IdTipoOdg,
    CAST(Actos AS int) AS Actos,
    Tiempo,
    Ident,
    Autoriz,
    IdCentro,
    CAST(ImporteDto AS varchar(20)) AS ImporteDto,
    CAST(SesRealiz AS int) AS SesRealiz,
    CId,
    Guid_Tenant
FROM dbo.TtosMed;
GO -- ═══ Vista PresuTTo_v ════════════════════════════════════════════════════════
    CREATE
    OR ALTER VIEW dbo.PresuTTo_v AS
SELECT IdPac,
    NumSerie,
    NumPre,
    LinPre,
    IdTto,
    CAST(StaTto AS int) AS StaTto,
    CONVERT(varchar(19), FecIni, 120) AS FecIni,
    IdCol,
    Unidades,
    CAST(ImportePre AS varchar(20)) AS ImportePre,
    CAST(Dto AS int) AS Dto,
    Notas,
    IdTipoOdg,
    CAST(BaseImponible AS varchar(20)) AS BaseImponible,
    CAST(TpcIVA AS varchar(20)) AS TpcIVA,
    CAST(ImporteIVA AS varchar(20)) AS ImporteIVA,
    CAST(ImporteUni AS varchar(20)) AS ImporteUni,
    CAST(ImporteDto AS varchar(20)) AS ImporteDto,
    Ident,
    Orden,
    IdTratamiento,
    Id_Presu,
    IdColAux,
    Guid_Tenant
FROM dbo.PresuTTo;
GO -- ═══ Vista DCitas_v ══════════════════════════════════════════════════════════
    CREATE
    OR ALTER VIEW dbo.DCitas_v AS
SELECT IdUsu,
    IdOrden,
    Fecha,
    Hora,
    Duracion,
    IdSitC,
    Texto,
    FlgBloqueo,
    Contacto,
    Movil,
    IdPac,
    HorLlegada,
    Retraso,
    BOX,
    HorConsul,
    HorFinal,
    NOTAS,
    NUMPAC,
    CAST(Recordada AS int) AS Recordada,
    CAST(Confirmada AS int) AS Confirmada,
    IdBox,
    NumOcur,
    IdUserIns,
    IdCol,
    IdCentro,
    IdIcono,
    IdMotivoAnulacion,
    IdTarifa,
    IdTipoEspec,
    NIF,
    Email,
    CONVERT(varchar(19), FecAlta, 120) AS FecAlta,
    CONVERT(varchar(19), Aceptada, 120) AS Aceptada,
    Guid_Tenant
FROM dbo.DCitas;
GO -- ═══ Vista Pacientes_v ═══════════════════════════════════════════════════════
    CREATE
    OR ALTER VIEW dbo.Pacientes_v AS
SELECT IdPac,
    NumPac,
    Nombre,
    Apellidos,
    NIF,
    Tel1,
    Tel2,
    TelMovil,
    Email,
    CONVERT(varchar(10), FecNacim, 120) AS FecNacim,
    Direccion,
    CP,
    Notas,
    Sexo,
    CONVERT(varchar(19), FecAlta, 120) AS FecAlta,
    IdCentro,
    Observaciones,
    Guid_Tenant
FROM dbo.Pacientes;
GO -- ═══ Vista NV_CabFactura_v ══════════════════════════════════════════════════
    CREATE
    OR ALTER VIEW dbo.NV_CabFactura_v AS
SELECT IdFactura,
    NFactura,
    Serie,
    IdPac,
    IdColabo,
    CONVERT(varchar(19), Fecha, 120) AS Fecha,
    Concepto,
    CAST(BaseImponible AS varchar(20)) AS BaseImponible,
    CAST(TpcIVA AS varchar(20)) AS TpcIVA,
    CAST(ImporteIVA AS varchar(20)) AS ImporteIVA,
    CAST(Total AS varchar(20)) AS Total,
    IdFormaPago,
    Notas,
    Guid_Tenant
FROM dbo.NV_CabFactura;
GO -- ═══ Verificación ═══════════════════════════════════════════════════════════
    -- Ejecutar después para confirmar:
SELECT TOP 3 IdPac,
    NumTto,
    StaTto,
    FecIni,
    Importe,
    Notas
FROM dbo.TtosMed_v;
SELECT TOP 3 IdPac,
    Notas,
    ImportePre,
    StaTto,
    FecIni
FROM dbo.PresuTTo_v;
SELECT TOP 3 IdPac,
    Fecha,
    Hora,
    Texto,
    Confirmada,
    FecAlta
FROM dbo.DCitas_v;
SELECT TOP 3 IdPac,
    NumPac,
    Nombre,
    FecNacim,
    FecAlta
FROM dbo.Pacientes_v;