# Guía de Configuración Remota - QABot desde Mac

## 🎯 Objetivo
Ejecutar QABot en tu Mac y conectarlo a GELITE en GABINETE2 remotamente.

---

## ✅ Pre-requisitos en tu Mac

### 1. Ollama Instalado y Corriendo
```bash
# Verificar que Ollama está instalado
which ollama

# Iniciar Ollama
ollama serve

# En otra terminal, verificar que el modelo está descargado
ollama list

# Si no está, descargar
ollama pull llama3
```

### 2. Python 3.10+
```bash
python3 --version
# Debe ser >= 3.10
```

---

## 🔧 Configuración en GABINETE2 (Windows)

### Paso 1: Habilitar SQL Server para Conexiones Remotas

**Opción A: SQL Server Configuration Manager**

1. Abrir **SQL Server Configuration Manager**
2. Navegar a: `SQL Server Network Configuration` → `Protocols for INFOMED`
3. Click derecho en **TCP/IP** → **Enable**
4. Click derecho en **TCP/IP** → **Properties**
5. En la pestaña **IP Addresses**, bajar hasta **IPAll**:
   - `TCP Dynamic Ports`: (dejar vacío)
   - `TCP Port`: **1433**
6. Reiniciar servicio SQL Server:
   ```
   Services → SQL Server (INFOMED) → Restart
   ```

**Opción B: Script SQL (ejecutar en SSMS)**

```sql
-- Verificar que el login existe
USE master;
GO

-- Si no existe, crear
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'RUBIOGARCIADENTAL')
BEGIN
    CREATE LOGIN RUBIOGARCIADENTAL WITH PASSWORD = '6666666';
END
GO

-- Dar permisos en GELITE
USE GELITE;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'RUBIOGARCIADENTAL')
BEGIN
    CREATE USER RUBIOGARCIADENTAL FOR LOGIN RUBIOGARCIADENTAL;
END
GO

-- Permisos de lectura (para QA/Analytics)
ALTER ROLE db_datareader ADD MEMBER RUBIOGARCIADENTAL;

-- Permiso para escribir reportes
GRANT INSERT ON REPORTES_QA TO RUBIOGARCIADENTAL;
GRANT SELECT ON REPORTES_QA TO RUBIOGARCIADENTAL;
GO

-- Verificar
SELECT 
    dp.name as UserName,
    dp.type_desc,
    dp.create_date
FROM sys.database_principals dp
WHERE dp.name = 'RUBIOGARCIADENTAL';
```

### Paso 2: Configurar Firewall de Windows

**Método GUI:**
1. Abrir **Windows Defender Firewall** → **Advanced Settings**
2. Click en **Inbound Rules** → **New Rule**
3. Seleccionar **Port** → Next
4. **TCP**, puerto **1433** → Next
5. **Allow the connection** → Next
6. Marcar todas las opciones (Domain, Private, Public) → Next
7. Nombre: "SQL Server Remote Access" → Finish

**Método PowerShell (como Administrador):**
```powershell
# Permitir SQL Server en firewall
New-NetFirewallRule -DisplayName "SQL Server" -Direction Inbound -LocalPort 1433 -Protocol TCP -Action Allow
```

### Paso 3: Obtener IP de GABINETE2

```cmd
ipconfig

# Buscar la IPv4 Address de tu red local
# Ejemplo: 192.168.1.100
```

---

## 🖥️ Configuración en tu Mac

### Paso 1: Actualizar Configuración de QABot

Editar `/Users/juanantoniomanzanedodelgado/Desktop/AGENTE IA/qabot/config.py`:

```python
# === CAPA 1: NÚCLEO LOCAL ===

# Database (GELITE @ GABINETE2) - CONEXIÓN REMOTA
DB_SERVER: str = "192.168.1.100\\INFOMED"  # ← Cambiar por IP real de GABINETE2
DB_NAME: str = "GELITE"
DB_USER: str = "RUBIOGARCIADENTAL"
DB_PASSWORD: str = "6666666"
DB_DRIVER: str = "{ODBC Driver 18 for SQL Server}"  # ← Cambiar a v18
```

### Paso 2: Instalar ODBC Driver para SQL Server

```bash
# macOS - Homebrew
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
brew install msodbcsql18 mssql-tools18

# Verificar instalación
odbcinst -q -d
# Debe mostrar: [ODBC Driver 18 for SQL Server]
```

### Paso 3: Crear archivo .env

```bash
cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot

# Crear .env
cat > .env << 'EOF'
# Database - Conexión Remota
DB_SERVER=192.168.1.100\INFOMED
DB_NAME=GELITE
DB_USER=RUBIOGARCIADENTAL
DB_PASSWORD=6666666
DB_DRIVER={ODBC Driver 18 for SQL Server}

# LLM Local
LLM_MODEL=llama3
LLM_BASE_URL=http://localhost:11434

# API
API_SECRET_KEY=tu-secret-key-super-segura-aqui
EOF
```

**⚠️ IMPORTANTE**: Reemplaza `192.168.1.100` con la IP real de GABINETE2

### Paso 4: Instalar Dependencias Python

```bash
cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot

# Instalar
pip3 install -r requirements.txt

# Verificar instalación crítica
python3 -c "import pyodbc; print(pyodbc.drivers())"
# Debe incluir: ODBC Driver 18 for SQL Server
```

---

## 🧪 Testing de Conectividad

### Test 1: Verificar Red

```bash
# Ping a GABINETE2
ping 192.168.1.100  # Cambiar por IP real

# Si no responde, verificar:
# - Ambos equipos en misma red/VPN
# - Firewall de GABINETE2 permite ping
```

### Test 2: Verificar Puerto SQL Server

```bash
# Instalar telnet si no está
brew install telnet

# Test conexión SQL
telnet 192.168.1.100 1433

# Si conecta: mostrará "Connected to..."
# Si no: "Connection refused" → revisar firewall/SQL Server
```

### Test 3: Probar Conexión desde Python

```bash
cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot

# Script de test
python3 << 'EOF'
from core.database import db

print("🔍 Testing database connection...")

if db.test_connection():
    print("✅ Connection successful!")
    
    # Test query
    result = db.execute_scalar("SELECT COUNT(*) FROM Pacientes")
    print(f"✅ Found {result} patients in database")
else:
    print("❌ Connection failed")
    print("Check:")
    print("- GABINETE2 IP address")
    print("- SQL Server running")
    print("- Firewall rules")
    print("- Login credentials")
EOF
```

### Test 4: Probar LLM Local

```bash
# En otra terminal, asegurar que Ollama está corriendo
ollama serve

# Test LLM
python3 << 'EOF'
from core.llm_client import llm

print("🔍 Testing LLM connection...")

response = llm.generate("Di 'Hola'", temperature=0.1)
print(f"✅ LLM Response: {response}")
EOF
```

---

## 🚀 Ejecutar QABot

### Opción 1: CLI Interactivo

```bash
cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot
python3 cli.py
```

Opciones del menú:
1. **Test Connectivity** ← Empezar por aquí
2. Run Integrity Check
3. Natural Language Query
4. Exit

### Opción 2: API Server

```bash
cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot
python3 main.py
```

Luego abrir en navegador:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

---

## ❌ Troubleshooting

### Error: "Can't open lib 'ODBC Driver 18 for SQL Server'"

**Solución**:
```bash
# Verificar drivers instalados
odbcinst -q -d

# Si no aparece Driver 18, instalar:
brew reinstall msodbcsql18
```

### Error: "Login failed for user 'RUBIOGARCIADENTAL'"

**Solución**:
1. Verificar en GABINETE2 que el login existe:
```sql
SELECT * FROM sys.server_principals WHERE name = 'RUBIOGARCIADENTAL';
```

2. Verificar permisos en GELITE:
```sql
USE GELITE;
SELECT * FROM sys.database_principals WHERE name = 'RUBIOGARCIADENTAL';
```

### Error: "Unable to connect: [Errno 61] Connection refused"

**Solución**:
1. Verificar IP de GABINETE2: `ipconfig` en Windows
2. Verificar firewall: puerto 1433 abierto
3. Verificar SQL Server corriendo: Services → SQL Server (INFOMED)
4. Probar telnet: `telnet IP_GABINETE2 1433`

### Error: "SSL Provider: The certificate chain was issued by..."

**Solución**: Actualizar config.py para confiar en certificado:
```python
def get_connection_string() -> str:
    return (
        f"DRIVER={settings.DB_DRIVER};"
        f"SERVER={settings.DB_SERVER};"
        f"DATABASE={settings.DB_NAME};"
        f"UID={settings.DB_USER};"
        f"PWD={settings.DB_PASSWORD};"
        f"TrustServerCertificate=yes;"  # ← Ya está
        f"Encrypt=yes;"
    )
```

---

## 📋 Checklist Final

- [ ] Ollama corriendo en Mac: `ollama serve`
- [ ] Modelo descargado: `ollama list` muestra llama3
- [ ] SQL Server acepta conexiones remotas (TCP/IP enabled)
- [ ] Firewall Windows permite puerto 1433
- [ ] Login RUBIOGARCIADENTAL existe y tiene permisos
- [ ] IP de GABINETE2 correcta en config.py
- [ ] ODBC Driver 18 instalado en Mac
- [ ] Dependencias Python instaladas: `pip3 install -r requirements.txt`
- [ ] Test de conectividad pasado

---

## 🎯 Siguiente Paso

Una vez que todo funcione remotamente, puedes:
1. Probar todas las funcionalidades
2. Ajustar queries según necesidades
3. Cuando estés listo, mover todo a GABINETE2 para producción

**¿Listo para empezar?** Ejecuta los tests en orden y avísame si encuentras algún error.
