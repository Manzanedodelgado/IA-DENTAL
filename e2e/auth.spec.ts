import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
    test('should display login page', async ({ page }) => {
        await page.goto('/login')

        await expect(page.locator('h1')).toContainText('RUBIO GARCÍA DENTAL')
        await expect(page.locator('input[type="text"]')).toBeVisible()
        await expect(page.locator('input[type="password"]')).toBeVisible()
    })

    test('should reject empty credentials', async ({ page }) => {
        await page.goto('/login')

        await page.click('button[type="submit"]')

        await expect(page.locator('text=Por favor, ingresa usuario y contraseña')).toBeVisible()
    })

    test('should reject invalid credentials', async ({ page }) => {
        await page.goto('/login')

        await page.fill('input[type="text"]', 'invalid@test.com')
        await page.fill('input[type="password"]', 'wrongpassword')
        await page.click('button[type="submit"]')

        await expect(page.locator('text=Credenciales incorrectas')).toBeVisible()
    })

    test('should login with valid credentials', async ({ page }) => {
        await page.goto('/login')

        // Usar credenciales de prueba (deben existir en BD de test)
        await page.fill('input[type="text"]', 'admin@rubiogarciadental.com')
        await page.fill('input[type="password"]', '190582')
        await page.click('button[type="submit"]')

        // Verificar redirección a dashboard
        await expect(page).toHaveURL('/dashboard')
    })
})

test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        // Login antes de cada test
        await page.goto('/login')
        await page.fill('input[type="text"]', 'admin@rubiogarciadental.com')
        await page.fill('input[type="password"]', '190582')
        await page.click('button[type="submit"]')
        await page.waitForURL('/dashboard')
    })

    test('should display dashboard stats', async ({ page }) => {
        await expect(page.locator('text=Citas Hoy')).toBeVisible()
        await expect(page.locator('text=Pacientes Activos')).toBeVisible()
    })

    test('should navigate to patients page', async ({ page }) => {
        await page.click('text=Pacientes')
        await expect(page).toHaveURL('/dashboard/patients')
    })
})

test.describe('Security', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
        await page.goto('/dashboard')
        await expect(page).toHaveURL('/login')
    })

    test('should not expose sensitive data in HTML', async ({ page }) => {
        await page.goto('/login')
        const content = await page.content()

        // Verificar que no hay credenciales en el HTML
        expect(content).not.toContain('190582')
        expect(content).not.toContain('666666')
    })
})
