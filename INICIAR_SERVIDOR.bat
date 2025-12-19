@echo off
title Agente Gesden IA - Servidor Claude API
color 0A

echo ============================================================
echo   AGENTE GESDEN IA - SERVIDOR WEB v5.0 CLAUDE
echo ============================================================
echo.

REM Verificar API Key
if "%ANTHROPIC_API_KEY%"=="" (
    echo [ERROR] No se encontro ANTHROPIC_API_KEY
    echo.
    echo Configurala asi:
    echo   setx ANTHROPIC_API_KEY "sk-ant-api03-TU-KEY"
    echo.
    echo Luego cierra esta ventana y abre una nueva.
    echo.
    pause
    exit /b 1
)

echo [OK] API Key encontrada
echo.

REM Cambiar a directorio del script
cd /d "%~dp0"

echo [INFO] Iniciando servidor...
echo.

REM Ejecutar servidor
python servidor_web_claude.py

REM Si el servidor termina
echo.
echo ============================================================
echo   Servidor detenido
echo ============================================================
echo.
pause
