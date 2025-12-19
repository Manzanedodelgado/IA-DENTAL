# Guía de Configuración: Cloudflare Tunnel

## Objetivo

Exponer el backend Python (`api_server.py`) que corre en el PC de la clínica a internet de forma segura, para que el frontend en Vercel pueda acceder a la base de datos GELITE.

## Arquitectura

```
Frontend (Vercel)
    ↓ HTTPS
Cloudflare Tunnel
    ↓ Local
Backend Python (PC Clínica)
    ↓ Local
SQL Server GELITE
```

## Paso 1: Instalar Cloudflared

### En el PC de la clínica (Windows):

```powershell
# Descargar cloudflared
Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile "cloudflared.exe"

# Mover a ubicación permanente
Move-Item cloudflared.exe C:\cloudflared\cloudflared.exe

# Agregar al PATH
$env:Path += ";C:\cloudflared"
```

## Paso 2: Autenticar con Cloudflare

```powershell
cloudflared tunnel login
```

Esto abrirá un navegador. Inicia sesión con tu cuenta de Cloudflare (crear una gratis en cloudflare.com si no tienes).

## Paso 3: Crear el Tunnel

```powershell
# Crear tunnel
cloudflared tunnel create rubio-garcia-dental

# Esto generará un archivo de credenciales
# Ubicación: C:\Users\TuUsuario\.cloudflared\<TUNNEL-ID>.json
```

**Guardar el TUNNEL-ID que aparece en la salida.**

## Paso 4: Configurar el Tunnel

Crear archivo `C:\cloudflared\config.yml`:

```yaml
tunnel: <TUNNEL-ID>
credentials-file: C:\Users\TuUsuario\.cloudflared\<TUNNEL-ID>.json

ingress:
  # Ruta para el backend Python
  - hostname: api-dental.tudominio.com
    service: http://localhost:5000
  
  # Catch-all (requerido)
  - service: http_status:404
```

**Reemplazar**:
- `<TUNNEL-ID>` con el ID del paso 3
- `api-dental.tudominio.com` con tu subdominio deseado

## Paso 5: Configurar DNS en Cloudflare

```powershell
# Crear registro DNS
cloudflared tunnel route dns rubio-garcia-dental api-dental.tudominio.com
```

Esto crea automáticamente un registro CNAME en Cloudflare apuntando a tu tunnel.

## Paso 6: Iniciar el Tunnel

```powershell
# Iniciar tunnel
cloudflared tunnel --config C:\cloudflared\config.yml run rubio-garcia-dental
```

## Paso 7: Configurar como Servicio de Windows (Opcional pero Recomendado)

Para que el tunnel se inicie automáticamente al arrancar Windows:

```powershell
# Instalar como servicio
cloudflared service install
```

Editar el servicio para usar tu config:
1. Abrir `services.msc`
2. Buscar "Cloudflare Tunnel"
3. Propiedades → Ruta de acceso al ejecutable:
   ```
   C:\cloudflared\cloudflared.exe tunnel --config C:\cloudflared\config.yml run
   ```
4. Iniciar el servicio

## Paso 8: Configurar CORS en Backend Python

Actualizar `api_server.py`:

```python
# CORS para permitir acceso desde Vercel
ALLOWED_ORIGINS = [
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'https://app.rubiogarciadental.com',  # Tu dominio de Vercel
    'https://*.vercel.app',
]
CORS(app, origins=ALLOWED_ORIGINS, supports_credentials=True)
```

## Paso 9: Actualizar Frontend para Usar el Tunnel

Crear variable de entorno en Vercel:

```bash
NEXT_PUBLIC_API_URL=https://api-dental.tudominio.com
```

Actualizar llamadas API en frontend:

```typescript
// Antes
const response = await fetch('/api/patients')

// Después
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const response = await fetch(`${API_URL}/api/pacientes/buscar`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ busqueda: 'Garcia' })
})
```

## Paso 10: Verificar Funcionamiento

### Test local:
```powershell
# En el PC de la clínica
python api_server.py
```

### Test desde internet:
```bash
curl https://api-dental.tudominio.com/api/health
```

Debería retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-12-19T...",
  "database": "connected"
}
```

## Seguridad Adicional

### 1. Autenticación en el Tunnel

Agregar a `config.yml`:

```yaml
ingress:
  - hostname: api-dental.tudominio.com
    service: http://localhost:5000
    originRequest:
      # Solo permitir IPs de Vercel (opcional)
      ipRules:
        - allow: 76.76.21.0/24  # Ejemplo IP de Vercel
```

### 2. Rate Limiting en Cloudflare

En el dashboard de Cloudflare:
1. Security → WAF
2. Crear regla: Limitar a 100 requests/minuto por IP

### 3. HTTPS Obligatorio

Ya incluido automáticamente por Cloudflare.

## Troubleshooting

### Tunnel no conecta
```powershell
# Ver logs
cloudflared tunnel --config C:\cloudflared\config.yml run --loglevel debug
```

### Backend no responde
```powershell
# Verificar que Python esté corriendo
netstat -ano | findstr :5000
```

### Error de CORS
Verificar que `ALLOWED_ORIGINS` en `api_server.py` incluya el dominio de Vercel.

## Comandos Útiles

```powershell
# Listar tunnels
cloudflared tunnel list

# Ver info de tunnel
cloudflared tunnel info rubio-garcia-dental

# Detener tunnel
cloudflared tunnel cleanup rubio-garcia-dental

# Eliminar tunnel
cloudflared tunnel delete rubio-garcia-dental
```

## Costos

- **Cloudflare Tunnel**: GRATIS
- **Cloudflare DNS**: GRATIS
- **Cloudflare CDN**: GRATIS

No hay límites de tráfico.

## Alternativa: Ngrok (Más Simple pero Menos Estable)

Si prefieres algo más rápido para testing:

```powershell
# Instalar ngrok
choco install ngrok

# Autenticar
ngrok authtoken <tu-token>

# Exponer puerto 5000
ngrok http 5000
```

Ngrok te dará una URL tipo `https://abc123.ngrok.io` que puedes usar temporalmente.

**Desventaja**: URL cambia cada vez que reinicias (en plan gratuito).

---

**Recomendación**: Usar Cloudflare Tunnel para producción. Es gratis, estable y profesional.
