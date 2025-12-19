import { describe, it, expect, vi } from 'vitest'
import { validatePatientData, validateAppointmentData, validateInvoiceData } from '../validation'

describe('Validation Utilities', () => {
    describe('validatePatientData', () => {
        it('debe validar paciente válido', () => {
            const data = {
                firstName: 'Juan',
                lastName: 'García',
                phone: '600123456',
                email: 'juan@test.com'
            }

            const result = validatePatientData(data)
            expect(result.success).toBe(true)
        })

        it('debe rechazar nombre vacío', () => {
            const data = {
                firstName: '',
                lastName: 'García',
                phone: '600123456'
            }

            const result = validatePatientData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('nombre')
        })

        it('debe rechazar email inválido', () => {
            const data = {
                firstName: 'Juan',
                lastName: 'García',
                phone: '600123456',
                email: 'invalid-email'
            }

            const result = validatePatientData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('email')
        })

        it('debe rechazar teléfono inválido', () => {
            const data = {
                firstName: 'Juan',
                lastName: 'García',
                phone: '123'
            }

            const result = validatePatientData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('teléfono')
        })

        it('debe sanitizar entrada', () => {
            const data = {
                firstName: '<script>alert("xss")</script>Juan',
                lastName: 'García',
                phone: '600123456'
            }

            const result = validatePatientData(data)
            expect(result.data?.firstName).not.toContain('<script>')
        })
    })

    describe('validateAppointmentData', () => {
        it('debe validar cita válida', () => {
            const data = {
                patientId: '1',
                date: '2025-01-15',
                time: '10:00',
                duration: 30
            }

            const result = validateAppointmentData(data)
            expect(result.success).toBe(true)
        })

        it('debe rechazar fecha pasada', () => {
            const data = {
                patientId: '1',
                date: '2020-01-01',
                time: '10:00',
                duration: 30
            }

            const result = validateAppointmentData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('fecha')
        })

        it('debe rechazar hora inválida', () => {
            const data = {
                patientId: '1',
                date: '2025-01-15',
                time: '25:00',
                duration: 30
            }

            const result = validateAppointmentData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('hora')
        })

        it('debe rechazar duración negativa', () => {
            const data = {
                patientId: '1',
                date: '2025-01-15',
                time: '10:00',
                duration: -10
            }

            const result = validateAppointmentData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('duración')
        })
    })

    describe('validateInvoiceData', () => {
        it('debe validar factura válida', () => {
            const data = {
                patientId: '1',
                items: [{ description: 'Test', amount: 100 }],
                total: 100
            }

            const result = validateInvoiceData(data)
            expect(result.success).toBe(true)
        })

        it('debe rechazar total negativo', () => {
            const data = {
                patientId: '1',
                items: [{ description: 'Test', amount: 100 }],
                total: -50
            }

            const result = validateInvoiceData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('total')
        })

        it('debe rechazar items vacíos', () => {
            const data = {
                patientId: '1',
                items: [],
                total: 0
            }

            const result = validateInvoiceData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('items')
        })

        it('debe validar suma de items', () => {
            const data = {
                patientId: '1',
                items: [
                    { description: 'Item 1', amount: 50 },
                    { description: 'Item 2', amount: 50 }
                ],
                total: 200  // Total incorrecto
            }

            const result = validateInvoiceData(data)
            expect(result.success).toBe(false)
            expect(result.error).toContain('total no coincide')
        })
    })
})
