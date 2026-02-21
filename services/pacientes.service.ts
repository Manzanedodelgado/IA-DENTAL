// ─────────────────────────────────────────────────────────────────
//  services/pacientes.service.ts
//  CRUD completo de pacientes contra Supabase.
//  Si Supabase no está configurado → devuelve datos vacíos (modo demo).
// ─────────────────────────────────────────────────────────────────
import { Paciente } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';

// Tipo interno de BD (snake_case)
interface PacienteRow {
    id: string;
    numero_historia?: number;
    nombre: string;
    apellidos: string;
    dni?: string;
    telefono?: string;
    email?: string;
    fecha_nacimiento?: string;
    tutor?: string;
    deuda?: boolean;
    consentimientos_firmados?: boolean;
    observaciones?: string;
    foto_url?: string;
    created_at?: string;
}

/** Convierte fila de BD al tipo Paciente del frontend */
const rowToPaciente = (row: PacienteRow): Paciente => ({
    id: row.id,
    nombre: row.nombre,
    apellidos: row.apellidos,
    dni: row.dni ?? '',
    telefono: row.telefono ?? '',
    fechaNacimiento: row.fecha_nacimiento ?? '',
    tutor: row.tutor,
    alergias: [],      // se cargan aparte via supabase.service.ts
    medicacionActual: undefined,
    deuda: row.deuda ?? false,
    historial: [],     // se cargan aparte
    consentimientosFirmados: row.consentimientos_firmados ?? false,
});

/** Convierte tipo Paciente al formato de BD */
const pacienteToRow = (p: Partial<Paciente>): Partial<PacienteRow> => ({
    nombre: p.nombre,
    apellidos: p.apellidos,
    dni: p.dni,
    telefono: p.telefono,
    fecha_nacimiento: p.fechaNacimiento,
    tutor: p.tutor,
    deuda: p.deuda,
    consentimientos_firmados: p.consentimientosFirmados,
});

// ── Búsqueda de pacientes ────────────────────────────────────────

/**
 * Busca pacientes por texto (nombre, apellidos, DNI, teléfono).
 * Usa el índice trgm de Postgres vía query param `or`.
 */
export const searchPacientes = async (query: string): Promise<Paciente[]> => {
    if (!isDbConfigured()) return [];
    if (!query.trim()) {
        // Sin query: devuelve los 20 más recientes
        const rows = await dbSelect<PacienteRow>('pacientes', {
            order: 'created_at.desc',
            limit: '20',
        });
        return rows.map(rowToPaciente);
    }

    const q = query.trim().toLowerCase();
    const rows = await dbSelect<PacienteRow>('pacientes', {
        or: `nombre.ilike.*${q}*,apellidos.ilike.*${q}*,dni.ilike.*${q}*,telefono.ilike.*${q}*`,
        order: 'apellidos.asc,nombre.asc',
        limit: '30',
    });
    return rows.map(rowToPaciente);
};

/** Obtiene un paciente por su ID */
export const getPaciente = async (id: string): Promise<Paciente | null> => {
    if (!isDbConfigured()) return null;
    const rows = await dbSelect<PacienteRow>('pacientes', { id: `eq.${id}` });
    return rows[0] ? rowToPaciente(rows[0]) : null;
};

/** Crea un nuevo paciente y devuelve el objeto con ID asignado */
export const createPaciente = async (p: Omit<Paciente, 'id' | 'historial'>): Promise<Paciente | null> => {
    const row = await dbInsert<PacienteRow>('pacientes', pacienteToRow(p));
    return row ? rowToPaciente(row) : null;
};

/** Actualiza datos de un paciente existente */
export const updatePaciente = async (
    id: string,
    updates: Partial<Omit<Paciente, 'id' | 'historial'>>
): Promise<Paciente | null> => {
    const row = await dbUpdate<PacienteRow>('pacientes', id, pacienteToRow(updates));
    return row ? rowToPaciente(row) : null;
};

/** Elimina un paciente (uso restringido, preferir desactivar) */
export const deletePaciente = async (id: string): Promise<boolean> =>
    dbDelete('pacientes', id);

export { isDbConfigured };
