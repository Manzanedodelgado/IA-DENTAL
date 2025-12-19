# IA-DENTAL 🦷🤖

Sistema integral de gestión dental con Inteligencia Artificial.

## 🎯 Proyectos Incluidos

### 1. **QABot** - Quality Assurance & Business Intelligence Bot
Sistema de análisis y consultas SQL mediante lenguaje natural para la base de datos GELITE.

**Ubicación**: `/qabot/`

**Características**:
- 🤖 Gemini 2.5 Flash para generación de SQL
- 📊 Consultas en lenguaje natural
- ✅ Tests de integridad automáticos
- 📈 Analytics y métricas de negocio
- 🔒 100% local (salvo LLM en Google Cloud)

**Stack**:
- Python 3.10+
- FastAPI + Uvicorn
- SQL Server (GELITE database)
- Gemini 2.5 Flash
- SQLAlchemy + pyodbc

**Quick Start**:
```bash
cd qabot
pip install -r requirements.txt
python cli.py
```

---

### 2. **RubioGarciaDental** - Aplicación Web Completa
Sistema de gestión integral para clínica dental con IA integrada.

**Ubicación**: `/rubio-garcia-dental-integrated/`

**Características**:
- 📱 Dashboard con estadísticas en tiempo real
- 📅 Agenda visual con gestión de citas
- 👥 Gestión completa de pacientes
- 💬 Comunicación WhatsApp con IA
- 🤖 IA Dental - Asistente inteligente dual:
  - Modo Administrador: Consultas SQL en lenguaje natural
  - Modo Paciente: Chat amable sin acceso a datos sensibles
- 💼 Gestión de presupuestos, facturas y cobros
- 📄 Gestión documental
- 🔧 Configuración del sistema

**Stack**:
- React 18 + TypeScript
- Vite como build tool
- TailwindCSS para diseño
- Node.js + Express (backend)
- SQL Server (GELITE)
- Gemini 2.5 Flash

**Quick Start**:
```bash
cd rubio-garcia-dental-integrated
npm install
npm run start:all  # Inicia backend + frontend
```

---

## 🚀 Instalación Completa

### Requisitos Previos

1. **Base de Datos**:
   - SQL Server con base de datos GELITE
   - Ver `qabot/setup_sql_server.sql` para configuración

2. **API Keys**:
   - Gemini API Key (gratis hasta 1,500 queries/día)
   - Obtener en: https://ai.google.dev/

3. **Software**:
   - Python 3.10+ (para QABot)
   - Node.js 18+ (para la app web)
   - ODBC Driver 17 for SQL Server

---

### Setup Rápido

#### 1. Configurar QABot (Servidor GABINETE2)

```powershell
# Clonar repo
git clone https://github.com/Manzanedodelgado/IA-DENTAL.git
cd IA-DENTAL/qabot

# Crear entorno virtual
python -m venv venv
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Configurar conexión local
# Editar config.py: DB_SERVER = "localhost\\INFOMED"

# Ejecutar
python cli.py
```

#### 2. Configurar Aplicación Web

```bash
# En Mac o GABINETE2
cd IA-DENTAL/rubio-garcia-dental-integrated

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
# Editar .env y añadir tu VITE_API_KEY

# Iniciar todo
npm run start:all
```

---

## 🌐 Despliegue en Producción

Para acceso desde cualquier lugar, sigue la guía completa en:
- **Vercel + Cloudflare Tunnel**: Ver `vercel_cloudflare_deploy.md`

**Arquitectura de Producción**:
```
Usuario → Vercel (Frontend) → Cloudflare Tunnel → GABINETE2 (Backend + DB)
```

**Coste**: €0/mes

---

## 📊 Ejemplos de Uso

### QABot - Consultas Naturales

```python
# Opción 3: Natural Language Query
>>> ¿Cuántos pacientes tenemos en total?

✅ Resultado: 6,110 pacientes

SQL Generado:
SELECT COUNT(*) AS TotalPacientes FROM Pacientes

Insights:
- Gran base de pacientes (6,110)
- Oportunidad de segmentación (activos/inactivos)
- Recomendación: Campañas de reactivación
```

### Aplicación Web - IA Dental

```
Usuario: "Busca pacientes con apellido García"

IA Dental:
✅ SQL: SELECT TOP 10 IdPac, Nombre, Apellidos 
        FROM Pacientes 
        WHERE Apellidos LIKE '%García%'

📊 Resultados: 23 pacientes encontrados
```

---

## 🔐 Seguridad

- ✅ Datos de pacientes NUNCA salen del servidor local
- ✅ Solo el schema de DB se envía a Gemini para generar SQL
- ✅ Backend solo permite queries SELECT (no destructivos)
- ✅ API Keys en archivos .env (no versionados)
- ✅ Autenticación robusta en la app web

---

## 📁 Estructura del Repositorio

```
IA-DENTAL/
├── qabot/                          # QABot - Sistema de consultas IA
│   ├── core/                       # Módulos principales
│   │   ├── database.py            # Conexión a GELITE
│   │   ├── llm_client.py          # Cliente Gemini
│   │   ├── orchestrator.py        # Orquestador principal
│   │   └── schema_knowledge.py    # Conocimiento del schema
│   ├── qa/                         # Tests de calidad
│   ├── analytics/                  # Métricas de negocio
│   ├── api/                        # API REST
│   ├── config.py                   # Configuración
│   ├── cli.py                      # Interfaz CLI
│   └── main.py                     # Servidor API
│
├── rubio-garcia-dental-integrated/ # Aplicación Web Completa
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   ├── services/              # Servicios (DB, IA, etc.)
│   │   └── hooks/                 # Custom hooks
│   ├── server.js                  # Backend Node.js
│   └── package.json
│
└── README.md                       # Este archivo
```

---

## 🤝 Contribución

Este es un proyecto privado para Rubio García Dental.

---

## 📝 Licencia

© 2025 Rubio García Dental. Todos los derechos reservados.

---

## 📞 Soporte

Para dudas o problemas:
- Email: juanantoniomanzanedodelgado@gmail.com
- GitHub Issues: https://github.com/Manzanedodelgado/IA-DENTAL/issues

---

## 🎯 Estado del Proyecto

- ✅ QABot: Funcional y probado (100% operativo)
- ✅ Aplicación Web: Completa con IA integrada
- ✅ Integración Gemini: Configurada y optimizada
- 🔄 Despliegue Producción: Pendiente (guía lista)

**Última actualización**: 18 Diciembre 2025
