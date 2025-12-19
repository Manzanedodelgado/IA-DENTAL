import { z } from 'zod';

/**
 * Validación de Variables de Entorno
 * 
 * Protocolo SIGMA-99: Validación estricta de configuración
 * 
 * Este módulo valida que todas las variables de entorno críticas
 * estén presentes y tengan el formato correcto antes de que la
 * aplicación inicie.
 */

const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida de PostgreSQL'),

    // NextAuth
    NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET debe tener al menos 32 caracteres'),
    NEXTAUTH_URL: z.string().url('NEXTAUTH_URL debe ser una URL válida'),

    // API Backend (opcional en desarrollo)
    NEXT_PUBLIC_API_URL: z.string().url().optional(),

    // Node Environment
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Variables de entorno validadas y tipadas
 * 
 * @throws {ZodError} Si alguna variable no cumple con el esquema
 */
export const env = envSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV: process.env.NODE_ENV,
});

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
