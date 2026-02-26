// ─────────────────────────────────────────────────────────────────
//  services/soap.service.ts
//  CRUD de notas clínicas SOAP contra Supabase → tabla "soap_notes".
// ─────────────────────────────────────────────────────────────────
import { SOAPNote } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';

interface SoapRow {
    id: string;          // UUID
    paciente_id: string; // NUMPAC
    fecha: string;
    doctor?: string;
    especialidad?: string;
    subjetivo?: string;
    objetivo?: string;
    analisis?: string;
    plan?: string;
    eva?: number;
    firmada?: boolean;
    alertas_detectadas?: string[];
    created_at?: string;
    // Tratamiento vinculado
    tratamiento_id?: number;
    tratamiento_nombre?: string;
    pieza?: number;
    cuadrante?: number;
    arcada?: string;
}

const rowToNote = (row: SoapRow): SOAPNote => ({
    id: row.id,
    fecha: new Date(row.fecha).toLocaleDateString('es-ES', {
        day: '2-digit', month: 'short', year: 'numeric',
    }),
    doctor: row.doctor ?? 'Doctor',
    especialidad: row.especialidad ?? 'General',
    subjetivo: row.subjetivo ?? '',
    objetivo: row.objetivo ?? '',
    analisis: row.analisis ?? '',
    plan: row.plan ?? '',
    firmada: row.firmada ?? false,
    eva: row.eva ?? 0,
    timestamp: row.created_at ?? '',
    alertasDetectadas: row.alertas_detectadas ?? [],
    tratamiento_id: row.tratamiento_id,
    tratamiento_nombre: row.tratamiento_nombre,
    pieza: row.pieza,
    cuadrante: row.cuadrante,
    arcada: row.arcada,
});

const noteToRow = (numPac: string, note: Partial<SOAPNote>): Partial<SoapRow> => ({
    paciente_id: numPac,
    fecha: (() => {
        try {
            const d = new Date(note.fecha ?? '');
            return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
        } catch { return new Date().toISOString().split('T')[0]; }
    })(),
    doctor: note.doctor,
    especialidad: note.especialidad,
    subjetivo: note.subjetivo,
    objetivo: note.objetivo,
    analisis: note.analisis,
    plan: note.plan,
    eva: note.eva,
    firmada: note.firmada,
    alertas_detectadas: note.alertasDetectadas,
    tratamiento_id: note.tratamiento_id,
    tratamiento_nombre: note.tratamiento_nombre,
    pieza: note.pieza,
    cuadrante: note.cuadrante,
    arcada: note.arcada,
});

/** Carga todas las notas SOAP de un paciente, ordenadas por fecha desc */
export const getSoapNotes = async (numPac: string): Promise<SOAPNote[]> => {
    if (!isDbConfigured()) return [];
    const rows = await dbSelect<SoapRow>('soap_notes', {
        paciente_id: `eq.${numPac}`,
        order: 'fecha.desc,created_at.desc',
    });
    return rows.map(rowToNote);
};

/** Crea una nueva nota SOAP */
export const createSoapNote = async (
    numPac: string,
    note: Omit<SOAPNote, 'id' | 'timestamp'>
): Promise<SOAPNote | null> => {
    const row = await dbInsert<SoapRow>('soap_notes', noteToRow(numPac, note) as SoapRow);
    return row ? rowToNote(row) : null;
};

/** Actualiza una nota SOAP existente */
export const updateSoapNote = async (
    id: string,
    updates: Partial<Omit<SOAPNote, 'id' | 'timestamp'>>
): Promise<SOAPNote | null> => {
    const row = await dbUpdate<SoapRow>('soap_notes', id, {
        ...(updates.subjetivo !== undefined ? { subjetivo: updates.subjetivo } : {}),
        ...(updates.objetivo !== undefined ? { objetivo: updates.objetivo } : {}),
        ...(updates.analisis !== undefined ? { analisis: updates.analisis } : {}),
        ...(updates.plan !== undefined ? { plan: updates.plan } : {}),
        ...(updates.eva !== undefined ? { eva: updates.eva } : {}),
        ...(updates.firmada !== undefined ? { firmada: updates.firmada } : {}),
    }, 'id');
    return row ? rowToNote(row) : null;
};

/** Elimina una nota SOAP */
export const deleteSoapNote = async (id: string): Promise<boolean> =>
    dbDelete('soap_notes', id, 'id');
