# Guía de Desarrollo - AGENTE IA

## Tabla de Contenidos

1. [Configuración del Entorno](#configuración-del-entorno)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Estándares de Código](#estándares-de-código)
4. [Testing](#testing)
5. [Seguridad](#seguridad)
6. [Base de Datos](#base-de-datos)
7. [API](#api)
8. [Deployment](#deployment)

## Configuración del Entorno

### Requisitos Previos

- Node.js 20+
- PostgreSQL 14+
- Git
- Editor con soporte TypeScript (VSCode recomendado)

### Setup Inicial

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/agente-ia.git
cd agente-ia

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Generar Prisma Client
npm run prisma:generate

# 5. Ejecutar migraciones
npm run prisma:migrate

# 6. Seed de datos iniciales
npm run prisma:seed

# 7. Iniciar desarrollo
npm run dev
```

### Extensiones VSCode Recomendadas

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "vitest.explorer"
  ]
}
```

## Arquitectura del Proyecto

### Estructura de Directorios

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   │   ├── auth/           # Autenticación
│   │   ├── patients/       # Pacientes
│   │   ├── appointments/   # Citas
│   │   └── invoices/       # Facturas
│   ├── dashboard/          # Páginas del dashboard
│   └── login/              # Página de login
├── components/             # Componentes React
│   ├── ui/                 # Componentes UI base
│   └── forms/              # Formularios
├── lib/                    # Utilidades y configuración
│   ├── auth.ts             # NextAuth config
│   ├── prisma.ts           # Prisma client
│   ├── logger.ts           # Logger estructurado
│   └── utils.ts            # Utilidades generales
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
└── test/                   # Configuración de tests
```

### Patrones de Diseño

#### 1. API Routes

```typescript
// src/app/api/patients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    // 1. Autenticación
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Validación de parámetros
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    // 3. Query a base de datos
    const patients = await prisma.patient.findMany({
      where: search ? {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } }
        ]
      } : undefined
    })

    // 4. Logging (sin PII)
    logger.info('Patients fetched', { count: patients.length })

    // 5. Respuesta
    return NextResponse.json(patients)
  } catch (error) {
    logger.error('Error fetching patients', { error })
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

#### 2. Componentes React

```typescript
// src/components/PatientForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const patientSchema = z.object({
  firstName: z.string().min(1, 'Nombre requerido'),
  lastName: z.string().min(1, 'Apellidos requeridos'),
  phone: z.string().regex(/^\+?[0-9]{9,}$/, 'Teléfono inválido'),
  email: z.string().email('Email inválido').optional()
})

type PatientFormData = z.infer<typeof patientSchema>

export function PatientForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema)
  })

  const onSubmit = async (data: PatientFormData) => {
    const response = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      // Manejar éxito
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos del formulario */}
    </form>
  )
}
```

## Estándares de Código

### TypeScript

- **Strict mode**: Habilitado
- **No any**: Evitar `any`, usar `unknown` si es necesario
- **Interfaces vs Types**: Preferir `interface` para objetos, `type` para uniones

```typescript
// ✅ BIEN
interface User {
  id: string
  name: string
  email: string
}

type UserRole = 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST'

// ❌ MAL
const user: any = { ... }
```

### Naming Conventions

- **Archivos**: `kebab-case.ts`
- **Componentes**: `PascalCase.tsx`
- **Funciones**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Interfaces**: `PascalCase` (sin prefijo `I`)

### Imports

```typescript
// Orden de imports:
// 1. React/Next
import { useState } from 'react'
import { NextRequest } from 'next/server'

// 2. Librerías externas
import { z } from 'zod'

// 3. Imports internos (con alias @/)
import { logger } from '@/lib/logger'
import { Button } from '@/components/ui/button'

// 4. Tipos
import type { User } from '@/types'
```

## Testing

### Estructura de Tests

```
src/
├── lib/
│   ├── logger.ts
│   └── __tests__/
│       └── logger.test.ts
├── app/
│   └── api/
│       └── patients/
│           ├── route.ts
│           └── __tests__/
│               └── route.test.ts
```

### Escribir Tests

```typescript
// src/lib/__tests__/logger.test.ts
import { describe, it, expect, vi } from 'vitest'
import { logger } from '../logger'

describe('Logger', () => {
  it('debe redactar emails', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    
    logger.info('User login', { email: 'test@example.com' })
    
    const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
    expect(loggedData.email).toBe('[REDACTED]')
    
    consoleSpy.mockRestore()
  })
})
```

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Con cobertura
npm run test:coverage

# Modo watch
npm run test:watch

# UI interactiva
npm run test:ui
```

### Cobertura Mínima

- **Líneas**: 70%
- **Funciones**: 70%
- **Branches**: 70%
- **Statements**: 70%

## Seguridad

### Checklist de Seguridad

- [ ] **Sin credenciales hardcodeadas**
- [ ] **Prepared statements** en todas las queries
- [ ] **Validación de entrada** con Zod
- [ ] **Logging sin PII** usando logger estructurado
- [ ] **Autenticación** en todas las rutas protegidas
- [ ] **HTTPS** en producción
- [ ] **CORS** configurado correctamente

### Logging Seguro

```typescript
import { logger } from '@/lib/logger'

// ✅ BIEN - PII se redacta automáticamente
logger.info('User created', {
  email: 'user@example.com',  // Se redacta a [REDACTED]
  userId: '123'                // Se mantiene
})

// ❌ MAL - console.log expone PII
console.log('User:', { email: 'user@example.com' })
```

### Validación de Entrada

```typescript
import { z } from 'zod'

const patientSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().regex(/^\+?[0-9]{9,15}$/),
  email: z.string().email().optional()
})

// Validar antes de usar
const result = patientSchema.safeParse(input)
if (!result.success) {
  return NextResponse.json({ error: result.error }, { status: 400 })
}
```

## Base de Datos

### Prisma Schema

```prisma
model Patient {
  id        String   @id @default(cuid())
  firstName String
  lastName  String
  phone     String?
  email     String?  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  appointments Appointment[]
  invoices     Invoice[]

  @@index([lastName, firstName])
}
```

### Migraciones

```bash
# Crear migración
npm run prisma:migrate -- --name add_patient_fields

# Aplicar migraciones
npm run prisma:migrate

# Reset de base de datos (desarrollo)
npx prisma migrate reset
```

### Queries Seguras

```typescript
// ✅ BIEN - Prepared statement
const patients = await prisma.patient.findMany({
  where: {
    lastName: { contains: search }  // Prisma sanitiza automáticamente
  }
})

// ❌ MAL - SQL raw sin parámetros
await prisma.$executeRawUnsafe(
  `SELECT * FROM patients WHERE lastName = '${search}'`
)

// ✅ BIEN - SQL raw con parámetros
await prisma.$executeRaw`
  SELECT * FROM patients WHERE lastName = ${search}
`
```

## API

### Autenticación

Todas las rutas protegidas deben verificar sesión:

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Continuar con lógica
}
```

### Manejo de Errores

```typescript
try {
  // Lógica
} catch (error) {
  logger.error('Error description', { error })
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Duplicate entry' }, { status: 409 })
    }
  }
  
  return NextResponse.json({ error: 'Internal error' }, { status: 500 })
}
```

## Deployment

### Vercel

1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático en push a `main`

### Variables de Entorno en Producción

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..." # Generar nuevo para producción
NEXTAUTH_URL="https://app.rubiogarciadental.com"
GOOGLE_API_KEY="..."
```

### Build de Producción

```bash
npm run build
npm start
```

### Health Checks

```typescript
// src/app/api/health/route.ts
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'ok' })
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
```

---

**Última actualización**: 19 de diciembre de 2025
