# QABot - Quality Assurance & Business Intelligence Agent
# Arquitectura Híbrida para Clínicas Dentales

## 🎯 Objetivo

Sistema autónomo de calidad (Zero Defects) y analítica predictiva (BI) para GELITE.

## 🏗️ Arquitectura Híbrida (3 Capas)

```
CAPA 3: Gateway (Online) → WhatsApp/Web/Voice
         ↓
CAPA 2: Orquestación (Python) → SQL Generation + Validation
         ↓
CAPA 1: Núcleo Local → LLM (Ollama) + BBDD (GELITE)
```

**Ventaja**: Datos NUNCA salen del servidor local. 0€ en tokens de IA.

## 📦 Instalación

### 1. Requisitos Previos

- Python 3.10+
- Ollama instalado y corriendo (`ollama serve`)
- Modelo descargado: `ollama pull llama3` o `ollama pull mistral`
- Acceso a GELITE @ GABINETE2\INFOMED

### 2. Instalar Dependencias

```bash
cd qabot
pip install -r requirements.txt
```

### 3. Configurar Variables de Entorno

Crear `.env` en la raíz del proyecto:

```env
# Database
DB_SERVER=GABINETE2\INFOMED
DB_NAME=GELITE
DB_USER=RUBIOGARCIADENTAL
DB_PASSWORD=6666666

# LLM
LLM_MODEL=llama3
LLM_BASE_URL=http://localhost:11434

# API (opcional para gateway remoto)
API_SECRET_KEY=your-secret-key-here
```

## 🚀 Uso

### Opción 1: API Server (Recomendado)

```bash
cd qabot
python main.py
```

Esto inicia:
- 🌐 **API Gateway** en `http://localhost:8000`
- 📅 **Scheduler** con jobs automáticos
- 📚 **Documentación** en `http://localhost:8000/docs`

### Opción 2: CLI Interactivo

```bash
python cli.py
```

Menú interactivo con opciones:
1. **Test Connectivity** - Verifica conexiones BBDD + LLM
2. **Run Integrity Check** - Ejecuta tests de integridad
3. **Natural Language Query** - Query en lenguaje natural
4. **Show Schema Stats** - Estadísticas del esquema

### Programático

```python
from core.orchestrator import qabot

# Query en lenguaje natural
result = qabot.process_natural_language_query(
    "¿Cuántos pacientes tenemos activos?"
)

print(result['sql_generated'])  # SQL generado
print(result['data'])            # Datos retornados
print(result['analysis'])        # Análisis IA

# Integrity check
integrity_results = qabot.run_daily_integrity_check()
print(f"Failed tests: {integrity_results['failed']}")
```

### API REST

```bash
# Obtener token
curl -X POST "http://localhost:8000/auth/token?username=admin&password=admin"

# Natural language query (con token)
curl -X POST "http://localhost:8000/query/natural-language" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "¿Cuántos pacientes tenemos?", "validate": true}'

# Churn predictions
curl "http://localhost:8000/analytics/churn" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Dashboard data
curl "http://localhost:8000/analytics/dashboard" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Endpoints disponibles**:
- `/health` - Health check (público)
- `/auth/token` - Obtener JWT token
- `/query/natural-language` - Query SQL desde lenguaje natural
- `/qa/integrity-check` - Ejecutar integrity tests
- `/analytics/churn` - Predicciones de abandono
- `/analytics/ltv` - Lifetime value
- `/analytics/roi` - ROI por tratamiento
- `/analytics/dashboard` - Dashboard completo

Ver documentación completa en `/docs`

## 📊 Funcionalidades Implementadas

### ✅ Capa 1: Núcleo Local
- [x] Conector BBDD GELITE con pooling
- [x] Cliente LLM local (Ollama)
- [x] Parser de esquema (7792 columnas)
- [x] Contexto inteligente para LLM

### ✅ Capa 2: Orquestación
- [x] Generación SQL desde lenguaje natural
- [x] Validación pre-ejecución (dry-run)
- [x] Tests de integridad (FK, consistencia)
- [x] Sistema de reportes

### ⏳ Capa 3: Gateway (Pendiente)
- [ ] API REST con FastAPI
- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Integración WhatsApp

### ⏳ Analytics (Pendiente)
- [ ] Churn predictor (ML)
- [ ] LTV calculator
- [ ] ROI analyzer
- [ ] Anomaly detector

## 🧪 Testing

### Test Básico de Conectividad

```bash
python -c "from core.database import db; print(db.test_connection())"
```

### Test de Generación SQL

```python
from core.llm_client import llm
from core.schema_knowledge import get_schema_for_query

query = "¿Cuántos pacientes tenemos?"
schema = get_schema_for_query(query)
sql = llm.generate_sql(query, schema)
print(sql)
```

###Test de Integrity

```python
from qa.IntegrityTests import integrity_tester

results = integrity_tester.run_all_tests()
print(f"Passed: {results['passed']}, Failed: {results['failed']}")
```

## 📁 Estructura del Proyecto

```
qabot/
├── config.py                 # Configuración central
├── requirements.txt          # Dependencias Python
├── cli.py                    # CLI interactivo
│
├── core/                     # Capa 1 + 2
│   ├── database.py          # Conector GELITE
│   ├── llm_client.py        # Cliente Ollama
│   ├── schema_knowledge.py  # Parser esquema
│   └── orchestrator.py      # Orquestador principal
│
├── qa/                       # Quality Assurance
│   └── IntegrityTests.py    # Tests de integridad
│
├── analytics/                # Business Intelligence (TODO)
│   ├── ChurnPredictor.py
│   ├── LTVCalculator.py
│   └── ROIAnalyzer.py
│
└── api/                      # Capa 3 (TODO)
    └── gateway.py           # API REST
```

## 🔒 Seguridad

- **Datos locales**: Nunca salen del servidor GABINETE2
- **Validación SQL**: Pre-ejecución con LLM + checks programáticos
- **Sin operaciones destructivas**: Bloqueadas DROP, DELETE, UPDATE
- **Logs completos**: Todas las queries registradas

## 📝 Ejemplos de Queries

```python
# Pacientes activos
qabot.process_natural_language_query(
    "Lista de pacientes con cita en los últimos 30 días"
)

# Ingresos mensuales
qabot.process_natural_language_query(
    "¿Cuánto hemos facturado este mes?"
)

# Citas pendientes
qabot.process_natural_language_query(
    "Muestra las citas de mañana ordenadas por hora"
)
```

## 🎯 Próximos Pasos

1. **Completar Analytics Module**
   - Predictor de abandono (churn)
   - Cálculo de LTV
   - Análisis ROI por tratamiento

2. **Implementar Gateway API**
   - FastAPI REST endpoints
   - WhatsApp integration
   - Voice API

3. **Scheduler Automatizado**
   - Cron jobs para integrity checks
   - Reportes semanales/mensuales
   - Alertas automáticas

## 📊 KPIs de Éxito

- ✅ Zero defects: 0 errores críticos
- ✅ Latencia < 2s en queries
- ✅ 100% reglas de negocio testeadas
- 📊 Churn prediction accuracy > 80% (TODO)
- 📊 100% pacientes con LTV calculado (TODO)

## 🐛 Troubleshooting

**Error: Cannot connect to Ollama**
```bash
# Verificar que Ollama está corriendo
ollama serve

# En otra terminal
ollama list  # Ver modelos instalados
```

**Error: Database connection failed**
- Verificar credenciales en `config.py`
- Verificar que SQL Server está corriendo
- Verificar firewall/red

**Error: Schema not loaded**
- Verificar ruta del CSV en `schema_knowledge.py`
- Verificar permisos de lectura

## 📞 Soporte

- Logs: `qabot.log`
- Reportes: Tabla `REPORTES_QA` en GELITE

---

**Estado**: ✅ Infraestructura core completa y funcional
**Versión**: 1.0.0 (Alpha)
**Última actualización**: 2024-12-17
