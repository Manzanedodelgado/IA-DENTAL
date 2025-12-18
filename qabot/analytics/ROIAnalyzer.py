"""
ROI Analyzer - Análisis de Rentabilidad por Tratamiento
Calcula el ROI real considerando costes
"""

from typing import List, Dict, Any
from loguru import logger

from core.database import db


class ROIAnalyzer:
    """
    Analizador de ROI por tratamiento
    Incluye costes de materiales, tiempo y equipamiento
    """
    
    def __init__(self):
        # Costes fijos estimados
        self.labor_cost_per_hour = 50  # €/hora profesional
        self.equipment_cost_per_hour = 25  # €/hora amortización
    
    def calculate_treatment_roi(self) -> List[Dict[str, Any]]:
        """
        Calcula ROI de todos los tratamientos
        
        Returns:
            List[Dict]: ROI por tratamiento
        """
        logger.info("💹 Calculating treatment ROI...")
        
        query = """
        WITH TreatmentStats AS (
            SELECT 
                t.Codigo as treatment_code,
                t.Descripcion as treatment_name,
                COUNT(DISTINCT tt.IdTratamiento) as times_performed,
                AVG(tt.PrecioFinal) as avg_price,
                SUM(tt.PrecioFinal) as total_revenue,
                AVG(tt.Duracion) as avg_duration_minutes
                
            FROM TTratamientos t
            LEFT JOIN Tratamientos tt ON t.IdTTratamiento = tt.IdTTratamiento
            WHERE tt.Estado = 'Finalizado'
            GROUP BY t.IdTTratamiento, t.Codigo, t.Descripcion
        )
        SELECT * FROM TreatmentStats
        WHERE times_performed > 0
        ORDER BY total_revenue DESC
        """
        
        try:
            treatments = db.execute_query(query)
            
            # Enriquecer con cálculos de costes y ROI
            roi_analysis = []
            for treatment in treatments:
                roi_data = self._calculate_treatment_costs_and_roi(treatment)
                roi_analysis.append(roi_data)
            
            logger.info(f"✅ ROI calculated for {len(roi_analysis)} treatments")
            
            return roi_analysis
            
        except Exception as e:
            logger.error(f"Failed to calculate treatment ROI: {e}")
            logger.debug(f"Query error details: {e}")
            return []
    
    def _calculate_treatment_costs_and_roi(self, treatment_data: Dict) -> Dict[str, Any]:
        """
        Calcula costes y ROI para un tratamiento
        
        Args:
            treatment_data: Datos del tratamiento
        
        Returns:
            Dict: Análisis completo de ROI
        """
        avg_price = treatment_data.get('avg_price', 0)
        avg_duration = treatment_data.get('avg_duration_minutes', 60)
        times_performed = treatment_data.get('times_performed', 0)
        total_revenue = treatment_data.get('total_revenue', 0)
        
        # Calcular costes
        # 1. Coste de tiempo (labor + equipment)
        hours = avg_duration / 60.0
        labor_cost = hours * self.labor_cost_per_hour
        equipment_cost = hours * self.equipment_cost_per_hour
        
        # 2. Coste de materiales (estimado al 20% del precio - ajustar según datos reales)
        material_cost = avg_price * 0.20
        
        # Coste total por tratamiento
        total_cost_per_treatment = labor_cost + equipment_cost + material_cost
        
        # Beneficio neto
        net_profit_per_treatment = avg_price - total_cost_per_treatment
        net_profit_total = net_profit_per_treatment * times_performed
        
        # Margen
        margin_percent = (net_profit_per_treatment / avg_price * 100) if avg_price > 0 else 0
        
        # ROI
        roi_percent = (net_profit_per_treatment / total_cost_per_treatment * 100) if total_cost_per_treatment > 0 else 0
        
        # Clasificación de rentabilidad
        if roi_percent >= 100:
            profitability = 'Excellent'
        elif roi_percent >= 50:
            profitability = 'Good'
        elif roi_percent >= 20:
            profitability = 'Fair'
        else:
            profitability = 'Poor'
        
        return {
            'treatment_code': treatment_data.get('treatment_code', 'N/A'),
            'treatment_name': treatment_data.get('treatment_name', 'Unknown'),
            'times_performed': times_performed,
            'avg_duration_minutes': round(avg_duration, 1),
            'revenue': {
                'avg_price': round(avg_price, 2),
                'total_revenue': round(total_revenue, 2)
            },
            'costs': {
                'labor_cost': round(labor_cost, 2),
                'equipment_cost': round(equipment_cost, 2),
                'material_cost': round(material_cost, 2),
                'total_cost': round(total_cost_per_treatment, 2)
            },
            'profitability': {
                'net_profit_per_treatment': round(net_profit_per_treatment, 2),
                'total_net_profit': round(net_profit_total, 2),
                'margin_percent': round(margin_percent, 1),
                'roi_percent': round(roi_percent, 1),
                'classification': profitability
            }
        }
    
    def get_most_profitable_treatments(self, limit: int = 10) -> List[Dict]:
        """
        Obtiene los tratamientos más rentables
        
        Args:
            limit: Número de tratamientos
        
        Returns:
            List[Dict]: Top treatments por ROI
        """
        all_treatments = self.calculate_treatment_roi()
        return sorted(
            all_treatments,
            key=lambda x: x['profitability']['roi_percent'],
            reverse=True
        )[:limit]
    
    def get_low_performers(self, roi_threshold: float = 20.0) -> List[Dict]:
        """
        Identifica tratamientos de bajo rendimiento
        
        Args:
            roi_threshold: ROI mínimo aceptable (%)
        
        Returns:
            List[Dict]: Tratamientos bajo threshold
        """
        all_treatments = self.calculate_treatment_roi()
        return [
            t for t in all_treatments
            if t['profitability']['roi_percent'] < roi_threshold
        ]
    
    def generate_roi_report(self) -> Dict[str, Any]:
        """
        Genera reporte completo de ROI
        
        Returns:
            Dict: Reporte ROI
        """
        treatments = self.calculate_treatment_roi()
        
        if not treatments:
            return {'error': 'No treatment data available'}
        
        # Estadísticas globales
        total_revenue = sum(t['revenue']['total_revenue'] for t in treatments)
        total_costs = sum(t['costs']['total_cost'] * t['times_performed'] for t in treatments)
        total_profit = sum(t['profitability']['total_net_profit'] for t in treatments)
        
        avg_roi = sum(t['profitability']['roi_percent'] for t in treatments) / len(treatments)
        
        # Top performers
        top_10_profitable = self.get_most_profitable_treatments(10)
        
        # Low performers
        low_performers = self.get_low_performers(20)
        
        report = {
            'report_type': 'roi_analysis',
            'timestamp': str(logger),
            'summary': {
                'total_treatments_analyzed': len(treatments),
                'total_revenue_eur': round(total_revenue, 2),
                'total_costs_eur': round(total_costs, 2),
                'total_profit_eur': round(total_profit, 2),
                'avg_roi_percent': round(avg_roi, 1),
                'treatments_below_20_roi': len(low_performers)
            },
            'top_10_most_profitable': top_10_profitable,
            'low_performers': low_performers,
            'recommendations': self._generate_recommendations(treatments, low_performers)
        }
        
        logger.info(f"📊 ROI report generated for {len(treatments)} treatments")
        
        return report
    
    def _generate_recommendations(self, all_treatments: List[Dict], low_performers: List[Dict]) -> List[str]:
        """
        Genera recomendaciones basadas en análisis ROI
        
        Args:
            all_treatments: Todos los tratamientos
            low_performers: Tratamientos de bajo rendimiento
        
        Returns:
            List[str]: Recomendaciones
        """
        recommendations = []
        
        if len(low_performers) > 0:
            recommendations.append(f"⚠️ {len(low_performers)} tratamientos con ROI < 20%:")
            for lp in low_performers[:3]:
                recommendations.append(
                    f"  • {lp['treatment_name']}: ROI {lp['profitability']['roi_percent']:.1f}% - "
                    f"Revisar costes o aumentar precio"
                )
        
        # Identificar los más rentables
        top_3 = sorted(all_treatments, key=lambda x: x['profitability']['total_net_profit'], reverse=True)[:3]
        recommendations.append("\n✅ Tratamientos estrella (mayor beneficio total):")
        for treatment in top_3:
            recommendations.append(
                f"  • {treatment['treatment_name']}: €{treatment['profitability']['total_net_profit']:.2f} beneficio - "
                f"Promover más"
            )
        
        return recommendations


# Singleton instance
roi_analyzer = ROIAnalyzer()
