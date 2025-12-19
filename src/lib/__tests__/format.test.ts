import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency, formatPhone, calculateAge } from '../format'

describe('Format Utilities', () => {
    describe('formatDate', () => {
        it('debe formatear fecha a DD/MM/YYYY', () => {
            const date = new Date('2025-01-15')
            expect(formatDate(date)).toBe('15/01/2025')
        })

        it('debe manejar fechas inválidas', () => {
            expect(formatDate(new Date('invalid'))).toBe('Fecha inválida')
        })

        it('debe aceptar string ISO', () => {
            expect(formatDate('2025-01-15')).toBe('15/01/2025')
        })
    })

    describe('formatCurrency', () => {
        it('debe formatear moneda con símbolo €', () => {
            expect(formatCurrency(100)).toBe('100,00 €')
        })

        it('debe formatear decimales correctamente', () => {
            expect(formatCurrency(99.99)).toBe('99,99 €')
        })

        it('debe manejar números negativos', () => {
            expect(formatCurrency(-50)).toBe('-50,00 €')
        })

        it('debe manejar cero', () => {
            expect(formatCurrency(0)).toBe('0,00 €')
        })
    })

    describe('formatPhone', () => {
        it('debe formatear teléfono español', () => {
            expect(formatPhone('600123456')).toBe('+34 600 12 34 56')
        })

        it('debe mantener formato internacional', () => {
            expect(formatPhone('+34600123456')).toBe('+34 600 12 34 56')
        })

        it('debe manejar teléfonos sin formato', () => {
            expect(formatPhone('123456789')).toBe('123 45 67 89')
        })
    })

    describe('calculateAge', () => {
        it('debe calcular edad correctamente', () => {
            const birthDate = new Date('2000-01-01')
            const age = calculateAge(birthDate)
            expect(age).toBeGreaterThanOrEqual(24)
            expect(age).toBeLessThan(26)
        })

        it('debe manejar cumpleaños hoy', () => {
            const today = new Date()
            const birthDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate())
            expect(calculateAge(birthDate)).toBe(30)
        })

        it('debe retornar 0 para fecha futura', () => {
            const futureDate = new Date()
            futureDate.setFullYear(futureDate.getFullYear() + 1)
            expect(calculateAge(futureDate)).toBe(0)
        })
    })
})
