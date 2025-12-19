import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { authOptions } from '../auth'

describe('Authentication System', () => {
    describe('authOptions.providers[0].authorize', () => {
        it('debe rechazar credenciales vacías', async () => {
            const authorize = authOptions.providers[0].authorize as any

            await expect(
                authorize({ email: '', password: '' })
            ).rejects.toThrow('Email y contraseña requeridos')
        })

        it('debe rechazar usuario inexistente', async () => {
            const authorize = authOptions.providers[0].authorize as any

            await expect(
                authorize({ email: 'noexiste@test.com', password: 'test123' })
            ).rejects.toThrow('Usuario no encontrado')
        })

        it('debe rechazar contraseña incorrecta', async () => {
            const authorize = authOptions.providers[0].authorize as any

            // Asumiendo que existe un usuario de prueba en la BD
            await expect(
                authorize({ email: 'test@rubiogarciadental.com', password: 'wrongpass' })
            ).rejects.toThrow('Contraseña incorrecta')
        })

        it('debe rechazar usuario inactivo', async () => {
            const authorize = authOptions.providers[0].authorize as any

            // Test con usuario inactivo
            await expect(
                authorize({ email: 'inactive@test.com', password: 'test123' })
            ).rejects.toThrow('Usuario inactivo')
        })
    })

    describe('Security', () => {
        it('NO debe tener bypass hardcodeado', () => {
            const authorizeCode = authOptions.providers[0].authorize.toString()

            // Verificar que no existe bypass hardcodeado
            expect(authorizeCode).not.toContain('JMD')
            expect(authorizeCode).not.toContain('190582')
            expect(authorizeCode).not.toContain('temp-jmd-id')
        })
    })
})
