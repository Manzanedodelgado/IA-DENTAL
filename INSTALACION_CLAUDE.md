# 🚀 INSTALACIÓN COMPLETA - AGENTE GESDEN IA v5.0 CLAUDE API

## 🎯 VERSIÓN PREMIUM CON CLAUDE

La versión más inteligente y precisa del agente.

---

## 💰 COSTES

- **Por comando:** ~$0.002 (0.2 céntimos)
- **100 comandos/día:** ~$6/mes
- **500 comandos/día:** ~$30/mes

**Facturación:** Mensual, solo pagas lo que uses.

---

## 📋 REQUISITOS

### PC Servidor:
- ✅ Windows 10/11
- ✅ 8GB RAM (suficiente)
- ✅ Python 3.8+
- ✅ SQL Server con Gesden
- ✅ Conexión a Internet estable
- ✅ Cuenta en Anthropic

### PCs Clientes:
- ✅ Navegador moderno
- ✅ Conexión a la red local

---

## 🔑 PASO 1: OBTENER API KEY DE CLAUDE

### 1.1 Crear cuenta en Anthropic:

1. **Ve a:** https://console.anthropic.com/
2. **Regístrate** con tu email
3. **Verifica** tu correo
4. **Añade método de pago** (tarjeta de crédito/débito)
   - No se cobra nada hasta que uses la API
   - Mínimo de recarga: $5

### 1.2 Crear API Key:

1. En el dashboard, ve a **"API Keys"**
2. Click en **"Create Key"**
3. Dale un nombre: `Gesden_Clinica`
4. Click **"Create"**
5. **COPIA LA KEY** (solo se muestra una vez)
   - Ejemplo: `sk-ant-api03-XXX...`

### 1.3 Configurar límites (Opcional):

Para evitar sorpresas:
1. Ve a **"Settings" → "Usage Limits"**
2. Configura límite mensual: `$50` (ajusta según tu uso)

---

## 📥 PASO 2: INSTALACIÓN EN PC SERVIDOR

### 2.1 Instalar dependencias Python:

```powershell
pip install flask flask-cors pyodbc anthropic
```

**Verificar instalación:**
```powershell
python -c "import anthropic; print('OK')"
```

Debe mostrar: `OK`

---

### 2.2 Descargar archivos:

**Estructura de carpetas:**
```
C:\AgenteGesden\
├── servidor_web_claude.py
├── agente_gesden_v4.0.py
└── templates\
    └── index_claude.html
```

**Archivos necesarios:**
1. [servidor_web_claude.py](servidor_web_claude.py)
2. [agente_gesden_v4.0.py](../codigo/agente_gesden_v4.0.py)
3. [index_claude.html](templates/index_claude.html)

**Comandos:**
```powershell
# Crear carpetas
cd C:\
mkdir AgenteGesden
cd AgenteGesden
mkdir templates

# Descargar archivos y copiarlos a las carpetas
# servidor_web_claude.py → C:\AgenteGesden\
# agente_gesden_v4.0.py → C:\AgenteGesden\
# index_claude.html → C:\AgenteGesden\templates\
```

---

### 2.3 Configurar API Key:

**Opción A: Variable de entorno temporal** (para probar):
```powershell
$env:ANTHROPIC_API_KEY="sk-ant-api03-TU-KEY-AQUI"
```

**Opción B: Variable de entorno permanente** (recomendado):
```powershell
setx ANTHROPIC_API_KEY "sk-ant-api03-TU-KEY-AQUI"
```

**IMPORTANTE:** Después de usar `setx`, **cierra y abre una nueva ventana** de PowerShell.

**Verificar:**
```powershell
echo $env:ANTHROPIC_API_KEY
```

Debe mostrar tu key.

---

### 2.4 Probar conexión a Claude:

```powershell
python -c "import anthropic; import os; client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY')); print('Claude API OK')"
```

Debe mostrar: `Claude API OK`

---

## 🌐 PASO 3: CONFIGURAR RED

### 3.1 Obtener IP del servidor:

```powershell
ipconfig
```

Busca **"Dirección IPv4"**: ejemplo `192.168.1.100`

### 3.2 Configurar IP fija (Recomendado):

**Windows 10/11:**
1. Panel de Control → Redes
2. Cambiar configuración del adaptador
3. Click derecho en tu adaptador → Propiedades
4. IPv4 → Propiedades
5. **Usar la siguiente dirección IP:**
   - IP: `192.168.1.100` (la que tienes)
   - Máscara: `255.255.255.0`
   - Puerta de enlace: `192.168.1.1`
   - DNS preferido: `8.8.8.8`

---

### 3.3 Abrir puerto en Firewall:

**PowerShell como Administrador:**
```powershell
netsh advfirewall firewall add rule name="Agente Gesden Claude" dir=in action=allow protocol=TCP localport=5000
```

**O manualmente:**
1. Panel de Control → Firewall → Configuración avanzada
2. Reglas de entrada → Nueva regla
3. Tipo: Puerto
4. TCP, puerto: `5000`
5. Acción: Permitir
6. Aplicar a todos los perfiles
7. Nombre: `Agente Gesden Claude`

---

## ▶️ PASO 4: INICIAR SERVIDOR

```powershell
cd C:\AgenteGesden
python servidor_web_claude.py
```

**Salida esperada:**
```
============================================================
🌐 AGENTE GESDEN IA - SERVIDOR WEB v5.0 CLAUDE
============================================================

🚀 Inicializando agente con Claude API...
🤖 Motor IA activado con Claude API
✅ Agente iniciado correctamente

✅ Servidor listo!

🤖 Motor IA: Claude API (Anthropic)
🔑 API Key configurada: ✅ Sí

📱 Accede desde:
   • Este PC:    http://localhost:5000
   • Otros PCs:  http://192.168.1.100:5000

💰 Coste estimado: ~$0.002 por comando

🛑 Para detener: Ctrl+C
============================================================
```

✅ **¡SERVIDOR CORRIENDO!**

---

## 🖥️ PASO 5: ACCEDER DESDE NAVEGADOR

### Desde el mismo PC (servidor):
```
http://localhost:5000
```

### Desde otros PCs en la red:
```
http://192.168.1.100:5000
```
(Usa TU IP del paso 3.1)

### Desde móvil (en misma WiFi):
```
http://192.168.1.100:5000
```

---

## ✅ VERIFICACIÓN

Deberías ver:

1. **Interfaz moderna** con gradiente morado
2. **3 indicadores verdes:**
   - Servidor ✅
   - Claude API ✅
   - Base de Datos ✅
3. **Contador de comandos** (abajo derecha)
4. **Campo de texto** para escribir

**Prueba escribir:**
```
busca a Juan García
```

Si responde → **¡TODO OK!** 🎉

---

## 🔄 PASO 6: CONFIGURAR INICIO AUTOMÁTICO

Para que el servidor se inicie al encender el PC:

### 6.1 Crear script de inicio:

**Archivo:** `C:\AgenteGesden\iniciar_servidor.bat`
```batch
@echo off
title Agente Gesden IA - Servidor Claude
cd C:\AgenteGesden
python servidor_web_claude.py
pause
```

### 6.2 Añadir a inicio de Windows:

1. Presiona `Win + R`
2. Escribe: `shell:startup`
3. Copia el acceso directo de `iniciar_servidor.bat` ahí

O mejor, usar NSSM para ejecutarlo como servicio.

---

## 🛠️ CONFIGURACIÓN COMO SERVICIO (AVANZADO)

### Usando NSSM:

1. **Descargar NSSM:** https://nssm.cc/download
2. **Extraer** a `C:\nssm`
3. **Instalar servicio:**

```powershell
# PowerShell como Administrador
cd C:\nssm\win64
.\nssm install AgenteGesdenClaude

# En la ventana que abre:
# Path: C:\Python310\python.exe (tu ruta de Python)
# Startup directory: C:\AgenteGesden
# Arguments: servidor_web_claude.py

# Pestaña "Environment":
# Agregar variable: ANTHROPIC_API_KEY=sk-ant-api03-TU-KEY
```

4. **Iniciar servicio:**
```powershell
.\nssm start AgenteGesdenClaude
```

**Beneficios:**
- Se inicia automáticamente con Windows
- Se reinicia si falla
- No necesitas dejar ventana abierta

---

## 📊 MONITOREO Y LOGS

### Ver logs en tiempo real:

```powershell
Get-Content C:\AgenteGesden\agente_web.log -Wait -Tail 50
```

### Verificar uso de API:

1. Ve a: https://console.anthropic.com/
2. **"Usage"** → Ver consumo en tiempo real
3. **"Billing"** → Ver facturas

---

## 💰 OPTIMIZAR COSTES

### Consejos:

1. **Usa comandos directos** cuando sea posible
   - En lugar de IA: usa los botones rápidos
   
2. **Configura límites** en Anthropic:
   - Settings → Usage Limits → $50/mes

3. **Monitorea uso:**
   - El contador en la interfaz muestra comandos ejecutados
   - Cada comando ≈ $0.002

4. **Entrena al personal:**
   - Comandos claros = menos tokens = menos coste

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### "API Key no configurada"

**Verificar:**
```powershell
echo $env:ANTHROPIC_API_KEY
```

**Si no muestra nada:**
```powershell
setx ANTHROPIC_API_KEY "sk-ant-api03-TU-KEY"
```

Cierra y abre PowerShell.

---

### "Error: Invalid API Key"

1. Verifica que la key sea correcta
2. Ve a https://console.anthropic.com/
3. Genera una nueva key
4. Actualiza la variable de entorno

---

### "No se puede acceder desde otros PCs"

1. **Verifica firewall:**
   ```powershell
   netsh advfirewall firewall show rule name="Agente Gesden Claude"
   ```

2. **Prueba ping:**
   ```powershell
   ping 192.168.1.100
   ```

3. **Temporalmente desactiva firewall** para probar

---

### "Servidor se cierra solo"

- Ejecuta desde CMD (no PowerShell ISE)
- O usa NSSM para servicio permanente

---

### "Error de conexión a BD"

Verifica que Gesden esté corriendo y accesible:
```powershell
sqlcmd -S GABINETE2\INFOMED -d GELITE -Q "SELECT COUNT(*) FROM Pacientes"
```

---

## 📱 USO DIARIO

### Abrir agente:

**Desde cualquier PC:**
1. Abrir navegador
2. Ir a: `http://192.168.1.100:5000`
3. Escribir consulta
4. Enviar

**Comandos comunes:**
```
busca a [nombre]
citas de hoy
citas de mañana
crear cita para [nombre] el [fecha] a las [hora]
lista de doctores
cuánto debe [nombre]
```

---

## 🎓 CAPACITACIÓN DEL PERSONAL

### Cosas que pueden hacer:

1. **Buscar pacientes** por cualquier criterio
2. **Ver citas** de cualquier fecha
3. **Crear citas** con lenguaje natural
4. **Consultar deudas**
5. **Listar colaboradores**

### Tips:

- Hablar naturalmente (Claude entiende contexto)
- Usar accesos directos (botones rápidos)
- Revisar contador de coste periódicamente

---

## 📊 COMPARATIVA DE COSTES

### Uso real estimado:

| Clínica | Comandos/día | Coste/mes |
|---------|-------------|-----------|
| Pequeña (1-2 doctores) | 50 | $3 |
| Mediana (3-5 doctores) | 150 | $9 |
| Grande (6-10 doctores) | 400 | $24 |

**Muy económico** comparado con el valor que aporta.

---

## 🔒 SEGURIDAD

### Recomendaciones:

1. ✅ **API Key segura** - No la compartas
2. ✅ **Solo red local** - No expongas a internet
3. ✅ **Backups regulares** de BD
4. ✅ **Antivirus actualizado**
5. ✅ **Usuarios autorizados** solo

---

## 🆚 ¿CLAUDE vs OLLAMA?

| Aspecto | Claude (v5.0) | Ollama (v4.0 FREE) |
|---------|---------------|-------------------|
| **Coste** | ~$6/mes | Gratis |
| **Calidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Velocidad** | 1-2 seg | 2-5 seg |
| **Internet** | Necesario | NO necesario |
| **Privacidad** | Datos van a Anthropic | 100% local |
| **Mantenimiento** | Ninguno | Actualizar modelo |

**Elige Claude si:**
- Quieres máxima calidad
- $6-30/mes no es problema
- Tienes internet estable
- No te preocupa privacidad extrema

**Elige Ollama si:**
- Presupuesto $0
- Necesitas máxima privacidad
- Internet inestable
- Tienes PC potente

---

## 🎉 ¡LISTO!

Tu agente IA está funcionando con la mejor tecnología disponible.

**Disfrútalo!** 🚀

---

## 📞 SOPORTE

- Logs: `C:\AgenteGesden\agente_web.log`
- Anthropic: https://console.anthropic.com/
- Documentación Claude: https://docs.anthropic.com/

---

**Última actualización:** Noviembre 2025
