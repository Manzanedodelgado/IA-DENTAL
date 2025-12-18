"""
QABot Main Orchestrator - CAPA 2
Orquesta el flujo completo: LLM → SQL → Validation → Execution
"""

from typing import Dict, Any, Optional
from datetime import datetime
from loguru import logger
import json

from core.database import db
from core.llm_client import llm
from core.schema_knowledge import schema_knowledge, get_schema_for_query
from qa.IntegrityTests import integrity_tester
from config import settings


class QABotOrchestrator:
    """
    Orquestador principal del QABot
    Implementa el flujo híbrido de 3 capas
    """
    
    def __init__(self):
        self.test_connection()
    
    def test_connection(self):
        """Verifica conectividad con BBDD y LLM"""
        logger.info("🔧 Testing QABot connections...")
        
        # Test BBDD
        if db.test_connection():
            logger.info("✅ Database connection OK")
        else:
            logger.error("❌ Database connection FAILED")
            raise ConnectionError("Cannot connect to GELITE database")
        
        logger.info("✅ QABot orchestrator ready")
    
    def process_natural_language_query(
        self, 
        query: str,
        validate_before_execution: bool = True
    ) -> Dict[str, Any]:
        """
        Procesa una query en lenguaje natural con validación
        
        FLUJO HÍBRIDO:
        1. Obtener contexto de esquema relevante
        2. LLM genera SQL
        3. Validar SQL (dry-run)
        4. Ejecutar si valid
        5. Formatear respuesta
        
        Args:
            query: Pregunta en lenguaje natural
            validate_before_execution: Si True, valida antes de ejecutar
        
        Returns:
            Dict: Respuesta completa con SQL, datos y análisis
        """
        logger.info(f"📝 Processing query: {query[:100]}...")
        
        result = {
            "query": query,
            "timestamp": datetime.now().isoformat(),
            "status": "pending",
            "sql_generated": None,
            "validation": None,
            "data": None,
            "analysis": None,
            "error": None
        }
        
        try:
            # PASO 1: Obtener esquema relevante
            schema_context = get_schema_for_query(query)
            logger.debug(f"Schema context: {len(schema_context)} chars")
            
            # PASO 2: Generar SQL con LLM
            sql_query = llm.generate_sql(query, schema_context)
            result["sql_generated"] = sql_query
            
            if not sql_query:
                raise ValueError("LLM failed to generate SQL")
            
            logger.info(f"SQL generated: {sql_query[:200]}...")
            
            # PASO 3: Validación (QA)
            if validate_before_execution and settings.QA_DRY_RUN_ENABLED:
                validation = self._validate_sql(sql_query, schema_context)
                result["validation"] = validation
                
                if not validation.get("valid", False):
                    result["status"] = "validation_failed"
                    result["error"] = f"SQL validation failed: {validation.get('issues')}"
                    logger.error(f"❌ Validation failed: {validation['issues']}")
                    return result
                
                logger.info(f"✅ SQL validation passed (risk: {validation.get('risk_level')})")
            
            # PASO 4: Ejecutar query
            data = db.execute_query(sql_query)
            result["data"] = data
            result["row_count"] = len(data)
            
            logger.info(f"✅ Query executed: {len(data)} rows returned")
            
            # PASO 5: Generar análisis con LLM (opcional)
            if len(data) > 0 and len(data) < 100:  # Solo para datasets pequeños
                analysis = llm.generate_insights(
                    data={
                        "rows": len(data),
                        "sample": data[:5],
                        "columns": list(data[0].keys()) if data else []
                    },
                    context=f"Query: {query}"
                )
                result["analysis"] = analysis
            
            result["status"] = "success"
            
        except Exception as e:
            result["status"] = "error"
            result["error"] = str(e)
            logger.error(f"❌ Query processing failed: {e}")
        
        return result
    
    def _validate_sql(self, sql_query: str, schema_context: str) -> Dict[str, Any]:
        """
        Valida SQL antes de ejecución
        
        Args:
            sql_query: Query SQL
            schema_context: Contexto del esquema
        
        Returns:
            Dict: Resultado de validación
        """
        # Validación con LLM
        llm_validation = llm.validate_query(sql_query, schema_context)
        
        # Validaciones adicionales programáticas
        dangerous_keywords = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'UPDATE']
        sql_upper = sql_query.upper()
        
        for keyword in dangerous_keywords:
            if keyword in sql_upper:
                llm_validation["valid"] = False
                llm_validation["issues"] = llm_validation.get("issues", [])
                llm_validation["issues"].append(f"Dangerous keyword detected: {keyword}")
                llm_validation["risk_level"] = "high"
        
        return llm_validation
    
    def run_daily_integrity_check(self) -> Dict[str, Any]:
        """
        Ejecuta el chequeo diario de integridad
        
        Returns:
            Dict: Resultados del chequeo
        """
        logger.info("🔍 Running daily integrity check...")
        
        # Ejecutar tests
        test_results = integrity_tester.run_all_tests()
        
        # Guardar reporte en BBDD
        report_data = {
            "tipo": "integrity",
            "categoria": "daily_check",
            "severidad": "critical" if len(test_results.get("critical_issues", [])) > 0 else "info",
            "titulo": f"Daily Integrity Check - {datetime.now().strftime('%Y-%m-%d')}",
            "descripcion": f"Tests run: {test_results['total_tests']}, Failed: {test_results['failed']}",
            "datos": json.dumps(test_results, ensure_ascii=False),
            "acciones": self._generate_recommended_actions(test_results)
        }
        
        try:
            report_id = db.insert_report(report_data)
            logger.info(f"✅ Integrity report saved: ID {report_id}")
            test_results["report_id"] = report_id
        except Exception as e:
            logger.error(f"Failed to save integrity report: {e}")
        
        return test_results
    
    def _generate_recommended_actions(self, test_results: Dict) -> str:
        """
        Genera acciones recomendadas para los issues encontrados
        
        Args:
            test_results: Resultados de tests
        
        Returns:
            str: Acciones recomendadas
        """
        actions = []
        
        critical_issues = test_results.get("critical_issues", [])
        if len(critical_issues) > 0:
            actions.append("CRÍTICO: Revisar registros huérfanos encontrados")
            actions.append("- Ejecutar queries de limpieza de FKs inválidas")
        
        if test_results.get("failed", 0) > test_results.get("passed", 0):
            actions.append("ADVERTENCIA: Más de 50% de tests fallaron")
            actions.append("- Revisar integridad general de la base de datos")
        
        if len(actions) == 0:
            actions.append("✅ Sin acciones requeridas - Todos los tests pasaron")
        
        return "\n".join(actions)
    
    def get_system_health(self) -> Dict[str, Any]:
        """
        Obtiene el estado general del sistema
        
        Returns:
            Dict: Estado del sistema
        """
        health = {
            "timestamp": datetime.now().isoformat(),
            "database": "unknown",
            "llm": "unknown",
            "schema_loaded": False,
            "last_integrity_check": None
        }
        
        # Check database
        try:
            if db.test_connection():
                health["database"] = "healthy"
        except:
            health["database"] = "unhealthy"
        
        # Check schema
        try:
            stats = schema_knowledge.get_stats()
            health["schema_loaded"] = stats["total_tables"] > 0
            health["schema_stats"] = stats
        except:
            health["schema_loaded"] = False
        
        # Check last integrity report
        try:
            last_report_query = f"""
                SELECT TOP 1 REP_FECHA, REP_SEVERIDAD 
                FROM {settings.REPORTS_TABLE}
                WHERE REP_TIPO = 'integrity'
                ORDER BY REP_FECHA DESC
            """
            result = db.execute_query(last_report_query, fetch_all=False)
            if result:
                health["last_integrity_check"] = {
                    "date": str(result[0].get("REP_FECHA")),
                    "severity": result[0].get("REP_SEVERIDAD")
                }
        except Exception as e:
            logger.debug(f"Could not fetch last integrity check: {e}")
        
        health["status"] = "healthy" if health["database"] == "healthy" and health["schema_loaded"] else "degraded"
        
        return health


# Singleton instance
qabot = QABotOrchestrator()
