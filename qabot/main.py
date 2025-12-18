"""
QABot Main Entry Point
Inicia el sistema completo con API + Scheduler
"""

import sys
from loguru import logger
import uvicorn

# Configure logger
logger.remove()
logger.add(
    sys.stderr,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan> - <level>{message}</level>"
)
logger.add("qabot.log", rotation="50 MB", retention="30 days")

from api.gateway import app
from scheduler.JobScheduler import job_scheduler
from config import settings


def start_qabot_server():
    """
    Inicia QABot completo:
    - API Gateway (FastAPI)
    - Job Scheduler (APScheduler)
    """
    logger.info("="*60)
    logger.info("🤖 QABot - Quality Assurance & Business Intelligence")
    logger.info("="*60)
    logger.info(f"📡 API Server: http://{settings.API_HOST}:{settings.API_PORT}")
    logger.info(f"📚 API Docs: http://{settings.API_HOST}:{settings.API_PORT}/docs")
    logger.info(f"🔒 Auth required: {settings.API_SECRET_KEY[:10]}...")
    logger.info("="*60)
    
    # Start scheduler
    try:
        job_scheduler.start()
        jobs = job_scheduler.get_scheduled_jobs()
        logger.info(f"📅 Scheduled {len(jobs)} automatic jobs:")
        for job in jobs:
            logger.info(f"  • {job['name']}: next run at {job['next_run']}")
    except Exception as e:
        logger.error(f"Failed to start scheduler: {e}")
    
    # Start API server
    logger.info("\n🚀 Starting API Gateway...\n")
    
    uvicorn.run(
        app,
        host=settings.API_HOST,
        port=settings.API_PORT,
        log_level="info"
    )


if __name__ == "__main__":
    try:
        start_qabot_server()
    except KeyboardInterrupt:
        logger.info("\n👋 QABot shutting down...")
        job_scheduler.stop()
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        logger.exception(e)
        sys.exit(1)
