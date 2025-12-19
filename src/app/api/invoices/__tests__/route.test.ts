import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mockPrisma = {
    invoice: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn()
    }
}

vi.mock('@/lib/prisma', () => ({
    default: mockPrisma
}))

vi.mock('next-auth', () => ({
    getServerSession: vi.fn()
}))

describe('API /api/invoices', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('GET /api/invoices', () => {
        it('debe retornar 401 sin autenticación', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue(null)

            const { GET } = await import('@/app/api/invoices/route')
            const request = new NextRequest('http://localhost:3000/api/invoices')
            const response = await GET(request)

            expect(response.status).toBe(401)
        })

        it('debe retornar facturas con autenticación', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            mockPrisma.invoice.findMany.mockResolvedValue([
                { id: '1', patientId: '1', total: 100, status: 'PAID' }
            ])

            const { GET } = await import('@/app/api/invoices/route')
            const request = new NextRequest('http://localhost:3000/api/invoices')
            const response = await GET(request)

            expect(response.status).toBe(200)
        })
    })

    describe('POST /api/invoices', () => {
        it('debe crear factura válida', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            mockPrisma.invoice.create.mockResolvedValue({
                id: '1',
                patientId: '1',
                total: 100,
                status: 'PENDING'
            } as any)

            const { POST } = await import('@/app/api/invoices/route')
            const request = new NextRequest('http://localhost:3000/api/invoices', {
                method: 'POST',
                body: JSON.stringify({
                    patientId: '1',
                    items: [{ description: 'Test', amount: 100 }],
                    total: 100
                })
            })

            const response = await POST(request)
            expect([200, 201]).toContain(response.status)
        })

        it('debe validar total de factura', async () => {
            const { getServerSession } = await import('next-auth')
            vi.mocked(getServerSession).mockResolvedValue({
                user: { id: '1', email: 'test@test.com' }
            } as any)

            const { POST } = await import('@/app/api/invoices/route')
            const request = new NextRequest('http://localhost:3000/api/invoices', {
                method: 'POST',
                body: JSON.stringify({
                    patientId: '1',
                    items: [{ description: 'Test', amount: 100 }],
                    total: -50  // Total negativo inválido
                })
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
        })
    })
})
