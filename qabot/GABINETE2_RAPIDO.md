# 🚀 GUÍA RÁPIDA - Configurar GABINETE2 SIN Configuration Manager

## ✅ Solución: Script PowerShell Automático

Ya que NO tienes SQL Server Configuration Manager, usa este **script automático**.

---

## 📋 Pasos Sencillos

### 1️⃣ Copiar Script a GABINETE2

Opciones:
- **USB**: Copia `enable_remote_access.ps1` desde tu Mac a GABINETE2
- **Email**: Envíatelo por email y ábrelo en GABINETE2
- **Red**: Copia via red compartida

### 2️⃣ Ejecutar Script

**En GABINETE2**:

1. **Click derecho** en el archivo `enable_remote_access.ps1`
2. Seleccionar **"Ejecutar con PowerShell"**
3. Si aparece error de permisos, hacer esto:
   - Click derecho en **Start Menu**
   - **Windows PowerShell (Admin)** 
   - Ejecutar:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   cd ruta\donde\esta\el\script
   .\enable_remote_access.ps1
   ```

### 3️⃣ Qué Hace el Script Automáticamente

✅ Habilita TCP/IP en SQL Server (via registro)
✅ Configura puerto 1433
✅ Crea regla de firewall
✅ Reinicia SQL Server
✅ Muestra tu IP

**Tiempo**: ~30 segundos

---

## 📝 Después del Script

El script te mostrará algo como:

```
📡 Direcciones IP disponibles:
  • 192.168.1.100 (Ethernet)
  • 192.168.50.1 (WiFi)

✅ Configuración completada
```

**Apunta la IP** (probablemente la de Ethernet)

---

## 🖥️ Volver a tu Mac

1. **Edita** `config.py`:
   ```python
   DB_SERVER: str = "192.168.1.100\\INFOMED"  # TU IP AQUÍ
   ```

2. **Test de conectividad**:
   ```bash
   cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot
   ./test_connectivity.sh
   ```

3. **Ejecutar QABot**:
   ```bash
   python3 cli.py
   # Opción 1: Test Connectivity
   ```

---

## ❌ Si el Script Falla

**Método Manual Alternativo**:

### A. Habilitar Firewall (Manual)
```powershell
# Como Administrador:
New-NetFirewallRule -DisplayName "SQL Server" -Direction Inbound -LocalPort 1433 -Protocol TCP -Action Allow
```

### B. Reiniciar SQL Server (Manual)
1. Presiona `Windows + R`
2. Escribe `services.msc` y Enter
3. Busca **SQL Server (INFOMED)**
4. Click derecho → **Restart**

### C. Obtener IP (Manual)
```cmd
ipconfig
```
Buscar **IPv4 Address** en Ethernet adapter

---

## 🎯 Resumen Ultra-Rápido

```
GABINETE2:
1. Ejecutar: enable_remote_access.ps1 (como Admin)
2. Apuntar IP mostrada

MAC:
1. Editar config.py con la IP
2. Ejecutar: ./test_connectivity.sh
3. Ejecutar: python3 cli.py
```

**Tiempo total**: 5-10 minutos

---

**¿Listo para ejecutar el script en GABINETE2?**
