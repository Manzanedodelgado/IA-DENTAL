// ============================================
// SERVICIO DE BASE DE DATOS - CONEXIÓN A GELITE
// ============================================

const API_BASE = '/api';

// Helper para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error en la petición');
    }
    return response.json();
}

// Formatear fecha para SQL Server
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export const databaseService = {
    // Health check
    async checkHealth(): Promise<{ status: string; server: string; database: string }> {
        const response = await fetch(`${API_BASE}/health`);
        return handleResponse(response);
    },

    // Ejecutar query SQL directa (para IADental Admin)
    async executeQuery(query: string): Promise<any[]> {
        const response = await fetch(`${API_BASE}/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await handleResponse<{ rows: any[] }>(response);
        return data.rows || [];
    },

    // Obtener citas del día
    async getAppointments(date: Date): Promise<any[]> {
        try {
            const response = await fetch(`${API_BASE}/appointments/${formatDate(date)}`);
            const data = await handleResponse<{ rows: any[] }>(response);

            return (data.rows || []).map(apt => ({
                id: apt.id,
                date: apt.date?.split('T')[0] || formatDate(date),
                time: apt.time || '00:00',
                durationMinutes: apt.durationMinutes || 30,
                duration: `${apt.durationMinutes || 30} min`,
                patientName: apt.patientName || 'Sin nombre',
                phone: apt.phone || '',
                doctor: apt.doctor || 'General',
                treatment: apt.treatment || 'Consulta',
                notes: apt.notes || '',
                status: mapStatus(apt.status),
                urgent: false
            }));
        } catch (error) {
            console.error('Error fetching appointments:', error);
            return [];
        }
    },

    // Obtener todos los pacientes
    async getPatients(): Promise<any[]> {
        try {
            const response = await fetch(`${API_BASE}/patients`);
            const data = await handleResponse<{ rows: any[] }>(response);

            return (data.rows || []).map(p => ({
                id: String(p.id),
                name: p.name || `${p.firstName} ${p.lastName}`,
                firstName: p.firstName,
                lastName: p.lastName,
                dni: p.dni || '',
                recordNumber: p.recordNumber || `P-${p.id}`,
                phone: p.phone || '',
                email: p.email || '',
                address: p.address || '',
                birthDate: p.birthDate?.split('T')[0],
                lastVisit: p.registrationDate?.split('T')[0] || '',
                status: p.status || 'active',
                medicalHistory: [],
                alerts: []
            }));
        } catch (error) {
            console.error('Error fetching patients:', error);
            return [];
        }
    },

    // Obtener paciente por ID
    async getPatientById(id: string): Promise<any | null> {
        try {
            const response = await fetch(`${API_BASE}/patients/${id}`);
            const data = await handleResponse<{ patient: any }>(response);
            return data.patient;
        } catch (error) {
            console.error('Error fetching patient:', error);
            return null;
        }
    },

    // Historial de tratamientos
    async getPatientTreatments(patientId: string): Promise<any[]> {
        try {
            const response = await fetch(`${API_BASE}/patients/${patientId}/treatments`);
            const data = await handleResponse<{ rows: any[] }>(response);
            return data.rows || [];
        } catch (error) {
            console.error('Error fetching treatments:', error);
            return [];
        }
    },

    // Presupuestos del paciente
    async getPatientBudgets(patientId: string): Promise<any[]> {
        try {
            const response = await fetch(`${API_BASE}/patients/${patientId}/budgets`);
            const data = await handleResponse<{ rows: any[] }>(response);
            return data.rows || [];
        } catch (error) {
            console.error('Error fetching budgets:', error);
            return [];
        }
    },

    // Estadísticas del dashboard
    async getDashboardStats(): Promise<{ citasHoy: number; pacientesActivos: number; citasPendientes: number }> {
        try {
            const response = await fetch(`${API_BASE}/stats/dashboard`);
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching stats:', error);
            return { citasHoy: 0, pacientesActivos: 0, citasPendientes: 0 };
        }
    },

    // CRUD Pacientes
    async createPatient(patientData: Partial<any>): Promise<any> {
        const response = await fetch(`${API_BASE}/patients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
        const data = await handleResponse<{ patient: any }>(response);
        return data.patient;
    },

    async updatePatient(id: string, updates: Partial<any>): Promise<void> {
        await fetch(`${API_BASE}/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
    },

    async deletePatient(id: string): Promise<void> {
        await fetch(`${API_BASE}/patients/${id}`, {
            method: 'DELETE'
        });
    },

    // CRUD Citas
    async createAppointment(appointmentData: Partial<any>): Promise<any> {
        const response = await fetch(`${API_BASE}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });
        const data = await handleResponse<{ appointment: any }>(response);
        return data.appointment;
    },

    async updateAppointment(id: string, updates: Partial<any>): Promise<void> {
        await fetch(`${API_BASE}/appointments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
    },

    async deleteAppointment(id: string): Promise<void> {
        await fetch(`${API_BASE}/appointments/${id}`, {
            method: 'DELETE'
        });
    }
};

// Helper para mapear estados
function mapStatus(status: string): 'confirmed' | 'pending' | 'cancelled' | 'completed' {
    const statusLower = (status || '').toLowerCase();
    if (statusLower.includes('realiz') || statusLower.includes('finaliz')) return 'completed';
    if (statusLower.includes('confirm') || statusLower.includes('sala') || statusLower.includes('gabinete')) return 'confirmed';
    if (statusLower.includes('anula') || statusLower.includes('fall')) return 'cancelled';
    return 'pending';
}

export default databaseService;
