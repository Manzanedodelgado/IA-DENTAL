@echo off
REM Script para iniciar QABot en GABINETE2
REM Ejecutar este archivo para iniciar el servidor

echo ========================================
echo QABot - Iniciando Sistema
echo ========================================
echo.

REM Navegar a directorio de QABot
cd /d %~dp0

REM Activar entorno virtual si existe
if exist venv\Scripts\activate.bat (
    echo Activando entorno virtual...
    call venv\Scripts\activate.bat
) else (
    echo Entorno virtual no encontrado, usando Python global
)

REM Verificar que Ollama está corriendo
echo.
echo Verificando Ollama...
curl http://localhost:11434 >nul 2>&1
if %errorlevel% neq 0 (
    echo [ADVERTENCIA] Ollama no esta corriendo
    echo Por favor, inicia Ollama primero
    pause
    exit /b 1
)
echo ✅ Ollama OK

REM Verificar SQL Server
echo.
echo Verificando SQL Server...
sc query MSSQL$INFOMED | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo [ADVERTENCIA] SQL Server (INFOMED) no esta corriendo
    echo Intentando iniciar...
    net start MSSQL$INFOMED
)
echo ✅ SQL Server OK

REM Iniciar QABot
echo.
echo ========================================
echo Iniciando QABot API Server...
echo ========================================
echo.
echo API: http://localhost:8000
echo Docs: http://localhost:8000/docs
echo.
echo Presiona Ctrl+C para detener
echo ========================================
echo.

python main.py

pause
