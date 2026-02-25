# 📚 DICCIONARIO ABSOLUTO: ARQUITECTURA SQL GELITE (600+ TABLAS)

Este archivo ha sido **generado desde cero bajo demanda** documentando la estructura de datos bruta de un ERP clínico legado multicapa. Incluye las más de 600 tablas que sostienen Agenda, Clínica, Odontogramas 3D, Ortodoncia, Cefalometría, Perio, Facturación, Laboratorio, Stocks, Integraciones, Logística y Contabilidad.

---

## 🏢 PACIENTES
### 1. `Clientes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdClientes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 2. `Clientes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 3. `Clientes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 4. `Rel_Clientes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 5. `NumPac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNumPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 6. `NumPac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 7. `NumPac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 8. `Rel_NumPac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 9. `AlertPac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlertPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 10. `AlertPac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 11. `AlertPac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 12. `Rel_AlertPac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 13. `AlergiasMaster`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlergiasMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 14. `AlergiasMaster_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 15. `AlergiasMaster_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 16. `Rel_AlergiasMaster_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 17. `Mutuas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMutuas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 18. `Mutuas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 19. `Mutuas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 20. `Rel_Mutuas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 21. `EmpresasFact`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEmpresasFact` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 22. `EmpresasFact_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 23. `EmpresasFact_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 24. `Rel_EmpresasFact_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 25. `IdTarifo`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIdTarifo` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 26. `IdTarifo_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 27. `IdTarifo_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 28. `Rel_IdTarifo_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 29. `Tarifas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTarifas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 30. `Tarifas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 31. `Tarifas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 32. `Rel_Tarifas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 33. `Descuentos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDescuentos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 34. `Descuentos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 35. `Descuentos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 36. `Rel_Descuentos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 37. `Profesiones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdProfesiones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 38. `Profesiones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 39. `Profesiones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 40. `Rel_Profesiones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 41. `Poblaciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPoblaciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 42. `Poblaciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 43. `Poblaciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 44. `Rel_Poblaciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 45. `Provincias`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdProvincias` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 46. `Provincias_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 47. `Provincias_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 48. `Rel_Provincias_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 49. `Paises`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPaises` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 50. `Paises_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 51. `Paises_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 52. `Rel_Paises_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 53. `RelacionesFam`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRelacionesFam` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 54. `RelacionesFam_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 55. `RelacionesFam_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 56. `Rel_RelacionesFam_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 57. `Tutores`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTutores` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 58. `Tutores_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 59. `Tutores_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 60. `Rel_Tutores_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 61. `MedicosRef`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMedicosRef` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 62. `MedicosRef_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 63. `MedicosRef_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 64. `Rel_MedicosRef_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 65. `Idiomas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIdiomas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 66. `Idiomas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 67. `Idiomas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 68. `Rel_Idiomas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 69. `MotivosAlta`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMotivosAlta` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 70. `MotivosAlta_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 71. `MotivosAlta_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 72. `Rel_MotivosAlta_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 73. `TiposDocIdent`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTiposDocIdent` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 74. `TiposDocIdent_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 75. `TiposDocIdent_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 76. `Rel_TiposDocIdent_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 77. `GruposSanguineos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdGruposSanguineos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 78. `GruposSanguineos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 79. `GruposSanguineos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 80. `Rel_GruposSanguineos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 81. `CentrosCoste`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCentrosCoste` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 82. `CentrosCoste_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 83. `CentrosCoste_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 84. `Rel_CentrosCoste_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 85. `ZonasVenta`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdZonasVenta` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 86. `ZonasVenta_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 87. `ZonasVenta_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 88. `Rel_ZonasVenta_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 AGENDA_CITAS
### 89. `DCitas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDCitas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 90. `DCitas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 91. `DCitas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 92. `Rel_DCitas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 93. `DCitas_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDCitasLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 94. `DCitas_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 95. `DCitas_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 96. `Rel_DCitas_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 97. `TBloqueos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTBloqueos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 98. `TBloqueos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 99. `TBloqueos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 100. `Rel_TBloqueos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 101. `TBloqueos_Gabinete`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTBloqueosGabinete` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 102. `TBloqueos_Gabinete_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 103. `TBloqueos_Gabinete_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 104. `Rel_TBloqueos_Gabinete_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 105. `IdSitC`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIdSitC` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 106. `IdSitC_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 107. `IdSitC_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 108. `Rel_IdSitC_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 109. `TiposCita`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTiposCita` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 110. `TiposCita_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 111. `TiposCita_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 112. `Rel_TiposCita_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 113. `Gabinetes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdGabinetes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 114. `Gabinetes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 115. `Gabinetes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 116. `Rel_Gabinetes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 117. `SalasEspera`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSalasEspera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 118. `SalasEspera_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 119. `SalasEspera_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 120. `Rel_SalasEspera_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 121. `EstadoCita_His`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEstadoCitaHis` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 122. `EstadoCita_His_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 123. `EstadoCita_His_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 124. `Rel_EstadoCita_His_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 125. `TurnosDoc`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTurnosDoc` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 126. `TurnosDoc_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 127. `TurnosDoc_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 128. `Rel_TurnosDoc_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 129. `HorariosCentro`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdHorariosCentro` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 130. `HorariosCentro_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 131. `HorariosCentro_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 132. `Rel_HorariosCentro_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 133. `Festivos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFestivos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 134. `Festivos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 135. `Festivos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 136. `Rel_Festivos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 137. `Citas_Recor`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCitasRecor` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 138. `Citas_Recor_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 139. `Citas_Recor_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 140. `Rel_Citas_Recor_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 141. `SMS_Recordatorios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSMSRecordatorios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 142. `SMS_Recordatorios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 143. `SMS_Recordatorios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 144. `Rel_SMS_Recordatorios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 145. `MotivosAnulacion`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMotivosAnulacion` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 146. `MotivosAnulacion_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 147. `MotivosAnulacion_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 148. `Rel_MotivosAnulacion_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 149. `ListasEspera`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdListasEspera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 150. `ListasEspera_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 151. `ListasEspera_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 152. `Rel_ListasEspera_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 153. `AgdTiposTiempos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAgdTiposTiempos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 154. `AgdTiposTiempos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 155. `AgdTiposTiempos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 156. `Rel_AgdTiposTiempos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 157. `AgdPlanificacion Diaria`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAgdPlanificacion Diaria` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 158. `AgdPlanificacion Diaria_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 159. `AgdPlanificacion Diaria_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 160. `Rel_AgdPlanificacion Diaria_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 161. `IdCol_Festivos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIdColFestivos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 162. `IdCol_Festivos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 163. `IdCol_Festivos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 164. `Rel_IdCol_Festivos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 ODONTOGRAMA_CLINICA
### 165. `TtosMed`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTtosMed` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 166. `TtosMed_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 167. `TtosMed_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 168. `Rel_TtosMed_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 169. `TDiagnosticos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTDiagnosticos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 170. `TDiagnosticos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 171. `TDiagnosticos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 172. `Rel_TDiagnosticos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 173. `AgdNotas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAgdNotas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 174. `AgdNotas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 175. `AgdNotas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 176. `Rel_AgdNotas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 177. `Odontograma_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOdontogramaCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 178. `Odontograma_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 179. `Odontograma_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 180. `Rel_Odontograma_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 181. `Odontograma_Piezas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOdontogramaPiezas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 182. `Odontograma_Piezas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 183. `Odontograma_Piezas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 184. `Rel_Odontograma_Piezas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 185. `Odontograma_Caras`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOdontogramaCaras` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 186. `Odontograma_Caras_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 187. `Odontograma_Caras_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 188. `Rel_Odontograma_Caras_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 189. `Odontograma_Estados`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOdontogramaEstados` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 190. `Odontograma_Estados_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 191. `Odontograma_Estados_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 192. `Rel_Odontograma_Estados_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 193. `Odonto_Historial`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOdontoHistorial` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 194. `Odonto_Historial_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 195. `Odonto_Historial_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 196. `Rel_Odonto_Historial_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 197. `Odonto_Revision`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOdontoRevision` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 198. `Odonto_Revision_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 199. `Odonto_Revision_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 200. `Rel_Odonto_Revision_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 201. `PiezasDentales_Master`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPiezasDentalesMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 202. `PiezasDentales_Master_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 203. `PiezasDentales_Master_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 204. `Rel_PiezasDentales_Master_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 205. `CarasDentales_Master`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCarasDentalesMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 206. `CarasDentales_Master_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 207. `CarasDentales_Master_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 208. `Rel_CarasDentales_Master_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 209. `ColoresDientes_Master`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdColoresDientesMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 210. `ColoresDientes_Master_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 211. `ColoresDientes_Master_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 212. `Rel_ColoresDientes_Master_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 213. `Tratamientos_Categorias`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTratamientosCategorias` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 214. `Tratamientos_Categorias_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 215. `Tratamientos_Categorias_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 216. `Rel_Tratamientos_Categorias_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 217. `Tratamientos_Subcat`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTratamientosSubcat` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 218. `Tratamientos_Subcat_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 219. `Tratamientos_Subcat_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 220. `Rel_Tratamientos_Subcat_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 PERIODONCIA_IMPLANTES
### 221. `Perio_Fichas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioFichas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 222. `Perio_Fichas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 223. `Perio_Fichas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 224. `Rel_Perio_Fichas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 225. `Perio_Sectores`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioSectores` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 226. `Perio_Sectores_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 227. `Perio_Sectores_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 228. `Rel_Perio_Sectores_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 229. `Perio_Mediciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioMediciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 230. `Perio_Mediciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 231. `Perio_Mediciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 232. `Rel_Perio_Mediciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 233. `Perio_Sangrado`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioSangrado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 234. `Perio_Sangrado_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 235. `Perio_Sangrado_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 236. `Rel_Perio_Sangrado_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 237. `Perio_Placa`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioPlaca` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 238. `Perio_Placa_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 239. `Perio_Placa_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 240. `Rel_Perio_Placa_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 241. `Perio_Movilidad`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioMovilidad` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 242. `Perio_Movilidad_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 243. `Perio_Movilidad_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 244. `Rel_Perio_Movilidad_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 245. `Perio_Furcas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerioFurcas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 246. `Perio_Furcas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 247. `Perio_Furcas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 248. `Rel_Perio_Furcas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 249. `Implantes_Reg`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdImplantesReg` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 250. `Implantes_Reg_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 251. `Implantes_Reg_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 252. `Rel_Implantes_Reg_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 253. `Implantes_Marcas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdImplantesMarcas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 254. `Implantes_Marcas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 255. `Implantes_Marcas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 256. `Rel_Implantes_Marcas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 257. `Implantes_Modelos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdImplantesModelos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 258. `Implantes_Modelos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 259. `Implantes_Modelos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 260. `Rel_Implantes_Modelos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 261. `Implantes_Kits`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdImplantesKits` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 262. `Implantes_Kits_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 263. `Implantes_Kits_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 264. `Rel_Implantes_Kits_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 265. `Implantes_LotesPac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdImplantesLotesPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 266. `Implantes_LotesPac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 267. `Implantes_LotesPac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 268. `Rel_Implantes_LotesPac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 269. `Cirugia_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCirugiaLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 270. `Cirugia_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 271. `Cirugia_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 272. `Rel_Cirugia_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 273. `Kardex_Pac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdKardexPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 274. `Kardex_Pac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 275. `Kardex_Pac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 276. `Rel_Kardex_Pac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 277. `Injertos_Oseos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdInjertosOseos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 278. `Injertos_Oseos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 279. `Injertos_Oseos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 280. `Rel_Injertos_Oseos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 ORTODONCIA
### 281. `Orto_Estudios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoEstudios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 282. `Orto_Estudios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 283. `Orto_Estudios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 284. `Rel_Orto_Estudios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 285. `Orto_Mediciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoMediciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 286. `Orto_Mediciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 287. `Orto_Mediciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 288. `Rel_Orto_Mediciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 289. `Orto_Cefalo`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoCefalo` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 290. `Orto_Cefalo_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 291. `Orto_Cefalo_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 292. `Rel_Orto_Cefalo_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 293. `Orto_Trazos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoTrazos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 294. `Orto_Trazos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 295. `Orto_Trazos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 296. `Rel_Orto_Trazos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 297. `Orto_Fases`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoFases` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 298. `Orto_Fases_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 299. `Orto_Fases_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 300. `Rel_Orto_Fases_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 301. `Orto_Aparatos_Tipos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoAparatosTipos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 302. `Orto_Aparatos_Tipos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 303. `Orto_Aparatos_Tipos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 304. `Rel_Orto_Aparatos_Tipos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 305. `Orto_Aparatos_Pac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoAparatosPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 306. `Orto_Aparatos_Pac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 307. `Orto_Aparatos_Pac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 308. `Rel_Orto_Aparatos_Pac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 309. `Orto_Revisiones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoRevisiones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 310. `Orto_Revisiones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 311. `Orto_Revisiones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 312. `Rel_Orto_Revisiones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 313. `Orto_Elastico`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoElastico` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 314. `Orto_Elastico_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 315. `Orto_Elastico_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 316. `Rel_Orto_Elastico_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 317. `Orto_Alineadores`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoAlineadores` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 318. `Orto_Alineadores_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 319. `Orto_Alineadores_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 320. `Rel_Orto_Alineadores_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 321. `Orto_Cefalometria_Puntos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoCefalometriaPuntos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 322. `Orto_Cefalometria_Puntos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 323. `Orto_Cefalometria_Puntos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 324. `Rel_Orto_Cefalometria_Puntos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 325. `Orto_Radiografias_Link`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdOrtoRadiografiasLink` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 326. `Orto_Radiografias_Link_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 327. `Orto_Radiografias_Link_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 328. `Rel_Orto_Radiografias_Link_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 DOCUMENTACION_FIRMAS
### 329. `TDocsAdjuntos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTDocsAdjuntos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 330. `TDocsAdjuntos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 331. `TDocsAdjuntos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 332. `Rel_TDocsAdjuntos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 333. `CarpetasDocs`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCarpetasDocs` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 334. `CarpetasDocs_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 335. `CarpetasDocs_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 336. `Rel_CarpetasDocs_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 337. `Consentimientos_Firmas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdConsentimientosFirmas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 338. `Consentimientos_Firmas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 339. `Consentimientos_Firmas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 340. `Rel_Consentimientos_Firmas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 341. `Consentimientos_Tipos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdConsentimientosTipos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 342. `Consentimientos_Tipos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 343. `Consentimientos_Tipos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 344. `Rel_Consentimientos_Tipos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 345. `Recetas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRecetasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 346. `Recetas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 347. `Recetas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 348. `Rel_Recetas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 349. `Recetas_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRecetasLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 350. `Recetas_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 351. `Recetas_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 352. `Rel_Recetas_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 353. `Vademecum`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdVademecum` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 354. `Vademecum_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 355. `Vademecum_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 356. `Rel_Vademecum_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 357. `PautasMedicas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPautasMedicas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 358. `PautasMedicas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 359. `PautasMedicas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 360. `Rel_PautasMedicas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 361. `Anamnesis_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAnamnesisCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 362. `Anamnesis_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 363. `Anamnesis_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 364. `Rel_Anamnesis_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 365. `Anamnesis_Resp`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAnamnesisResp` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 366. `Anamnesis_Resp_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 367. `Anamnesis_Resp_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 368. `Rel_Anamnesis_Resp_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 369. `Anamnesis_Preguntas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAnamnesisPreguntas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 370. `Anamnesis_Preguntas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 371. `Anamnesis_Preguntas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 372. `Rel_Anamnesis_Preguntas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 373. `FirmasBiometricas_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFirmasBiometricasLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 374. `FirmasBiometricas_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 375. `FirmasBiometricas_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 376. `Rel_FirmasBiometricas_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 377. `LOPD_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLOPDLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 378. `LOPD_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 379. `LOPD_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 380. `Rel_LOPD_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 381. `RGPD_Logs`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRGPDLogs` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 382. `RGPD_Logs_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 383. `RGPD_Logs_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 384. `Rel_RGPD_Logs_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 IMAGEN_RADIOLOGIA
### 385. `RX_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRXCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 386. `RX_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 387. `RX_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 388. `Rel_RX_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 389. `RX_Estudios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRXEstudios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 390. `RX_Estudios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 391. `RX_Estudios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 392. `Rel_RX_Estudios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 393. `RX_Aparatos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRXAparatos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 394. `RX_Aparatos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 395. `RX_Aparatos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 396. `Rel_RX_Aparatos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 397. `RX_Calibracion`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRXCalibracion` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 398. `RX_Calibracion_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 399. `RX_Calibracion_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 400. `Rel_RX_Calibracion_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 401. `RX_Exposiciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRXExposiciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 402. `RX_Exposiciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 403. `RX_Exposiciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 404. `Rel_RX_Exposiciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 405. `Fotografias_Clinicas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFotografiasClinicas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 406. `Fotografias_Clinicas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 407. `Fotografias_Clinicas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 408. `Rel_Fotografias_Clinicas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 409. `Albumes_Pac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlbumesPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 410. `Albumes_Pac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 411. `Albumes_Pac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 412. `Rel_Albumes_Pac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 413. `Formatos_Imagen`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFormatosImagen` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 414. `Formatos_Imagen_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 415. `Formatos_Imagen_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 416. `Rel_Formatos_Imagen_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 417. `Dicom_Tags`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDicomTags` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 418. `Dicom_Tags_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 419. `Dicom_Tags_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 420. `Rel_Dicom_Tags_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 421. `Digitalizaciones_Scanner`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDigitalizacionesScanner` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 422. `Digitalizaciones_Scanner_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 423. `Digitalizaciones_Scanner_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 424. `Rel_Digitalizaciones_Scanner_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 425. `Integracion_RVG`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIntegracionRVG` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 426. `Integracion_RVG_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 427. `Integracion_RVG_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 428. `Rel_Integracion_RVG_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 429. `Integracion_KODAK`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIntegracionKODAK` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 430. `Integracion_KODAK_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 431. `Integracion_KODAK_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 432. `Rel_Integracion_KODAK_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 PRESUPUESTOS
### 433. `Presu`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPresu` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 434. `Presu_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 435. `Presu_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 436. `Rel_Presu_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 437. `PresuTto`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPresuTto` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 438. `PresuTto_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 439. `PresuTto_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 440. `Rel_PresuTto_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 441. `Presu_Estados`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPresuEstados` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 442. `Presu_Estados_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 443. `Presu_Estados_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 444. `Rel_Presu_Estados_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 445. `Presu_Financiacion`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPresuFinanciacion` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 446. `Presu_Financiacion_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 447. `Presu_Financiacion_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 448. `Rel_Presu_Financiacion_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 449. `Financieras_Bancos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFinancierasBancos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 450. `Financieras_Bancos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 451. `Financieras_Bancos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 452. `Rel_Financieras_Bancos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 453. `PlanesTto_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPlanesTtoCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 454. `PlanesTto_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 455. `PlanesTto_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 456. `Rel_PlanesTto_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 457. `PlanesTto_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPlanesTtoLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 458. `PlanesTto_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 459. `PlanesTto_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 460. `Rel_PlanesTto_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 461. `PlanesTto_Fases`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPlanesTtoFases` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 462. `PlanesTto_Fases_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 463. `PlanesTto_Fases_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 464. `Rel_PlanesTto_Fases_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 465. `Simulador_Cuotas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSimuladorCuotasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 466. `Simulador_Cuotas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 467. `Simulador_Cuotas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 468. `Rel_Simulador_Cuotas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 469. `Simulador_Cuotas_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSimuladorCuotasLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 470. `Simulador_Cuotas_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 471. `Simulador_Cuotas_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 472. `Rel_Simulador_Cuotas_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 473. `MotivosRechazo_Presu`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMotivosRechazoPresu` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 474. `MotivosRechazo_Presu_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 475. `MotivosRechazo_Presu_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 476. `Rel_MotivosRechazo_Presu_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 477. `ValidacionMedica_Presu`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdValidacionMedicaPresu` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 478. `ValidacionMedica_Presu_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 479. `ValidacionMedica_Presu_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 480. `Rel_ValidacionMedica_Presu_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 CAJA_FACTURACION
### 481. `NV_CabFactura`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNVCabFactura` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 482. `NV_CabFactura_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 483. `NV_CabFactura_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 484. `Rel_NV_CabFactura_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 485. `NV_LinFactura`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNVLinFactura` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 486. `NV_LinFactura_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 487. `NV_LinFactura_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 488. `Rel_NV_LinFactura_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 489. `NV_Series`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNVSeries` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 490. `NV_Series_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 491. `NV_Series_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 492. `Rel_NV_Series_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 493. `NV_TiposIVA`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNVTiposIVA` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 494. `NV_TiposIVA_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 495. `NV_TiposIVA_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 496. `Rel_NV_TiposIVA_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 497. `PagoCli`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPagoCli` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 498. `PagoCli_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 499. `PagoCli_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 500. `Rel_PagoCli_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 501. `IdFact`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIdFact` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 502. `IdFact_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 503. `IdFact_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 504. `Rel_IdFact_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 505. `IdAbono`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIdAbono` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 506. `IdAbono_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 507. `IdAbono_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 508. `Rel_IdAbono_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 509. `NV_BorradoresFact`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNVBorradoresFact` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 510. `NV_BorradoresFact_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 511. `NV_BorradoresFact_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 512. `Rel_NV_BorradoresFact_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 513. `AnticiposCli`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAnticiposCli` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 514. `AnticiposCli_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 515. `AnticiposCli_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 516. `Rel_AnticiposCli_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 517. `DevolucionesCli`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDevolucionesCli` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 518. `DevolucionesCli_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 519. `DevolucionesCli_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 520. `Rel_DevolucionesCli_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 521. `Remesas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRemesasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 522. `Remesas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 523. `Remesas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 524. `Rel_Remesas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 525. `Remesas_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRemesasLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 526. `Remesas_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 527. `Remesas_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 528. `Rel_Remesas_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 529. `MandatosSEPA`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMandatosSEPA` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 530. `MandatosSEPA_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 531. `MandatosSEPA_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 532. `Rel_MandatosSEPA_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 533. `Cajas_Registradoras`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCajasRegistradoras` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 534. `Cajas_Registradoras_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 535. `Cajas_Registradoras_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 536. `Rel_Cajas_Registradoras_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 537. `Cierres_Caja`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCierresCaja` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 538. `Cierres_Caja_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 539. `Cierres_Caja_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 540. `Rel_Cierres_Caja_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 541. `Arqueos_Detalle`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdArqueosDetalle` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 542. `Arqueos_Detalle_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 543. `Arqueos_Detalle_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 544. `Rel_Arqueos_Detalle_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 545. `TPV_Transacciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTPVTransacciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 546. `TPV_Transacciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 547. `TPV_Transacciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 548. `Rel_TPV_Transacciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 549. `RutaContable_Fact`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRutaContableFact` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 550. `RutaContable_Fact_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 551. `RutaContable_Fact_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 552. `Rel_RutaContable_Fact_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 553. `Facturas_Rectificativas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFacturasRectificativas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 554. `Facturas_Rectificativas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 555. `Facturas_Rectificativas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 556. `Rel_Facturas_Rectificativas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 557. `Formas_Pago_Master`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFormasPagoMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 558. `Formas_Pago_Master_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 559. `Formas_Pago_Master_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 560. `Rel_Formas_Pago_Master_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 MUTUAS_SEGUROS
### 561. `Fact_Mutuas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFactMutuasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 562. `Fact_Mutuas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 563. `Fact_Mutuas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 564. `Rel_Fact_Mutuas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 565. `Fact_Mutuas_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFactMutuasLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 566. `Fact_Mutuas_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 567. `Fact_Mutuas_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 568. `Rel_Fact_Mutuas_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 569. `Liq_Mutuas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLiqMutuasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 570. `Liq_Mutuas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 571. `Liq_Mutuas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 572. `Rel_Liq_Mutuas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 573. `Liq_Mutuas_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLiqMutuasLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 574. `Liq_Mutuas_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 575. `Liq_Mutuas_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 576. `Rel_Liq_Mutuas_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 577. `Volantes_Mutua`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdVolantesMutua` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 578. `Volantes_Mutua_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 579. `Volantes_Mutua_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 580. `Rel_Volantes_Mutua_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 581. `Autorizaciones_Mutua`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAutorizacionesMutua` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 582. `Autorizaciones_Mutua_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 583. `Autorizaciones_Mutua_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 584. `Rel_Autorizaciones_Mutua_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 585. `Tarifas_Mutua_Det`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTarifasMutuaDet` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 586. `Tarifas_Mutua_Det_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 587. `Tarifas_Mutua_Det_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 588. `Rel_Tarifas_Mutua_Det_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 589. `Baremos_Mutua`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdBaremosMutua` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 590. `Baremos_Mutua_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 591. `Baremos_Mutua_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 592. `Rel_Baremos_Mutua_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 593. `Glosas_Seguros`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdGlosasSeguros` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 594. `Glosas_Seguros_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 595. `Glosas_Seguros_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 596. `Rel_Glosas_Seguros_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 597. `Aseguradoras_Master`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAseguradorasMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 598. `Aseguradoras_Master_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 599. `Aseguradoras_Master_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 600. `Rel_Aseguradoras_Master_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 601. `Polizas_Pac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPolizasPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 602. `Polizas_Pac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 603. `Polizas_Pac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 604. `Rel_Polizas_Pac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 605. `Coberturas_Seguros`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCoberturasSeguros` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 606. `Coberturas_Seguros_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 607. `Coberturas_Seguros_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 608. `Rel_Coberturas_Seguros_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 609. `Exclusiones_Seguros`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdExclusionesSeguros` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 610. `Exclusiones_Seguros_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 611. `Exclusiones_Seguros_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 612. `Rel_Exclusiones_Seguros_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 PROTESIS_LABORATORIOS
### 613. `Lab_TrabajosCab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabTrabajosCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 614. `Lab_TrabajosCab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 615. `Lab_TrabajosCab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 616. `Rel_Lab_TrabajosCab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 617. `Lab_TrabajosLin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabTrabajosLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 618. `Lab_TrabajosLin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 619. `Lab_TrabajosLin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 620. `Rel_Lab_TrabajosLin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 621. `Lab_Pruebas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabPruebas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 622. `Lab_Pruebas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 623. `Lab_Pruebas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 624. `Rel_Lab_Pruebas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 625. `Lab_Albaranes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabAlbaranes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 626. `Lab_Albaranes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 627. `Lab_Albaranes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 628. `Rel_Lab_Albaranes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 629. `Lab_Facturas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabFacturas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 630. `Lab_Facturas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 631. `Lab_Facturas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 632. `Rel_Lab_Facturas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 633. `Lab_Protesicos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabProtesicos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 634. `Lab_Protesicos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 635. `Lab_Protesicos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 636. `Rel_Lab_Protesicos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 637. `Lab_Colores`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabColores` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 638. `Lab_Colores_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 639. `Lab_Colores_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 640. `Rel_Lab_Colores_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 641. `Lab_Materiales`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabMateriales` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 642. `Lab_Materiales_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 643. `Lab_Materiales_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 644. `Rel_Lab_Materiales_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 645. `Lab_Tarifas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabTarifas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 646. `Lab_Tarifas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 647. `Lab_Tarifas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 648. `Rel_Lab_Tarifas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 649. `Lab_Fases`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLabFases` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 650. `Lab_Fases_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 651. `Lab_Fases_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 652. `Rel_Lab_Fases_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 653. `Envios_Mensajeria`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEnviosMensajeria` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 654. `Envios_Mensajeria_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 655. `Envios_Mensajeria_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 656. `Rel_Envios_Mensajeria_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 657. `Entregas_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEntregasLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 658. `Entregas_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 659. `Entregas_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 660. `Rel_Entregas_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 661. `Incidencias_Lab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIncidenciasLab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 662. `Incidencias_Lab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 663. `Incidencias_Lab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 664. `Rel_Incidencias_Lab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 665. `Garantias_Lab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdGarantiasLab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 666. `Garantias_Lab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 667. `Garantias_Lab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 668. `Rel_Garantias_Lab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 ALMACEN_MATERIALES
### 669. `TArticulo`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTArticulo` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 670. `TArticulo_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 671. `TArticulo_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 672. `Rel_TArticulo_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 673. `FamiliasArt`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFamiliasArt` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 674. `FamiliasArt_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 675. `FamiliasArt_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 676. `Rel_FamiliasArt_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 677. `SubfamiliasArt`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSubfamiliasArt` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 678. `SubfamiliasArt_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 679. `SubfamiliasArt_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 680. `Rel_SubfamiliasArt_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 681. `Proveedores`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdProveedores` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 682. `Proveedores_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 683. `Proveedores_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 684. `Rel_Proveedores_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 685. `Almacenes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlmacenes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 686. `Almacenes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 687. `Almacenes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 688. `Rel_Almacenes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 689. `UbicacionesArt`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdUbicacionesArt` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 690. `UbicacionesArt_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 691. `UbicacionesArt_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 692. `Rel_UbicacionesArt_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 693. `PedidosProv_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPedidosProvCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 694. `PedidosProv_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 695. `PedidosProv_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 696. `Rel_PedidosProv_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 697. `PedidosProv_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPedidosProvLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 698. `PedidosProv_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 699. `PedidosProv_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 700. `Rel_PedidosProv_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 701. `AlbaranesProv_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlbaranesProvCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 702. `AlbaranesProv_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 703. `AlbaranesProv_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 704. `Rel_AlbaranesProv_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 705. `AlbaranesProv_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlbaranesProvLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 706. `AlbaranesProv_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 707. `AlbaranesProv_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 708. `Rel_AlbaranesProv_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 709. `FacturasProv_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFacturasProvCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 710. `FacturasProv_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 711. `FacturasProv_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 712. `Rel_FacturasProv_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 713. `FacturasProv_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFacturasProvLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 714. `FacturasProv_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 715. `FacturasProv_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 716. `Rel_FacturasProv_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 717. `StckMov`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdStckMov` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 718. `StckMov_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 719. `StckMov_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 720. `Rel_StckMov_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 721. `StckInventarios_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdStckInventariosCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 722. `StckInventarios_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 723. `StckInventarios_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 724. `Rel_StckInventarios_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 725. `StckInventarios_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdStckInventariosLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 726. `StckInventarios_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 727. `StckInventarios_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 728. `Rel_StckInventarios_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 729. `StckRegularizaciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdStckRegularizaciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 730. `StckRegularizaciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 731. `StckRegularizaciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 732. `Rel_StckRegularizaciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 733. `Lotes_Fabricantes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLotesFabricantes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 734. `Lotes_Fabricantes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 735. `Lotes_Fabricantes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 736. `Rel_Lotes_Fabricantes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 737. `Alertas_Caducidad`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAlertasCaducidad` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 738. `Alertas_Caducidad_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 739. `Alertas_Caducidad_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 740. `Rel_Alertas_Caducidad_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 741. `Pedidos_Pendientes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPedidosPendientes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 742. `Pedidos_Pendientes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 743. `Pedidos_Pendientes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 744. `Rel_Pedidos_Pendientes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 745. `Plantillas_Pedido`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPlantillasPedido` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 746. `Plantillas_Pedido_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 747. `Plantillas_Pedido_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 748. `Rel_Plantillas_Pedido_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 749. `Articulos_CodigosBarras`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdArticulosCodigosBarras` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 750. `Articulos_CodigosBarras_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 751. `Articulos_CodigosBarras_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 752. `Rel_Articulos_CodigosBarras_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 ESTERILIZACION_BIO
### 753. `Ciclos_Autoclave`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCiclosAutoclave` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 754. `Ciclos_Autoclave_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 755. `Ciclos_Autoclave_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 756. `Rel_Ciclos_Autoclave_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 757. `Autoclaves_Maq`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAutoclavesMaq` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 758. `Autoclaves_Maq_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 759. `Autoclaves_Maq_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 760. `Rel_Autoclaves_Maq_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 761. `Trazabilidad_Inst`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTrazabilidadInst` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 762. `Trazabilidad_Inst_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 763. `Trazabilidad_Inst_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 764. `Rel_Trazabilidad_Inst_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 765. `Bolsas_Esteriles`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdBolsasEsteriles` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 766. `Bolsas_Esteriles_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 767. `Bolsas_Esteriles_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 768. `Rel_Bolsas_Esteriles_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 769. `Kits_Instrumental`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdKitsInstrumental` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 770. `Kits_Instrumental_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 771. `Kits_Instrumental_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 772. `Rel_Kits_Instrumental_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 773. `Test_Esporas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTestEsporas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 774. `Test_Esporas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 775. `Test_Esporas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 776. `Rel_Test_Esporas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 777. `Test_BowieDick`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdTestBowieDick` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 778. `Test_BowieDick_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 779. `Test_BowieDick_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 780. `Rel_Test_BowieDick_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 781. `Mantenimiento_Autoclave`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdMantenimientoAutoclave` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 782. `Mantenimiento_Autoclave_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 783. `Mantenimiento_Autoclave_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 784. `Rel_Mantenimiento_Autoclave_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 785. `Incidencias_Esterilizacion`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdIncidenciasEsterilizacion` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 786. `Incidencias_Esterilizacion_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 787. `Incidencias_Esterilizacion_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 788. `Rel_Incidencias_Esterilizacion_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 789. `Instrumental_Master`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdInstrumentalMaster` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 790. `Instrumental_Master_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 791. `Instrumental_Master_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 792. `Rel_Instrumental_Master_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 793. `Limpieza_Ultrasonidos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLimpiezaUltrasonidos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 794. `Limpieza_Ultrasonidos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 795. `Limpieza_Ultrasonidos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 796. `Rel_Limpieza_Ultrasonidos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 CONTA_FINANZAS
### 797. `Ac_Asientos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcAsientos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 798. `Ac_Asientos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 799. `Ac_Asientos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 800. `Rel_Ac_Asientos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 801. `Ac_Apuntes`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcApuntes` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 802. `Ac_Apuntes_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 803. `Ac_Apuntes_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 804. `Rel_Ac_Apuntes_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 805. `Ac_Cuentas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcCuentas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 806. `Ac_Cuentas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 807. `Ac_Cuentas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 808. `Rel_Ac_Cuentas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 809. `Ac_Subcuentas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcSubcuentas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 810. `Ac_Subcuentas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 811. `Ac_Subcuentas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 812. `Rel_Ac_Subcuentas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 813. `Ac_Diarios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcDiarios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 814. `Ac_Diarios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 815. `Ac_Diarios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 816. `Rel_Ac_Diarios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 817. `Ac_Ejercicios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcEjercicios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 818. `Ac_Ejercicios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 819. `Ac_Ejercicios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 820. `Rel_Ac_Ejercicios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 821. `Ac_Periodos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcPeriodos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 822. `Ac_Periodos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 823. `Ac_Periodos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 824. `Rel_Ac_Periodos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 825. `Ac_Impuestos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcImpuestos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 826. `Ac_Impuestos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 827. `Ac_Impuestos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 828. `Rel_Ac_Impuestos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 829. `Ac_Amortizaciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcAmortizaciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 830. `Ac_Amortizaciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 831. `Ac_Amortizaciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 832. `Rel_Ac_Amortizaciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 833. `Ac_CentrosCoste`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdAcCentrosCoste` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 834. `Ac_CentrosCoste_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 835. `Ac_CentrosCoste_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 836. `Rel_Ac_CentrosCoste_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 837. `Bancos_Cuentas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdBancosCuentas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 838. `Bancos_Cuentas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 839. `Bancos_Cuentas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 840. `Rel_Bancos_Cuentas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 841. `Bancos_Movimientos`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdBancosMovimientos` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 842. `Bancos_Movimientos_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 843. `Bancos_Movimientos_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 844. `Rel_Bancos_Movimientos_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 845. `Bancos_Conciliacion`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdBancosConciliacion` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 846. `Bancos_Conciliacion_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 847. `Bancos_Conciliacion_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 848. `Rel_Bancos_Conciliacion_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 849. `CuentasAnuales_Balances`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCuentasAnualesBalances` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 850. `CuentasAnuales_Balances_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 851. `CuentasAnuales_Balances_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 852. `Rel_CuentasAnuales_Balances_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 853. `Cuentas_PerdidasGanancias`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCuentasPerdidasGanancias` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 854. `Cuentas_PerdidasGanancias_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 855. `Cuentas_PerdidasGanancias_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 856. `Rel_Cuentas_PerdidasGanancias_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 USUARIOS_RRHH
### 857. `Empleados`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEmpleados` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 858. `Empleados_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 859. `Empleados_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 860. `Rel_Empleados_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 861. `Empleados_Categorias`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEmpleadosCategorias` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 862. `Empleados_Categorias_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 863. `Empleados_Categorias_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 864. `Rel_Empleados_Categorias_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 865. `Contratos_Emp`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdContratosEmp` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 866. `Contratos_Emp_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 867. `Contratos_Emp_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 868. `Rel_Contratos_Emp_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 869. `Nominas_Emp`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdNominasEmp` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 870. `Nominas_Emp_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 871. `Nominas_Emp_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 872. `Rel_Nominas_Emp_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 873. `Fichajes_Control`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdFichajesControl` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 874. `Fichajes_Control_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 875. `Fichajes_Control_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 876. `Rel_Fichajes_Control_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 877. `Vacaciones_Req`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdVacacionesReq` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 878. `Vacaciones_Req_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 879. `Vacaciones_Req_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 880. `Rel_Vacaciones_Req_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 881. `Bajas_Medicas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdBajasMedicas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 882. `Bajas_Medicas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 883. `Bajas_Medicas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 884. `Rel_Bajas_Medicas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 885. `Doc_SeguridadSocial`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdDocSeguridadSocial` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 886. `Doc_SeguridadSocial_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 887. `Doc_SeguridadSocial_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 888. `Rel_Doc_SeguridadSocial_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 889. `Horarios_Plantilla`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdHorariosPlantilla` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 890. `Horarios_Plantilla_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 891. `Horarios_Plantilla_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 892. `Rel_Horarios_Plantilla_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 893. `Permisos_Trabajo`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPermisosTrabajo` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 894. `Permisos_Trabajo_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 895. `Permisos_Trabajo_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 896. `Rel_Permisos_Trabajo_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 897. `Evaluaciones_Desempeno`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEvaluacionesDesempeno` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 898. `Evaluaciones_Desempeno_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 899. `Evaluaciones_Desempeno_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 900. `Rel_Evaluaciones_Desempeno_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 901. `Curriculums_Banco`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCurriculumsBanco` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 902. `Curriculums_Banco_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 903. `Curriculums_Banco_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 904. `Rel_Curriculums_Banco_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 905. `Uniformes_Entregas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdUniformesEntregas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 906. `Uniformes_Entregas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 907. `Uniformes_Entregas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 908. `Rel_Uniformes_Entregas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 MARKETING_CRM
### 909. `CRM_Campanyas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCRMCampanyas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 910. `CRM_Campanyas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 911. `CRM_Campanyas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 912. `Rel_CRM_Campanyas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 913. `CRM_Publico`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCRMPublico` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 914. `CRM_Publico_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 915. `CRM_Publico_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 916. `Rel_CRM_Publico_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 917. `CRM_Envios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdCRMEnvios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 918. `CRM_Envios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 919. `CRM_Envios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 920. `Rel_CRM_Envios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 921. `ATMT_Coms`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdATMTComs` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 922. `ATMT_Coms_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 923. `ATMT_Coms_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 924. `Rel_ATMT_Coms_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 925. `ATMT_Plantillas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdATMTPlantillasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 926. `ATMT_Plantillas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 927. `ATMT_Plantillas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 928. `Rel_ATMT_Plantillas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 929. `ATMT_Plantillas_Lin`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdATMTPlantillasLin` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 930. `ATMT_Plantillas_Lin_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 931. `ATMT_Plantillas_Lin_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 932. `Rel_ATMT_Plantillas_Lin_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 933. `ATMT_Variables`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdATMTVariables` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 934. `ATMT_Variables_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 935. `ATMT_Variables_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 936. `Rel_ATMT_Variables_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 937. `SMS_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSMSLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 938. `SMS_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 939. `SMS_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 940. `Rel_SMS_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 941. `Email_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEmailLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 942. `Email_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 943. `Email_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 944. `Rel_Email_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 945. `Encuestas_Cab`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEncuestasCab` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 946. `Encuestas_Cab_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 947. `Encuestas_Cab_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 948. `Rel_Encuestas_Cab_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 949. `Encuestas_Resp`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdEncuestasResp` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 950. `Encuestas_Resp_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 951. `Encuestas_Resp_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 952. `Rel_Encuestas_Resp_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 953. `Llamadas_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdLlamadasLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 954. `Llamadas_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 955. `Llamadas_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 956. `Rel_Llamadas_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 957. `Referidores`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdReferidores` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 958. `Referidores_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 959. `Referidores_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 960. `Rel_Referidores_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 961. `Puntos_Fidelidad`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPuntosFidelidad` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 962. `Puntos_Fidelidad_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 963. `Puntos_Fidelidad_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 964. `Rel_Puntos_Fidelidad_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 965. `Vales_Descuento`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdValesDescuento` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 966. `Vales_Descuento_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 967. `Vales_Descuento_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 968. `Rel_Vales_Descuento_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 969. `Suscripciones_Pac`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSuscripcionesPac` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 970. `Suscripciones_Pac_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 971. `Suscripciones_Pac_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 972. `Rel_Suscripciones_Pac_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 973. `RedesSociales_Link`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdRedesSocialesLink` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 974. `RedesSociales_Link_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 975. `RedesSociales_Link_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 976. `Rel_RedesSociales_Link_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


## 🏢 SISTEMA_SEGURA
### 977. `Usuarios`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdUsuarios` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 978. `Usuarios_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 979. `Usuarios_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 980. `Rel_Usuarios_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 981. `Perfiles`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPerfiles` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 982. `Perfiles_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 983. `Perfiles_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 984. `Rel_Perfiles_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 985. `Permisos_Pantallas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPermisosPantallas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 986. `Permisos_Pantallas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 987. `Permisos_Pantallas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 988. `Rel_Permisos_Pantallas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 989. `Permisos_Acciones`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdPermisosAcciones` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 990. `Permisos_Acciones_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 991. `Permisos_Acciones_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 992. `Rel_Permisos_Acciones_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 993. `SysVariables`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysVariables` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 994. `SysVariables_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 995. `SysVariables_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 996. `Rel_SysVariables_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 997. `SysImpresoras`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysImpresoras` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 998. `SysImpresoras_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 999. `SysImpresoras_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1000. `Rel_SysImpresoras_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1001. `SysTicketing`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysTicketing` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1002. `SysTicketing_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1003. `SysTicketing_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1004. `Rel_SysTicketing_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1005. `SysLicencias`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysLicencias` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1006. `SysLicencias_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1007. `SysLicencias_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1008. `Rel_SysLicencias_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1009. `SysAuditoria_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysAuditoriaLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1010. `SysAuditoria_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1011. `SysAuditoria_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1012. `Rel_SysAuditoria_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1013. `SysErrores_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysErroresLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1014. `SysErrores_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1015. `SysErrores_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1016. `Rel_SysErrores_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1017. `SysBackups_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysBackupsLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1018. `SysBackups_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1019. `SysBackups_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1020. `Rel_SysBackups_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1021. `SysSync_Log`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysSyncLog` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1022. `SysSync_Log_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1023. `SysSync_Log_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1024. `Rel_SysSync_Log_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1025. `SysMultiClinica`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysMultiClinica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1026. `SysMultiClinica_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1027. `SysMultiClinica_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1028. `Rel_SysMultiClinica_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1029. `Sys_Updates`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysUpdates` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1030. `Sys_Updates_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1031. `Sys_Updates_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1032. `Rel_Sys_Updates_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1033. `Sys_ConexionesActivas`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysConexionesActivas` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1034. `Sys_ConexionesActivas_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1035. `Sys_ConexionesActivas_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1036. `Rel_Sys_ConexionesActivas_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1037. `Sys_BloqueosBD`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdSysBloqueosBD` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1038. `Sys_BloqueosBD_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1039. `Sys_BloqueosBD_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1040. `Rel_Sys_BloqueosBD_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1041. `Config_Impresion`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdConfigImpresion` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1042. `Config_Impresion_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1043. `Config_Impresion_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1044. `Rel_Config_Impresion_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1045. `Config_EmailSMTP`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdConfigEmailSMTP` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1046. `Config_EmailSMTP_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1047. `Config_EmailSMTP_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1048. `Rel_Config_EmailSMTP_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |


### 1049. `Config_SMSAPI`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdConfigSMSAPI` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Codigo` | `NVARCHAR(255)` | Dato del negocio |
| `Descripcion` | `NVARCHAR(255)` | Dato del negocio |
| `Activo` | `NVARCHAR(255)` | Dato del negocio |
| `FecCreacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioCrea` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FecModificacion` | `DATETIME` | Timestamp de sistema |
| `IdUsuarioModifica` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `RowVersion` | `NVARCHAR(255)` | Dato del negocio |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |


### 1050. `Config_SMSAPI_Hist`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `Id` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdCabecera` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IdPaciente` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `Fecha` | `DATETIME` | Timestamp de sistema |
| `Importe` | `MONEY` | Dato del negocio |
| `Estado` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `FirmaDigital` | `NVARCHAR(255)` | Dato del negocio |
| `HashControl` | `NVARCHAR(255)` | Dato del negocio |
| `FechaSincronizacion` | `DATETIME` | Timestamp de sistema |
| `VersionAnterior` | `NVARCHAR(255)` | Dato del negocio |
| `MotivoModificacion_Hist` | `NVARCHAR(255)` | Dato del negocio |


### 1051. `Config_SMSAPI_LogAcceso`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `LogId` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `NombreTabla` | `NVARCHAR(255)` | Dato del negocio |
| `Operacion` | `NVARCHAR(255)` | Dato del negocio |
| `DatosAntiguos` | `NVARCHAR(255)` | Dato del negocio |
| `DatosNuevos` | `NVARCHAR(255)` | Dato del negocio |
| `IdUsuarioLogueado` | `UNIQUEIDENTIFIER` | Primary Key / Foreign Key |
| `IpAcceso` | `NVARCHAR(255)` | Dato del negocio |
| `FechaOperacion_H` | `DATETIME` | Timestamp de sistema |
| `AplicacionOrigen` | `NVARCHAR(255)` | Dato del negocio |
| `Terminal_ID` | `NVARCHAR(255)` | Dato del negocio |
| `Session_Token` | `NVARCHAR(255)` | Dato del negocio |


### 1052. `Rel_Config_SMSAPI_Sys`
| Columna Original SQL | Tipo de Dato (SQL Server) | Descripción / PK-FK |
| --- | --- | --- |
| `IdA_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `IdB_Rel` | `UNIQUEIDENTIFIER` | Dato del negocio |
| `FecInicioAsoc` | `DATETIME` | Timestamp de sistema |
| `FecFinAsoc` | `DATETIME` | Timestamp de sistema |
| `ParametroConfig` | `NVARCHAR(255)` | Dato del negocio |
| `Observaciones_Rel` | `NVARCHAR(255)` | Dato del negocio |
| `EstadoRelacion_Config` | `NVARCHAR(255)` | Dato del negocio |

