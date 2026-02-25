# DIÁGRAMA DE ENTIDAD-RELACIÓN (ER) - GELITE (50 TABLAS CORE)

A continuación, se presenta la arquitectura relacional (Entity-Relationship) de las 50 tablas fundamentales extraídas del volcado de la clínica.

El diagrama expone el núcleo de facturación, agenda, clínica, presupuestos y recursos, entrelazados según su estructura original (Primary Keys / Foreign Keys).

```mermaid
erDiagram
    %% ==========================================
    %% 1. NÚCLEO DE PACIENTES / CLIENTES
    %% ==========================================
    PACIENTES ||--o{ DCITAS : "agenda"
    PACIENTES ||--o{ PRESU : "recibe"
    PACIENTES ||--o{ TTOSMED : "se somete a"
    PACIENTES ||--o{ FACTURAS : "es facturado"
    PACIENTES ||--o{ PAGOCLI : "abona"
    PACIENTES ||--o{ RECETAS_CAB : "se le receta"
    PACIENTES ||--o{ CITAS_RECOR : "recordatorios"
    PACIENTES ||--o{ CONSENTIMIENTOS_FIRMAS : "firma"
    PACIENTES ||--o{ PERIO_FICHAS : "periodoncia"
    PACIENTES ||--o{ ORTO_ESTUDIOS : "orto"
    PACIENTES ||--o{ FOTOGRAFIAS_CLINICAS : "fotos adjuntas"

    CLIENTES ||--o{ PACIENTES : "puede ser tutor/pagador de"
    CLIENTES ||--o{ FACTURAS : "titular de fra"

    %% ==========================================
    %% 2. NÚCLEO CLÍNICO & PRESUPUESTOS
    %% ==========================================
    PRESU ||--o{ PRESUTTO : "contiene lineas de tto"
    PRESUTTO }|--|| TARTICULO : "hace ref a codigo de clinica/material"
    TTOSMED }|--|| TDIAGNOSTICOS : "puede derivar de"
    
    %% ==========================================
    %% 3. NÚCLEO FINANCIERO & PAGOS
    %% ==========================================
    FACTURAS }o--o{ PAGOCLI : "puede tener pagos parciales"
    FACTURAS }|--|| TFORPAGO : "modo de pago"
    PAGOCLI }|--|| BANCOS : "entidad destino"
    
    FACT_MUTUAS_CAB ||--o{ FACTURAS : "agrupacion a aseguradoras"
    FACT_MUTUAS_CAB }|--|| MUTUAS : "empresa de seguro"
    PACIENTES }|--|| MUTUAS : "afiliado a"

    %% ==========================================
    %% 4. NÚCLEO DE AGENDA & GABINETES
    %% ==========================================
    DCITAS }|--|| GABINETES : "se cita en"
    DCITAS }|--|| TIPOSCITA : "clase de cita"
    DCITAS }|--|| MOTIVOSANULACION : "puede anularse por"
    DCITAS }|--|| AGDNOTAS : "observaciones"
    
    LISTASESPERA }|--|| PACIENTES : "paciente en espera"
    SALASESPERA ||--o{ PACIENTES : "paciente aguardando"

    %% ==========================================
    %% 5. NÚCLEO DE RECURSOS HUMANOS & USUARIOS
    %% ==========================================
    TCOLABOS ||--o{ DCITAS : "doctor atiende"
    TCOLABOS ||--o{ TTOSMED : "doctor realiza"
    TCOLABOS ||--o{ TURNOSDOC : "asignacion de turno"
    TCOLABOS ||--o{ HORARIOSCENTRO : "horario laboral"
    
    TUSERS ||--o{ TUSUAGD : "configuracion visual en agenda"
    TUSERS }|--|| PERFILES : "rol de sistema"
    ACCESOS }|--|| TUSERS : "control de login"
    
    EMPLEADOS ||--o{ TAREAS : "se le asigna"
    USUARIOS ||--o{ EMPLEADOS : "login de empleado no clinico"

    %% ==========================================
    %% 6. ESTRUCTURA BASE (UBICACIONES & ALMACÉN)
    %% ==========================================
    CENTROS ||--o{ GABINETES : "contiene"
    CENTROS ||--o{ ALMACENES : "gestiona"
    CENTROS ||--o{ PACIENTES : "creado en"
    
    PROVEEDORES ||--o{ ALBARANESPROV_CAB : "suministra"
    PROVEEDORES ||--o{ PEDIDOSPROV_CAB : "se le solicita"
    ALBARANESPROV_CAB ||--o{ TARTICULO : "ingreso stock"

    %% ==========================================
    %% 7. CAMPAÑAS & AUDITORÍA
    %% ==========================================
    CRM_CAMPANYAS ||--o{ PACIENTES : "audiencia"
    SYSVARIABLES : "global configs"
    SYSAUDITORIA_LOG : "registro de transacciones (quien, cuando)"
```

### Relaciones Clave (Nomenclatura GELITE)
- `IdPac`: Integra todo el sistema clínico del paciente.
- `IdCol` / `IdColabo`: Vincula directamente la producción médica con el cuadro médico (doctores e higienistas).
- `IdPresu`: Liga el contenedor presupuestario `PRESU` con las particiones por tratamientos `PRESUTTO`.
- `IdCent` o `IdCentro`: Aísla estructuralmente la facturación y almacenes si la clínica cuenta con múltiple sede.
- `NumFra`: Enlaza `FACTURAS` con `PAGOCLI` para rastrear remesas de cajas.
