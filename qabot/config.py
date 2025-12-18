"""
QABot Configuration
Configuración centralizada para QABot
"""

import os
from typing import List, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Configuración global del QABot"""
    
    # === CAPA 1: NÚCLEO LOCAL ===
    
    # Database (GELITE @ GABINETE2)
    DB_SERVER: str = "192.168.1.34\\INFOMED"  # IP de GABINETE2
    DB_NAME: str = "GELITE"
    DB_USER: str = "RUBIOGARCIADENTAL"
    DB_PASSWORD: str = "6666666"
    DB_DRIVER: str = "{ODBC Driver 17 for SQL Server}"  # Driver 17 instalado
    
    # LLM Local (Ollama)
    LLM_BASE_URL: str = "http://localhost:11434"
    LLM_MODEL: str = "llama3.2"  # o "llama3.1" o "gpt-oss:20b"
    LLM_TEMPERATURE: float = 0.1  # Baja para SQL preciso
    LLM_MAX_TOKENS: int = 4096
    
    # === CAPA 2: ORQUESTACIÓN ===
    
    # QA Validation
    QA_DRY_RUN_ENABLED: bool = True
    QA_MAX_QUERY_TIME: float = 2.0  # segundos
    QA_VALIDATION_RETRIES: int = 3
    
    # Analytics
    CHURN_THRESHOLD_DAYS: int = 180
    CHURN_RISK_WEIGHTS: dict = {
        "missed_appointments": 0.25,
        "days_since_last_visit": 0.30,
        "outstanding_balance": 0.20,
        "treatment_compliance": 0.15,
        "communication_score": 0.10
    }
    
    # === CAPA 3: GATEWAY ===
    
    # API Settings
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_SECRET_KEY: str = os.getenv("QABOT_SECRET_KEY", "change-me-in-production")
    API_ALGORITHM: str = "HS256"
    API_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:3000",  # Frontend dev
        "https://rubiogarciadental.com"  # Producción
    ]
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_PERIOD: int = 60  # segundos
    
    # === LOGGING & MONITORING ===
    
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "qabot.log"
    ENABLE_QUERY_LOGGING: bool = True
    
    # Reporting
    REPORTS_TABLE: str = "REPORTES_QA"
    ENABLE_EMAIL_ALERTS: bool = False
    EMAIL_RECIPIENTS: list = []
    
    # === SCHEDULER ===
    
    DAILY_INTEGRITY_HOUR: int = 2  # 2 AM
    WEEKLY_ANALYTICS_DAY: int = 1  # Lunes
    MONTHLY_REPORT_DAY: int = 1    # Día 1 del mes
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Singleton instance
settings = Settings()


def get_connection_string() -> str:
    """
    Genera la cadena de conexión para SQL Server
    
    Returns:
        str: Connection string para pyodbc
    """
    return (
        f"DRIVER={settings.DB_DRIVER};"
        f"SERVER={settings.DB_SERVER};"
        f"DATABASE={settings.DB_NAME};"
        f"UID={settings.DB_USER};"
        f"PWD={settings.DB_PASSWORD};"
        f"TrustServerCertificate=yes;"
    )


def get_llm_config() -> dict:
    """
    Configuración para el cliente LLM local
    
    Returns:
        dict: Configuración del LLM
    """
    return {
        "base_url": settings.LLM_BASE_URL,
        "model": settings.LLM_MODEL,
        "temperature": settings.LLM_TEMPERATURE,
        "max_tokens": settings.LLM_MAX_TOKENS
    }


# === PROMPTS DEL SISTEMA ===

SYSTEM_PROMPTS = {
    "sql_generator": """Eres un experto en SQL Server especializado en bases de datos de clínicas dentales.
Tu tarea es generar consultas SQL precisas y eficientes basadas en el esquema de GELITE.

REGLAS ESTRICTAS:
1. Usa SOLO las tablas y columnas que existen en el esquema proporcionado
2. NUNCA uses SELECT * - especifica las columnas
3. Usa aliases descriptivos
4. Incluye filtros WHERE apropiados
5. Agrega ORDER BY cuando sea relevante
6. Para fechas, usa GETDATE() y DATEADD
7. Para agregaciones, usa GROUP BY correctamente
8. SIEMPRE valida que las claves foráneas existan

FORMATO DE RESPUESTA:
Proporciona SOLO el código SQL, sin explicaciones adicionales.
No uses markdown ni bloques de código, solo SQL puro.""",

    "query_validator": """Eres un auditor de SQL responsable de validar consultas antes de su ejecución.

Revisa la consulta y responde con un JSON:
{
  "valid": true/false,
  "issues": ["lista de problemas encontrados"],
  "risk_level": "low/medium/high",
  "estimated_rows": número_estimado
}

Verifica:
- Sintaxis correcta
- Tablas y columnas existen
- No hay operaciones peligrosas (DELETE, DROP, etc.)
- Los JOINs son correctos
- El rendimiento es aceptable""",

    "insight_generator": """Eres un consultor de negocios especializado en clínicas dentales.
Analiza los datos proporcionados y genera insights accionables.

FORMATO:
1. Resumen ejecutivo (1 línea)
2. Hallazgos clave (3-5 puntos)
3. Recomendaciones específicas (3 acciones)
4. Métricas de impacto esperado

Sé conciso, específico y enfocado en resultados de negocio."""
}
