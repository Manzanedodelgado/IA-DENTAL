# 🚀 INSTALACIÓN DEFINITIVA - CLOUDFLARE TUNNEL

## 🎯 LO QUE VAS A TENER

- ✅ Servidor en tu PC clínica
- ✅ BD Gesden 100% LOCAL
- ✅ Acceso desde cualquier sitio via `https://gesden.tudominio.com`
- ✅ Tiempo real (< 1 segundo)
- ✅ **GRATIS** (infraestructura)
- ✅ Seguro (cifrado TLS)

---

## 📋 REQUISITOS

- PC con Gesden funcionando
- Python 3.8+
- Cuenta Cloudflare (gratis)
- Dominio (opcional, Cloudflare te da uno gratis)

---

## ⚡ INSTALACIÓN EN 4 PASOS

### PASO 1: Instalar Python y dependencias (5 min)

```powershell
# Instalar dependencias
pip install flask flask-cors pyodbc anthropic

# Verificar
python --version
# Debe mostrar: Python 3.x.x
```

---

### PASO 2: Configurar archivos (5 min)

#### 2.1 Crear carpeta:
```powershell
mkdir C:\AgenteGesden
cd C:\AgenteGesden
mkdir templates
```

#### 2.2 Descargar archivos:
- `api_server.py` → `C:\AgenteGesden\`
- `index.html` → `C:\AgenteGesden\templates\`

#### 2.3 Configurar Claude API Key:
```powershell
setx ANTHROPIC_API_KEY "sk-ant-api03-TU-KEY-AQUI"
```

Cierra y abre PowerShell.

#### 2.4 Probar servidor local:
```powershell
cd C:\AgenteGesden
python api_server.py
```

Deberías ver:
```
============================================================
🚀 AGENTE GESDEN IA - API SERVER
============================================================

🗄️  Base de datos: LOCAL (SQL Server)
🌐 Acceso: Via Cloudflare Tunnel
🤖 IA: Claude API

📍 Servidor corriendo en: http://localhost:5000
============================================================
```

Abre navegador: `http://localhost:5000`

¿Funciona? ✅ Continúa

---

### PASO 3: Instalar Cloudflare Tunnel (10 min)

#### 3.1 Descargar cloudflared:

**Windows:**
```powershell
# Opción A: Con winget
winget install Cloudflare.cloudflared

# Opción B: Descarga manual
# https://github.com/cloudflare/cloudflared/releases/latest
# Descargar cloudflared-windows-amd64.exe
# Renombrar a cloudflared.exe
# Mover a C:\Windows\System32\
```

Verificar:
```powershell
cloudflared --version
# Debe mostrar: cloudflared version 2024.x.x
```

#### 3.2 Login en Cloudflare:

```powershell
cloudflared tunnel login
```

Se abre navegador:
1. Login en Cloudflare (crea cuenta si no tienes)
2. Selecciona tu dominio (o usa el gratuito que te dan)
3. Autoriza

Verás: `You have successfully logged in`

#### 3.3 Crear túnel:

```powershell
cloudflared tunnel create gesden
```

Output:
```
Created tunnel gesden with id abc-123-xyz
Tunnel credentials written to: C:\Users\...\abc-123-xyz.json
```

**IMPORTANTE:** Copia el ID del túnel (`abc-123-xyz`)

#### 3.4 Configurar túnel:

**Crear archivo:** `C:\Users\TU_USUARIO\.cloudflared\config.yml`

```yaml
tunnel: abc-123-xyz  # TU TUNNEL ID AQUÍ
credentials-file: C:\Users\TU_USUARIO\.cloudflared\abc-123-xyz.json

ingress:
  - hostname: gesden.tudominio.com  # TU SUBDOMINIO
    service: http://localhost:5000
  - service: http_status:404
```

**Cambiar:**
- `abc-123-xyz` por tu tunnel ID
- `gesden.tudominio.com` por tu dominio/subdominio

Si no tienes dominio, Cloudflare te da uno gratis tipo: `abc-123.trycloudflare.com`

#### 3.5 Configurar DNS:

```powershell
cloudflared tunnel route dns gesden gesden.tudominio.com
```

Verás: `Added CNAME gesden.tudominio.com which will route to tunnel abc-123-xyz`

#### 3.6 Iniciar túnel:

```powershell
cloudflared tunnel run gesden
```

Verás:
```
Connection registered connIndex=0 ...
Connection registered connIndex=1 ...
```

✅ **¡TÚNEL ACTIVO!**

---

### PASO 4: Probar desde internet (2 min)

#### 4.1 Abrir navegador:
```
https://gesden.tudominio.com
```

Deberías ver la interfaz del agente ✅

#### 4.2 Probar desde móvil:

Conecta móvil a internet (4G/5G, NO WiFi clínica)
Abre: `https://gesden.tudominio.com`

✅ **¡FUNCIONA!**

---

## 🔧 CONFIGURAR INICIO AUTOMÁTICO

Para que todo se inicie al encender PC:

### Opción A: Script BAT (Simple)

**Crear:** `C:\AgenteGesden\iniciar_todo.bat`

```batch
@echo off
title Agente Gesden - Servidor

echo Iniciando servidor...
start /B python C:\AgenteGesden\api_server.py

timeout /t 5

echo Iniciando tunnel Cloudflare...
cloudflared tunnel run gesden

pause
```

**Añadir a inicio Windows:**
1. `Win + R` → `shell:startup`
2. Copiar acceso directo de `iniciar_todo.bat`

### Opción B: Servicios Windows (Profesional)

#### Servidor Python con NSSM:

```powershell
# Descargar NSSM: https://nssm.cc/download
cd C:\nssm\win64

# Instalar servicio servidor
.\nssm install GesdenServer "C:\Python310\python.exe" "C:\AgenteGesden\api_server.py"

# Configurar variable entorno
.\nssm set GesdenServer AppEnvironmentExtra ANTHROPIC_API_KEY=sk-ant-api03-...

# Iniciar
.\nssm start GesdenServer
```

#### Túnel Cloudflare como servicio:

```powershell
cloudflared service install
```

Listo - Se inicia automáticamente con Windows.

---

## ✅ VERIFICACIÓN FINAL

### 1. Servidor corriendo:
```powershell
curl http://localhost:5000/health
```

Respuesta: `{"status": "ok", ...}`

### 2. Túnel activo:
```powershell
curl https://gesden.tudominio.com/health
```

Respuesta: `{"status": "ok", ...}`

### 3. Acceso desde móvil:
Abre: `https://gesden.tudominio.com`

---

## 🎯 USO DIARIO

### Desde casa/móvil:
1. Abre: `https://gesden.tudominio.com`
2. Escribe: "busca a Juan García"
3. ¡Respuesta instantánea!

### Comandos IA:
```
busca a Juan García
citas de hoy
citas de mañana
lista de doctores
```

### Tabs disponibles:
- **Chat IA:** Lenguaje natural
- **Pacientes:** Búsqueda directa
- **Citas:** Ver agenda

---

## 💰 COSTES

| Componente | Coste |
|------------|-------|
| Cloudflare Tunnel | GRATIS |
| Servidor (tu PC) | GRATIS |
| BD Gesden Local | GRATIS |
| Claude API | ~$6/mes |
| **TOTAL** | **~$6/mes** |

---

## 🔒 SEGURIDAD

### Cloudflare proporciona:
- ✅ Cifrado TLS 1.3
- ✅ DDoS protection
- ✅ No expone IP pública
- ✅ Sin abrir puertos en router

### Tu servidor:
- ✅ Solo escucha en localhost
- ✅ Cloudflare hace proxy
- ✅ BD nunca sale de tu PC

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

### Túnel no conecta:

```powershell
# Ver logs
cloudflared tunnel info gesden

# Verificar configuración
type C:\Users\TU_USUARIO\.cloudflared\config.yml

# Reiniciar túnel
cloudflared tunnel run gesden
```

### Servidor no responde:

```powershell
# Verificar que está corriendo
netstat -an | findstr 5000

# Ver logs
type C:\AgenteGesden\api_server.log

# Reiniciar
cd C:\AgenteGesden
python api_server.py
```

### Claude API falla:

```powershell
# Verificar API key
echo %ANTHROPIC_API_KEY%

# Debe mostrar: sk-ant-api03-...

# Si no:
setx ANTHROPIC_API_KEY "sk-ant-api03-..."
```

Cierra y abre PowerShell.

---

## 📊 MONITOREO

### Ver logs en tiempo real:

**Servidor:**
```powershell
Get-Content C:\AgenteGesden\api_server.log -Wait -Tail 20
```

**Túnel:**
```powershell
cloudflared tunnel info gesden
```

---

## 🎉 ¡LISTO!

Ahora tienes:

✅ Acceso desde cualquier sitio
✅ BD 100% local
✅ Tiempo real
✅ Seguro
✅ Casi gratis ($6/mes)

---

## 📞 RESUMEN COMANDOS

```powershell
# Iniciar servidor
cd C:\AgenteGesden
python api_server.py

# Iniciar túnel
cloudflared tunnel run gesden

# Ver estado
cloudflared tunnel info gesden

# Acceder
https://gesden.tudominio.com
```

---

**¿Algún problema?** Revisa los logs y la sección de solución de problemas.

**¿Todo funciona?** 🎉 ¡Disfruta tu agente desde cualquier sitio!
