#!/bin/bash

# QABot - Script de Test de Conectividad Remota
# Verifica todos los componentes antes de ejecutar

echo "=================================="
echo "🔍 QABot - Remote Connectivity Test"
echo "=================================="
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Test 1: Python
echo "📌 Test 1: Python Version"
PYTHON_VERSION=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+')
PYTHON_MAJOR=$(echo $PYTHON_VERSION | cut -d. -f1)
PYTHON_MINOR=$(echo $PYTHON_VERSION | cut -d. -f2)

if [ "$PYTHON_MAJOR" -ge 3 ] && [ "$PYTHON_MINOR" -ge 10 ]; then
    echo -e "${GREEN}✅ Python $PYTHON_VERSION (OK)${NC}"
else
    echo -e "${RED}❌ Python $PYTHON_VERSION (Necesita >= 3.10)${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 2: Ollama
echo "📌 Test 2: Ollama Service"
if pgrep -x "ollama" > /dev/null; then
    echo -e "${GREEN}✅ Ollama está corriendo${NC}"
    
    # Verificar modelo
    if ollama list 2>/dev/null | grep -q "llama3"; then
        echo -e "${GREEN}✅ Modelo llama3 está descargado${NC}"
    else
        echo -e "${YELLOW}⚠️  Modelo llama3 NO encontrado${NC}"
        echo "   Ejecuta: ollama pull llama3"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ Ollama NO está corriendo${NC}"
    echo "   Ejecuta: ollama serve"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 3: ODBC Driver
echo "📌 Test 3: ODBC Driver for SQL Server"
if odbcinst -q -d 2>/dev/null | grep -q "ODBC Driver 18 for SQL Server"; then
    echo -e "${GREEN}✅ ODBC Driver 18 instalado${NC}"
elif odbcinst -q -d 2>/dev/null | grep -q "ODBC Driver 17 for SQL Server"; then
    echo -e "${YELLOW}⚠️  ODBC Driver 17 instalado (Driver 18 recomendado)${NC}"
else
    echo -e "${RED}❌ ODBC Driver NO encontrado${NC}"
    echo "   Instala con: brew install msodbcsql18"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 4: Python Dependencies
echo "📌 Test 4: Python Dependencies"
if python3 -c "import pyodbc" 2>/dev/null; then
    echo -e "${GREEN}✅ pyodbc instalado${NC}"
else
    echo -e "${RED}❌ pyodbc NO instalado${NC}"
    echo "   Ejecuta: pip3 install -r requirements.txt"
    ERRORS=$((ERRORS + 1))
fi

if python3 -c "import fastapi" 2>/dev/null; then
    echo -e "${GREEN}✅ FastAPI instalado${NC}"
else
    echo -e "${RED}❌ FastAPI NO instalado${NC}"
    echo "   Ejecuta: pip3 install -r requirements.txt"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Test 5: Network Connectivity (requiere IP de GABINETE2)
echo "📌 Test 5: Network Connectivity"
echo -e "${YELLOW}⚠️  Necesitas configurar la IP de GABINETE2 en config.py${NC}"
echo "   Edita: config.py → DB_SERVER = 'TU_IP\\INFOMED'"
echo ""

# Test 6: Archivo .env
echo "📌 Test 6: Configuration Files"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Archivo .env existe${NC}"
else
    echo -e "${YELLOW}⚠️  Archivo .env NO encontrado (opcional)${NC}"
    echo "   Las configuraciones se leerán de config.py"
fi
echo ""

# Resumen
echo "=================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 Todos los tests pasaron!${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. Configurar IP de GABINETE2 en config.py"
    echo "2. Ejecutar: python3 cli.py"
    echo "3. Seleccionar opción 1: Test Connectivity"
else
    echo -e "${RED}❌ $ERRORS error(s) encontrado(s)${NC}"
    echo ""
    echo "Revisa los errores arriba y corrige antes de continuar"
fi
echo "=================================="
