# 🏗️ ARQUITECTURA CORE WEB: 50 TABLAS ESENCIALES DE GELITE

Este documento contiene la estructura forense **100% real y sin alteraciones** de las 50 tablas fundamentales requeridas para la aplicación web, importadas con sus columnas exactas y genuinas extraídas de SQL Server.

> [!NOTE] 
> **Métricas Globales de Extracción:**
> Se han consolidado **50 tablas core** que agrupan un volumen exacto y determinístico de **215,758 registros** combinados de GELITE. Esta es la carga de datos crítica para el entorno web.

### [TABLA] `Pacientes`
**Propósito Arquitectónico:** Gestión operativa de pacientes
- **Esquema:** `dbo`
- **Volumen:** 6,105 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdCli` → `Clientes.IdCli`
  - `IdCliDefec` → `Clientes.IdCli`
  - `IdCliPac` → `Clientes.IdCli`
  - `IdCliTutor` → `Clientes.IdCli`
  - `IdCol` → `TColabos.IdCol`
  - `IdEcivil` → `TECivil.IdECivil`
  - `IdEstado` → `TEstados.IdEstado`
  - `IdIdioma` → `Idioma.IdIdioma`
  - `IdMutDefec` → `Tarifas.IdTarifa`
  - `IdPacReferidor` → `Pacientes.IdPac`
  - `IdPaisIdent` → `TPaises.IdPais`
  - `IdPoblacio` → `TPoblaci.IdPoblacio`
  - `IdProced` → `TProced.IdProced`
  - `IdProfesio` → `TProfesi.IdProfesio`
  - `IdRefDes` → `TRefer.IdRef`
  - `IdRefOri` → `TRefer.IdRef`
  - `IdTrato` → `TTrato.IdTrato`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdCli` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCliPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumPac` | `varchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdMutDefec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCliDefec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Nombre` | `varchar(80)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `Apellidos` | `varchar(100)` | Vínculo Relacional: Punto de normalización de datos. |
| `NIF` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Direccion` | `varchar(80)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdPoblacio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CP` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Tel1` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Tel2` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `TelMovil` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Fax` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Web` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `FecNacim` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Comodin1` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin2` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin3` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin4` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin5` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin6` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `IdRefOri` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `RefOriTxt` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdRefDes` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Descuento` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdProfesio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdEcivil` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumHijos` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Sexo` | `varchar(1)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdTrato` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Foto` | `int` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdEstado` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Mailing` | `bit` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `FecAlta` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `TipoOdg` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AceptaLOPD` | `bit` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AceptaInfo` | `bit` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AceptaSMS` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdColAux` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `AgNumVis` | `int` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AgTpoTotE` | `int` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AgTpoTotR` | `int` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AgTpoTotAt` | `int` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `_fechareg` | `datetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdProced` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CIP` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AgNumFallos` | `int` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Comodin7` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `IdIdioma` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `GrupoSanguineo` | `varchar(3)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `TipoDocIdent` | `int` NOT NULL DEF: `(0)` | Vínculo Relacional: Punto de normalización de datos. |
| `NumSS` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Exitus` | `smalldatetime` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `ExitusObs` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Inactivo` | `smalldatetime` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `MotivoInactivo` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdPacReferidor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `AceptaEmail` | `bit` DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AceptaPostal` | `bit` DEF: `((0))` | Estado Lógico: Determina el ciclo de vida del registro. |
| `IdPaisIdent` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCliTutor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `LecturaDocIdentEstado` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `LecturaDocIdentFecha` | `datetime` NOT NULL DEF: `(getdate())` | Vínculo Relacional: Punto de normalización de datos. |
| `LecturaDocIdentIdUser` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdUserAsesor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `AceptaGDPR` | `bit` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `IdTipoDireccion` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `SeccionCensal` | `varchar(10)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `CoordenadasX` | `varchar(14)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `CoordenadasY` | `varchar(14)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `NoContactable` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `Derivado` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `ExternalId` | `uniqueidentifier` NOT NULL DEF: `(newid())` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `AceptaBots` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |
| `AceptaWhatsApp` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes |

---

### [TABLA] `TtosMed`
**Propósito Arquitectónico:** Gestión operativa de ttosmed
- **Esquema:** `dbo`
- **Volumen:** 56,674 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCCDiagnostico` → `CCDiagnosticos.Id`
  - `IdCentro` → `Centros.IdCentro`
  - `IdCli` → `Clientes.IdCli`
  - `IdCol` → `TColabos.IdCol`
  - `IdDevolucionTransaccion` → `DevolucionTransaccion.Id`
  - `IdEmisor` → `Emisores.IdEmisor`
  - `IdPac` → `Pacientes.IdPac`
  - `IdPlanEcoCuota` → `PlanEcoL.Id`
  - `IdProced` → `TProced.IdProced`
  - `IdRef` → `TRefer.IdRef`
  - `IdTipoEspec` → `TEspecOMC.IdTipoEspec`
  - `IdTipoOdg` → `TTipoOdg.IdTipoOdg`
  - `IdTto` → `Tratamientos_Tarifas.IdTratamientoTarifa`
  - `IdUserEdit` → `TUsers.IdUser`
  - `NumTransaccion` → `TransaccionTratamiento.Id`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `NumTto` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `IdTto` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `ZonasBoca` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `PiezasAdu` | `numeric` | Anatomía Dental: Referencia de localización clínica. |
| `PiezasLec` | `numeric` | Anatomía Dental: Referencia de localización clínica. |
| `PiezasNum` | `numeric` | Anatomía Dental: Referencia de localización clínica. |
| `ZonasPieza` | `numeric` | Anatomía Dental: Referencia de localización clínica. |
| `DespX` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `DespY` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Rotacion` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `StaTto` | `tinyint` | Estado Lógico: Determina el ciclo de vida del registro. |
| `FecIni` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FecFin` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Importe` | `numeric` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `Dto` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Pendiente` | `float` | Anatomía Dental: Referencia de localización clínica. |
| `IdTipoOdg` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Actos` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Tiempo` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `IdCli` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Ident` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Autoriz` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `NumFinan` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `IdUser` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Comodin1` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `IdColAux` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Edu10` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu11` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu12` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu13` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu14` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu20` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu21` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu22` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu23` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Edu24` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `TipoOperac` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `CampoAux1` | `varchar(200)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `CampoAux2` | `varchar(200)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `CampoAux3` | `varchar(200)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `CampoAux4` | `varchar(200)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `CampoAux5` | `varchar(200)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `CampoAux6` | `varchar(200)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `SesRealiz` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `FechaCaduc` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `_fechareg` | `datetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdRef` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdProced` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumDocUnico` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdEmisor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `ImporteDto` | `numeric` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `IdColValida` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FechaValida` | `datetime` | Vínculo Relacional: Punto de normalización de datos. |
| `UniqueID` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `IdPresuTto` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `DescTarifaConector` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `ImportePrivado` | `numeric` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `ImporteMutua` | `numeric` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `IdUserEdit` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `_fecharegEdit` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `NFacturaEl` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `NumTransaccion` | `int` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `IdDevolucionTransaccion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPlanEcoCuota` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCCDiagnostico` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Cuadrantes` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `Arcadas` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de TtosMed |
| `FecExpoCp` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `CId` | `nvarchar(24)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DCitas`
**Propósito Arquitectónico:** Gestión operativa de dcitas
- **Esquema:** `dbo`
- **Volumen:** 47,651 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_MotivoCitacion` → `TMotivoAsignacion.Ident`
  - `IdBox` → `TBoxes.IdBox`
  - `IdCentro` → `Centros.IdCentro`
  - `IdCitasP` → `DCitasPeriod.IdCitasP`
  - `IdCli` → `Clientes.IdCli`
  - `IdGrAgdOpc` → `TGrAgdOpc.IdGrAgdOpc`
  - `IdIcono` → `IconoTratAgenda.IdIcono`
  - `IdMotivoAnulacion` → `TMotivoAsignacion.Ident`
  - `IdOrden_Bloqueado` → `DCitas.IdOrden`
  - `IdPac` → `Pacientes.IdPac`
  - `IdPaisIdent` → `TPaises.IdPais`
  - `IdPartner` → `Partners.IdPartner`
  - `IdProced` → `TProced.IdProced`
  - `IdRef` → `TRefer.IdRef`
  - `IdSitC` → `TSitCita.IdSitC`
  - `IdTarifa` → `Tarifas.IdTarifa`
  - `IdUserIns` → `TUsers.IdUser`
  - `IdUsu` → `TUsuAgd.IdUsu`
  - `IdUsu` → `DCitas.IdUsu`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdUsu` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdOrden` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Fecha` | `int` | Atributo Temporal: Registro cronológico de la operación. |
| `Hora` | `int` | Atributo Temporal: Registro cronológico de la operación. |
| `Duracion` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdSitC` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Texto` | `varchar(1000)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `FlgBloqueo` | `varchar(1)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `Contacto` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `Movil` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `HorLlegada` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `Retraso` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `BOX` | `varchar(64)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `HorConsul` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `HorFinal` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `NOTAS` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `NUMPAC` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `AgStats` | `char(1)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `FecAlta` | `smalldatetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `Recordada` | `tinyint` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `Confirmada` | `tinyint` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdBox` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCitasP` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumOcur` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `DCitasGrp` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `CantIntegGrp` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `Gratuita` | `bit` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdUserIns` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCli` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `MotivoAnulacion` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `NumAuto` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdRef` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdProced` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPartner` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FecNacim` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `NIF` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdPacExt` | `nvarchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOpc` | `varchar(16)` | Vínculo Relacional: Punto de normalización de datos. |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdCita` | `bigint` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdCia` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Comodin1` | `varchar(500)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin2` | `varchar(500)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Aceptada` | `smalldatetime` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdCitaConector` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `HorSitCita` | `smalldatetime` DEF: `(getdate())` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdGrAgdOpc` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdMotivoAnulacion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdIcono` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumActos1Tto` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `IdTarifa` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `OrigenExt` | `nvarchar(250)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `SolicitanteNUMPAC` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `SolicitanteDesc` | `varchar(120)` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `TipoDocIdent` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPaisIdent` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_MotivoCitacion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrigenIns` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrden_Bloqueado` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `EnviarRecordatorio` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `EnviarConfirmacion` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `OrigenAnulacion` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitas |
| `AnulacionGestionada` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de DCitas |

---

### [TABLA] `Clientes`
**Propósito Arquitectónico:** Gestión operativa de clientes
- **Esquema:** `dbo`
- **Volumen:** 6,142 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_TipoCliente` → `TiposCliente.Id`
  - `IdBanco` → `Bancos.IdBanco`
  - `IdCentro` → `Centros.IdCentro`
  - `IdCIA` → `Clientes.IdCli`
  - `IdEmisor` → `Emisores.IdEmisor`
  - `IdIdioma` → `Idioma.IdIdioma`
  - `IdPaisIdent` → `TPaises.IdPais`
  - `IdPoblacio` → `TPoblaci.IdPoblacio`
  - `IdTrato` → `TTrato.IdTrato`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCli` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `TipoCli` | `char(1)` DEF: `('M')` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Nombre` | `varchar(80)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `Apellidos` | `varchar(100)` | Vínculo Relacional: Punto de normalización de datos. |
| `Direccion` | `varchar(80)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `IdPoblacio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CP` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `NIF` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Antecedent` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Tel1` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Tel2` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `TelMovil` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Fax` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Web` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Comodin1` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin2` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `IdTrato` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Cuenta` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Mailing` | `bit` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Entidad` | `char(4)` | Vínculo Relacional: Punto de normalización de datos. |
| `Oficina` | `char(4)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `DC` | `char(2)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `IdBanco` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FecAlta` | `smalldatetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `SISTEMA` | `varchar(50)` DEF: `('NINGUNO')` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `TARIFA` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `FecTarifa` | `smalldatetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `Inactivo` | `char(1)` DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `FecBaja` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `CodCli` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `_fechareg` | `datetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdEmisor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCIA` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdAuxPTarj` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `DiaFact` | `int` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `Modelo` | `int` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `ModoFact` | `int` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `OrdenFactura` | `int` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `DesglosarModalidad` | `char(1)` | Vínculo Relacional: Punto de normalización de datos. |
| `RazonSocial` | `varchar(255)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `DiasCaducidad` | `int` DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `SCCodSCta` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `SCCodDept` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `SCCodProd` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `SCCodProy` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `SCCodSCtaANT` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `DiaFactTalon` | `int` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `TipoDocIdent` | `int` NOT NULL DEF: `(0)` | Vínculo Relacional: Punto de normalización de datos. |
| `CodIBAN` | `varchar(4)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `CodTar` | `int` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `CodImgRC` | `varchar(5)` | Atributo Dominio: Propiedad específica de la lógica de Clientes |
| `IdIdioma` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FecNacim` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `TipoEntidad` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdentPS` | `varchar(12)` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPaisIdent` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `LecturaDocIdentEstado` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `LecturaDocIdentFecha` | `datetime` NOT NULL DEF: `(getdate())` | Vínculo Relacional: Punto de normalización de datos. |
| `LecturaDocIdentIdUser` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `ExternalId` | `uniqueidentifier` NOT NULL DEF: `(newid())` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_TipoCliente` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TColabos`
**Propósito Arquitectónico:** Gestión operativa de tcolabos
- **Esquema:** `dbo`
- **Volumen:** 25 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdEmisor` → `Emisores.IdEmisor`
  - `IdGrpColab` → `TGrpColab.IdGrpColab`
  - `IdPaisIdent` → `TPaises.IdPais`
  - `IdPoblacio` → `TPoblaci.IdPoblacio`
  - `IdProced` → `TProced.IdProced`
  - `IdRef` → `TRefer.IdRef`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCol` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Codigo` | `varchar(10)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Alias` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Apellidos` | `varchar(40)` | Vínculo Relacional: Punto de normalización de datos. |
| `Nombre` | `varchar(20)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `IdPoblacio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CP` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Direccion` | `varchar(80)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `NIF` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Tel1` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Tel2` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TelMovil` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Fax` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `EMail` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Web` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `FecBaja` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Activo` | `char(1)` NOT NULL DEF: `('S')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Horario` | `varchar(35)` | Atributo Temporal: Registro cronológico de la operación. |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Comision` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `ReComision` | `char(1)` NOT NULL DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Cobro` | `char(1)` DEF: `('P')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `CodInt` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `FecAlta` | `smalldatetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `ReGastos` | `char(1)` DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TpcGastos` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Gasto` | `char(1)` DEF: `('P')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `PrecioFijo` | `char(1)` DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TpcPFijo` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `IdTipoColab` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumColeg` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `CobPropios` | `char(1)` DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TipoRealizado` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `IdGrpColab` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IRPF` | `int` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TipoComision` | `char(1)` DEF: `('G')` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `JefeGrupo` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `IdColJefeGrupo` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdRef` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdProced` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdEmisor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `PIN` | `varchar(250)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `FechaPIN` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `InicioEspecCM` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TipoContrato` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `TipoDocIdent` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPaisIdent` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `ExternalId` | `uniqueidentifier` NOT NULL DEF: `(newid())` | Vínculo Relacional: Punto de normalización de datos. |
| `ExternalLogin` | `nvarchar(256)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `ExternalPwd` | `nvarchar(256)` | Atributo Dominio: Propiedad específica de la lógica de TColabos |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `PagoCli`
**Propósito Arquitectónico:** Gestión operativa de pagocli
- **Esquema:** `dbo`
- **Volumen:** 13,583 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_SolicitudDevolucion` → `SolicitudesDevolucion.Id`
  - `IdAnulado` → `PagoCli.IdPagoCli`
  - `IdCentro` → `Centros.IdCentro`
  - `IdCli` → `Clientes.IdCli`
  - `IdDevolucionTransaccion` → `DevolucionTransaccion.Id`
  - `IdentTM` → `TtosMed.Ident`
  - `IdForPago` → `TForPago.IdForPago`
  - `IdLiqComisionDet` → `LiqComisionDet.IdLiqComisionDet`
  - `IdMotivo` → `TMotivoAsignacion.Ident`
  - `IdPagoCliRelacionado` → `PagoCli.IdPagoCli`
  - `IdPasarelaPago` → `PasarelaPago.Id`
  - `IdPlanEcoCuota` → `PlanEcoL.Id`
  - `IdRemesaBancaria` → `RemesasBancarias.Id`
  - `NumTransaccion` → `TransaccionTratamiento.Id`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPagoCli` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdCli` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Pagado` | `float` NOT NULL | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `FecPago` | `smalldatetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `IdForPago` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Oficina` | `char(4)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `Entidad` | `char(4)` | Vínculo Relacional: Punto de normalización de datos. |
| `NumIngre` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `IdBanco` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdUser` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Docs` | `char(4)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `NRecibo` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `NCPago` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `FecExpoCP` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdAnulado` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechareg` | `datetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `ContabSC` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CodIBAN` | `varchar(4)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `IdMotivo` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NoDisponible` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `Cuotas` | `int` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `FechaCuota` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdentTM` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NFactura` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `Tipo` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `IdentPS` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FP_Codigo1` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `FP_Codigo2` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `FP_Codigo3` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `IdLiqComisionDet` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Automatico` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `NumTransaccion` | `int` | Atributo Dominio: Propiedad específica de la lógica de PagoCli |
| `IdDevolucionTransaccion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPasarelaPago` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdRemesaBancaria` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPlanEcoCuota` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPagoCliRelacionado` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FechaImport` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `CId` | `nvarchar(12)` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_SolicitudDevolucion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `HL7PacientesIN`
**Propósito Arquitectónico:** Gestión operativa de hl7pacientesin
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdMsgHL7` | `varchar(50)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `TipoMsgHL7` | `varchar(50)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de HL7PacientesIN |
| `NombreAppEnvia` | `varchar(100)` NOT NULL | Descriptor de Entidad: Identificación humana del sujeto. |
| `MsgHL7` | `varchar(8000)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de HL7PacientesIN |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `LogPac` | `varchar(500)` | Atributo Dominio: Propiedad específica de la lógica de HL7PacientesIN |
| `PID_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_2_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_3_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_3_2` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_3_3` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_3_4` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_4_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_4_2` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_4_3` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_4_4` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_5_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_5_2` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_5_3` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_5_4` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_6_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_6_2` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_6_3` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_6_4` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_7_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_8` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_9_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_10_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_2` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_3` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_4` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_5` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_6` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_7` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_11_8` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_12` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_2` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_3` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_4` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_5` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_6` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_13_7` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_14_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_15_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_16_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_17_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_18_1` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `PID_19` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `Centros`
**Propósito Arquitectónico:** Gestión operativa de centros
- **Esquema:** `dbo`
- **Volumen:** 3 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_GDPRProfile` → `GDPRProfiles.Id`
  - `Id_UserDirector` → `TUsers.IdUser`
  - `IdClasificacionCentro` → `ClasificacionCentro.IdClasificacionCentro`
  - `IdPoblacio` → `TPoblaci.IdPoblacio`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCentro` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `CodCentro` | `varchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Descripcio` | `varchar(200)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Direccion` | `varchar(80)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `IdPoblacio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CP` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Tel1` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Tel2` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Fax` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Web` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `CIF` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Fecha_Corte` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `CodSerie` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `ExpConta` | `int` DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Delegacion` | `varchar(2)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `DescCorta` | `varchar(35)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Comodin1` | `varchar(50)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin2` | `varchar(50)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin3` | `varchar(50)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin4` | `varchar(50)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin5` | `varchar(50)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin6` | `varchar(50)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `RutaFichMutuas` | `varchar(500)` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `IdClasificacionCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CodigoEmpresaPedidos` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `RutFichPedidos` | `varchar(300)` | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `AOAgdGUID` | `varchar(50)` | Vínculo Relacional: Punto de normalización de datos. |
| `ActivacionLiqTrabajosProtesis` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Guid` | `uniqueidentifier` NOT NULL DEF: `(newid())` | Vínculo Relacional: Punto de normalización de datos. |
| `TipoDocIdent` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_GDPRProfile` | `int` NOT NULL DEF: `((1))` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_UserDirector` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Gestionable` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Centros |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TUsers`
**Propósito Arquitectónico:** Gestión operativa de tusers
- **Esquema:** `dbo`
- **Volumen:** 11 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCol` → `TColabos.IdCol`
  - `IdEmisor` → `Emisores.IdEmisor`
  - `IdGrupo` → `EdGrupos.IdGrupo`
  - `IdPaisIdent` → `TPaises.IdPais`
  - `IdPerfil` → `TUPerfil.IdPerfil`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdUser` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Login` | `varchar(50)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `Pass` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `Nombre` | `varchar(20)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `Apellidos` | `varchar(40)` | Vínculo Relacional: Punto de normalización de datos. |
| `NIF` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `Telef` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `UsrRido` | `varchar(100)` | Vínculo Relacional: Punto de normalización de datos. |
| `DirRptExp` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `RptGeneral` | `bit` NOT NULL DEF: `(1)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `FecPass` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdPerfil` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `OcultarPac` | `bit` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `OcultarPa2` | `bit` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FecDActiva` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FecHActiva` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `UsrBloq` | `bit` DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `IdTipoEspec` | `int` DEF: `(0)` | Vínculo Relacional: Punto de normalización de datos. |
| `IdEmisor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdGrupo` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `AdmGrupo` | `char(1)` DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `CodInt` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `PendienteResetear` | `bit` DEF: `((0))` | Anatomía Dental: Referencia de localización clínica. |
| `Guid` | `uniqueidentifier` NOT NULL DEF: `(newid())` | Vínculo Relacional: Punto de normalización de datos. |
| `TipoDocIdent` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPaisIdent` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Password` | `nvarchar(500)` NOT NULL DEF: `('')` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `Guid_DefaultCenter` | `uniqueidentifier` | Vínculo Relacional: Punto de normalización de datos. |
| `Custom` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de TUsers |
| `Guid_ExternalUserDomain` | `uniqueidentifier` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `BannerDentIANoMostrar` | `datetime` | Descriptor de Entidad: Identificación humana del sujeto. |

---

### [TABLA] `PacientesPublic`
**Propósito Arquitectónico:** Gestión operativa de pacientespublic
- **Esquema:** `dbo`
- **Volumen:** 97 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `FecCreacion` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FecModificacion` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Direccion` | `varchar(80)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `CP` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Poblacion` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Provincia` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Tel1` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Tel2` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `TelMovil` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Fax` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `FecNacim` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Sexo` | `varchar(1)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `EstadoCivil` | `varchar(30)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `Profesion` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `NumHijos` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `NIF` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `RefOriTxt` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Nombre` | `varchar(80)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `Apellidos` | `varchar(100)` | Vínculo Relacional: Punto de normalización de datos. |
| `Mailing` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `AceptaLOPD` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `AceptaInfo` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `AceptaSMS` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `Comodin1` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin2` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin3` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin4` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin5` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin6` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin7` | `varchar(30)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `AceptaEmail` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |
| `AceptaPostal` | `bit` | Estado Lógico: Determina el ciclo de vida del registro. |
| `AceptaGDPR` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PacientesPublic |

---

### [TABLA] `PasarelaPagoDet`
**Propósito Arquitectónico:** Gestión operativa de pasarelapagodet
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPasarelaPago` → `PasarelaPago.Id`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdPasarelaPago` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Tipo` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `fechaOperacion` | `varchar(6)` | Atributo Temporal: Registro cronológico de la operación. |
| `horaOperacion` | `varchar(6)` | Atributo Temporal: Registro cronológico de la operación. |
| `CodigoRespuesta` | `varchar(20)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `GlosaRespuesta` | `varchar(2000)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `NumeroUnicoTransaccion` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `Monto` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `MontoVuelto` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `CodigoMoneda` | `varchar(2)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `MontoPropina` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `codigoAutorizacion` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `transaccionPremiada` | `bit` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `marcaTarjeta` | `varchar(2)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `cuatroUltimosDigitosTarjeta` | `varchar(4)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `seisPrimerosDigitosTarjeta` | `varchar(6)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `tipoCuotas` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `montoCuota` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `numeroDeCuotas` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `tasaAplicadaCuotas` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `numeroDeOperacion` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `nombreArchivoVoucher` | `varchar(50)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `pathArchivoVoucher` | `varchar(250)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `TipoTarjeta` | `varchar(2)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `flagTipoVoucher` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `MensajeRespuesta` | `text(2147483647)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `Voucher` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `VoucherDuplicado` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPagoDet |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `FechaImpresion` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |

---

### [TABLA] `ExplPerio`
**Propósito Arquitectónico:** Gestión operativa de explperio
- **Esquema:** `dbo`
- **Volumen:** 960 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_PacPerio` → `PacPerio.Id`
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdExplPer` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `NDent` | `tinyint` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `borsa1` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `borsa2` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `borsa3` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `borsa4` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `borsa5` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `borsa6` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `recessio1` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `recessio2` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `recessio3` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `recessio4` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `recessio5` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `recessio6` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `sangrat1` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `sangrat2` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `sangrat3` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `sangrat4` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `placa1` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `placa2` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `placa3` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `placa4` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `movilitat1` | `int` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `movilitat2` | `char(3)` | Atributo Dominio: Propiedad específica de la lógica de ExplPerio |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_PacPerio` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DCitasPeriod`
**Propósito Arquitectónico:** Gestión operativa de dcitasperiod
- **Esquema:** `dbo`
- **Volumen:** 1 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdBox` → `TBoxes.IdBox`
  - `IdOpc` → `TUsuAOpc.IdOpc`
  - `IdPac` → `Pacientes.IdPac`
  - `IdUsu` → `TUsuAgd.IdUsu`
  - `IdUsu` → `TUsuAOpc.IdUsu`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCitasP` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOpc` | `varchar(16)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `FechaInicio` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FechaFinal` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Inactiva` | `bit` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Hora` | `int` | Atributo Temporal: Registro cronológico de la operación. |
| `Duracion` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Texto` | `varchar(1000)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Contacto` | `varchar(50)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Movil` | `varchar(50)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdBox` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Box` | `varchar(64)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Notas` | `text(2147483647)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `NumPac` | `varchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `FecAlta` | `smalldatetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `Frecuencia` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Periodicidad` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `DiaSem` | `varchar(14)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `DiaMes` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `Mes` | `tinyint` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `DCitasGrp` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `CantIntegGrp` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |
| `NumeroCitas` | `int` | Atributo Dominio: Propiedad específica de la lógica de DCitasPeriod |

---

### [TABLA] `Pacientes_Tarifas`
**Propósito Arquitectónico:** Gestión operativa de pacientes_tarifas
- **Esquema:** `dbo`
- **Volumen:** 6,191 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`
  - `IdTarifa` → `Tarifas.IdTarifa`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPacienteTarifa` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdTarifa` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Poliza` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `Tarjeta` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `FecAlta` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `FecCaduc` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FecUltPase` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Texto` | `varchar(250)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `Version_TS` | `varchar(5)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `Tarjeta24` | `varchar(24)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `Certificado` | `int` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `NOrden` | `int` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `MotivoAsignacion` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `IdProdModTarifa` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdUser` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Comodin1` | `int` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Comodin2` | `varchar(255)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Inactivo` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `Localizador` | `varchar(10)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `FechaLocalizador` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Pista1` | `varchar(250)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `Pista2` | `varchar(250)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `Cobertura` | `varchar(5)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Tarifas |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `RecetasCab`
**Propósito Arquitectónico:** Gestión operativa de recetascab
- **Esquema:** `dbo`
- **Volumen:** 1,250 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdEmisor` → `Emisores.IdEmisor`
  - `IdPac` → `Pacientes.IdPac`
  - `IdTalonRecetaCVE` → `TalonRecetaCVE.IdTalonRecetaCVE`
  - `IdVisita` → `TVisitas.IdVisita`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdUsu` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Fecha` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Descripcio` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `FecIns` | `datetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `IdEmisor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCol` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Publico` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `FechaImpresion` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdVisita` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTalonRecetaCVE` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NotasFarmaceutico` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `Diagnostico` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `TipoReceta` | `int` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `IdRecetaIdent` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `CVE` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `Dispensada` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `NumImpresiones` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `Anulada` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de RecetasCab |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `Bancos`
**Propósito Arquitectónico:** Gestión operativa de bancos
- **Esquema:** `dbo`
- **Volumen:** 1 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdPoblacio` → `TPoblaci.IdPoblacio`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdBanco` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Descripcio` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `IdPoblacio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CP` | `char(20)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Direccion` | `varchar(80)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Tel1` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Tel2` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `TelMovil` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Fax` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Web` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Entidad` | `char(4)` | Vínculo Relacional: Punto de normalización de datos. |
| `Oficina` | `char(4)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `DC` | `char(2)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Cuenta` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Clinica` | `bit` NOT NULL DEF: `(0)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `SCCodSCta` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `SCCodDept` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `SCCodProd` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `SCCodProy` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `CodIBAN` | `varchar(4)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `CodBIC` | `varchar(11)` | Atributo Dominio: Propiedad específica de la lógica de Bancos |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `HL7Citas`
**Propósito Arquitectónico:** Gestión operativa de hl7citas
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdMsg` → `HL7Msgs.IdMsg`
  - `IdOpc` → `DCitasOp.IdOpc`
  - `IdOrden` → `DCitas.IdOrden`
  - `IdOrden` → `DCitasOp.IdOrden`
  - `IdPac` → `Pacientes.IdPac`
  - `IdSitC` → `TSitCita.IdSitC`
  - `IdUsu` → `DCitas.IdUsu`
  - `IdUsu` → `DCitasOp.IdUsu`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdMsg` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Tipo` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `IdCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdUsu` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrden` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdOpc` | `varchar(16)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Fecha` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `Hora` | `time` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `Duracion` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `IdSitC` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Texto` | `varchar(1000)` | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `Contacto` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `NumPac` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `Movil` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `Nif` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |
| `Email` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de HL7Citas |

---

### [TABLA] `TDiagnosticos`
**Propósito Arquitectónico:** Gestión operativa de tdiagnosticos
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdPac` → `Pacientes.IdPac`
  - `IdTipoEspec` → `TEspecOMC.IdTipoEspec`
  - `IdVisita` → `TVisitas.IdVisita`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdDiag` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Descripcion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos |
| `FecIns` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Comentario` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos |
| `Fecha` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdUsu` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Publico` | `char(1)` NOT NULL DEF: `('S')` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos |
| `FecInactivo` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdICD9` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdVisita` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdGestionTarifa` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DCitasTto`
**Propósito Arquitectónico:** Gestión operativa de dcitastto
- **Esquema:** `dbo`
- **Volumen:** 4 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCol` → `TColabos.IdCol`
  - `IdentTM` → `TtosMedFases.IdTtosMedFase`
  - `IdOrden` → `DCitas.IdOrden`
  - `IdProced` → `TProced.IdProced`
  - `IdRef` → `TRefer.IdRef`
  - `IdTipoOdg` → `TTipoOdg.IdTipoOdg`
  - `IdTto` → `Tratamientos_Tarifas.IdTratamientoTarifa`
  - `IdUsu` → `DCitas.IdUsu`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCitasTto` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrden` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdentTM` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTto` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTipoOdg` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Realizado` | `char(1)` NOT NULL DEF: `('N')` | Atributo Dominio: Propiedad específica de la lógica de DCitasTto |
| `_fechareg` | `smalldatetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdProced` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdRef` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de DCitasTto |
| `Duracion` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de DCitasTto |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `SolicitudesFacturaEnvProte`
**Propósito Arquitectónico:** Gestión operativa de solicitudesfacturaenvprote
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_Centro` → `Centros.IdCentro`
  - `Id_Laboratorio` → `TProte.IdProte`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_Centro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Id_Laboratorio` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `FechaDesde` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `FechaHasta` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `Importe` | `numeric` NOT NULL DEF: `((0))` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `Estado` | `int` NOT NULL DEF: `((1))` | Estado Lógico: Determina el ciclo de vida del registro. |
| `FechaEnvSolicitudApi` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FechaEnvEmailLaborario` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FechaError` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Resultado` | `varchar(5000)` | Atributo Dominio: Propiedad específica de la lógica de SolicitudesFacturaEnvProte |
| `CodCentroCoste` | `varchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de SolicitudesFacturaEnvProte |
| `SecCentroCoste` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de SolicitudesFacturaEnvProte |
| `CodSolicitud` | `varchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de SolicitudesFacturaEnvProte |
| `CodPedido` | `varchar(20)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TDiagnosticos_History`
**Propósito Arquitectónico:** Gestión operativa de tdiagnosticos_history
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `bigint` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdDiag` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Descripcion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos_History |
| `FecIns` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Comentario` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos_History |
| `Fecha` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdUsu` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Publico` | `char(1)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos_History |
| `FecInactivo` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdICD9` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdVisita` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdGestionTarifa` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `DeletedBy` | `int` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos_History |
| `DeletedOn` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de TDiagnosticos_History |

---

### [TABLA] `ArqCajaTipoPago`
**Propósito Arquitectónico:** Gestión operativa de arqcajatipopago
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdArqCaja` → `ArqCaja.IdArqCaja`
  - `IdBancoIngr` → `Bancos.IdBanco`
  - `IdCajaFuerte` → `CajaFuerte.IdCajaFuerte`
  - `IdMotivoIncidencia` → `TMotivoIncidencia.IdMotivo`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdArqCajaTipoPago` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdArqCaja` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdTipoPago` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `ImporteCalc` | `numeric` NOT NULL | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `ImporteArq` | `numeric` NOT NULL DEF: `((0))` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `Diferencia` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `PctDif` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `ImpAIngresar` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `ImpSaldoFinal` | `numeric` NOT NULL DEF: `((0))` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `IdBancoIngr` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCajaFuerte` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdMotivoIncidencia` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumDeposito` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `ImpRedondeoSobrante` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `ImpRedondeoFaltante` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `ImpRedondeo` | `numeric` | Atributo Dominio: Propiedad específica de la lógica de ArqCajaTipoPago |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `EdDocs`
**Propósito Arquitectónico:** Gestión operativa de eddocs
- **Esquema:** `dbo`
- **Volumen:** 148 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdentTM` → `TtosMed.Ident`
  - `IdIdioma` → `Idioma.IdIdioma`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdDoc` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdGrupo` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdSubGrupo` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FecCreado` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FecModific` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Titulo` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de EdDocs |
| `IdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Publico` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de EdDocs |
| `Firmado` | `smalldatetime` | Atributo Dominio: Propiedad específica de la lógica de EdDocs |
| `FirmaIdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdentTM` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdIdioma` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Estado` | `int` | Estado Lógico: Determina el ciclo de vida del registro. |
| `CamposVariablesUsados` | `varchar(3000)` | Atributo Dominio: Propiedad específica de la lógica de EdDocs |

---

### [TABLA] `TDocsAdjuntos`
**Propósito Arquitectónico:** Gestión operativa de tdocsadjuntos
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdentTM` → `TtosMed.Ident`
  - `IdPac` → `Pacientes.IdPac`
  - `IdTipoEspec` → `TEspecOMC.IdTipoEspec`
  - `IdVisita` → `TVisitas.IdVisita`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdDoc` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Descripcion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TDocsAdjuntos |
| `Original` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TDocsAdjuntos |
| `Fecha` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FechaIns` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdTipoEspec` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TDocsAdjuntos |
| `Publico` | `char(1)` | Atributo Dominio: Propiedad específica de la lógica de TDocsAdjuntos |
| `IdentTM` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Firmado` | `smalldatetime` | Atributo Dominio: Propiedad específica de la lógica de TDocsAdjuntos |
| `FirmaIdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCentro` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdVisita` | `int` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `CCDiagnosticos`
**Propósito Arquitectónico:** Gestión operativa de ccdiagnosticos
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCanasta` → `Canastas.Id`
  - `IdCCGrupo` → `CCGrupos.Id`
  - `IdColaborador` → `TColabos.IdCol`
  - `IdDiagnostico` → `TDiagnosticos.IdDiag`
  - `IdTarifa` → `Tarifas.IdTarifa`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdDiagnostico` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdTarifa` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdCanasta` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `NivelRiesgo` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de CCDiagnosticos |
| `IdColaborador` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `AcumuladoCopago` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de CCDiagnosticos |
| `AcumuladoComercial` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de CCDiagnosticos |
| `IdCCGrupo` | `int` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DocsFirmados`
**Propósito Arquitectónico:** Gestión operativa de docsfirmados
- **Esquema:** `dbo`
- **Volumen:** 135 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdDocFirma` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `FechaDoc` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `FechaIns` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `TipoDoc` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |
| `TipoFirma` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |
| `Descripcion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |
| `Original` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |
| `Firmado` | `smalldatetime` | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |
| `FirmaIdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrigen` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdColFirma` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Estado` | `int` | Estado Lógico: Determina el ciclo de vida del registro. |
| `FechaPublicado` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `NumRefPublicado` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |
| `Id_Pluggin` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `FirmadoColaborador` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de DocsFirmados |

---

### [TABLA] `NV_DetFactura`
**Propósito Arquitectónico:** Gestión operativa de nv_detfactura
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `bigint` NOT NULL | Identificador único y absoluto del registro (PK). |
| `No Empresa` | `nvarchar(3)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Tipo Documento` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `No documento` | `nvarchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `No linea` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Descripcion` | `nvarchar(50)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Cantidad` | `decimal` | Vínculo Relacional: Punto de normalización de datos. |
| `Precio unitario` | `decimal` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Nombre medico` | `nvarchar(50)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `No encuentro` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Familia` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Division` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Area` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Especialidad` | `nvarchar(20)` | Vínculo Relacional: Punto de normalización de datos. |
| `Zona` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Centro` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Medico` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Compañia` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `Financiacion` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |
| `IVA` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_DetFactura |

---

### [TABLA] `Pacientes_Conversaciones`
**Propósito Arquitectónico:** Gestión operativa de pacientes_conversaciones
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Fecha` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Medio` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `HabladoConDoctor` | `bit` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `HabladoConReferidor` | `bit` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `HabladoConPaciente` | `bit` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `HabladoConPadre` | `bit` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `HabladoConMadre` | `bit` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `HabladoConOtros` | `bit` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `Asunto` | `varchar(255)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `Notas` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `TipoConversacion` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de Pacientes_Conversaciones |

---

### [TABLA] `TCentros`
**Propósito Arquitectónico:** Gestión operativa de tcentros
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdTipoCentro` → `TTipoCentros.IdTipoCentro`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCentro` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdTipoCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Nombre` | `varchar(255)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `NIF` | `varchar(12)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Direccion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `CP` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `IdPoblacio` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Tel1` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Tel2` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Fax` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Movil` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `EMail` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Web` | `varchar(100)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Contacto1` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Contacto2` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Contacto3` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `Observaciones` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TCentros |
| `TipoDocIdent` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TtosMedFases`
**Propósito Arquitectónico:** Gestión operativa de ttosmedfases
- **Esquema:** `dbo`
- **Volumen:** 45,938 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCol` → `TColabos.IdCol`
  - `IdColAux` → `TColabos.IdCol`
  - `IdLiqComisionDet` → `LiqComisionDet.IdLiqComisionDet`
  - `IdTratamientoFase` → `TratamientosFases.IdTratamientoFase`
  - `IdTtosMed` → `TtosMed.Ident`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdTtosMedFase` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdTtosMed` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdTratamientoFase` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumFase` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de TtosMedFases |
| `Estado` | `int` NOT NULL DEF: `((3))` | Estado Lógico: Determina el ciclo de vida del registro. |
| `Fecha` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TtosMedFases |
| `TpcFacturar` | `numeric` NOT NULL DEF: `((100))` | Atributo Dominio: Propiedad específica de la lógica de TtosMedFases |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `IdLiqComisionDet` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdColAux` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DeudaPago`
**Propósito Arquitectónico:** Gestión operativa de deudapago
- **Esquema:** `dbo`
- **Volumen:** 28,257 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdDeudaCli` → `DeudaCli.IdDeudaCli`
  - `IdDocAdminDeuda` → `DocAdmin.Ident`
  - `IdLiqComisionDet` → `LiqComisionDet.IdLiqComisionDet`
  - `IdPagoCli` → `PagoCli.IdPagoCli`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdDeudaCli` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdPagoCli` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Pagado` | `float` NOT NULL | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `FecPago` | `smalldatetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `EditTtos` | `int` | Atributo Dominio: Propiedad específica de la lógica de DeudaPago |
| `FecExpoCP` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `_fechareg` | `datetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdDeudaPago` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdDocAdminDeuda` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `SubTipoPago` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de DeudaPago |
| `IdLiqComisionDet` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `CId` | `nvarchar(23)` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `ProteFacturas`
**Propósito Arquitectónico:** Gestión operativa de protefacturas
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdMotivoAceptacion` → `TMotivoAsignacion.Ident`
  - `IdProte` → `TProte.IdProte`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdProte` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Fecha` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `Numero` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de ProteFacturas |
| `Importe` | `numeric` NOT NULL DEF: `((0))` | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `IVA` | `numeric` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de ProteFacturas |
| `IdEstado` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdUserEstado` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdMotivoAceptacion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `DescMotivoAceptacion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de ProteFacturas |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_iduser` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `ProveedsFactura`
**Propósito Arquitectónico:** Gestión operativa de proveedsfactura
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdMotivoAceptacion` → `TMotivoAsignacion.Ident`
  - `IdProveed` → `Proveeds.IdProveed`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdProveedFactura` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdProveed` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Fecha` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `Numero` | `varchar(40)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de ProveedsFactura |
| `Importe` | `numeric` NOT NULL | Magnitud Económica: Base de cálculo para deudas y cobros. |
| `IVA` | `numeric` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de ProveedsFactura |
| `IdEstado` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdUserEstado` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdMotivoAceptacion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `DescMotivoAceptacion` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de ProveedsFactura |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_iduser` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TtosMedImplantes`
**Propósito Arquitectónico:** Gestión operativa de ttosmedimplantes
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdImplante` → `Stocks.IdProducto`
  - `IdTtosMed` → `TtosMed.Ident`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdTtosMedImplante` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdTtosMed` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `FechaImplante` | `datetime` NOT NULL | Atributo Temporal: Registro cronológico de la operación. |
| `IdImplante` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Fabricante` | `varchar(80)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TtosMedImplantes |
| `DescripcionImplante` | `varchar(250)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TtosMedImplantes |
| `MedidaImplante` | `varchar(250)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `NumLote` | `varchar(40)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TtosMedImplantes |
| `NumPieza` | `int` NOT NULL | Anatomía Dental: Referencia de localización clínica. |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_usuario` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TtosMedImplantes |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `Hueso` | `bit` | Atributo Dominio: Propiedad específica de la lógica de TtosMedImplantes |
| `Membrana` | `bit` | Atributo Dominio: Propiedad específica de la lógica de TtosMedImplantes |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `Sch_Resources_Centros_AOL`
**Propósito Arquitectónico:** Gestión operativa de sch_resources_centros_aol
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_Centro` → `Centros.IdCentro`
  - `Id_Resource` → `Sch_Resources.Id`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Id_Resource` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Id_Centro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `AOAgdGUID` | `nvarchar(50)` | Vínculo Relacional: Punto de normalización de datos. |
| `AODescripcio` | `nvarchar(100)` | Atributo Dominio: Propiedad específica de la lógica de Sch_Resources_Centros_AOL |
| `AOFecPubDesde` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `AOFecPubHasta` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Enabled` | `bit` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Sch_Resources_Centros_AOL |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TForPago`
**Propósito Arquitectónico:** Gestión operativa de tforpago
- **Esquema:** `dbo`
- **Volumen:** 15 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdAgrupacionFormaPago` → `AgrupacionesFormaPago.Id`
  - `Tipo` → `TiposFormaPago.Id`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdForPago` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Tipo` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TForPago |
| `Descripcio` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de TForPago |
| `Inactivo` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de TForPago |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `IdAgrupacionFormaPago` | `int` DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `ModoFinanciacion` | `int` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de TForPago |
| `TPVVirtual` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de TForPago |
| `TPVFisico` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de TForPago |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TalonariosFactura`
**Propósito Arquitectónico:** Gestión operativa de talonariosfactura
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdUser` → `TUsers.IdUser`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdUser` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdEstado` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `TipoTalonario` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TalonariosFactura |
| `TipoDocumento` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TalonariosFactura |
| `RangoInicio` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TalonariosFactura |
| `RangoFin` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TalonariosFactura |
| `TalonActual` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de TalonariosFactura |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |

---

### [TABLA] `DCitasGrp`
**Propósito Arquitectónico:** Gestión operativa de dcitasgrp
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCitasP` → `DCitasPeriod.IdCitasP`
  - `IdDCitasGrpGen` → `DCitasGrp.IdDCitasGrp`
  - `IdOrden` → `DCitas.IdOrden`
  - `IdPac` → `Pacientes.IdPac`
  - `IdUsu` → `DCitas.IdUsu`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdDCitasGrp` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdUsu` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrden` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumPac` | `varchar(15)` | Atributo Dominio: Propiedad específica de la lógica de DCitasGrp |
| `Texto` | `varchar(1000)` | Atributo Dominio: Propiedad específica de la lógica de DCitasGrp |
| `IdCitasP` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `FechaPeriodIni` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `FechaPeriodFin` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdDCitasGrpGen` | `int` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DCitasLogSit`
**Propósito Arquitectónico:** Gestión operativa de dcitaslogsit
- **Esquema:** `dbo`
- **Volumen:** 1,283 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdMotivoAnulacion` → `TMotivoAsignacion.Ident`
  - `IdOrden` → `DCitas.IdOrden`
  - `IdSitC` → `TSitCita.IdSitC`
  - `IdUsu` → `DCitas.IdUsu`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCitasLogSit` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdUsu` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdOrden` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdSitC` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `HorSitCita` | `datetime` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasLogSit |
| `HorFinSit` | `datetime` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DCitasLogSit |
| `IdUserLog` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdMotivoAnulacion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `MotivoAnulacion` | `varchar(1000)` | Atributo Dominio: Propiedad específica de la lógica de DCitasLogSit |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdOrigenSitCita` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `DocsPublicados_CPS`
**Propósito Arquitectónico:** Gestión operativa de docspublicados_cps
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdDoc` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `TipoDoc` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de DocsPublicados_CPS |
| `idSocio` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `idCentro` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `tipoArchivo` | `int` | Atributo Dominio: Propiedad específica de la lógica de DocsPublicados_CPS |
| `estado` | `varchar(30)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `idProveedor` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `ruta` | `varchar(250)` | Atributo Dominio: Propiedad específica de la lógica de DocsPublicados_CPS |
| `usuarioGesden` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de DocsPublicados_CPS |
| `Origen` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de DocsPublicados_CPS |
| `iplocal` | `varchar(30)` | Atributo Dominio: Propiedad específica de la lógica de DocsPublicados_CPS |
| `codRespuesta` | `int` | Estado Lógico: Determina el ciclo de vida del registro. |
| `descRespuesta` | `varchar(8000)` | Estado Lógico: Determina el ciclo de vida del registro. |
| `idInformacionMedica` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |

---

### [TABLA] `PasarelaPago`
**Propósito Arquitectónico:** Gestión operativa de pasarelapago
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdConector` → `TConectores.IdConector`
  - `IdNumTransaccion` → `TransaccionTratamiento.Id`
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdPac` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdConector` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdNumTransaccion` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdEmisor` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `NumeroUnicoTransaccionOriginal` | `varchar(40)` | Atributo Dominio: Propiedad específica de la lógica de PasarelaPago |
| `Estado` | `int` NOT NULL | Estado Lógico: Determina el ciclo de vida del registro. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `RecetasDet`
**Propósito Arquitectónico:** Gestión operativa de recetasdet
- **Esquema:** `dbo`
- **Volumen:** 1,250 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`
  - `IdReceta` → `RecetasCab.IdRecetaIdent`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdReceta` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdTrat` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `DescFarmaco` | `varchar(255)` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `DispPrev` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `Duracion` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `Envases` | `int` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `OrdenDisp` | `int` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `Pauta` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `Posologia` | `varchar(50)` | Atributo Dominio: Propiedad específica de la lógica de RecetasDet |
| `Unidades` | `varchar(50)` | Vínculo Relacional: Punto de normalización de datos. |
| `IdRecetaDet` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `Centros_Tarifas`
**Propósito Arquitectónico:** Gestión operativa de centros_tarifas
- **Esquema:** `dbo`
- **Volumen:** 4 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdTarifa` → `Tarifas.IdTarifa`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdCentroTarifa` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdTarifa` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Inactivo` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de Centros_Tarifas |
| `Desde` | `datetime` NOT NULL DEF: `('19500101')` | Atributo Dominio: Propiedad específica de la lógica de Centros_Tarifas |
| `Hasta` | `datetime` | Estado Lógico: Determina el ciclo de vida del registro. |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `GDPRConsentimientos`
**Propósito Arquitectónico:** Gestión operativa de gdprconsentimientos
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Descripcion` | `varchar(255)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `Personalizable` | `bit` NOT NULL DEF: `((0))` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `Orden` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `DescCorta` | `nvarchar(50)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `Grupo` | `nvarchar(30)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `Detalles` | `nvarchar(1000)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `Ejemplo` | `nvarchar(300)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `CodExt` | `nvarchar(50)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `GDPRConsentimientos_Texts`
**Propósito Arquitectónico:** Gestión operativa de gdprconsentimientos_texts
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_GDPRConsentimientos` → `GDPRConsentimientos.Id`
  - `Id_Idioma` → `Idioma.IdIdioma`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_GDPRConsentimientos` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Id_Idioma` | `int` NOT NULL DEF: `((1))` | Vínculo Relacional: Punto de normalización de datos. |
| `DescCorta` | `nvarchar(50)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos_Texts |
| `Grupo` | `nvarchar(30)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos_Texts |
| `Detalles` | `nvarchar(1000)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos_Texts |
| `Ejemplo` | `nvarchar(300)` | Atributo Dominio: Propiedad específica de la lógica de GDPRConsentimientos_Texts |

---

### [TABLA] `NV_CabFactura`
**Propósito Arquitectónico:** Gestión operativa de nv_cabfactura
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `bigint` NOT NULL | Identificador único y absoluto del registro (PK). |
| `No Empresa` | `nvarchar(3)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `Tipo Documento` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `No` | `nvarchar(20)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `Venta a No Cliente` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `Fecha Registro` | `datetime` | Atributo Temporal: Registro cronológico de la operación. |
| `Texto Registro` | `nvarchar(50)` | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `No Historial clinico` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `Usuario` | `varchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `Nombre fiscal` | `nvarchar(50)` | Descriptor de Entidad: Identificación humana del sujeto. |
| `provincia` | `nvarchar(2)` | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `NIF_Permiso residencia` | `nvarchar(30)` | Vínculo Relacional: Punto de normalización de datos. |
| `No serie` | `nvarchar(20)` | Atributo Dominio: Propiedad específica de la lógica de NV_CabFactura |
| `Liquidado Tipo Documento` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `Liquidado Numero Documento` | `varchar(30)` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `Digit_PdfPresupuestos`
**Propósito Arquitectónico:** Gestión operativa de digipdfpresupuestos
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCentro` → `Centros.IdCentro`
  - `IdPaciente` → `Pacientes.IdPac`
  - `IdPresupuesto` → `Presu.Ident`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdPresupuesto` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdPaciente` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdCentro` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `FileName` | `nvarchar(255)` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Digit_PdfPresupuestos |
| `VersionPresupuesto` | `int` NOT NULL | Atributo Dominio: Propiedad específica de la lógica de Digit_PdfPresupuestos |
| `Status` | `tinyint` NOT NULL | Estado Lógico: Determina el ciclo de vida del registro. |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechareg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |

---

### [TABLA] `PacPerio`
**Propósito Arquitectónico:** Gestión operativa de pacperio
- **Esquema:** `dbo`
- **Volumen:** 30 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdPac` → `Pacientes.IdPac`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdExplPer` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Fecha` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `NotasSup` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de PacPerio |
| `NotasInf` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de PacPerio |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` NOT NULL DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Guid_Tenant` | `uniqueidentifier` NOT NULL DEF: `([dbo].[GetTenantGuidDefault]())` | Vínculo Relacional: Punto de normalización de datos. |

---

### [TABLA] `TUsers_Conectores`
**Propósito Arquitectónico:** Gestión operativa de tusers_conectores
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `Id_Conector` → `TConectores.IdConector`
  - `Id_User` → `TUsers.IdUser`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `Id` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `_version` | `int` NOT NULL DEF: `((1))` | Metadato Técnico: Control de concurrencia optimista. |
| `_fechaReg` | `datetime` NOT NULL DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `_idUserReg` | `int` NOT NULL DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechaModif` | `datetime` DEF: `(getdate())` | Atributo Temporal: Registro cronológico de la operación. |
| `_idUserModif` | `int` DEF: `((0))` | Vínculo Relacional: Punto de normalización de datos. |
| `Id_User` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Id_Conector` | `int` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `IdUserConector` | `varchar(50)` NOT NULL | Vínculo Relacional: Punto de normalización de datos. |
| `Comodin` | `varchar(500)` | Extensibilidad: Campo reservado para lógica de cliente/localización. |
| `Inactivo` | `datetime` | Atributo Dominio: Propiedad específica de la lógica de TUsers_Conectores |

---

### [TABLA] `TtosMedSes`
**Propósito Arquitectónico:** Gestión operativa de ttosmedses
- **Esquema:** `dbo`
- **Volumen:** 0 filas registradas.
- **Arquitectura de Relaciones (Salida):**
  - `IdCol` → `TColabos.IdCol`
  - `IdentTM` → `TtosMed.Ident`

| Columna | Propiedades | Concepto de Experto / Rol de Negocio |
| :--- | :--- | :--- |
| `IdPac` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `NumTto` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `NumFase` | **[PK]** `tinyint` NOT NULL | Identificador único y absoluto del registro (PK). |
| `IdSesion` | **[PK]** `int` NOT NULL | Identificador único y absoluto del registro (PK). |
| `Notas` | `text(2147483647)` | Atributo Dominio: Propiedad específica de la lógica de TtosMedSes |
| `StaTto` | `int` | Estado Lógico: Determina el ciclo de vida del registro. |
| `Fecha` | `smalldatetime` | Atributo Temporal: Registro cronológico de la operación. |
| `IdCol` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `IdUser` | `int` | Vínculo Relacional: Punto de normalización de datos. |
| `_fechareg` | `smalldatetime` DEF: `(getdate())` | Metadato Técnico: Timestamp de auditoría de inserción. |
| `IdentTM` | `int` | Vínculo Relacional: Punto de normalización de datos. |

---

