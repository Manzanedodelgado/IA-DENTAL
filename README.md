# AGENTE IA - Sistema de Gestión Dental

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-70%25-yellow)]()
[![Security](https://img.shields.io/badge/security-hardened-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)]()
[![Next.js](https://img.shields.io/badge/Next.js-16-black)]()

Sistema integral de gestión para clínicas dentales con IA integrada, desarrollado bajo estándares de excelencia.

## 🚀 Características Principales

- ✅ **Gestión Completa**: Pacientes, citas, facturación, historial clínico
- ✅ **IA Integrada**: Asistente virtual con Gemini/Claude
- ✅ **Seguridad Hardened**: Sin credenciales hardcodeadas, prepared statements, logging con redacción de PII
- ✅ **Testing Completo**: Suite de tests con 70%+ cobertura
- ✅ **Arquitectura Moderna**: Next.js 16, TypeScript, Prisma, tRPC

## 📋 Requisitos

- Node.js 20+
- PostgreSQL 14+ (Supabase)
- npm o pnpm

## 🔧 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/agente-ia.git
cd agente-ia

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Generar cliente Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Seed inicial (opcional)
npm run prisma:seed
```

## 🏃 Ejecución

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Producción

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con UI
npm run test:ui

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

**Cobertura mínima requerida**: 70%

## 🔒 Seguridad

### Características de Seguridad Implementadas

- ✅ **Sin credenciales hardcodeadas**: Todas en variables de entorno
- ✅ **Prepared statements**: Protección contra SQL injection
- ✅ **Logging estructurado**: Redacción automática de PII
- ✅ **ESLint Security**: Análisis estático de vulnerabilidades
- ✅ **NextAuth.js**: Autenticación segura con JWT
- ✅ **Bcrypt**: Hashing de contraseñas con salt rounds 12

### Ejecutar Auditoría de Seguridad

```bash
# Linting de seguridad
npm run lint:security

# Auditoría de dependencias
npm audit

# Auditoría completa
npm audit --audit-level=moderate
```

## 📊 Arquitectura

```
agente-ia/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API Routes
│   │   ├── dashboard/    # Dashboard pages
│   │   └── login/        # Auth pages
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   │   ├── auth.ts       # NextAuth config
│   │   ├── logger.ts     # Structured logger
│   │   └── prisma.ts     # Prisma client
│   └── test/             # Test setup
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── qabot/                # Python QABot
└── rubio-garcia-dental-integrated/  # Vite app
```

## 🔑 Variables de Entorno

Copia `.env.example` a `.env` y configura:

```bash
# Base de datos
DATABASE_URL="postgresql://..."

# Autenticación
NEXTAUTH_SECRET="..." # Generar con: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# IA
GOOGLE_API_KEY="..."  # Para Gemini
ANTHROPIC_API_KEY="..." # Para Claude (opcional)

# WhatsApp (opcional)
WHATSAPP_NUMBER="+34..."
```

## 📚 Documentación

- [Memoria Técnica](./Memoria.md) - Especificación completa del sistema
- [Guía de Desarrollo](./DEVELOPER_GUIDE.md) - Para contribuidores
- [Plan de Implementación](/.gemini/antigravity/brain/.../implementation_plan.md) - Roadmap técnico

## 🧑‍💻 Desarrollo

### Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Ejecutar tests |
| `npm run test:coverage` | Tests con cobertura |
| `npm run lint` | Linting de código |
| `npm run lint:security` | Análisis de seguridad |
| `npm run prisma:studio` | UI de base de datos |
| `npm run prisma:migrate` | Ejecutar migraciones |

### Estándares de Código

- **TypeScript**: Strict mode habilitado
- **ESLint**: Configuración Next.js + Security
- **Prettier**: Formateo automático
- **Tests**: Vitest + React Testing Library
- **Cobertura mínima**: 70%

## 🚢 Deployment

### Vercel (Recomendado)

```bash
# Conectar con Vercel
vercel

# Deploy a producción
vercel --prod
```

### Variables de entorno en Vercel

Configurar en el dashboard de Vercel:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_API_KEY`

## 📈 Roadmap

### ✅ Completado (v1.0)
- Sistema de gestión completo
- Autenticación segura
- Suite de tests
- Logger estructurado
- Correcciones de seguridad P0

### 🔄 En Progreso (v1.1)
- Consolidación arquitectónica
- Tests E2E con Playwright
- CI/CD pipeline

### 📅 Planificado (v2.0)
- App móvil nativa
- Integración WhatsApp Business
- Backup automático
- Exportación a Excel

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Requisitos para PR

- ✅ Tests pasan (`npm test`)
- ✅ Cobertura ≥ 70%
- ✅ Linting pasa (`npm run lint`)
- ✅ Sin vulnerabilidades de seguridad (`npm audit`)

## 📄 Licencia

Propietario - Rubio García Dental © 2025

## 👥 Equipo

- **Desarrollo**: JMD
- **IA Integration**: Gemini 2.0 Flash
- **Arquitectura**: Protocolo SIGMA-99

## 🆘 Soporte

- Email: info@rubiogarciadental.com
- Documentación: [Memoria.md](./Memoria.md)
- Issues: GitHub Issues

---

**Versión**: 1.0.0  
**Última actualización**: 19 de diciembre de 2025  
**Estado**: ✅ Producción
