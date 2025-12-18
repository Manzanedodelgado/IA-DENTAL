# 🚀 Instalar QABot en GABINETE2 (Windows)

## 📋 Ventajas de Esta Solución

✅ **Todo en el mismo servidor** (máxima velocidad)
✅ **Máxima privacidad** (datos nunca salen)
✅ **Sin VPN** necesaria
✅ **Acceso local** directo a GELITE e INFOMED

---

## 🔧 Requisitos en GABINETE2

### 1. Python 3.10+ para Windows

**Descargar**:
1. Ir a https://www.python.org/downloads/
2. Descargar **Python 3.10** o superior (Windows installer)
3. ✅ **IMPORTANTE**: Marcar "Add Python to PATH" durante instalación

**Verificar**:
```cmd
python --version
# Debe mostrar: Python 3.10.x o superior
```

### 2. Ollama para Windows

**Descargar**:
1. Ir a https://ollama.ai/download/windows
2. Descargar e instalar `OllamaSetup.exe`
3. Ejecutar Ollama (se queda en bandeja del sistema)

**Descargar modelo**:
```cmd
ollama pull llama3.2
```

### 3. Copiar QABot a GABINETE2

**Opción A: USB**
- Copiar carpeta completa `qabot` desde tu Mac a GABINETE2
- Ubicación sugerida: `C:\qabot`

**Opción B: Compartir red** (si tienen red temporal)
- Compartir carpeta en Mac
- Acceder desde GABINETE2 y copiar

---

## 📦 Instalación en GABINETE2

### Paso 1: Abrir PowerShell

1. Presiona `Windows + X`
2. Selecciona **Windows PowerShell** (o **Terminal**)
3. Navega a la carpeta:
```powershell
cd C:\qabot
```

### Paso 2: Crear entorno virtual (opcional pero recomendado)

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Si da error de permisos:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Paso 3: Instalar dependencias

```powershell
pip install -r requirements.txt
```

Esto tomará ~3-5 minutos.

### Paso 4: Configurar para uso local

Editar `config.py`:
```python
# Cambiar esta línea:
DB_SERVER: str = "192.168.1.34\\INFOMED"

# Por esta (conexión local):
DB_SERVER: str = "localhost\\INFOMED"
# o
DB_SERVER: str = ".\\INFOMED"
```

**Archivo completo ya está configurado**, solo verificar esta línea.

---

## 🎯 Ejecutar QABot

### Opción 1: CLI Interactivo

```powershell
cd C:\qabot
python cli.py
```

**Menú**:
1. Test Connectivity → **Probar primero**
2. Run Integrity Check
3. Natural Language Query
4. Exit

### Opción 2: API Server

```powershell
cd C:\qabot  
python main.py
```

Luego abrir navegador en:
- http://localhost:8000
- http://localhost:8000/docs (Swagger UI)

---

## 🧪 Test de Funcionalidad

### Test 1: Conectividad

```powershell
python -c "from core.database import db; print('Testing...'); print('✅ OK' if db.test_connection() else '❌ FAIL')"
```

### Test 2: LLM Local

```powershell
python -c "from core.llm_client import llm; print(llm.generate('Di hola', temperature=0.1))"
```

### Test 3: Query Natural Language

```powershell
python cli.py
# Opción 3: Natural Language Query
# Escribir: "¿Cuántos pacientes tenemos activos?"
```

---

## 🌐 Acceso Remoto desde tu Mac (Opcional)

Una vez que QABot funciona en GABINETE2, puedes acceder remotamente:

### Opción A: Túnel ngrok (Más fácil)

**En GABINETE2**:
1. Descargar ngrok: https://ngrok.com/download
2. Ejecutar:
```cmd
ngrok http 8000
```
3. Copiar URL generada: `https://xxxx.ngrok.io`

**En tu Mac**:
```bash
curl https://xxxx.ngrok.io/health
```

### Opción B: Cloudflare Tunnel (Gratuito)

**En GABINETE2**:
```powershell
# Instalar cloudflared
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

cloudflared tunnel --url http://localhost:8000
```

---

## 📝 Script de Inicio Automático (Opcional)

Crear `start_qabot.bat`:

```batch
@echo off
cd C:\qabot
call venv\Scripts\activate.bat
python main.py
```

Para ejecutar QABot al inicio de Windows:
1. `Windows + R` → `shell:startup`
2. Crear acceso directo a `start_qabot.bat`

---

## ❌ Troubleshooting

### Error: Python not found

**Solución**:
```powershell
# Verificar instalación
where python

# Si no aparece, reinstalar Python marcando "Add to PATH"
```

### Error: pip not found

**Solución**:
```powershell
python -m ensurepip
python -m pip install --upgrade pip
```

### Error: Ollama no conecta

**Solución**:
1. Abrir Ollama desde menú inicio
2. Verificar que está corriendo:
```powershell
curl http://localhost:11434
```

### Error: Cannot connect to database

**Solución**:
1. Verificar que SQL Server está corriendo:
```powershell
Get-Service MSSQL$INFOMED
```

2. Si dice "Stopped":
```powershell
Start-Service MSSQL$INFOMED
```

---

## 🎯 Resumen - Pasos Rápidos

```
GABINETE2:
1. Instalar Python 3.10+ (con PATH)
2. Instalar Ollama + llama3.2
3. Copiar carpeta qabot
4. cd C:\qabot
5. pip install -r requirements.txt
6. python cli.py

LISTO! ✅
```

**Tiempo total**: 15-20 minutos

---

## 📞 Siguiente Paso

Una vez que QABot funcione en GABINETE2:

1. **Uso local**: Abrir navegador en GABINETE2 → `http://localhost:8000`
2. **Uso remoto**: Configurar ngrok/Cloudflare tunnel
3. **Automatización**: Script de inicio automático

**¿Necesitas ayuda con algún paso específico?**
