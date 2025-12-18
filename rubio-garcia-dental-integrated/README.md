# Rubio García Dental + Alveolo IA

Sistema de Gestión Integral para Clínica Dental con Inteligencia Artificial.

## 🚀 Características

- **Dashboard** con estadísticas en tiempo real desde GELITE
- **Agenda** visual con gestión de citas
- **Pacientes** con ficha completa y historial clínico
- **Comunicación** WhatsApp con respuesta automática IA
- **Alveolo IA** - Asistente inteligente con dos modos:
  - **Modo Administrador**: Consultas SQL en lenguaje natural
  - **Modo Paciente**: Chat amable sin acceso a datos sensibles
- **Chat Flotante** para acceso rápido del administrador
- **Auto-Reflexión** del sistema para mejora continua

## 📁 Estructura

```
rubio-garcia-dental-integrated/
├── server.js           # Backend Express + mssql para GELITE
├── src/
│   ├── App.tsx         # Aplicación principal
│   ├── components/     # Componentes React
│   │   ├── Alveolo.tsx           # Panel completo de IA
│   │   ├── AlveoloFloatChat.tsx  # Chat popup flotante
│   │   ├── Dashboard.tsx
│   │   ├── Agenda.tsx
│   │   ├── Patients.tsx
│   │   └── Communication.tsx
│   └── services/
│       ├── databaseService.ts    # Conexión a API/GELITE
│       └── alveoloService.ts     # Gemini + SQL Generation
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo .env con tu API Key de Gemini
cp .env.example .env
# Editar .env y añadir tu VITE_API_KEY

# Iniciar todo (Backend + Frontend)
npm run start:all
```

## 🔧 Configuración

### Base de Datos
Edita `server.js` para configurar la conexión a tu SQL Server:
```javascript
const dbConfig = {
  user: 'TU_USUARIO',
  password: 'TU_PASSWORD',
  server: 'TU_SERVIDOR',
  database: 'GELITE',
  options: {
    instanceName: 'INFOMED'
  }
};
```

### API Key Gemini
Añade tu API Key en el archivo `.env`:
```
VITE_API_KEY=tu_api_key_de_gemini
```

## 🎯 Uso

1. **Login**: JMD / 190582 (Admin)
2. **Dashboard**: Vista general con stats de GELITE
3. **Alveolo (Sidebar)**: Chat completo con modos Admin/Paciente
4. **Chat Flotante**: Botón "Alveolo Admin" en esquina inferior derecha

## 📡 Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/health | Estado de conexión a BD |
| POST | /api/query | Ejecutar SQL (solo SELECT) |
| GET | /api/appointments/:date | Citas del día |
| GET | /api/patients | Lista de pacientes |
| GET | /api/patients/:id | Ficha de paciente |
| GET | /api/stats/dashboard | Estadísticas |

## 🤖 Alveolo IA

### Ejemplos de consultas (Modo Admin):
- "¿Cuántos pacientes tenemos registrados?"
- "Muéstrame las citas de mañana"
- "Busca pacientes con apellido García"
- "¿Cuáles son los tratamientos más realizados?"

### Modo Paciente:
Simula cómo respondería Alveolo a un paciente real, sin revelar información de base de datos.

---

© 2025 Rubio García Dental + Alveolo IA
