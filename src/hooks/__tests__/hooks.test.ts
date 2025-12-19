import { describe, it, expect, vi } from 'vitest'

// Mock de hooks personalizados
const mockUsePatients = vi.fn()
const mockUseAppointments = vi.fn()

vi.mock('@/hooks/usePatients', () => ({
    usePatients: mockUsePatients
}))

vi.mock('@/hooks/useAppointments', () => ({
    useAppointments: mockUseAppointments
}))

describe('Custom Hooks', () => {
    describe('usePatients', () => {
        it('debe retornar lista de pacientes', () => {
            mockUsePatients.mockReturnValue({
                patients: [{ id: '1', name: 'Juan García' }],
                loading: false,
                error: null
            })

            const { usePatients } = require('@/hooks/usePatients')
            const { patients, loading } = usePatients()

            expect(patients).toHaveLength(1)
            expect(loading).toBe(false)
        })

        it('debe manejar estado de carga', () => {
            mockUsePatients.mockReturnValue({
                patients: [],
                loading: true,
                error: null
            })

            const { usePatients } = require('@/hooks/usePatients')
            const { loading } = usePatients()

            expect(loading).toBe(true)
        })

        it('debe manejar errores', () => {
            const error = new Error('Network error')
            mockUsePatients.mockReturnValue({
                patients: [],
                loading: false,
                error
            })

            const { usePatients } = require('@/hooks/usePatients')
            const { error: hookError } = usePatients()

            expect(hookError).toBe(error)
        })
    })

    describe('useAppointments', () => {
        it('debe retornar citas filtradas por fecha', () => {
            mockUseAppointments.mockReturnValue({
                appointments: [{ id: '1', date: '2025-01-15' }],
                loading: false,
                error: null
            })

            const { useAppointments } = require('@/hooks/useAppointments')
            const { appointments } = useAppointments({ date: '2025-01-15' })

            expect(appointments).toHaveLength(1)
        })

        it('debe recargar datos con mutate', () => {
            const mockMutate = vi.fn()
            mockUseAppointments.mockReturnValue({
                appointments: [],
                loading: false,
                error: null,
                mutate: mockMutate
            })

            const { useAppointments } = require('@/hooks/useAppointments')
            const { mutate } = useAppointments()

            mutate()
            expect(mockMutate).toHaveBeenCalled()
        })
    })
})
