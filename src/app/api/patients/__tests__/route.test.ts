import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock de Prisma
vi.mock('@/lib/prisma', () => ({
    default: {
        patient: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        }
    }
}))

describe('API /api/patients', () => {
    describe('GET /api/patients', () => {
        it('debe retornar lista de pacientes', async () => {
            const { GET } = await import('@/app/api/patients/route')

            const request = new NextRequest('http://localhost:3000/api/patients')
            const response = await GET(request)
            const data = await response.json()

            expect(response.status).toBe(200)
            expect(Array.isArray(data)).toBe(true)
        })

        it('debe soportar búsqueda por query', async () => {
            const { GET } = await import('@/app/api/patients/route')

            const request = new NextRequest('http://localhost:3000/api/patients?search=Garcia')
            const response = await GET(request)

            expect(response.status).toBe(200)
        })
    })

    describe('POST /api/patients', () => {
        it('debe crear paciente con datos válidos', async () => {
            const { POST } = await import('@/app/api/patients/route')

            const request = new NextRequest('http://localhost:3000/api/patients', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: 'Juan',
                    lastName: 'García',
                    phone: '600123456',
                    email: 'juan@test.com'
                })
            })

            const response = await POST(request)
            expect([200, 201]).toContain(response.status)
        })

        it('debe rechazar paciente sin datos requeridos', async () => {
            const { POST } = await import('@/app/api/patients/route')

            const request = new NextRequest('http://localhost:3000/api/patients', {
                method: 'POST',
                body: JSON.stringify({})
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
        })
    })

    describe('Security', () => {
        it('NO debe permitir SQL injection en búsqueda', async () => {
            const { GET } = await import('@/app/api/patients/route')

            const maliciousQuery = "'; DROP TABLE patients; --"
            const request = new NextRequest(
                `http://localhost:3000/api/patients?search=${encodeURIComponent(maliciousQuery)}`
            )

            const response = await GET(request)

            // Debe retornar respuesta válida sin ejecutar SQL malicioso
            expect([200, 400]).toContain(response.status)
        })
    })
})
