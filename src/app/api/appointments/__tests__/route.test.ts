import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'

// Mock de Prisma
const mockPrisma = {
    appointment: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
    }
}

vi.mock('@/lib/prisma', () => ({
    default: mockPrisma
}))

vi.mock('next-auth', () => ({
    getServerSession: vi.fn()
}))

describe('API /api/appointments', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('GET /api/appointments', () => {
        it('debe retornar 401 si no hay sesión', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue(null)

            const { GET } = await import('@/app/api/appointments/route')
            const request = new NextRequest('http://localhost:3000/api/appointments')
            const response = await GET(request)

            expect(response.status).toBe(401)
        })

        it('debe retornar lista de citas con sesión válida', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            mockPrisma.appointment.findMany.mockResolvedValue([
                { id: '1', patientId: '1', date: new Date(), time: '10:00' }
            ])

            const { GET } = await import('@/app/api/appointments/route')
            const request = new NextRequest('http://localhost:3000/api/appointments')
            const response = await GET(request)

            expect(response.status).toBe(200)
            const data = await response.json()
            expect(Array.isArray(data)).toBe(true)
        })

        it('debe filtrar por fecha si se proporciona', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            mockPrisma.appointment.findMany.mockResolvedValue([])

            const { GET } = await import('@/app/api/appointments/route')
            const request = new NextRequest('http://localhost:3000/api/appointments?date=2025-01-01')
            const response = await GET(request)

            expect(response.status).toBe(200)
            expect(mockPrisma.appointment.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        date: expect.any(Object)
                    })
                })
            )
        })
    })

    describe('POST /api/appointments', () => {
        it('debe crear cita con datos válidos', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            mockPrisma.appointment.create.mockResolvedValue({
                id: '1',
                patientId: '1',
                date: new Date(),
                time: '10:00'
            } as any)

            const { POST } = await import('@/app/api/appointments/route')
            const request = new NextRequest('http://localhost:3000/api/appointments', {
                method: 'POST',
                body: JSON.stringify({
                    patientId: '1',
                    date: '2025-01-01',
                    time: '10:00',
                    duration: 30
                })
            })

            const response = await POST(request)
            expect([200, 201]).toContain(response.status)
        })

        it('debe rechazar cita sin datos requeridos', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            const { POST } = await import('@/app/api/appointments/route')
            const request = new NextRequest('http://localhost:3000/api/appointments', {
                method: 'POST',
                body: JSON.stringify({})
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
        })
    })

    describe('Security', () => {
        it('debe validar formato de fecha', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            const { POST } = await import('@/app/api/appointments/route')
            const request = new NextRequest('http://localhost:3000/api/appointments', {
                method: 'POST',
                body: JSON.stringify({
                    patientId: '1',
                    date: 'invalid-date',
                    time: '10:00'
                })
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
        })
    })
})
