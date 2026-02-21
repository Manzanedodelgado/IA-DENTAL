// ─────────────────────────────────────────────────────────────────
//  services/citas.service.ts
//  CRUD de citas de agenda contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { Cita, EstadoCita, TratamientoCategoria } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';

interface CitaRow {
    id: string;
    paciente_id?: string;
    nombre_paciente: string;
    gabinete: string;
    fecha: string;
    hora_inicio: string;
    duracion_minutos: number;
    tratamiento?: string;
    categoria?: string;
    estado?: string;
    doctor?: string;
    alertas_medicas?: string[];
    alertas_legales?: string[];
    alertas_financieras?: boolean;
    presupuesto_pendiente?: boolean;
    pruebas_pendientes?: boolean;
    trabajo_laboratorio?: boolean;
    es_padre_desinfeccion?: boolean;
    notas?: string;
}

const rowToCita = (row: CitaRow): Cita => ({
    id: row.id,
    pacienteId: row.paciente_id ?? '',
    nombrePaciente: row.nombre_paciente,
    gabinete: row.gabinete,
    horaInicio: row.hora_inicio.slice(0, 5), // "HH:MM:SS" → "HH:MM"
    duracionMinutos: row.duracion_minutos,
    tratamiento: row.tratamiento ?? '',
    categoria: (row.categoria ?? 'Diagnostico') as TratamientoCategoria,
    estado: (row.estado ?? 'planificada') as EstadoCita,
    doctor: row.doctor ?? '',
    alertasMedicas: row.alertas_medicas ?? [],
    alertasLegales: row.alertas_legales ?? [],
    alertasFinancieras: row.alertas_financieras ?? false,
    presupuestoPendiente: row.presupuesto_pendiente,
    pruebasPendientes: row.pruebas_pendientes,
    trabajoLaboratorio: row.trabajo_laboratorio,
    esPadreDesinfeccion: row.es_padre_desinfeccion,
});

const citaToRow = (c: Partial<Cita>, fecha?: string): Partial<CitaRow> => ({
    ...(c.pacienteId !== undefined ? { paciente_id: c.pacienteId || undefined } : {}),
    ...(c.nombrePaciente !== undefined ? { nombre_paciente: c.nombrePaciente } : {}),
    ...(c.gabinete !== undefined ? { gabinete: c.gabinete } : {}),
    ...(fecha !== undefined ? { fecha } : {}),
    ...(c.horaInicio !== undefined ? { hora_inicio: c.horaInicio } : {}),
    ...(c.duracionMinutos !== undefined ? { duracion_minutos: c.duracionMinutos } : {}),
    ...(c.tratamiento !== undefined ? { tratamiento: c.tratamiento } : {}),
    ...(c.categoria !== undefined ? { categoria: c.categoria } : {}),
    ...(c.estado !== undefined ? { estado: c.estado } : {}),
    ...(c.doctor !== undefined ? { doctor: c.doctor } : {}),
    ...(c.alertasMedicas !== undefined ? { alertas_medicas: c.alertasMedicas } : {}),
    ...(c.alertasLegales !== undefined ? { alertas_legales: c.alertasLegales } : {}),
    ...(c.alertasFinancieras !== undefined ? { alertas_financieras: c.alertasFinancieras } : {}),
    ...(c.presupuestoPendiente !== undefined ? { presupuesto_pendiente: c.presupuestoPendiente } : {}),
    ...(c.pruebasPendientes !== undefined ? { pruebas_pendientes: c.pruebasPendientes } : {}),
    ...(c.trabajoLaboratorio !== undefined ? { trabajo_laboratorio: c.trabajoLaboratorio } : {}),
    ...(c.esPadreDesinfeccion !== undefined ? { es_padre_desinfeccion: c.esPadreDesinfeccion } : {}),
});

/** Formatea un Date como 'YYYY-MM-DD' */
export const dateToISO = (d: Date): string => d.toISOString().split('T')[0];

/** Obtiene todas las citas de un día concreto */
export const getCitasByFecha = async (fecha: Date): Promise<Cita[]> => {
    if (!isDbConfigured()) return [];
    const fechaStr = dateToISO(fecha);
    const rows = await dbSelect<CitaRow>('citas', {
        fecha: `eq.${fechaStr}`,
        order: 'hora_inicio.asc',
    });
    return rows.map(rowToCita);
};

/** Obtiene todas las citas de un paciente */
export const getCitasByPaciente = async (pacienteId: string): Promise<Cita[]> => {
    if (!isDbConfigured()) return [];
    const rows = await dbSelect<CitaRow>('citas', {
        paciente_id: `eq.${pacienteId}`,
        order: 'fecha.desc,hora_inicio.asc',
    });
    return rows.map(rowToCita);
};

/** Crea una nueva cita */
export const createCita = async (cita: Omit<Cita, 'id'>, fecha: Date): Promise<Cita | null> => {
    const row = await dbInsert<CitaRow>('citas', citaToRow(cita, dateToISO(fecha)));
    return row ? rowToCita(row) : null;
};

/** Actualiza una cita (estado, hora, gabinete, etc.) */
export const updateCita = async (
    id: string,
    updates: Partial<Cita>,
    nuevaFecha?: Date
): Promise<Cita | null> => {
    const row = await dbUpdate<CitaRow>(
        'citas', id,
        citaToRow(updates, nuevaFecha ? dateToISO(nuevaFecha) : undefined)
    );
    return row ? rowToCita(row) : null;
};

/** Actualiza solo el estado de una cita */
export const updateEstadoCita = async (id: string, estado: EstadoCita): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const row = await dbUpdate<CitaRow>('citas', id, { estado });
    return row !== null;
};

/** Elimina una cita */
export const deleteCita = async (id: string): Promise<boolean> =>
    dbDelete('citas', id);

export { isDbConfigured };
