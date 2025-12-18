"""
Churn Predictor - Predicción de Abandono de Pacientes
Utiliza ML local para predecir qué pacientes están en riesgo
"""

from typing import List, Dict, Any
from datetime import datetime, timedelta
from loguru import logger
import json

from core.database import db
from core.llm_client import llm
from config import settings


class ChurnPredictor:
    """
    Predictor de abandono de pacientes usando features de comportamiento
    """
    
    def __init__(self):
        self.churn_weights = settings.CHURN_RISK_WEIGHTS
        self.threshold_days = settings.CHURN_THRESHOLD_DAYS
    
    def predict_churn_all_patients(self) -> List[Dict[str, Any]]:
        """
        Predice churn para todos los pacientes activos
        
        Returns:
            List[Dict]: Predicciones con scores y factores
        """
        logger.info("🔮 Predicting churn for all active patients...")
        
        # Obtener features de todos los pacientes
        features_data = self._extract_patient_features()
        
        predictions = []
        for patient_data in features_data:
            prediction = self._calculate_churn_score(patient_data)
            if prediction['churn_probability'] > 0.3:  # Solo riesgo medio-alto
                predictions.append(prediction)
        
        # Ordenar por probabilidad descendente
        predictions.sort(key=lambda x: x['churn_probability'], reverse=True)
        
        logger.info(f"✅ Churn prediction complete: {len(predictions)} at-risk patients")
        
        return predictions
    
    def _extract_patient_features(self) -> List[Dict[str, Any]]:
        """
        Extrae features de comportamiento de pacientes
        
        Returns:
            List[Dict]: Features por paciente
        """
        query = """
        WITH PatientMetrics AS (
            SELECT 
                p.IdPac,
                p.Nombre,
                p.Tel1,
                p.Email,
                
                -- Citas perdidas últimos 6 meses
                COUNT(CASE 
                    WHEN c.Estado = 'Fallo' 
                    AND c.FechaCita >= DATEADD(MONTH, -6, GETDATE())
                    THEN 1 
                END) as missed_appointments,
                
                -- Días desde última visita
                DATEDIFF(DAY, MAX(CASE WHEN c.Estado = 'Finalizada' THEN c.FechaCita END), GETDATE()) as days_since_last_visit,
                
                -- Total de citas
                COUNT(c.IdCita) as total_appointments,
                
                -- Saldo pendiente
                COALESCE((
                    SELECT SUM(ImporteTotal - ImportePagado)
                    FROM Facturas f
                    WHERE f.IdPac = p.IdPac
                    AND f.Estado != 'Anulada'
                ), 0) as outstanding_balance,
                
                -- Tratamientos completados vs totales
                CAST(COUNT(CASE WHEN t.Estado = 'Finalizado' THEN 1 END) AS FLOAT) / 
                NULLIF(COUNT(t.IdTratamiento), 0) as treatment_compliance,
                
                -- Última comunicación (placeholder - ajustar según tabla real)
                DATEDIFF(DAY, MAX(c.FechaCita), GETDATE()) as days_since_last_contact
                
            FROM Pacientes p
            LEFT JOIN Citas c ON p.IdPac = c.IdPac
            LEFT JOIN Tratamientos t ON p.IdPac = t.IdPac
            WHERE p.Inactivo = 0 OR p.Inactivo IS NULL
            GROUP BY p.IdPac, p.Nombre, p.Tel1, p.Email
        )
        SELECT * FROM PatientMetrics
        WHERE total_appointments > 0  -- Solo pacientes con historial
        """
        
        try:
            results = db.execute_query(query)
            logger.info(f"Extracted features for {len(results)} patients")
            return results
        except Exception as e:
            logger.error(f"Failed to extract patient features: {e}")
            return []
    
    def _calculate_churn_score(self, patient_data: Dict) -> Dict[str, Any]:
        """
        Calcula score de churn para un paciente
        
        Args:
            patient_data: Features del paciente
        
        Returns:
            Dict: Predicción con score y factores
        """
        score = 0.0
        factors = []
        
        # Factor 1: Citas perdidas
        missed = patient_data.get('missed_appointments', 0)
        if missed > 0:
            missed_score = min(missed * 0.1, 0.25)  # Max 0.25
            score += missed_score * self.churn_weights['missed_appointments']
            if missed >= 2:
                factors.append(f"Alto: {missed} citas perdidas recientes")
        
        # Factor 2: Días desde última visita
        days_since = patient_data.get('days_since_last_visit') or 0
        if days_since > self.threshold_days:
            days_score = min((days_since - self.threshold_days) / 365, 1.0)
            score += days_score * self.churn_weights['days_since_last_visit']
            factors.append(f"Crítico: {days_since} días sin visita")
        elif days_since > 90:
            factors.append(f"Alerta: {days_since} días sin visita")
        
        # Factor 3: Saldo pendiente alto
        balance = patient_data.get('outstanding_balance', 0)
        if balance > 500:
            balance_score = min(balance / 2000, 1.0)
            score += balance_score * self.churn_weights['outstanding_balance']
            factors.append(f"Deuda: €{balance:.2f} pendiente")
        
        # Factor 4: Compliance bajo
        compliance = patient_data.get('treatment_compliance') or 1.0
        if compliance < 0.5:
            compliance_score = 1.0 - compliance
            score += compliance_score * self.churn_weights['treatment_compliance']
            factors.append(f"Bajo engagement: {compliance*100:.0f}% tratamientos completados")
        
        # Factor 5: Sin contacto reciente (placeholder)
        days_no_contact = patient_data.get('days_since_last_contact', 0)
        if days_no_contact > 180:
            contact_score = min(days_no_contact / 365, 1.0)
            score += contact_score * self.churn_weights['communication_score']
            factors.append(f"Sin comunicación: {days_no_contact} días")
        
        # Determinar nivel de riesgo
        if score >= 0.7:
            risk_level = 'critical'
        elif score >= 0.5:
            risk_level = 'high'
        elif score >= 0.3:
            risk_level = 'medium'
        else:
            risk_level = 'low'
        
        # Generar acciones recomendadas
        recommended_actions = self._generate_retention_actions(score, factors, patient_data)
        
        return {
            'patient_id': patient_data['IdPac'],
            'patient_name': patient_data['Nombre'],
            'contact': patient_data.get('Tel1') or patient_data.get('Email', 'N/A'),
            'churn_probability': round(score, 3),
            'risk_level': risk_level,
            'contributing_factors': factors,
            'recommended_actions': recommended_actions,
            'days_since_last_visit': patient_data.get('days_since_last_visit'),
            'outstanding_balance': patient_data.get('outstanding_balance', 0)
        }
    
    def _generate_retention_actions(self, score: float, factors: List[str], patient_data: Dict) -> List[str]:
        """
        Genera acciones específicas de retención
        
        Args:
            score: Churn score
            factors: Factores contribuyentes
            patient_data: Datos del paciente
        
        Returns:
            List[str]: Acciones recomendadas
        """
        actions = []
        
        if score >= 0.7:
            actions.append("🚨 URGENTE: Contacto personal del Dr/Dra en 24h")
            actions.append("📞 Llamada telefónica prioritaria")
        
        if score >= 0.5:
            actions.append("📧 Enviar email personalizado con oferta especial")
            actions.append("💬 WhatsApp: Recordatorio de importancia de seguimiento")
        
        days_since = patient_data.get('days_since_last_visit', 0)
        if days_since > self.threshold_days:
            actions.append(f"📅 Programar revisión (hace {days_since} días sin cita)")
        
        balance = patient_data.get('outstanding_balance', 0)
        if balance > 500:
            actions.append(f"💳 Proponer plan de pago para €{balance:.2f}")
        
        if len(actions) == 0:
            actions.append("✅ Mantener contacto regular y seguimiento preventivo")
        
        return actions
    
    def generate_churn_report(self) -> Dict[str, Any]:
        """
        Genera reporte completo de churn
        
        Returns:
            Dict: Reporte con estadísticas y predicciones
        """
        predictions = self.predict_churn_all_patients()
        
        # Estadísticas
        critical_count = len([p for p in predictions if p['risk_level'] == 'critical'])
        high_count = len([p for p in predictions if p['risk_level'] == 'high'])
        medium_count = len([p for p in predictions if p['risk_level'] == 'medium'])
        
        # Valor en riesgo (suma de saldos pendientes)
        total_value_at_risk = sum(p.get('outstanding_balance', 0) for p in predictions)
        
        report = {
            'report_type': 'churn_prediction',
            'timestamp': datetime.now().isoformat(),
            'summary': {
                'total_at_risk': len(predictions),
                'critical_risk': critical_count,
                'high_risk': high_count,
                'medium_risk': medium_count,
                'total_value_at_risk_eur': round(total_value_at_risk, 2)
            },
            'top_10_at_risk': predictions[:10],
            'all_predictions': predictions
        }
        
        # Generar insights con LLM
        if len(predictions) > 0:
            insights = llm.generate_insights(
                data={
                    'at_risk_count': len(predictions),
                    'critical': critical_count,
                    'sample_patients': [p['patient_name'] for p in predictions[:5]]
                },
                context="Análisis de riesgo de abandono de pacientes"
            )
            report['ai_insights'] = insights
        
        logger.info(f"📊 Churn report generated: {len(predictions)} at-risk patients")
        
        return report


# Singleton instance
churn_predictor = ChurnPredictor()
