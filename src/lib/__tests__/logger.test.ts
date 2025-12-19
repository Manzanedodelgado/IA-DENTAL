import { describe, it, expect, vi } from 'vitest'
import { logger } from '../logger'

describe('Structured Logger', () => {
    describe('PII Redaction', () => {
        it('debe redactar emails', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.info('User login', { email: 'test@example.com', userId: '123' })

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.email).toBe('[REDACTED]')
            expect(loggedData.userId).toBe('123')

            consoleSpy.mockRestore()
        })

        it('debe redactar teléfonos', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.info('Patient data', { phone: '600123456', name: 'Juan' })

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.phone).toBe('[REDACTED]')
            expect(loggedData.name).toBe('Juan')

            consoleSpy.mockRestore()
        })

        it('debe redactar DNI', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.info('Patient created', { dni: '12345678A', id: 1 })

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.dni).toBe('[REDACTED]')

            consoleSpy.mockRestore()
        })

        it('debe redactar contraseñas', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.info('Auth attempt', { password: 'secret123', username: 'admin' })

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.password).toBe('[REDACTED]')

            consoleSpy.mockRestore()
        })

        it('debe redactar PII en objetos anidados', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.info('Complex data', {
                user: {
                    email: 'test@test.com',
                    profile: {
                        phone: '123456'
                    }
                }
            })

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.user.email).toBe('[REDACTED]')
            expect(loggedData.user.profile.phone).toBe('[REDACTED]')

            consoleSpy.mockRestore()
        })
    })

    describe('Log Levels', () => {
        it('debe soportar nivel debug', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.debug('Debug message')

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.level).toBe('debug')

            consoleSpy.mockRestore()
        })

        it('debe soportar nivel info', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.info('Info message')

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.level).toBe('info')

            consoleSpy.mockRestore()
        })

        it('debe soportar nivel warn', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.warn('Warning message')

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.level).toBe('warn')

            consoleSpy.mockRestore()
        })

        it('debe soportar nivel error', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            logger.error('Error message')

            const loggedData = JSON.parse(consoleSpy.mock.calls[0][0])
            expect(loggedData.level).toBe('error')

            consoleSpy.mockRestore()
        })
    })
})
