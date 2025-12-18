"""
Integrity Tests Module - QA Core
Tests de integridad de base de datos
"""

from typing import List, Dict, Any
from loguru import logger
import json

from core.database import db
from core.llm_client import llm
from core.schema_knowledge import schema_knowledge


class IntegrityTests:
    """
    Suite de tests de integridad para GELITE
    - Foreign Keys orphans
    - Data consistency
    - Business rules validation
    """
    
    def __init__(self):
        self.failed_tests = []
        self.passed_tests = []
        self.warnings = []
    
    def run_all_tests(self) -> Dict[str, Any]:
        """
        Ejecuta todos los tests de integridad
        
        Returns:
            Dict: Resumen de resultados
        """
        logger.info("🔍 Starting integrity tests suite...")
        
        self.failed_tests = []
        self.passed_tests = []
        self.warnings = []
        
        # 1. Foreign Key Tests
        fk_results = self.test_foreign_keys()
        
        # 2. Data Consistency Tests
        consistency_results = self.test_data_consistency()
        
        # 3. Business Rules Tests
        business_results = self.test_business_rules()
        
        # Generar resumen
        summary = {
            "total_tests": len(self.passed_tests) + len(self.failed_tests),
            "passed": len(self.passed_tests),
            "failed": len(self.failed_tests),
            "warnings": len(self.warnings),
            "critical_issues": [f for f in self.failed_tests if f.get("severity") == "critical"],
            "details": {
                "foreign_keys": fk_results,
                "consistency": consistency_results,
                "business_rules": business_results
            }
        }
        
        # Log resultados
        if len(self.failed_tests) == 0:
            logger.info(f"✅ All integrity tests passed! ({len(self.passed_tests)} tests)")
        else:
            logger.warning(f"⚠️ {len(self.failed_tests)} integrity test(s) failed")
            logger.warning(f"❌ Critical issues: {len(summary['critical_issues'])}")
        
        return summary
    
    def test_foreign_keys(self) -> Dict[str, Any]:
        """
        Verifica que no hay registros huérfanos en FKs
        
        Returns:
            Dict: Resultados de tests FK
        """
        logger.info("Testing foreign keys integrity...")
        
        results = {
            "tests_run": 0,
            "orphans_found": 0,
            "issues": []
        }
        
        # Tests críticos de FK
        fk_tests = [
            {
                "name": "Pacientes huérfanos en Citas",
                "query": """
                    SELECT COUNT(*) as orphans
                    FROM Citas c
                    LEFT JOIN Pacientes p ON c.IdPac = p.IdPac
                    WHERE p.IdPac IS NULL AND c.IdPac IS NOT NULL
                """,
                "severity": "critical"
            },
            {
                "name": "Pacientes huérfanos en Presupuestos",
                "query": """
                    SELECT COUNT(*) as orphans
                    FROM Presupuestos pr
                    LEFT JOIN Pacientes p ON pr.IdPac = p.IdPac
                    WHERE p.IdPac IS NULL AND pr.IdPac IS NOT NULL
                """,
                "severity": "critical"
            },
            {
                "name": "Pacientes huérfanos en Facturas",
                "query": """
                    SELECT COUNT(*) as orphans
                    FROM Facturas f
                    LEFT JOIN Pacientes p ON f.IdPac = p.IdPac
                    WHERE p.IdPac IS NULL AND f.IdPac IS NOT NULL
                """,
                "severity": "critical"
            },
            {
                "name": "Citas sin centro asignado",
                "query": """
                    SELECT COUNT(*) as orphans
                    FROM Citas c
                    LEFT JOIN Centros ce ON c.IdCentro = ce.IdCentro
                    WHERE ce.IdCentro IS NULL AND c.IdCentro IS NOT NULL
                """,
                "severity": "warning"
            }
        ]
        
        for test in fk_tests:
            results["tests_run"] += 1
            
            try:
                result = db.execute_scalar(test["query"])
                orphan_count = result or 0
                
                if orphan_count > 0:
                    issue = {
                        "test": test["name"],
                        "severity": test["severity"],
                        "orphans": orphan_count,
                        "status": "failed"
                    }
                    results["issues"].append(issue)
                    results["orphans_found"] += orphan_count
                    self.failed_tests.append(issue)
                    
                    logger.error(f"❌ {test['name']}: {orphan_count} orphans found")
                else:
                    self.passed_tests.append({"test": test["name"], "status": "passed"})
                    logger.debug(f"✅ {test['name']}: OK")
                    
            except Exception as e:
                logger.error(f"Test '{test['name']}' failed to execute: {e}")
                self.warnings.append({"test": test["name"], "error": str(e)})
        
        return results
    
    def test_data_consistency(self) -> Dict[str, Any]:
        """
        Tests de consistencia lógica de datos
        
        Returns:
            Dict: Resultados
        """
        logger.info("Testing data consistency...")
        
        results = {
            "tests_run": 0,
            "issues": []
        }
        
        consistency_tests = [
            {
                "name": "Citas con fechas futuras muy lejanas",
                "query": """
                    SELECT COUNT(*) as count
                    FROM Citas
                    WHERE FechaCita > DATEADD(YEAR, 2, GETDATE())
                """,
                "severity": "warning",
                "threshold": 0
            },
            {
                "name": "Facturas con importe negativo",
                "query": """
                    SELECT COUNT(*) as count
                    FROM Facturas
                    WHERE ImporteTotal < 0
                """,
                "severity": "critical",
                "threshold": 0
            },
            {
                "name": "Presupuestos sin ningún tratamiento",
                "query": """
                    SELECT COUNT(*) as count
                    FROM Presupuestos p
                    LEFT JOIN PresupuestosTratamientos pt ON p.IdPresupuesto = pt.IdPresupuesto
                    WHERE pt.IdPresupuesto IS NULL 
                    AND p.Estado != 'Anulado'
                """,
                "severity": "warning",
                "threshold": 0
            }
        ]
        
        for test in consistency_tests:
            results["tests_run"] += 1
            
            try:
                count = db.execute_scalar(test["query"]) or 0
                
                if count > test.get("threshold", 0):
                    issue = {
                        "test": test["name"],
                        "severity": test["severity"],
                        "count": count,
                        "status": "failed"
                    }
                    results["issues"].append(issue)
                    self.failed_tests.append(issue)
                    logger.warning(f"⚠️ {test['name']}: {count} inconsistencies")
                else:
                    self.passed_tests.append({"test": test["name"], "status": "passed"})
                    logger.debug(f"✅ {test['name']}: OK")
                    
            except Exception as e:
                logger.error(f"Consistency test failed: {e}")
                self.warnings.append({"test": test["name"], "error": str(e)})
        
        return results
    
    def test_business_rules(self) -> Dict[str, Any]:
        """
        Valida reglas de negocio específicas
        
        Returns:
            Dict: Resultados
        """
        logger.info("Testing business rules...")
        
        results = {
            "tests_run": 0,
            "issues": []
        }
        
        # Reglas de negocio desde CONFIG_SISTEMA (placeholder - ajustar según tabla real)
        business_rules = [
            {
                "name": "Pacientes activos (cita en últimos 6 meses)",
                "query": """
                    SELECT p.IdPac, p.Nombre, MAX(c.FechaCita) as UltimaCita
                    FROM Pacientes p
                    LEFT JOIN Citas c ON p.IdPac = c.IdPac
                    WHERE p.Activo = 1
                    GROUP BY p.IdPac, p.Nombre
                    HAVING MAX(c.FechaCita) < DATEADD(MONTH, -6, GETDATE())
                    OR MAX(c.FechaCita) IS NULL
                """,
                "severity": "warning",
                "description": "Pacientes marcados como activos sin citas recientes"
            }
        ]
        
        for rule in business_rules:
            results["tests_run"] += 1
            
            try:
                violations = db.execute_query(rule["query"])
                
                if len(violations) > 0:
                    issue = {
                        "rule": rule["name"],
                        "severity": rule["severity"],
                        "violations": len(violations),
                        "sample": violations[:5],  # Primeros 5 ejemplos
                        "status": "violated"
                    }
                    results["issues"].append(issue)
                    
                    if rule["severity"] == "critical":
                        self.failed_tests.append(issue)
                    else:
                        self.warnings.append(issue)
                    
                    logger.warning(f"⚠️ {rule['name']}: {len(violations)} violations")
                else:
                    self.passed_tests.append({"rule": rule["name"], "status": "compliant"})
                    logger.debug(f"✅ {rule['name']}: Compliant")
                    
            except Exception as e:
                logger.error(f"Business rule test failed: {e}")
                self.warnings.append({"rule": rule["name"], "error": str(e)})
        
        return results
    
    def get_report(self) -> Dict[str, Any]:
        """
        Genera reporte completo de integridad
        
        Returns:
            Dict: Reporte formateado
        """
        return {
            "report_type": "integrity",
            "timestamp": str(logger),
            "summary": {
                "total_tests": len(self.passed_tests) + len(self.failed_tests),
                "passed": len(self.passed_tests),
                "failed": len(self.failed_tests),
                "warnings": len(self.warnings)
            },
            "failed_tests": self.failed_tests,
            "warnings": self.warnings,
            "status": "FAILED" if len([f for f in self.failed_tests if f.get("severity") == "critical"]) > 0 else "WARNING" if len(self.failed_tests) > 0 else "PASSED"
        }


# Singleton instance
integrity_tester = IntegrityTests()
