# 🖥️ GUÍA PASO A PASO: Configurar GABINETE2 para Acceso Remoto

## 📋 Resumen
Esta guía te llevará paso a paso para configurar SQL Server en GABINETE2 (Windows) para que QABot pueda conectarse remotamente desde tu Mac.

**Tiempo estimado**: 15-20 minutos

---

## ✅ PASO 1: Ejecutar Script SQL (5 min)

### 1.1 Abrir SQL Server Management Studio (SSMS)

1. En GABINETE2, presiona `Windows + S`
2. Busca "SQL Server Management Studio" o "SSMS"
3. Abre la aplicación

### 1.2 Conectar a la Base de Datos

1. En la ventana de conexión:
   - **Server name**: `GABINETE2\INFOMED`
   - **Authentication**: Windows Authentication
   - Click **Connect**

### 1.3 Ejecutar Script de Configuración

1. Click en **File** → **Open** → **File...**
2. Navega a donde guardaste `setup_sql_server.sql`
   - (Puedes copiar el archivo desde tu Mac via USB/red)
3. Con el script abierto, click en **Execute** (o presiona F5)
4. Verifica que aparezcan mensajes en verde con "✅"

**Resultado esperado**:
```
✅ Configuración completada exitosamente
============================================
Login RUBIOGARCIADENTAL: ✅
Usuario en GELITE: ✅
Tabla REPORTES_QA: ✅
Permisos asignados: ✅
```

---

## ✅ PASO 2: Habilitar TCP/IP en SQL Server (5 min)

### 2.1 Abrir SQL Server Configuration Manager

1. Presiona `Windows + S`
2. Busca "SQL Server Configuration Manager"
3. Abre la aplicación
   - Si no aparece, busca en: `C:\Windows\SysWOW64\SQLServerManager15.msc`

### 2.2 Habilitar TCP/IP

1. En el panel izquierdo, expande:
   ```
   SQL Server Network Configuration
      └── Protocols for INFOMED
   ```

2. En el panel derecho, encuentra **TCP/IP**

3. Click derecho en **TCP/IP** → **Properties**

4. En la pestaña **Protocol**:
   - Cambiar **Enabled** a **Yes**

5. Ir a la pestaña **IP Addresses**

6. Bajar hasta la sección **IPAll** (al final)

7. Configurar:
   - **TCP Dynamic Ports**: (dejar vacío)
   - **TCP Port**: `1433`

8. Click **OK**

### 2.3 Reiniciar SQL Server

1. En Configuration Manager, panel izquierdo:
   ```
   SQL Server Services
      └── SQL Server (INFOMED)
   ```

2. Click derecho en **SQL Server (INFOMED)** → **Restart**

3. Esperar a que el servicio se reinicie (ícono verde)

**Verificación**:
- El servicio debe mostrar un ícono verde ▶️ (Running)

---

## ✅ PASO 3: Configurar Firewall de Windows (3 min)

### Opción A: Windows Defender Firewall (GUI)

1. Presiona `Windows + S`
2. Busca "Windows Defender Firewall"
3. Click en **Advanced Settings** (panel izquierdo)

4. Click en **Inbound Rules** (panel izquierdo)

5. Click en **New Rule...** (panel derecho)

6. Wizard de nueva regla:
   - **Rule Type**: Port → Next
   - **Protocol**: TCP
   - **Specific local ports**: `1433` → Next
   - **Action**: Allow the connection → Next
   - **Profile**: Marcar todo (Domain, Private, Public) → Next
   - **Name**: `SQL Server Remote Access` → Finish

### Opción B: PowerShell (Más rápido)

1. Click derecho en **Start Menu** → **Windows PowerShell (Admin)**

2. Ejecutar:
```powershell
New-NetFirewallRule -DisplayName "SQL Server Remote Access" -Direction Inbound -LocalPort 1433 -Protocol TCP -Action Allow
```

**Resultado esperado**:
```
Name                  : SQL Server Remote Access
DisplayName           : SQL Server Remote Access
...
Enabled               : True
```

**Verificación**:
1. En Windows Defender Firewall > Inbound Rules
2. Buscar "SQL Server Remote Access"
3. Debe aparecer con ícono verde ✅

---

## ✅ PASO 4: Obtener IP de GABINETE2 (1 min)

### 4.1 Obtener Dirección IP

1. Presiona `Windows + R`
2. Escribe `cmd` y presiona Enter
3. En la ventana negra, escribe:
```cmd
ipconfig
```

4. Busca la sección de tu adaptador de red (Ethernet o WiFi)

5. Anota la **IPv4 Address**
   - Ejemplo: `192.168.1.100`

**IMPORTANTE**: Apunta esta IP, la necesitarás en tu Mac

### 4.2 Verificar Conectividad de Red

Desde el mismo CMD:
```cmd
ping 192.168.1.100
```
(Reemplaza con tu IP real)

**Debe responder**:
```
Reply from 192.168.1.100: bytes=32 time<1ms TTL=128
```

---

## ✅ PASO 5: Test de Conectividad SQL (Opcional pero Recomendado)

### 5.1 Desde GABINETE2

1. Abrir SSMS
2. Click en **Connect** → **Database Engine**
3. En **Server name**, escribir:
   ```
   192.168.1.100\INFOMED
   ```
   (Usar tu IP real)

4. **Authentication**: SQL Server Authentication
   - Login: `RUBIOGARCIADENTAL`
   - Password: `6666666`

5. Click **Connect**

**Si conecta**: ✅ ¡Perfecto! SQL Server está configurado correctamente

**Si NO conecta**: Revisar pasos anteriores

---

## 📝 CHECKLIST FINAL

Antes de intentar conectar desde tu Mac, verifica:

- [ ] ✅ Script `setup_sql_server.sql` ejecutado exitosamente
- [ ] ✅ TCP/IP habilitado en SQL Server Configuration Manager
- [ ] ✅ Puerto 1433 configurado en IPAll
- [ ] ✅ Servicio SQL Server (INFOMED) reiniciado
- [ ] ✅ Regla de firewall creada para puerto 1433
- [ ] ✅ IP de GABINETE2 anotada: `___.___.___.___`
- [ ] ✅ Test de conexión local exitoso (opcional)

---

## 🔄 VOLVER A TU MAC

Una vez completados todos los pasos en GABINETE2:

1. **Actualiza config.py en tu Mac**:
   ```python
   # Editar: /Users/.../qabot/config.py
   DB_SERVER: str = "192.168.1.100\\INFOMED"  # TU IP AQUÍ
   ```

2. **Ejecuta el test de conectividad**:
   ```bash
   cd /Users/juanantoniomanzanedodelgado/Desktop/AGENTE\ IA/qabot
   ./test_connectivity.sh
   ```

3. **Si todo OK, ejecuta QABot**:
   ```bash
   python3 cli.py
   # Selecciona opción 1: Test Connectivity
   ```

---

## ❌ TROUBLESHOOTING

### Error: "Cannot connect to 192.168.1.X\INFOMED"

**Soluciones**:
1. Verificar que ambos equipos estén en la misma red
2. Ping desde Mac: `ping 192.168.1.X`
3. Verificar firewall en GABINETE2
4. Verificar que SQL Server esté corriendo

### Error: "Login failed for user 'RUBIOGARCIADENTAL'"

**Soluciones**:
1. Re-ejecutar `setup_sql_server.sql`
2. Verificar password en script y config.py

### Error: "A network-related error occurred"

**Soluciones**:
1. Verificar TCP/IP habilitado
2. Verificar puerto 1433 en Configuration Manager
3. Reiniciar servicio SQL Server

---

## 📞 RESUMEN DE CREDENCIALES

Para referencia rápida:

```
Servidor: GABINETE2\INFOMED
o bien:   192.168.1.XXX\INFOMED  (IP que anotaste)

Base de datos: GELITE
Usuario: RUBIOGARCIADENTAL
Password: 6666666

Puerto SQL: 1433
```

---

**¡Todo listo!** Una vez que completes estos pasos en GABINETE2, podrás conectar QABot desde tu Mac y empezar a usar todas las funcionalidades de análisis y QA.
