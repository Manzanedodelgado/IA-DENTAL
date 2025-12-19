# Rubio García Dental - Sistema de Gestión Integral

## Memoria Técnica y Funcional

**Versión:** 1.0.0  
**Última actualización:** 8 de diciembre de 2025  
**URL de producción:** https://app.rubiogarciadental.com

---

## 1. Descripción General

Sistema de gestión integral para clínicas dentales desarrollado con tecnologías modernas. Permite la administración completa de pacientes, citas, facturación, historial clínico, mensajería WhatsApp y funcionalidades de inteligencia artificial.

---

## 2. Stack Tecnológico

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **UI:** React 19
- **Estilos:** Tailwind CSS 4 + CSS personalizado
- **Fuente:** Inter (Google Fonts)
- **Estado global:** Zustand
- **Fetching de datos:** SWR

### Backend
- **API:** Next.js API Routes (serverless)
- **Base de datos:** PostgreSQL (Supabase)
- **ORM:** Prisma 5.22
- **Autenticación:** NextAuth.js 4
- **Adaptador de sesión:** @auth/prisma-adapter

### Infraestructura
- **Hosting:** Vercel
- **Base de datos:** Supabase (PostgreSQL)
- **Control de versiones:** GitHub

---

## 3. Identidad Visual y Estética

### Paleta de Colores
| Color | Código | Uso |
|-------|--------|-----|
| Navy Oscuro | `#1D1160` | Sidebar, textos principales, encabezados |
| Azul Primario | `#3340D3` | Botones, acentos, gradientes |
| Cyan | `#00C6CC` | Botones secundarios, estados activos |
| Amarillo Neón | `#CFF214` | Acentos, indicadores de selección |
| Gris Texto | `#8492a6` | Texto secundario, subtítulos |
| Fondo | `#f5f7fa` | Fondo de la aplicación |
| Blanco | `#ffffff` | Tarjetas, superficies |
| Borde | `#e8ecf1` | Bordes de inputs, separadores |

### Gradientes
- **Gradiente primario:** `linear-gradient(135deg, #3340D3 0%, #00C6CC 100%)`
- **Gradiente sidebar:** `linear-gradient(180deg, #1D1160 0%, #2a1a7a 100%)`
- **Gradiente login:** `linear-gradient(135deg, #1D1160 0%, #3340D3 50%, #00C6CC 100%)`

### Tipografía
- **Familia:** Inter
- **Peso encabezados:** 700
- **Peso cuerpo:** 400-600
- **Tamaño base:** 14px

### Elementos UI
- **Border radius tarjetas:** 12-16px
- **Border radius botones:** 10px
- **Border radius inputs:** 10px
- **Sombras:** `0 2px 8px rgba(0, 0, 0, 0.06)`
- **Transiciones:** 0.2s-0.3s cubic-bezier

---

## 4. Módulos y Funcionalidades

### 4.1 Autenticación y Seguridad

#### Página de Login
- Formulario de acceso con email y contraseña
- Checkbox "Recordar usuario"
- Opción de recuperación de contraseña
- Sistema de sesiones con NextAuth.js
- Protección de rutas mediante middleware
- Cookies HttpOnly para tokens de sesión

#### Roles de Usuario
| Rol | Permisos |
|-----|----------|
| ADMIN | Acceso completo a todas las funcionalidades |
| DOCTOR | Gestión de citas, pacientes, historial clínico |
| RECEPTIONIST | Gestión de citas, pacientes, facturación |
| HYGIENIST | Vista limitada de citas y pacientes |

---

### 4.2 Panel de Control (Dashboard)

**Ruta:** `/dashboard`

#### Tarjetas de Estadísticas
- **Citas de hoy:** Contador de citas programadas para el día actual
- **Pacientes totales:** Número total de pacientes registrados
- **Ingresos del mes:** Suma de facturas pagadas en el mes actual
- **Tasa de ocupación:** Porcentaje de ocupación de la agenda

#### Sección de Citas del Día
- Lista de citas ordenadas por hora
- Indicador visual de estado (Programada, Confirmada, Completada, Cancelada, No presentado)
- Información del paciente y tratamiento
- Nombre del doctor asignado

#### Acciones Rápidas
- Botón "Nueva Cita"
- Botón "Nuevo Paciente"
- Botón "Crear Factura"

---

### 4.3 Gestión de Pacientes

**Ruta:** `/dashboard/pacientes`

#### Lista de Pacientes
- Tabla con columnas: Nombre, Teléfono, Email, Última visita, Acciones
- Barra de búsqueda por nombre, teléfono o email
- Paginación de resultados
- Ordenación por columnas

#### Ficha de Paciente
- Datos personales completos
- Número de paciente único
- DNI/NIE
- Fecha de nacimiento
- Dirección postal
- Preferencias de comunicación (Email/WhatsApp/SMS)
- Estado de consentimiento LOPD

#### Formulario de Nuevo Paciente
Campos requeridos:
- Nombre y apellidos
- Teléfono móvil

Campos opcionales:
- Email
- DNI
- Fecha de nacimiento
- Teléfono fijo
- Dirección
- Alergias conocidas
- Enfermedades crónicas
- Medicación actual

---

### 4.4 Historia Clínica

**Ruta:** `/dashboard/pacientes/[id]/historia`

#### Odontograma Interactivo
- Representación visual de la dentadura (32 dientes adultos)
- Estados posibles por diente:
  - Sano
  - Caries
  - Empaste
  - Corona
  - Implante
  - Ausente
  - Endodoncia
  - Prótesis
- Selección de diente mediante click
- Menú contextual para cambiar estado
- Guardado automático de cambios

#### Línea de Tiempo de Tratamientos
- Lista cronológica de tratamientos realizados
- Campos por tratamiento:
  - Nombre del tratamiento
  - Descripción
  - Estado (Planificado, En progreso, Completado, Cancelado)
  - Fecha de inicio
  - Fecha de fin
  - Coste

#### Galería de Fotografías Clínicas
- Subida de imágenes (radiografías, fotos intraorales)
- Descripción por imagen
- Fecha de captura
- Vista en galería con ampliación

#### Alertas Médicas
- Sistema de alertas con niveles de severidad:
  - Baja (verde)
  - Media (amarillo)
  - Alta (naranja)
  - Crítica (rojo)
- Tipos de alerta:
  - Alergia
  - Interacción medicamentosa
  - Advertencia de tratamiento
  - General
- Estado: Activa/Resuelta

#### Documentos Firmados
- Gestión de documentos legales:
  - LOPD (Protección de datos)
  - Consentimiento informado
  - Plan de tratamiento
  - Autorizaciones
- Firma digital mediante canvas táctil
- Generación de PDF con firma incorporada
- Histórico de documentos firmados

---

### 4.5 Agenda de Citas

**Ruta:** `/dashboard/agenda`

#### Vista de Calendario
- Vista semanal con columnas por día
- Vista diaria con franjas horarias
- Navegación por fechas
- Indicador del día actual

#### Citas en Agenda
- Código de color por estado
- Información visible: Hora, Paciente, Tratamiento
- Tooltip con detalles adicionales

#### Formulario de Nueva Cita
- Selector de paciente (búsqueda en tiempo real)
- Selector de doctor
- Fecha y hora de inicio
- Hora de fin (calculada automáticamente)
- Tipo de tratamiento
- Notas adicionales

#### Estados de Cita
| Estado | Color | Descripción |
|--------|-------|-------------|
| SCHEDULED | Gris | Cita programada sin confirmar |
| CONFIRMED | Azul | Cita confirmada por el paciente |
| COMPLETED | Verde | Cita realizada |
| CANCELLED | Rojo | Cita cancelada |
| NO_SHOW | Naranja | Paciente no se presentó |

---

### 4.6 Gestión Económica

**Ruta:** `/dashboard/gestion`

#### Panel de Facturación
- **Facturas emitidas:** Total de facturas del período
- **Ingresos totales:** Suma de facturas pagadas
- **Pendiente de cobro:** Suma de facturas no pagadas
- **IVA recaudado:** Total de IVA en facturas

#### Lista de Facturas
- Número de factura (serie + número correlativo)
- Fecha de emisión
- Paciente
- Importe total
- Estado (Borrador, Emitida, Pagada, Cancelada)
- Acciones: Ver, Descargar PDF, Marcar como pagada

#### Creación de Facturas
- Selección de paciente
- Líneas de factura:
  - Descripción del servicio
  - Cantidad
  - Precio unitario
  - IVA aplicable
  - Total de línea
- Cálculo automático de subtotal, IVA y total
- Notas adicionales
- Método de pago

#### Generación de PDF
- Diseño profesional con logo de la clínica
- Datos fiscales de la clínica
- Datos del paciente
- Detalle de servicios
- Totales con desglose de IVA
- Código QR (preparado para VeriFactu)
- Firma digital (opcional)

#### Compatibilidad VeriFactu
- Campo hash para cadena de hashes
- Campo signatureDate para fecha de firma
- Campo qrData para código QR
- Campos AEAT: sentToAEAT, aeatReference, aeatSentAt
- Estructura preparada para integración con la AEAT

---

### 4.7 Mensajería WhatsApp

**Ruta:** `/dashboard/mensajeria`

#### Panel de Conversaciones
- Lista de conversaciones ordenadas por última actividad
- Indicador de mensajes no leídos
- Avatar con iniciales del paciente
- Preview del último mensaje

#### Ventana de Chat
- Historial de mensajes con scroll
- Burbujas diferenciadas:
  - Mensajes enviados (azul/cyan, alineados a la derecha)
  - Mensajes recibidos (gris, alineados a la izquierda)
- Timestamp por mensaje
- Input de texto con envío por Enter o botón

#### Estados de Mensaje
| Estado | Descripción |
|--------|-------------|
| PENDING | Pendiente de envío |
| SENT | Enviado |
| DELIVERED | Entregado |
| READ | Leído |
| FAILED | Error en envío |

#### Marcadores de Urgencia
- Flag de mensaje urgente
- Campo de razón de urgencia
- Destacado visual en conversación

---

### 4.8 Inteligencia Artificial

**Ruta:** `/dashboard/ia`

#### Comandos por Voz
- Reconocimiento de voz mediante Web Speech API
- Procesamiento de comandos naturales
- Acciones soportadas:
  - "Crear cita para [paciente] el [fecha]"
  - "Buscar paciente [nombre]"
  - "Mostrar agenda de hoy"
  - "Crear factura para [paciente]"

#### Panel de Control de IA
- Activación/desactivación del asistente
- Configuración de modelo de IA
- Historial de comandos procesados

#### Integración con API de IA
- Endpoint `/api/ai/command` para procesamiento
- Preparado para integración con OpenAI/Anthropic
- Respuestas en formato estructurado

---

### 4.9 Configuración

**Ruta:** `/dashboard/config`

#### Configuración de Usuario
- Cambio de contraseña
- Preferencias de notificación
- Idioma de la interfaz

#### Configuración de Clínica
- Datos fiscales (NIF, razón social, dirección)
- Horario de atención
- Días festivos

#### Gestión de Usuarios
- Lista de usuarios del sistema
- Creación de nuevos usuarios
- Asignación de roles
- Activación/desactivación de cuentas

#### Precios de Tratamientos
- Catálogo de tratamientos
- Precio por tratamiento
- Activación/desactivación de tratamientos

#### Plantillas de Mensajes
- Plantillas para WhatsApp, Email, SMS
- Variables dinámicas: {nombre}, {fecha}, {hora}, {tratamiento}
- Activación/desactivación de plantillas

#### Automatizaciones
- Triggers disponibles:
  - 24 horas antes de cita
  - Cita confirmada
  - Cita cancelada
  - Primera visita
  - Personalizado
- Asignación de plantilla por trigger
- Condiciones personalizables (JSON)

---

## 5. Arquitectura de Base de Datos

### Entidades Principales

#### Users (Usuarios)
```
id, email, name, password, role, active, createdAt, updatedAt
```

#### Patients (Pacientes)
```
id, patientNumber, firstName, lastName, dni, birthDate, phone, mobile, 
email, address, allergies, diseases, medications, communicationPreference, 
lopdSigned, lopdDate, createdAt, updatedAt
```

#### Appointments (Citas)
```
id, patientId, doctorId, startTime, endTime, treatment, status, notes, 
createdAt, updatedAt
```

#### MedicalHistory (Historia Clínica)
```
id, patientId, odontogram (JSON), createdAt, updatedAt
```

#### Treatments (Tratamientos)
```
id, medicalHistoryId, name, description, status, startDate, endDate, 
cost, createdAt, updatedAt
```

#### Invoices (Facturas)
```
id, invoiceNumber, series, patientId, issueDate, dueDate, subtotal, 
vat, total, qrData, hash, signatureDate, status, paidAt, paymentMethod, 
sentToAEAT, aeatReference, aeatSentAt, createdById, createdAt, updatedAt
```

#### WhatsAppMessages (Mensajes)
```
id, patientId, from, to, body, isUrgent, urgencyReason, status, 
sentAt, readAt, createdAt
```

### Relaciones
- Patient → Appointments (1:N)
- Patient → MedicalHistory (1:1)
- Patient → Invoices (1:N)
- Patient → WhatsAppMessages (1:N)
- MedicalHistory → Treatments (1:N)
- MedicalHistory → HistoryPhotos (1:N)
- MedicalHistory → MedicalAlerts (1:N)
- MedicalHistory → SignedDocuments (1:N)
- Invoice → InvoiceItems (1:N)
- User → Appointments (1:N como doctor)
- User → Invoices (1:N como creador)

---

## 6. API Endpoints

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/signin` | Iniciar sesión |
| POST | `/api/auth/signout` | Cerrar sesión |
| GET | `/api/auth/session` | Obtener sesión actual |

### Pacientes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/patients` | Listar pacientes |
| POST | `/api/patients` | Crear paciente |
| GET | `/api/patients/[id]` | Obtener paciente |
| PATCH | `/api/patients/[id]` | Actualizar paciente |
| DELETE | `/api/patients/[id]` | Eliminar paciente |

### Citas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/appointments` | Listar citas |
| POST | `/api/appointments` | Crear cita |
| GET | `/api/appointments/[id]` | Obtener cita |
| PATCH | `/api/appointments/[id]` | Actualizar cita |
| DELETE | `/api/appointments/[id]` | Eliminar cita |

### Facturación
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/invoices` | Listar facturas |
| POST | `/api/invoices` | Crear factura |
| GET | `/api/invoices/[id]` | Obtener factura |
| PATCH | `/api/invoices/[id]` | Actualizar factura |
| DELETE | `/api/invoices/[id]` | Eliminar factura |

### Historia Clínica
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/medical-history/[patientId]` | Obtener historia |
| POST | `/api/medical-history/[patientId]/treatments` | Añadir tratamiento |
| POST | `/api/medical-history/[patientId]/photos` | Añadir foto |
| POST | `/api/medical-history/[patientId]/alerts` | Añadir alerta |
| POST | `/api/medical-history/[patientId]/documents` | Añadir documento |
| POST | `/api/medical-history/documents/[id]/sign` | Firmar documento |

### Mensajería
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/whatsapp/messages` | Listar mensajes |
| POST | `/api/whatsapp/messages` | Enviar mensaje |

### Configuración
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/settings` | Obtener configuración |
| PUT | `/api/settings` | Actualizar configuración |
| GET | `/api/users` | Listar usuarios |
| POST | `/api/users` | Crear usuario |
| GET | `/api/treatment-prices` | Listar precios |
| GET | `/api/templates` | Listar plantillas |
| GET | `/api/automations` | Listar automatizaciones |

### IA
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/ai/command` | Procesar comando de IA |

### Estadísticas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/stats` | Obtener estadísticas del dashboard |

---

## 7. Seguridad

### Autenticación
- Sesiones manejadas con NextAuth.js
- Tokens JWT con expiración configurable
- Cookies HttpOnly y Secure
- CSRF protection integrado

### Autorización
- Middleware de protección de rutas
- Verificación de roles por endpoint
- Validación de propiedad de recursos

### Datos Sensibles
- Contraseñas hasheadas con bcrypt
- Variables de entorno para secretos
- Sin exposición de datos sensibles en cliente

### Headers de Seguridad
- Strict-Transport-Security
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

---

## 8. Componentes Reutilizables

### Formularios
- **PatientForm:** Formulario de creación/edición de paciente
- **AppointmentForm:** Formulario de citas
- **InvoiceForm:** Formulario de facturas

### Visualización
- **Odontogram:** Componente interactivo de odontograma
- **TreatmentTimeline:** Línea de tiempo de tratamientos
- **PhotoGallery:** Galería de imágenes clínicas
- **MedicalAlerts:** Panel de alertas médicas
- **SignedDocumentsList:** Lista de documentos firmados

### Interacción
- **SignatureCanvas:** Canvas para firma digital
- **VoiceControl:** Control por voz para comandos

### Layout
- **DashboardLayout:** Layout con sidebar y contenido principal
- **Providers:** Wrapper para providers de React (Session, SWR)

---

## 9. Hooks Personalizados

| Hook | Descripción |
|------|-------------|
| `usePatients(search?)` | Obtiene lista de pacientes con búsqueda |
| `useAppointments(params?)` | Obtiene citas con filtros |
| `useInvoices(params?)` | Obtiene facturas con filtros |
| `useWhatsAppMessages(patientId?)` | Obtiene mensajes de WhatsApp |
| `useUsers()` | Obtiene lista de usuarios |
| `useSettings()` | Obtiene configuración |
| `useTreatmentPrices()` | Obtiene precios de tratamientos |
| `useSSE(url)` | Conexión Server-Sent Events |

---

## 10. Generación de Documentos PDF

### Facturas
- Logo y datos de la clínica
- Datos del paciente
- Tabla de líneas de factura
- Desglose de subtotal, IVA y total
- Código QR (opcional)
- Firma digital (opcional)
- Librería: jsPDF + jspdf-autotable

### Documentos Firmados
- Contenido del documento
- Firma digital capturada
- Fecha y hora de firma
- Información del paciente

---

## 11. Integraciones Preparadas

### VeriFactu (AEAT)
- Estructura de datos compatible
- Campos para hash encadenado
- Código QR según especificación
- Endpoints preparados para envío

### WhatsApp Business API
- Modelo de datos compatible
- Estructura de mensajes con estados
- Preparado para Baileys o Twilio

### OpenAI / Anthropic
- Endpoint de comandos de IA
- Procesamiento de lenguaje natural
- Respuestas estructuradas

---

## 12. Requisitos de Despliegue

### Variables de Entorno
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://app.rubiogarciadental.com
OPENAI_API_KEY=... (opcional)
```

### Comandos de Despliegue
```bash
npm install
prisma generate
npm run build
npm start
```

### Base de Datos
- PostgreSQL 14+
- Ejecutar migraciones antes del primer uso
- Usuario inicial: admin@rubiogarciadental.com / 190582

---

## 13. Actualizaciones Pendientes

- [ ] Integración completa con WhatsApp Business API
- [ ] Envío automático de facturas a la AEAT (VeriFactu)
- [ ] Recordatorios automáticos de citas
- [ ] Exportación de datos a Excel
- [ ] Backup automático de base de datos
- [ ] App móvil nativa

---

## 14. Mandato de Excelencia y Directrices de Desarrollo

### Objetivo Central
Desarrollar una aplicación de software que establezca un nuevo punto de referencia en calidad técnica, experiencia de usuario (UX) y rendimiento. La producción debe ser exquisita, completa y de calidad intransigente.

### Principio Rector
La excelencia no es negociable. Se prohíben estrictamente los atajos, las soluciones "aceptables" o cualquier decisión de diseño o ingeniería motivada por el ahorro de tiempo a expensas de la calidad y la longevidad del producto.

---

### I. Análisis Profundo y Planificación (Fase Cero)

#### Requisitos y Alcance (Scoping)

- **Clarificación Exhaustiva:** Antes de escribir la primera línea de código, se debe validar cada requisito funcional y no funcional con el cliente para asegurar una comprensión del 100%. No se asumen funcionalidades.

- **Investigación de Contexto:** Se realizará un análisis riguroso de la competencia y las tendencias de la industria para identificar las mejores prácticas a superar y garantizar que la propuesta de valor de la aplicación sea única y superior.

- **Definición de Métricas de Éxito:** Se establecerán métricas de rendimiento (velocidad de carga, uso de memoria, latencia de API, tasa de conversión, etc.) que superen consistentemente los estándares de la industria.

#### Arquitectura y Diseño Técnico

- **Escalabilidad Obligatoria:** La arquitectura debe diseñarse desde el inicio para una escalabilidad masiva y un alto rendimiento, utilizando patrones probados (ej. Microservicios, Serverless, Arquitectura Hexagonal) que garanticen la solidez.

- **Selección de Tecnología:** Se utilizarán las tecnologías y frameworks más robustos, mantenibles y orientados al futuro, justificando la elección de cada componente en función de la longevidad y la seguridad, no de la familiaridad o la rapidez de implementación.

- **Integridad de Datos:** Se implementarán esquemas de base de datos rigurosamente normalizados y optimizados para la velocidad y la atomicidad.

---

### II. Estándares de Ingeniería y Código

#### Calidad del Código (Code Quality)

- **Limpieza y Mantenibilidad:** El código debe ser limpio, autodocumentado y cumplir con los más altos estándares de legibilidad (ej. Principios SOLID, Convenciones de Nomenclatura Estrictas).

- **Pruebas Exhaustivas (Test Coverage):** Se exige una cobertura de pruebas mínima del 90%. Esto incluye: Pruebas Unitarias, Pruebas de Integración y Pruebas End-to-End (E2E) para todos los flujos críticos. El código sin prueba es código inaceptable.

- **Manejo de Errores:** Se implementará un sistema centralizado y robusto de manejo de errores y logging con retroalimentación elegante al usuario final (sin mensajes de error crudos o crashes inesperados).

#### Rendimiento y Optimización

- **Optimización de Recarga:** La aplicación debe minimizar el tiempo de carga percibido y real. Se implementarán técnicas avanzadas como code splitting, carga diferida (lazy loading) y compresión de activos.

- **Eficiencia de API:** Las consultas a la API deben ser eficientes y rápidas. Se prohíbe el over-fetching o under-fetching de datos. Todas las rutas de API deben responder en menos de 200ms bajo carga promedio.

---

### III. Experiencia de Usuario (UX/UI) y Diseño

#### Diseño Visual (UI) Exquisito

- **Coherencia Visual:** Se utilizará un sistema de diseño atómico completo y coherente. Cada píxel debe estar justificado. Se prohíben estilos de diseño genéricos o plantillas predeterminadas sin una personalización profunda y estética.

- **Diseño Adaptativo (Responsive):** La aplicación debe funcionar impecablemente en todos los tamaños de pantalla y orientaciones (móvil, tablet, escritorio), con optimizaciones específicas para el tacto y el puntero.

#### Usabilidad y Flujo (UX)

- **Accesibilidad (A11Y):** El diseño debe adherirse a los estándares WCAG 2.1 Nivel AA. Esto es fundamental para garantizar que la aplicación sea utilizable por el mayor número de personas posible.

- **Microinteracciones:** Se implementarán transiciones, animaciones y microinteracciones suaves y significativas que refuercen la sensación de calidad y proporcionen retroalimentación inmediata al usuario. No debe haber Cumulative Layout Shift (CLS).

- **Flujos de Tarea:** Cada flujo de usuario debe ser intuitivo, requerir el menor número de pasos posible y ser completamente a prueba de errores.

---

### IV. Garantía de Calidad (QA) y Verificación

#### Verificación Pre-Despliegue (Non-Negotiable Checks)

- **Revisión de Código Rigurosa:** Se realizará una revisión de código por pares obligatoria para cada pull request, enfocándose en la lógica, el rendimiento y la adherencia a los estándares.

- **Pruebas de Seguridad (Penetration Testing):** Se ejecutarán pruebas de penetración exhaustivas contra vulnerabilidades comunes (ej. OWASP Top 10) antes de cualquier lanzamiento. Se prohíbe el uso de credenciales o secretos en el código fuente.

- **Pruebas de Carga:** La aplicación debe ser probada bajo condiciones de carga máxima (al menos el doble de la carga de usuario esperada) para garantizar la estabilidad del servicio.

#### Documentación y Entrega

- **Documentación Técnica Completa:** Se entregará documentación exhaustiva que incluya: diagramas de arquitectura, manuales de despliegue, y una guía para desarrolladores sobre cómo mantener y extender el código.

- **Entrega Final:** La aplicación se considerará "completa" solo cuando todos los requisitos (funcionales, de calidad y de rendimiento) hayan sido verificados y documentados.

---

### V. Prohibiciones y No Negociables

**NO SE ACEPTARÁ:**

- ❌ Implementaciones que dependan de soluciones temporales (hacks).
- ❌ La suposición de que un problema será "resuelto más tarde" (technical debt no justificada y sin plan de pago inmediato).
- ❌ Bibliotecas o dependencias obsoletas, sin mantenimiento o con vulnerabilidades conocidas.
- ❌ Diseños que comprometan la accesibilidad o la usabilidad móvil.
- ❌ Errores funcionales o de rendimiento conocidos que se envíen a producción.

**El "App Builder" debe actuar como el guardián de la excelencia, proponiendo siempre la solución más robusta, duradera y de mayor calidad, incluso si requiere un mayor esfuerzo inicial.**

---

*Documento generado automáticamente. Última revisión: 8 de diciembre de 2025*

