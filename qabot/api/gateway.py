"""
API Gateway - CAPA 3
FastAPI REST endpoints para acceso remoto
"""

from fastapi import FastAPI, Depends, HTTPException, status, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
import jwt
from loguru import logger

from core.orchestrator import qabot
from analytics import churn_predictor, ltv_calculator, roi_analyzer
from config import settings


# FastAPI app
app = FastAPI(
    title="QABot API Gateway",
    description="Quality Assurance & Business Intelligence API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()


# === MODELS ===

class QueryRequest(BaseModel):
    query: str
    validate: bool = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    database: str
    schema_loaded: bool


# === AUTH ===

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Crea JWT token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.API_ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.API_SECRET_KEY, algorithm=settings.API_ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """Verifica JWT token"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, settings.API_SECRET_KEY, algorithms=[settings.API_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )


# === PUBLIC ENDPOINTS ===

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "QABot API Gateway",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    health = qabot.get_system_health()
    return HealthResponse(
        status=health.get("status", "unknown"),
        timestamp=health.get("timestamp", datetime.now().isoformat()),
        database=health.get("database", "unknown"),
        schema_loaded=health.get("schema_loaded", False)
    )

@app.post("/auth/token", response_model=TokenResponse)
async def get_token(username: str, password: str):
    """
    Obtiene access token
    (Placeholder - implementar autenticación real)
    """
    # TODO: Validar contra base de datos de usuarios
    if username == "admin" and password == "admin":  # CAMBIAR EN PRODUCCIÓN
        access_token = create_access_token(data={"sub": username})
        return TokenResponse(access_token=access_token)
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password"
    )


# === PROTECTED ENDPOINTS ===

@app.post("/query/natural-language")
async def natural_language_query(
    request: QueryRequest,
    user: dict = Depends(verify_token)
):
    """
    Procesa query en lenguaje natural
    Requiere autenticación
    """
    try:
        result = qabot.process_natural_language_query(
            query=request.query,
            validate_before_execution=request.validate
        )
        
        return {
            "success": result['status'] == 'success',
            "query": result['query'],
            "sql_generated": result.get('sql_generated'),
            "row_count": result.get('row_count', 0),
            "data": result.get('data'),
            "analysis": result.get('analysis'),
            "error": result.get('error')
        }
    except Exception as e:
        logger.error(f"Query processing failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/qa/integrity-check")
async def run_integrity_check(user: dict = Depends(verify_token)):
    """
    Ejecuta integrity check
    Requiere autenticación
    """
    try:
        results = qabot.run_daily_integrity_check()
        return {
            "success": True,
            "results": results
        }
    except Exception as e:
        logger.error(f"Integrity check failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/churn")
async def get_churn_predictions(
    risk_level: Optional[str] = None,
    user: dict = Depends(verify_token)
):
    """
    Obtiene predicciones de churn
    
    Args:
        risk_level: Filtrar por nivel (critical, high, medium, low)
    """
    try:
        predictions = churn_predictor.predict_churn_all_patients()
        
        if risk_level:
            predictions = [p for p in predictions if p['risk_level'] == risk_level]
        
        return {
            "success": True,
            "total_at_risk": len(predictions),
            "predictions": predictions
        }
    except Exception as e:
        logger.error(f"Churn prediction failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/churn/report")
async def get_churn_report(user: dict = Depends(verify_token)):
    """Obtiene reporte completo de churn"""
    try:
        report = churn_predictor.generate_churn_report()
        return {
            "success": True,
            "report": report
        }
    except Exception as e:
        logger.error(f"Churn report generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/ltv")
async def get_ltv_analysis(
    limit: int = 100,
    user: dict = Depends(verify_token)
):
    """
    Obtiene análisis de LTV
    
    Args:
        limit: Número máximo de pacientes a retornar
    """
    try:
        patients = ltv_calculator.calculate_ltv_all_patients()
        
        return {
            "success": True,
            "total_patients": len(patients),
            "patients": patients[:limit]
        }
    except Exception as e:
        logger.error(f"LTV calculation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/ltv/top-value")
async def get_top_value_patients(
    limit: int = 20,
    user: dict = Depends(verify_token)
):
    """Obtiene pacientes de mayor valor"""
    try:
        top_patients = ltv_calculator.get_top_value_patients(limit)
        
        return {
            "success": True,
            "count": len(top_patients),
            "patients": top_patients
        }
    except Exception as e:
        logger.error(f"Top value patients query failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/ltv/report")
async def get_ltv_report(user: dict = Depends(verify_token)):
    """Obtiene reporte completo de LTV"""
    try:
        report = ltv_calculator.generate_ltv_report()
        return {
            "success": True,
            "report": report
        }
    except Exception as e:
        logger.error(f"LTV report generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/roi")
async def get_roi_analysis(user: dict = Depends(verify_token)):
    """Obtiene análisis de ROI por tratamiento"""
    try:
        roi_data = roi_analyzer.calculate_treatment_roi()
        
        return {
            "success": True,
            "total_treatments": len(roi_data),
            "treatments": roi_data
        }
    except Exception as e:
        logger.error(f"ROI calculation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/roi/top-profitable")
async def get_most_profitable_treatments(
    limit: int = 10,
    user: dict = Depends(verify_token)
):
    """Obtiene tratamientos más rentables"""
    try:
        top_treatments = roi_analyzer.get_most_profitable_treatments(limit)
        
        return {
            "success": True,
            "count": len(top_treatments),
            "treatments": top_treatments
        }
    except Exception as e:
        logger.error(f"Top profitable treatments query failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/roi/report")
async def get_roi_report(user: dict = Depends(verify_token)):
    """Obtiene reporte completo de ROI"""
    try:
        report = roi_analyzer.generate_roi_report()
        return {
            "success": True,
            "report": report
        }
    except Exception as e:
        logger.error(f"ROI report generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analytics/dashboard")
async def get_dashboard_data(user: dict = Depends(verify_token)):
    """
    Obtiene datos para dashboard completo
    Combina todas las analíticas
    """
    try:
        # Churn summary
        churn_data = churn_predictor.predict_churn_all_patients()
        critical_churn = len([p for p in churn_data if p['risk_level'] == 'critical'])
        
        # LTV summary
        ltv_data = ltv_calculator.calculate_ltv_all_patients()
        top_5_ltv = sorted(lvt_data, key=lambda x: x['projected_ltv_5y'], reverse=True)[:5]
        
        # ROI summary
        roi_data = roi_analyzer.calculate_treatment_roi()
        top_3_roi = sorted(roi_data, key=lambda x: x['profitability']['roi_percent'], reverse=True)[:3]
        
        return {
            "success": True,
            "dashboard": {
                "churn": {
                    "total_at_risk": len(churn_data),
                    "critical_risk": critical_churn,
                    "top_5": churn_data[:5]
                },
                "ltv": {
                    "total_analyzed": len(ltv_data),
                    "top_5_valuable": top_5_ltv
                },
                "roi": {
                    "total_treatments": len(roi_data),
                    "top_3_profitable": top_3_roi
                }
            }
        }
    except Exception as e:
        logger.error(f"Dashboard data compilation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# === ERROR HANDLERS ===

@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "success": False,
        "error": "Endpoint not found",
        "path": str(request.url)
    }

@app.exception_handler(500)
async def server_error_handler(request, exc):
    logger.error(f"Internal server error: {exc}")
    return {
        "success": False,
        "error": "Internal server error",
        "detail": str(exc)
    }


# === STARTUP ===

@app.on_event("startup")
async def startup_event():
    """Ejecuta al iniciar el servidor"""
    logger.info("🚀 QABot API Gateway starting...")
    logger.info(f"📡 Server: {settings.API_HOST}:{settings.API_PORT}")
    logger.info(f"🔒 CORS origins: {settings.CORS_ORIGINS}")
    
    # Test database connection
    health = qabot.get_system_health()
    if health['database'] == 'healthy':
        logger.info("✅ Database connection OK")
    else:
        logger.warning("⚠️ Database connection issues")

@app.on_event("shutdown")
async def shutdown_event():
    """Ejecuta al cerrar el servidor"""
    logger.info("👋 QABot API Gateway shutting down...")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "gateway:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=True,
        log_level="info"
    )
