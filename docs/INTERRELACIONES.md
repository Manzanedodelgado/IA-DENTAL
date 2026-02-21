
# SmilePro: Zonas y Conceptos Interrelacionados

Este documento describe la arquitectura conceptual de la aplicación SmilePro, detallando cómo las diferentes áreas funcionales se interconectan para crear un sistema de gestión de clínica dental cohesivo e integrado.

## Diagrama Conceptual de Alto Nivel

```
[Pacientes] <---- (1..N) ---- [Agenda]
    |
    +---- (1..N) ---- [Historia Clínica]
    |
    +---- (1..N) ---- [Economía y Presupuestos]
    |
    +---- (1..N) ---- [Documentos]
    |
    `---- (Relacionado con) ----> [Whatsapp (Chatwoot)]
                                        ^
                                        | (Actúa sobre)
                                        |
[IA y Automatización] ---- (Usa datos de) ----> [Pacientes, Agenda]
    |
    `---- (Genera) ----> [Comunicaciones (Whatsapp), Tareas]


[Administración] <---- (Agrega datos de) ---- [Economía y Presupuestos]
```

---

## 1. Área Central: Pacientes

El área de **Pacientes** es el núcleo de SmilePro. Cada `Paciente` es una entidad central a la que se vincula casi toda la demás información.

- **Relación con Agenda:**
  - Cada `Cita` en la **Agenda** debe estar asociada a un `Paciente`.
  - Desde la ficha de un `Paciente`, se puede ver su historial de citas pasadas y futuras.
  - Al crear una nueva `Cita`, se busca y se enlaza un `Paciente` existente o se crea uno nuevo.

- **Relación con Sub-módulos del Paciente:**
  - **Historia Clínica:** Contiene todos los registros médicos, odontogramas, alergias y notas clínicas específicas de un `Paciente`. Es una relación uno a uno (un historial por paciente).
  - **Económica y Presupuestos:** Todos los `Presupuestos`, `Facturas`, `Pagos` y `Deudas` están directamente vinculados a un `Paciente`. Esta área es la fuente principal de datos para el módulo de Administración.

- **Relación con IA y Whatsapp:**
  - La información de contacto del `Paciente` (nombre, teléfono) es utilizada por la **IA "Sara"** para personalizar las comunicaciones a través de **Whatsapp**.
  - El historial de conversaciones de **Whatsapp** se puede asociar a la ficha del `Paciente` para tener un registro completo de la comunicación.

---

## 2. Área de Operaciones: Agenda

La **Agenda** gestiona el flujo de trabajo diario de la clínica.

- **Relación con Pacientes:** Como se mencionó, es una relación fundamental. No puede existir una cita sin un paciente.
- **Relación con Administración:** Las citas completadas (tratamientos realizados) generan transacciones económicas que se reflejan en el área **Económica** del paciente y, por consiguiente, se agregan en la contabilidad del área de **Administración**.
- **Relación con IA y Automatización:**
  - La **Agenda** es el principal disparador (`trigger`) para las automatizaciones.
  - **Ejemplos de Automatización:**
    - *Recordatorio de Cita:* 24 horas antes de una `Cita`, el sistema envía automáticamente una plantilla de recordatorio al `Paciente` a través de Whatsapp.
    - *Confirmación de Cita:* El sistema puede solicitar confirmación y la respuesta del `Paciente` (gestionada por "Sara") actualiza el estado de la `Cita` en la agenda (ej. de "Planificada" a "Confirmada").
    - *Seguimiento Post-tratamiento:* Un día después de una cita de "Cirugía", se puede enviar un mensaje de seguimiento.

---

## 3. Área de Inteligencia: IA y Automatización

Esta área actúa como el cerebro automatizado del sistema, utilizando datos de otras áreas para realizar acciones.

- **Entidad Principal: "Sara" (Agente IA):**
  - Se entrena con una base de conocimientos general y se le pueden dar directrices específicas de la clínica.
  - Su objetivo principal es gestionar la comunicación entrante en **Whatsapp**.

- **Relación con Pacientes y Agenda:**
  - **Lectura de datos:** Lee información de los `Pacientes` (nombre para `{{nombre}}`) y de la `Agenda` (fecha/hora para `{{fecha}}`, tipo de tratamiento) para poblar las plantillas de mensajes.
  - **Escritura de datos:** "Sara" puede realizar acciones como:
    - Pre-reservar o confirmar un hueco en la **Agenda** si un paciente lo solicita.
    - Registrar la intención de un paciente (ej. "quiere cancelar") y crear una tarea para el personal de recepción.

- **Relación con Whatsapp (Chatwoot):**
  - **Whatsapp** es el canal de comunicación.
  - La **IA "Sara"** se integra con la API de Chatwoot para leer los mensajes entrantes y enviar respuestas.
  - Cuando "Sara" no puede resolver una consulta o detecta un sentimiento negativo, escala la conversación a un agente humano dentro de la interfaz de Chatwoot.

---

## 4. Área de Gestión: Administración

Este módulo se enfoca en la salud financiera y fiscal de la clínica.

- **Fuente de Datos:** Su principal fuente de datos es el área **Económica** de todos los pacientes.
- **Procesos:**
  - **Agregación:** Suma todos los ingresos (facturas cobradas) y gastos (facturas de proveedores, nóminas, etc.) en un período determinado.
  - **Contabilidad:** Genera asientos contables, balances y cuentas de resultados.
  - **Impuestos:** Utiliza los datos agregados para ayudar a preparar los modelos de impuestos pertinentes (ej. IVA trimestral, IRPF).
  - **Informes:** Crea informes de rendimiento financiero, facturación por doctor, rentabilidad por tratamiento, etc.

---

## 5. Área de Comunicación: Whatsapp (Chatwoot)

Es la interfaz de comunicación directa con los pacientes.

- **Integración Clave:** Se integra profundamente con **IA y Automatización**. Es el "frontend" para el "backend" de la IA.
- **Funcionalidad:**
  - Muestra todas las conversaciones de Whatsapp en un solo lugar.
  - Permite a los agentes humanos tomar el control de las conversaciones cuando la IA lo requiere.
  - Mantiene un historial de chat que puede ser enlazado a la ficha del `Paciente` correspondiente para una vista 360°.