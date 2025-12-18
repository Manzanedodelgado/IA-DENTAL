"""
Job Scheduler - Tareas Automatizadas
Ejecuta integrity checks y reportes programados
"""

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
from loguru import logger
import json

from core.orchestrator import qabot
from analytics import churn_predictor, ltv_calculator, roi_analyzer
from core.database import db
from config import settings


class JobScheduler:
    """
    Programador de tareas automáticas
    """
    
    def __init__(self):
        self.scheduler = BackgroundScheduler()
        self.is_running = False
    
    def start(self):
        """Inicia el scheduler"""
        if self.is_running:
            logger.warning("Scheduler already running")
            return
        
        logger.info("📅 Starting job scheduler...")
        
        # Programar jobs
        self._schedule_daily_integrity_check()
        self._schedule_weekly_analytics()
        self._schedule_monthly_reports()
        
        self.scheduler.start()
        self.is_running = True
        
        logger.info("✅ Job scheduler started successfully")
    
    def stop(self):
        """Detiene el scheduler"""
        if self.scheduler.running:
            self.scheduler.shutdown()
            self.is_running = False
            logger.info("⏹️ Job scheduler stopped")
    
    def _schedule_daily_integrity_check(self):
        """
        Programa integrity check diario a las 2 AM
        """
        trigger = CronTrigger(
            hour=settings.DAILY_INTEGRITY_HOUR,
            minute=0
        )
        
        self.scheduler.add_job(
            self._run_daily_integrity_check,
            trigger=trigger,
            id='daily_integrity_check',
            name='Daily Integrity Check',
            replace_existing=True
        )
        
        logger.info(f"📅 Scheduled: Daily integrity check at {settings.DAILY_INTEGRITY_HOUR}:00")
    
    def _schedule_weekly_analytics(self):
        """
        Programa analytics semanal los lunes a las 3 AM
        """
        trigger = CronTrigger(
            day_of_week=settings.WEEKLY_ANALYTICS_DAY,
            hour=3,
            minute=0
        )
        
        self.scheduler.add_job(
            self._run_weekly_analytics,
            trigger=trigger,
            id='weekly_analytics',
            name='Weekly Analytics Report',
            replace_existing=True
        )
        
        logger.info("📅 Scheduled: Weekly analytics every Monday at 03:00")
    
    def _schedule_monthly_reports(self):
        """
        Programa reportes mensuales el día 1 a las 4 AM
        """
        trigger = CronTrigger(
            day=settings.MONTHLY_REPORT_DAY,
            hour=4,
            minute=0
        )
        
        self.scheduler.add_job(
            self._run_monthly_reports,
            trigger=trigger,
            id='monthly_reports',
            name='Monthly Comprehensive Report',
            replace_existing=True
        )
        
        logger.info("📅 Scheduled: Monthly reports on day 1 at 04:00")
    
    def _run_daily_integrity_check(self):
        """Ejecuta integrity check diario"""
        logger.info("🔍 Running scheduled daily integrity check...")
        
        try:
            results = qabot.run_daily_integrity_check()
            
            logger.info(f"✅ Daily integrity check completed: {results['passed']} passed, {results['failed']} failed")
            
            # Si hay issues críticos, enviar alerta (placeholder)
            if len(results.get('critical_issues', [])) > 0:
                self._send_alert(
                    f"CRITICAL: {len(results['critical_issues'])} integrity issues found",
                    results
                )
        
        except Exception as e:
            logger.error(f"❌ Daily integrity check failed: {e}")
            self._send_alert("Daily integrity check failed", {"error": str(e)})
    
    def _run_weekly_analytics(self):
        """Ejecuta analytics semanal"""
        logger.info("📊 Running scheduled weekly analytics...")
        
        try:
            # Churn analysis
            churn_report = churn_predictor.generate_churn_report()
            
            # LTV analysis
            ltv_report = ltv_calculator.generate_ltv_report()
            
            # ROI analysis
            roi_report = roi_analyzer.generate_roi_report()
            
            # Combinar reportes
            combined_report = {
                "report_type": "weekly_analytics",
                "timestamp": datetime.now().isoformat(),
                "churn": churn_report,
                "ltv": ltv_report,
                "roi": roi_report
            }
            
            # Guardar en base de datos
            report_data = {
                "tipo": "analytics",
                "categoria": "weekly_summary",
                "severidad": "info",
                "titulo": f"Weekly Analytics - {datetime.now().strftime('%Y-W%U')}",
                "descripcion": f"Comprehensive weekly analytics report",
                "datos": json.dumps(combined_report, ensure_ascii=False),
                "acciones": self._generate_weekly_actions(combined_report)
            }
            
            report_id = db.insert_report(report_data)
            
            logger.info(f"✅ Weekly analytics completed: Report ID {report_id}")
            
        except Exception as e:
            logger.error(f"❌ Weekly analytics failed: {e}")
            self._send_alert("Weekly analytics failed", {"error": str(e)})
    
    def _run_monthly_reports(self):
        """Ejecuta reportes mensuales completos"""
        logger.info("📈 Running scheduled monthly reports...")
        
        try:
            # TODO: Implementar reporte mensual más completo
            logger.info("📊 Monthly report generation - placeholder")
            
            # Placeholder: similar a weekly pero con más detalle
            self._run_weekly_analytics()
            
            logger.info("✅ Monthly reports completed")
            
        except Exception as e:
            logger.error(f"❌ Monthly reports failed: {e}")
            self._send_alert("Monthly reports failed", {"error": str(e)})
    
    def _generate_weekly_actions(self, report: dict) -> str:
        """
        Genera acciones recomendadas del reporte semanal
        
        Args:
            report: Reporte combinado
        
        Returns:
            str: Acciones recomendadas
        """
        actions = ["=== ACCIONES SEMANALES RECOMENDADAS ===\n"]
        
        # Churn
        churn_summary = report.get('churn', {}).get('summary', {})
        critical_count = churn_summary.get('critical_risk', 0)
        if critical_count > 0:
            actions.append(f"🚨 URGENTE: Contactar {critical_count} pacientes en riesgo crítico")
        
        # LTV
        ltv_summary = report.get('ltv', {}).get('summary', {})
        vip_count = ltv_summary.get('vip_patients', 0)
        actions.append(f"💎 Programa VIP: Mantener engagement con {vip_count} pacientes VIP")
        
        # ROI
        roi_summary = report.get('roi', {}).get('summary', {})
        low_roi_count = roi_summary.get('treatments_below_20_roi', 0)
        if low_roi_count > 0:
            actions.append(f"⚠️ Revisar precios/costes de {low_roi_count} tratamientos poco rentables")
        
        return "\n".join(actions)
    
    def _send_alert(self, title: str, data: dict):
        """
        Envía alerta (placeholder - implementar email/Slack)
        
        Args:
            title: Título de la alerta
            data: Datos de la alerta
        """
        logger.warning(f"📧 ALERT: {title}")
        logger.debug(f"Alert data: {data}")
        
        # TODO: Implementar envío real de emails/Slack
        # if settings.ENABLE_EMAIL_ALERTS:
        #     send_email(settings.EMAIL_RECIPIENTS, title, data)
    
    def get_scheduled_jobs(self) -> list:
        """
        Obtiene lista de jobs programados
        
        Returns:
            list: Jobs activos
        """
        jobs = self.scheduler.get_jobs()
        return [
            {
                "id": job.id,
                "name": job.name,
                "next_run": str(job.next_run_time) if job.next_run_time else "N/A",
                "trigger": str(job.trigger)
            }
            for job in jobs
        ]


# Singleton instance
job_scheduler = JobScheduler()
