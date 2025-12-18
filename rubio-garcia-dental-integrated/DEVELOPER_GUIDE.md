# 📘 Guía de Desarrollo - RubioGarciaDental App

Esta guía documenta la arquitectura, patrones de diseño y convenciones de código para desarrolladores que trabajen en la aplicación.

---

## 🎨 Sistema de Diseño

### Paleta de Colores Corporativos

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `brand-dark` | `#1D1160` | Fondos oscuros, textos principales, sidebar |
| `brand-blue` | `#3340D3` | Color primario, botones de acción, gráficos |
| `brand-cyan` | `#00C6CC` | Acentos, bordes activos, hover states |
| `brand-lime` | `#CFF214` | Notificaciones, estados "Online", IA, contraste alto |
| `brand-bg` | `#f5f7fa` | Fondo general de la aplicación |

### Uso en Tailwind

```jsx
// Fondos
<div className="bg-brand-dark">...</div>
<div className="bg-brand-bg">...</div>

// Textos
<p className="text-brand-blue">...</p>

// Gradientes
<div className="bg-gradient-to-br from-brand-blue to-brand-cyan">...</div>
<div className="bg-gradient-to-b from-brand-dark to-[#2a1a7a]">...</div>

// Sombras con glow
<button className="shadow-lg shadow-brand-blue/40">...</button>
```

### Tipografía

- **Fuente**: `Inter` (Google Fonts)
- **Pesos utilizados**:
  - 300 (Light): Subtítulos finos
  - 400 (Regular): Texto cuerpo
  - 500 (Medium): Metadatos
  - 600 (SemiBold): Botones, pestañas
  - 700 (Bold): Encabezados, KPIs

```jsx
<h1 className="font-bold text-2xl">...</h1>
<p className="font-medium text-sm">...</p>
<span className="font-semibold">...</span>
```

### Bordes Redondeados

- Contenedores principales: `rounded-2xl` o `rounded-3xl` (~24px)
- Botones/Inputs: `rounded-xl` (~12px)
- Avatares: `rounded-full`

### Sombras

```jsx
// Sidebar
className="shadow-[6px_0_24px_rgba(29,17,96,0.2)]"

// Botones activos (glow azul)
className="shadow-lg shadow-brand-blue/40"

// Tarjetas
className="shadow-sm hover:shadow-md transition-shadow"

// Modales
className="shadow-2xl"
```

### Animaciones

```jsx
// Fade in (0.5s)
className="animate-fade-in"

// Slide up (0.3s)
className="animate-slide-up"

// Glow pulsante (2s loop)
className="animate-pulse-glow"

// Spinner de carga
<RefreshCw className="animate-spin" />
```

---

## 🏗️ Arquitectura de Componentes

### Estructura de Carpetas

```
src/
├── App.tsx              # Router principal, estado global
├── index.tsx            # Entry point
├── index.css            # Estilos globales, scrollbars
├── types.ts             # Todas las interfaces TypeScript
├── constants.ts         # Datos mock, configuraciones
├── components/
│   ├── Layout.tsx       # Shell: Sidebar + Header + Main
│   ├── Login.tsx        # Pantalla de acceso
│   ├── Dashboard.tsx    # Panel de control
│   ├── Agenda.tsx       # Calendario de citas
│   ├── Patients.tsx     # Ficha de pacientes
│   ├── Communication.tsx # Chat estilo WhatsApp
│   ├── Documents.tsx    # Gestor de documentos
│   ├── Management.tsx   # Gestión y facturación
│   ├── Alveolo.tsx      # Universo IA
│   ├── AlveoloFloatChat.tsx # Chat flotante
│   └── Config.tsx       # Configuración (solo admin)
└── services/
    ├── databaseService.ts   # Conexión a backend/SQL
    └── alveoloService.ts    # API de IA
```

### Componente Layout (Shell)

El `Layout.tsx` envuelve todas las vistas y proporciona:
- **Sidebar** (85px fijo): Navegación con iconos, logo, avatar usuario
- **Header** (56px): Fecha, búsqueda, notificaciones
- **Main** (`flex-1`): Área de contenido con scroll independiente

```jsx
<Layout user={currentUser} currentView={...} onNavigate={...}>
  {/* Vista actual */}
</Layout>
```

### Patrón de Navegación

```typescript
type ViewState = 
  | 'dashboard' | 'agenda' | 'patients' 
  | 'communication' | 'management' | 'alveolo' 
  | 'config' | 'documents';

// En App.tsx
const [currentView, setCurrentView] = useState<ViewState>('dashboard');

// Navegación
<NavItem onClick={() => setCurrentView('agenda')} />
```

---

## 📦 Tipos de Datos Principales

```typescript
// Usuario
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// Cita
interface Appointment {
  id: number;
  date: string;
  time: string;
  durationMinutes: number;
  patientName: string;
  doctor: string;
  treatment: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

// Paciente
interface Patient {
  id: string;
  name: string;
  dni: string;
  recordNumber: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

// Chat
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'patient' | 'assistant';
  text: string;
  timestamp: Date;
}
```

---

## 🎯 Patrones de Código

### Estados de Carga

```jsx
const [loading, setLoading] = useState(true);

if (loading) {
  return (
    <div className="h-full flex items-center justify-center">
      <RefreshCw className="animate-spin text-brand-cyan" size={40} />
    </div>
  );
}
```

### Modales

```jsx
{showModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-in">
      {/* Contenido */}
      <button onClick={() => setShowModal(false)}>
        <X size={20} />
      </button>
    </div>
  </div>
)}
```

### Pestañas (Tabs)

```jsx
const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');

<div className="flex gap-1 border-b">
  {['tab1', 'tab2'].map(tab => (
    <button 
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-3 text-sm font-bold ${
        activeTab === tab 
          ? 'bg-white text-brand-blue border-t border-x rounded-t-lg' 
          : 'text-gray-500'
      }`}
    >
      {tab}
    </button>
  ))}
</div>
```

### Fetch de Datos

```jsx
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await databaseService.getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

---

## 🔌 Servicios

### databaseService

Conecta con el backend para operaciones CRUD:

```typescript
// Pacientes
databaseService.getPatients()
databaseService.getPatientTreatments(patientId)
databaseService.getPatientBudgets(patientId)

// Citas
databaseService.getAppointments(date)
databaseService.createAppointment(data)
databaseService.updateAppointment(id, data)
databaseService.deleteAppointment(id)
```

### alveoloService

API para el asistente IA:

```typescript
// Chat admin (consultas SQL)
alveoloAdminQuery(prompt, systemConfig)

// Chat paciente
alveoloPatientChat(message, patientContext)
```

---

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build producción
npm run build

# Preview build
npm run preview
```

---

## 📋 Checklist para Nuevos Componentes

- [ ] Importar iconos de `lucide-react`
- [ ] Usar tipos de `../types`
- [ ] Aplicar animación `animate-fade-in` al contenedor principal
- [ ] Usar tarjetas con `bg-white rounded-2xl border border-gray-200 shadow-sm`
- [ ] Encabezados con `font-bold text-brand-dark`
- [ ] Botones primarios con gradiente `from-brand-blue to-brand-cyan`
- [ ] Estados de loading con spinner
- [ ] Mensajes vacíos con icono grande semitransparente

---

## 🔐 Control de Acceso

```jsx
// Mostrar solo a admins
{user.role === 'admin' && (
  <NavItem label="Configuración" ... />
)}
```

---

© 2025 Rubio García Dental + Alveolo IA
