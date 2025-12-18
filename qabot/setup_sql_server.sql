# Script SQL para Configurar Acceso Remoto en GABINETE2
# Ejecutar este script en SQL Server Management Studio (SSMS) en GABINETE2

USE master;
GO

PRINT '=== QABot - Configuración de Acceso Remoto ==='
PRINT ''

-- 1. Verificar/Crear Login
PRINT '1. Verificando login RUBIOGARCIADENTAL...'
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'RUBIOGARCIADENTAL')
BEGIN
    PRINT '   ✅ Creando login...'
    CREATE LOGIN RUBIOGARCIADENTAL WITH PASSWORD = '6666666';
    PRINT '   ✅ Login creado exitosamente'
END
ELSE
BEGIN
    PRINT '   ℹ️  Login ya existe'
END
GO

-- 2. Configurar permisos en GELITE
USE GELITE;
GO

PRINT ''
PRINT '2. Configurando permisos en base de datos GELITE...'

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'RUBIOGARCIADENTAL')
BEGIN
    PRINT '   ✅ Creando usuario en GELITE...'
    CREATE USER RUBIOGARCIADENTAL FOR LOGIN RUBIOGARCIADENTAL;
END
ELSE
BEGIN
    PRINT '   ℹ️  Usuario ya existe en GELITE'
END
GO

-- Permisos de lectura (para QA y Analytics) - Compatible con SQL Server 2008+
PRINT '   ✅ Asignando permisos de lectura...'
EXEC sp_addrolemember 'db_datareader', 'RUBIOGARCIADENTAL';
GO

-- 3. Verificar/Crear tabla REPORTES_QA
PRINT ''
PRINT '3. Verificando tabla REPORTES_QA...'

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'REPORTES_QA') AND type = 'U')
BEGIN
    PRINT '   ✅ Creando tabla REPORTES_QA...'
    
    CREATE TABLE REPORTES_QA (
        REP_ID INT PRIMARY KEY IDENTITY(1,1),
        REP_FECHA DATETIME NOT NULL DEFAULT GETDATE(),
        REP_TIPO VARCHAR(50) NOT NULL,
        REP_CATEGORIA VARCHAR(100),
        REP_SEVERIDAD VARCHAR(20),
        REP_TITULO NVARCHAR(200),
        REP_DESCRIPCION NVARCHAR(MAX),
        REP_DATOS_JSON NVARCHAR(MAX),
        REP_ESTADO VARCHAR(20) DEFAULT 'pending',
        REP_ACCIONES NVARCHAR(MAX),
        REP_RESUELTO_POR VARCHAR(100),
        REP_FECHA_RESOLUCION DATETIME
    );
    
    CREATE INDEX IX_REPORTES_QA_FECHA ON REPORTES_QA(REP_FECHA DESC);
    CREATE INDEX IX_REPORTES_QA_TIPO ON REPORTES_QA(REP_TIPO);
    CREATE INDEX IX_REPORTES_QA_SEVERIDAD ON REPORTES_QA(REP_SEVERIDAD);
    
    PRINT '   ✅ Tabla REPORTES_QA creada'
END
ELSE
BEGIN
    PRINT '   ℹ️  Tabla REPORTES_QA ya existe'
END
GO

-- Permisos en REPORTES_QA
PRINT '   ✅ Asignando permisos en REPORTES_QA...'
GRANT SELECT, INSERT ON REPORTES_QA TO RUBIOGARCIADENTAL;
GO

-- 4. Verificación final
PRINT ''
PRINT '4. Verificación final...'
PRINT ''

-- Login a nivel servidor
SELECT 
    'Login' as Tipo,
    name as Nombre,
    type_desc as Tipo_Desc,
    create_date as Fecha_Creacion,
    '✅' as Estado
FROM sys.server_principals 
WHERE name = 'RUBIOGARCIADENTAL';

-- Usuario en GELITE
SELECT 
    'Usuario GELITE' as Tipo,
    dp.name as Nombre,
    dp.type_desc as Tipo_Desc,
    dp.create_date as Fecha_Creacion,
    '✅' as Estado
FROM sys.database_principals dp
WHERE dp.name = 'RUBIOGARCIADENTAL';

-- Roles asignados
SELECT 
    'Rol asignado' as Tipo,
    dp.name as Rol,
    '' as Tipo_Desc,
    NULL as Fecha_Creacion,
    '✅' as Estado
FROM sys.database_role_members drm
JOIN sys.database_principals dp ON drm.role_principal_id = dp.principal_id
JOIN sys.database_principals dp2 ON drm.member_principal_id = dp2.principal_id
WHERE dp2.name = 'RUBIOGARCIADENTAL';

-- Tabla REPORTES_QA
SELECT 
    'Tabla' as Tipo,
    name as Nombre,
    'U' as Tipo_Desc,
    create_date as Fecha_Creacion,
    '✅' as Estado
FROM sys.objects 
WHERE name = 'REPORTES_QA';

PRINT ''
PRINT '========================================='
PRINT '✅ Configuración completada exitosamente'
PRINT '========================================='
PRINT ''
PRINT 'Próximos pasos en GABINETE2:'
PRINT '1. Habilitar TCP/IP en SQL Server Configuration Manager'
PRINT '2. Configurar puerto 1433 en firewall de Windows'
PRINT '3. Reiniciar servicio SQL Server (INFOMED)'
PRINT ''
PRINT 'Comando para obtener IP de GABINETE2:'
PRINT 'ipconfig'
PRINT ''
GO
