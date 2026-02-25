// ─────────────────────────────────────────────────────────────────
//  services/citas.service.ts
//  CRUD de citas de agenda contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { Cita, EstadoCita, TratamientoCategoria } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';

interface CitaRow {
    IdCita: string; // UUID
    IdPac?: string; // UUID
    NUMPAC?: string;
    IdCol?: string;
    IdUsu?: number;
    IdBox?: string;
    Fecha: number;  // YYYYMMDD integer (GELITE format)
    HorConsul?: string; // HH:MM:SS
    Hora?: number;      // Seconds from midnight
    Duracion: number;   // Seconds length
    Texto?: string;
    NOTAS?: string;
    IdSitC?: number;
    IdIcono?: number;
    Movil?: string;
    Confirmada?: boolean;
    Aceptada?: boolean;
}

const estadoToIdSitC = (estado: EstadoCita): number => {
    switch (estado) {
        case 'planificada': return 0;
        case 'anulada': return 1;
        case 'espera': return 2;   // Custom UX state
        case 'gabinete': return 3; // Custom UX state
        case 'fallada': return 4;  // Custom UX state
        case 'finalizada': return 5;
        case 'confirmada': return 7;
        case 'cancelada': return 8;
        default: return 0;
    }
};

const idSitCToEstado = (id?: number): EstadoCita => {
    switch (id) {
        case 0: return 'planificada';
        case 1: return 'anulada';
        case 5: return 'finalizada';
        case 7: return 'confirmada';
        case 8: return 'cancelada';
        // Mocked UX states mapped cleanly back to backend unused keys:
        case 2: return 'espera';
        case 3: return 'gabinete';
        case 4: return 'fallada';
        default: return 'desconocido';
    }
};

const idIconoToTratamiento = (idIcono?: number): { txt: string; cat: TratamientoCategoria } => {
    switch (idIcono) {
        case 1: return { txt: 'Control', cat: 'Diagnostico' };
        case 2: return { txt: 'Urgencia', cat: 'Urgencia' };
        case 3: return { txt: 'Protesis Fija', cat: 'Protesis' };
        case 4: return { txt: 'Cirugia/Injerto', cat: 'Cirugía' };
        case 6: return { txt: 'Retirar Ortodoncia', cat: 'Ortodoncia' };
        case 7: return { txt: 'Protesis Removible', cat: 'Protesis' };
        case 8: return { txt: 'Colocacion Ortodoncia', cat: 'Ortodoncia' };
        case 9: return { txt: 'Periodoncia', cat: 'Periodoncia' };
        case 10: return { txt: 'Cirugía de Implante', cat: 'Implante' };
        case 11: return { txt: 'Mensualidad Ortodoncia', cat: 'Ortodoncia' };
        case 12: return { txt: 'Ajuste Prot/tto', cat: 'Protesis' };
        case 13: return { txt: 'Primera Visita', cat: 'Diagnostico' };
        case 14: return { txt: 'Higiene Dental', cat: 'Higiene' };
        case 15: return { txt: 'Endodoncia', cat: 'Endodoncia' };
        case 16: return { txt: 'Reconstruccion', cat: 'Conservadora' };
        case 17: return { txt: 'Exodoncia', cat: 'Cirugía' };
        case 18: return { txt: 'Estudio Ortodoncia', cat: 'Diagnostico' };
        case 19: return { txt: 'Rx/escaner', cat: 'Diagnostico' };
        default: return { txt: 'Otros', cat: 'Diagnostico' };
    }
};

const idUsuToDoctor = (idUsu?: number, fallbackCol?: string): string => {
    switch (idUsu) {
        case 3: return 'Dr. Mario Rubio';
        case 4: return 'Dra. Irene Garcia';
        case 8: return 'Dra. Virginia Tresgallo';
        case 13: return 'Dr. Ignacio Ferrero';
        case 12: return 'Tc. Juan Antonio Manzanedo';
        case 10: return 'Dra. Miriam Carrasco';
        default: return fallbackCol ? fallbackCol : 'Odontologo';
    }
};

const rowToCita = (row: CitaRow & { id?: string }): Cita => {
    // Apellidos y Nombre extraídos del campo Texto según reglas de GELITE
    const rawText = row.Texto || '';
    let parsedNombre = rawText.trim();
    if (rawText.includes(',')) {
        const parts = rawText.split(',');
        parsedNombre = `${parts[1].trim()} ${parts[0].trim()}`;
    }

    const { txt: tratamientoParams, cat: categoriaParams } = idIconoToTratamiento(row.IdIcono);
    // Si la DB provee IdIcono lo usamos como Tratamiento, sino recaemos en el Texto puro
    const tratamientoFinal = row.IdIcono ? tratamientoParams : (rawText || 'Tratamiento no especificado');

    // Procesar la hora
    let horaFinal = '00:00';
    if (row.HorConsul && typeof row.HorConsul === 'string') {
        horaFinal = row.HorConsul.slice(0, 5);
    } else if (row.Hora != null) {
        const totalMin = Math.floor(row.Hora / 60);
        const hh = Math.floor(totalMin / 60).toString().padStart(2, '0');
        const mm = (totalMin % 60).toString().padStart(2, '0');
        horaFinal = `${hh}:${mm}`;
    }

    const duracionFinal = row.Duracion ? Math.floor(row.Duracion / 60) : 30;

    return {
        id: (row.IdCita ?? row.id ?? crypto.randomUUID()).toString(),
        pacienteNumPac: row.NUMPAC ?? '',
        nombrePaciente: row.NUMPAC ? parsedNombre : parsedNombre || 'Paciente',
        gabinete: row.IdBox ?? 'G1',
        horaInicio: horaFinal,
        duracionMinutos: duracionFinal,
        tratamiento: tratamientoFinal,
        categoria: categoriaParams,
        estado: idSitCToEstado(row.IdSitC),
        doctor: idUsuToDoctor(row.IdUsu, row.IdCol?.toString()),
        alertasMedicas: [],
        alertasLegales: [],
        alertasFinancieras: false,
    };
};

const citaToRow = (c: Partial<Cita>, fecha?: Date): Partial<CitaRow> => ({
    ...(c.pacienteNumPac !== undefined ? { NUMPAC: c.pacienteNumPac || undefined } : {}),
    ...(c.nombrePaciente !== undefined ? { NUMPAC: c.nombrePaciente } : {}),
    ...(c.gabinete !== undefined ? { IdBox: c.gabinete } : {}),
    ...(fecha !== undefined ? { Fecha: dateToInt(fecha) } : {}),
    ...(c.horaInicio !== undefined ? { HorConsul: c.horaInicio } : {}),
    ...(c.duracionMinutos !== undefined ? { Duracion: c.duracionMinutos } : {}),
    ...(c.tratamiento !== undefined ? { Texto: c.tratamiento } : {}),
    ...(c.estado !== undefined ? { IdSitC: estadoToIdSitC(c.estado) } : {}),
    ...(c.doctor !== undefined ? { IdCol: c.doctor || undefined } : {}),
    ...(c.estado === 'confirmada' ? { Confirmada: true } : {}),
});

/** Formatea un Date como 'YYYY-MM-DD' para UI */
export const dateToISO = (d: Date): string => d.toISOString().split('T')[0];

/** Convierte un Date al entero YYYYMMDD que usa GELITE en DCitas.Fecha */
const dateToInt = (d: Date): number => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return parseInt(`${y}${m}${day}`, 10);
};
/** Obtiene todas las citas de un día concreto */
export const getCitasByFecha = async (fecha: Date): Promise<Cita[]> => {
    if (!isDbConfigured()) return [];
    const fechaInt = dateToInt(fecha);
    const rows = await dbSelect<CitaRow>('DCitas', {
        Fecha: `eq.${fechaInt}`,
        order: 'HorConsul.asc',
    });
    return rows.map(rowToCita);
};

/** Obtiene todas las citas de un paciente */
export const getCitasByPaciente = async (numPac: string): Promise<Cita[]> => {
    if (!isDbConfigured()) return [];
    const rows = await dbSelect<CitaRow>('DCitas', {
        NUMPAC: `eq.${numPac}`,
        order: 'Fecha.desc,HorConsul.asc',
    });
    return rows.map(rowToCita);
};

/** Crea una nueva cita */
export const createCita = async (cita: Omit<Cita, 'id'>, fecha: Date): Promise<Cita | null> => {
    const row = await dbInsert<CitaRow>('DCitas', citaToRow(cita, fecha));
    return row ? rowToCita(row) : null;
};

/** Actualiza una cita (estado, hora, gabinete, etc.) */
export const updateCita = async (
    id: string,
    updates: Partial<Cita>,
    nuevaFecha?: Date
): Promise<Cita | null> => {
    const row = await dbUpdate<CitaRow>(
        'DCitas', id,
        citaToRow(updates, nuevaFecha ? nuevaFecha : undefined),
        'IdCita'
    );
    return row ? rowToCita(row) : null;
};

/** Actualiza solo el estado de una cita */
export const updateEstadoCita = async (id: string, estado: EstadoCita): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const row = await dbUpdate<CitaRow>('DCitas', id, { IdSitC: estadoToIdSitC(estado) }, 'IdCita');
    return row !== null;
};

/** Elimina una cita */
export const deleteCita = async (id: string): Promise<boolean> =>
    dbDelete('DCitas', id, 'IdCita');


// ─── TtosMed — Entradas Médicas reales de GELITE ─────────────────────────────
interface TtosMedRow {
    IdPac?: number;
    NumTto?: number;
    IdTto?: number;
    StaTto?: number;        // 5 = realizado
    FecIni?: string;        // ISO date string
    FecFin?: string;
    IdCol?: number;         // ID colaborador/doctor
    IdUser?: number;
    Notas?: string;         // nota clínica real
    Importe?: number;
    PiezasAdu?: number;     // pieza dental adultos
    IdTipoEspec?: number;   // categoría especialidad
    CId?: string;           // 'EntradaMedicaTratamiento' | 'EntradaMedicaEconomica'
}

// IdCol → nombre doctor (extraído de GELITE.mdf TColabos — página 277)
const DOCTOR_MAP: Record<number, string> = {
    1: 'Lucia Guillén',      // 001 LUCIA GUILLEN ABASOLO
    2: 'Dr. Mario Rubio',    // 002 MARIO RUBIO GARCIA  ← Dr. principal
    3: 'Dra. Irene García',  // 003 IRENE GARCIA SANZ   ← Dra. principal
    4: 'Lydia Abalos',       // 004
    5: 'Águeda Díaz',        // 005
    6: 'Primeras Visitas',   // 006
    7: 'José Manuel Rizo',   // 007
    8: 'María Manzano',      // 008
    9: 'Fátima Regodon',     // 009
    10: 'Juan Antonio',       // 010 JUAN ANTONIO MANZANEDO
    11: 'Vivian Martínez',    // 011 VIVIAN MARTINEZ PEREZ
    12: 'Carolina Nieto',     // 012
    13: 'Marta Pérez',        // 013
    14: 'Patricia López',     // 014
    15: 'Yolanda Ballesteros',// 015
    16: 'Virginia Tresgallo', // 016
    17: 'Ignacio Ferrero',    // 017
    18: 'Miriam Carrasco',    // 018
    21: 'Borja Galera',       // 021
    22: 'Alicia',             // 022
    23: 'Tatiana Martín',     // 023
    24: 'Daniel González',    // 024
};

/** Caché dinámica de colaboradores cargados de Supabase */
let _colabosCache: Record<number, string> | null = null;

/**
 * Obtiene el nombre del colaborador buscando primero en TColabos (Supabase),
 * luego en el mapa estático extraído del MDF.
 */
export const getColaboradorNombre = async (idCol?: number): Promise<string> => {
    if (!idCol) return 'Sin asignar';

    // Cargar caché si aún no existe
    if (!_colabosCache && isDbConfigured()) {
        try {
            const rows = await dbSelect<{ IdCol: number; Alias: string; Nombre: string; Apellidos: string }>('TColabos', {
                select: 'IdCol,Alias,Nombre,Apellidos',
                limit: '100',
            });
            _colabosCache = {};
            for (const r of rows) {
                const nombre = [r.Nombre, r.Apellidos].filter(Boolean).join(' ').trim() || r.Alias || '';
                if (nombre) _colabosCache[r.IdCol] = nombre;
            }
        } catch {
            _colabosCache = {};
        }
    }

    if (_colabosCache && _colabosCache[idCol]) return _colabosCache[idCol];
    return DOCTOR_MAP[idCol] ?? `Col. ${idCol}`;
};


// IdTipoEspec → especialidad
const ESPEC_MAP: Record<number, string> = {
    1: 'Odontología General', 2: 'Ortodoncia', 3: 'Implantología',
    4: 'Periodoncia', 5: 'Endodoncia', 6: 'Cirugía Oral', 7: 'Estética Dental',
    8: 'Radiología', 9: 'Prostodoncia', 10: 'Higiene Dental',
    19: 'Odontología General', 42: 'Urgencia',
};

const isoToLabel = (iso?: string): string => {
    if (!iso) return 'Fecha desconocida';
    try {
        return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return iso; }
};

/**
 * Lee las entradas médicas clínicas reales (TtosMed) de un paciente por IdPac.
 * Solo devuelve EntradaMedicaTratamiento, no las económicas.
 */
export const getEntradasMedicas = async (
    idPac: number
): Promise<import('../types').SOAPNote[]> => {
    if (!isDbConfigured() || !idPac) return [];
    try {
        const rows = await dbSelect<TtosMedRow>('TtosMed', {
            IdPac: `eq.${idPac}`,
            order: 'FecIni.desc',
            limit: '200',
        });

        // Solo entradas clínicas, no económicas
        const clinicas = rows.filter(r =>
            r.CId === 'EntradaMedicaTratamiento' || (!r.CId && !!r.Notas)
        );

        return clinicas.map((r, idx): import('../types').SOAPNote => ({
            id: `ttomed-${r.NumTto ?? idx}`,
            fecha: isoToLabel(r.FecIni),
            doctor: DOCTOR_MAP[r.IdCol ?? 0] ?? `Dr. Col.${r.IdCol ?? '?'}`,
            especialidad: ESPEC_MAP[r.IdTipoEspec ?? 0] ?? 'Odontología General',
            subjetivo: r.Notas ?? '',
            objetivo: r.PiezasAdu ? `Pieza ${r.PiezasAdu}` : '',
            analisis: '',
            plan: r.Importe ? `Importe: ${r.Importe.toFixed(2)}€` : '',
            firmada: r.StaTto === 5,
            eva: 0,
            timestamp: r.FecIni ?? '',
            alertasDetectadas: [],
        }));
    } catch { return []; }
};

/**
 * Alias por compatibilidad con código anterior.
 * Llama a getEntradasMedicas si idPac disponible.
 * DCitas es la agenda, NO el historial clínico.
 */
export const getHistorialCitasPaciente = async (
    _apellidos: string,
    _nombre: string,
    idPac?: number
): Promise<import('../types').SOAPNote[]> => {
    if (idPac) return getEntradasMedicas(idPac);
    return [];
};

/** Presupuestos (PRESUTTO) agrupados por Id_Presu — para la vista económica */
interface PresuRow {
    IdPac?: number; Id_Presu?: number; FecIni?: string;
    IdTto?: number; StaTto?: number; ImportePre?: number; Notas?: string;
}

export const getTratamientosPaciente = async (
    idPac: number
): Promise<{ id: number; fecha: string; tratamientos: string[]; total: number; estado: string }[]> => {
    if (!isDbConfigured() || !idPac) return [];
    try {
        const rows = await dbSelect<PresuRow>('PRESUTTO', {
            IdPac: `eq.${idPac}`, order: 'FecIni.desc', limit: '200',
        });
        const byPresu = new Map<number, { fecha: string; tratamientos: string[]; total: number; estado: string }>();
        for (const r of rows) {
            const pid = r.Id_Presu ?? 0;
            const fecha = r.FecIni ? isoToLabel(r.FecIni.slice(0, 10)) : 'Fecha desconocida';
            const entry = byPresu.get(pid) ?? { fecha, tratamientos: [], total: 0, estado: r.StaTto === 7 ? 'Realizado' : 'Planificado' };
            if (r.Notas) entry.tratamientos.push(r.Notas);
            entry.total += r.ImportePre ?? 0;
            byPresu.set(pid, entry);
        }
        return Array.from(byPresu.entries()).map(([id, v]) => ({ id, ...v }));
    } catch { return []; }
};

export { isDbConfigured };
