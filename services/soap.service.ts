// ─────────────────────────────────────────────────────────────────
//  services/soap.service.ts
//  CRUD de notas clínicas SOAP contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { SOAPNote } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';

interface SoapRow {
    id: string;
    paciente_id: string;
    fecha: string;
    doctor: string;
    especialidad: string;
    subjetivo: string;
    objetivo: string;
    analisis: string;
    plan: string;
    firmada: boolean;
    eva: number;
    alertas_detectadas: string[];
    created_at?: string;
}

const rowToNote = (row: SoapRow): SOAPNote => ({
    id: row.id,
    fecha: new Date(row.fecha).toLocaleDateString('es-ES', {
        day: '2-digit', month: 'short', year: 'numeric',
    }),
    doctor: row.doctor,
    especialidad: row.especialidad,
    subjetivo: row.subjetivo ?? '',
    objetivo: row.objetivo ?? '',
    analisis: row.analisis ?? '',
    plan: row.plan ?? '',
    firmada: row.firmada ?? false,
    eva: row.eva ?? 0,
    timestamp: row.created_at ?? '',
    alertasDetectadas: row.alertas_detectadas ?? [],
});

/** Carga todas las notas SOAP de un paciente, ordenadas por fecha desc */
export const getSoapNotes = async (pacienteId: string): Promise<SOAPNote[]> => {
    if (!isDbConfigured()) return [];
    const rows = await dbSelect<SoapRow>('soap_notes', {
        paciente_id: `eq.${pacienteId}`,
        order: 'fecha.desc,created_at.desc',
    });
    return rows.map(rowToNote);
};

/** Crea una nueva nota SOAP */
export const createSoapNote = async (
    pacienteId: string,
    note: Omit<SOAPNote, 'id' | 'timestamp'>
): Promise<SOAPNote | null> => {
    const fechaISO = (() => {
        try {
            const d = new Date(note.fecha);
            return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
        } catch { return new Date().toISOString().split('T')[0]; }
    })();

    const row = await dbInsert<SoapRow>('soap_notes', {
        paciente_id: pacienteId,
        fecha: fechaISO,
        doctor: note.doctor,
        especialidad: note.especialidad,
        subjetivo: note.subjetivo,
        objetivo: note.objetivo,
        analisis: note.analisis,
        plan: note.plan,
        firmada: note.firmada,
        eva: note.eva,
        alertas_detectadas: note.alertasDetectadas,
    });
    return row ? rowToNote(row) : null;
};

/** Actualiza una nota SOAP existente */
export const updateSoapNote = async (
    id: string,
    updates: Partial<Omit<SOAPNote, 'id' | 'timestamp'>>
): Promise<SOAPNote | null> => {
    const fechaISO = updates.fecha ? (() => {
        try {
            const d = new Date(updates.fecha!);
            return isNaN(d.getTime()) ? undefined : d.toISOString().split('T')[0];
        } catch { return undefined; }
    })() : undefined;

    const row = await dbUpdate<SoapRow>('soap_notes', id, {
        ...(fechaISO ? { fecha: fechaISO } : {}),
        ...(updates.doctor !== undefined ? { doctor: updates.doctor } : {}),
        ...(updates.especialidad !== undefined ? { especialidad: updates.especialidad } : {}),
        ...(updates.subjetivo !== undefined ? { subjetivo: updates.subjetivo } : {}),
        ...(updates.objetivo !== undefined ? { objetivo: updates.objetivo } : {}),
        ...(updates.analisis !== undefined ? { analisis: updates.analisis } : {}),
        ...(updates.plan !== undefined ? { plan: updates.plan } : {}),
        ...(updates.firmada !== undefined ? { firmada: updates.firmada } : {}),
        ...(updates.eva !== undefined ? { eva: updates.eva } : {}),
        ...(updates.alertasDetectadas !== undefined ? { alertas_detectadas: updates.alertasDetectadas } : {}),
    });
    return row ? rowToNote(row) : null;
};

/** Elimina una nota SOAP */
export const deleteSoapNote = async (id: string): Promise<boolean> =>
    dbDelete('soap_notes', id);
