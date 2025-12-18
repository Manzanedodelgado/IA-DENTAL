"""
LTV Calculator - Lifetime Value de Pacientes
Calcula el valor vitalicio histórico y proyectado
"""

from typing import List, Dict, Any
from datetime import datetime
from loguru import logger

from core.database import db


class LTVCalculator:
    """
    Calculador de Lifetime Value (LTV) de pacientes
    """
    
    def calculate_ltv_all_patients(self) -> List[Dict[str, Any]]:
        """
        Calcula LTV para todos los pacientes
        
        Returns:
            List[Dict]: LTV por paciente
        """
        logger.info("💰 Calculating LTV for all patients...")
        
        query = """
        WITH PatientRevenue AS (
            SELECT 
                p.IdPac,
                p.Nombre,
                p.FechaAlta as first_visit,
                MAX(c.FechaCita) as last_visit,
                COUNT(DISTINCT c.IdCita) as total_appointments,
                COUNT(DISTINCT YEAR(c.FechaCita) * 100 + MONTH(c.FechaCita)) as active_months,
                
                -- Ingresos totales
                COALESCE(SUM(f.ImporteTotal), 0) as total_revenue,
                
                -- Ingresos pagados
                COALESCE(SUM(f.ImportePagado), 0) as total_paid,
                
                -- Ticket medio
                COALESCE(AVG(f.ImporteTotal), 0) as avg_invoice,
                
                -- Número de facturas
                COUNT(DISTINCT f.IdFactura) as total_invoices,
                
                -- Tratamientos realizados
                COUNT(DISTINCT t.IdTratamiento) as total_treatments
                
            FROM Pacientes p
            LEFT JOIN Citas c ON p.IdPac = c.IdPac
            LEFT JOIN Facturas f ON p.IdPac = f.IdPac AND f.Estado != 'Anulada'
            LEFT JOIN Tratamientos t ON p.IdPac = t.IdPac
            WHERE (p.Inactivo = 0 OR p.Inactivo IS NULL)
            GROUP BY p.IdPac, p.Nombre, p.FechaAlta
        )
        SELECT 
            IdPac,
            Nombre,
            first_visit,
            last_visit,
            total_appointments,
            active_months,
            total_revenue,
            total_paid,
            avg_invoice,
            total_invoices,
            total_treatments,
            
            -- LTV Histórico
            total_paid as historical_ltv,
            
            -- Revenue mensual promedio
            CASE 
                WHEN active_months > 0 
                THEN total_paid / CAST(active_months AS FLOAT)
                ELSE 0 
            END as avg_monthly_revenue,
            
            -- Proyección 5 años (si es paciente activo)
            CASE 
                WHEN DATEDIFF(DAY, last_visit, GETDATE()) <= 180 
                AND active_months > 0
                THEN (total_paid / CAST(active_months AS FLOAT)) * 60  -- 60 meses = 5 años
                ELSE total_paid  -- Solo histórico si inactivo
            END as projected_ltv_5y,
            
            -- Días desde última visita
            DATEDIFF(DAY, last_visit, GETDATE()) as days_since_last_visit,
            
            -- Meses de vida como paciente
            DATEDIFF(MONTH, first_visit, COALESCE(last_visit, GETDATE())) as lifespan_months
            
        FROM PatientRevenue
        WHERE total_revenue > 0  -- Solo pacientes con revenue
        ORDER BY projected_ltv_5y DESC
        """
        
        try:
            results = db.execute_query(query)
            
            # Enriquecer con cálculos adicionales
            enriched_results = []
            for patient in results:
                ltv_data = self._enrich_ltv_data(patient)
                enriched_results.append(ltv_data)
            
            logger.info(f"✅ LTV calculated for {len(enriched_results)} patients")
            
            return enriched_results
            
        except Exception as e:
            logger.error(f"Failed to calculate LTV: {e}")
            return []
    
    def _enrich_ltv_data(self, patient_data: Dict) -> Dict[str, Any]:
        """
        Enriquece datos de LTV con métricas adicionales
        
        Args:
            patient_data: Datos básicos del paciente
        
        Returns:
            Dict: Datos enriquecidos
        """
        historical_ltv = patient_data.get('historical_ltv', 0)
        projected_ltv = patient_data.get('projected_ltv_5y', 0)
        lifespan_months = patient_data.get('lifespan_months', 1)
        days_since_last = patient_data.get('days_since_last_visit', 0)
        
        # Calcular CAC estimado (placeholder - ajustar según datos reales)
        estimated_cac = 150  # €150 promedio adquisición
        
        # ROI del paciente
        roi = ((historical_ltv - estimated_cac) / estimated_cac * 100) if estimated_cac > 0 else 0
        
        # Segmentación de valor
        if projected_ltv >= 5000:
            value_segment = 'VIP'
        elif projected_ltv >= 2000:
            value_segment = 'High Value'
        elif projected_ltv >= 500:
            value_segment = 'Medium Value'
        else:
            value_segment = 'Low Value'
        
        # Status del paciente
        if days_since_last <= 90:
            status = 'Active'
        elif days_since_last <= 180:
            status = 'At Risk'
        else:
            status = 'Churned'
        
        return {
            'patient_id': patient_data['IdPac'],
            'patient_name': patient_data['Nombre'],
            'first_visit': str(patient_data.get('first_visit', 'N/A')),
            'last_visit': str(patient_data.get('last_visit', 'N/A')),
            'lifespan_months': lifespan_months,
            'total_appointments': patient_data.get('total_appointments', 0),
            'total_treatments': patient_data.get('total_treatments', 0),
            'historical_ltv': round(historical_ltv, 2),
            'projected_ltv_5y': round(projected_ltv, 2),
            'avg_monthly_revenue': round(patient_data.get('avg_monthly_revenue', 0), 2),
            'avg_invoice': round(patient_data.get('avg_invoice', 0), 2),
            'estimated_cac': estimated_cac,
            'roi_percent': round(roi, 1),
            'value_segment': value_segment,
            'status': status,
            'days_since_last_visit': days_since_last
        }
    
    def get_ltv_cohort_analysis(self, cohort_by: str = 'month') -> Dict[str, Any]:
        """
        Análisis de cohortes por LTV
        
        Args:
            cohort_by: Agrupar por 'month' o 'quarter'
        
        Returns:
            Dict: Análisis de cohortes
        """
        logger.info(f"📊 Analyzing LTV cohorts by {cohort_by}...")
        
        # Query adaptada según agrupación
        if cohort_by == 'month':
            date_format = "FORMAT(p.FechaAlta, 'yyyy-MM')"
        else:  # quarter
            date_format = "CONCAT(YEAR(p.FechaAlta), '-Q', DATEPART(QUARTER, p.FechaAlta))"
        
        query = f"""
        WITH PatientCohorts AS (
            SELECT 
                {date_format} as cohort,
                COUNT(DISTINCT p.IdPac) as cohort_size,
                AVG(COALESCE(f.total_paid, 0)) as avg_ltv,
                SUM(COALESCE(f.total_paid, 0)) as total_revenue
            FROM Pacientes p
            LEFT JOIN (
                SELECT 
                    IdPac,
                    SUM(ImportePagado) as total_paid
                FROM Facturas
                WHERE Estado != 'Anulada'
                GROUP BY IdPac
            ) f ON p.IdPac = f.IdPac
            WHERE p.FechaAlta IS NOT NULL
            GROUP BY {date_format}
        )
        SELECT * FROM PatientCohorts
        ORDER BY cohort DESC
        """
        
        try:
            cohorts = db.execute_query(query)
            
            return {
                'cohort_type': cohort_by,
                'total_cohorts': len(cohorts),
                'cohorts': [
                    {
                        'period': c['cohort'],
                        'size': c['cohort_size'],
                        'avg_ltv': round(c['avg_ltv'], 2),
                        'total_revenue': round(c['total_revenue'], 2)
                    }
                    for c in cohorts
                ]
            }
        except Exception as e:
            logger.error(f"Cohort analysis failed: {e}")
            return {'cohorts': []}
    
    def get_top_value_patients(self, limit: int = 20) -> List[Dict]:
        """
        Obtiene los pacientes de mayor valor
        
        Args:
            limit: Número de pacientes a retornar
        
        Returns:
            List[Dict]: Top patients por LTV
        """
        all_patients = self.calculate_ltv_all_patients()
        return sorted(all_patients, key=lambda x: x['projected_ltv_5y'], reverse=True)[:limit]
    
    def generate_ltv_report(self) -> Dict[str, Any]:
        """
        Genera reporte completo de LTV
        
        Returns:
            Dict: Reporte LTV
        """
        patients = self.calculate_ltv_all_patients()
        
        if not patients:
            return {'error': 'No patient data available'}
        
        # Estadísticas globales
        total_historical_ltv = sum(p['historical_ltv'] for p in patients)
        total_projected_ltv = sum(p['projected_ltv_5y'] for p in patients)
        avg_ltv = total_historical_ltv / len(patients) if patients else 0
        
        # Segmentación
        vip_count = len([p for p in patients if p['value_segment'] == 'VIP'])
        high_value_count = len([p for p in patients if p['value_segment'] == 'High Value'])
        
        # Top 10
        top_10 = sorted(patients, key=lambda x: x['projected_ltv_5y'], reverse=True)[:10]
        
        report = {
            'report_type': 'ltv_analysis',
            'timestamp': datetime.now().isoformat(),
            'summary': {
                'total_patients_analyzed': len(patients),
                'total_historical_ltv_eur': round(total_historical_ltv, 2),
                'total_projected_ltv_5y_eur': round(total_projected_ltv, 2),
                'avg_ltv_per_patient_eur': round(avg_ltv, 2),
                'vip_patients': vip_count,
                'high_value_patients': high_value_count
            },
            'top_10_patients': top_10,
            'value_distribution': {
                'VIP': vip_count,
                'High Value': high_value_count,
                'Medium Value': len([p for p in patients if p['value_segment'] == 'Medium Value']),
                'Low Value': len([p for p in patients if p['value_segment'] == 'Low Value'])
            }
        }
        
        logger.info(f"📊 LTV report generated for {len(patients)} patients")
        
        return report


# Singleton instance
ltv_calculator = LTVCalculator()
