import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PatientForm } from '../PatientForm'

describe('PatientForm Component', () => {
    it('debe renderizar todos los campos', () => {
        render(<PatientForm onSubmit={() => { }} />)

        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    it('debe mostrar errores de validación', async () => {
        render(<PatientForm onSubmit={() => { }} />)

        const submitButton = screen.getByRole('button', { name: /guardar/i })
        fireEvent.click(submitButton)

        expect(await screen.findByText(/nombre.*requerido/i)).toBeInTheDocument()
    })

    it('debe validar formato de email', async () => {
        render(<PatientForm onSubmit={() => { }} />)

        const emailInput = screen.getByLabelText(/email/i)
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.blur(emailInput)

        expect(await screen.findByText(/email.*inválido/i)).toBeInTheDocument()
    })

    it('debe validar formato de teléfono', async () => {
        render(<PatientForm onSubmit={() => { }} />)

        const phoneInput = screen.getByLabelText(/teléfono/i)
        fireEvent.change(phoneInput, { target: { value: '123' } })
        fireEvent.blur(phoneInput)

        expect(await screen.findByText(/teléfono.*inválido/i)).toBeInTheDocument()
    })

    it('debe llamar onSubmit con datos válidos', async () => {
        const mockSubmit = vi.fn()
        render(<PatientForm onSubmit={mockSubmit} />)

        fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan' } })
        fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: 'García' } })
        fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: '600123456' } })

        const submitButton = screen.getByRole('button', { name: /guardar/i })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    firstName: 'Juan',
                    lastName: 'García',
                    phone: '600123456'
                })
            )
        })
    })

    it('debe limpiar formulario después de envío exitoso', async () => {
        const mockSubmit = vi.fn().mockResolvedValue({ success: true })
        render(<PatientForm onSubmit={mockSubmit} />)

        fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan' } })
        fireEvent.click(screen.getByRole('button', { name: /guardar/i }))

        await waitFor(() => {
            expect(screen.getByLabelText(/nombre/i)).toHaveValue('')
        })
    })
})
