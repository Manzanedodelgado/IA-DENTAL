// ─────────────────────────────────────────────────────────────────
//  services/citas.service.ts
//  Lectura de citas de agenda desde Supabase FDW (subquery sobre DCitas).
//  Los campos llegan ya transformados por la subquery SQL Server:
//    Fecha='YYYY-MM-DD', Hora='HH:MM', EstadoCita/Tratamiento/Odontologo=texto.
// ─────────────────────────────────────────────────────────────────
import { Cita, EstadoCita, TratamientoCategoria } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';

/** Row que devuelve el FDW con subquery (ya transformado por SQL Server) */
interface CitaRow {
    Registro?: string;      // IdCita → varchar
    NumPac?: string;        // NUMPAC
    Apellidos?: string;     // Extraído de Texto (antes de la coma)
    Nombre?: string;        // Extraído de Texto (después de la coma)
    TelMovil?: string;      // Movil
    Fecha: string;          // 'YYYY-MM-DD'
    Hora?: string;          // 'HH:MM'
    EstadoCita?: string;    // 'Planificada' | 'Anulada' | 'Finalizada' | ...
    Tratamiento?: string;   // 'Control' | 'Urgencia' | 'Endodoncia' | ...
    Odontologo?: string;    // 'Dr. Mario Rubio' | 'Dra. Irene Garcia' | ...
    Notas?: string;
    Duracion?: number;      // minutos (ya convertido desde segundos)
}

// ── Mapeo estado texto → enum interno ────────────────────────────
const estadoTextToEnum = (estado?: string): EstadoCita => {
    switch (estado) {
        case 'Planificada': return 'planificada';
        case 'Anulada': return 'anulada';
        case 'Finalizada': return 'finalizada';
        case 'Confirmada': return 'confirmada';
        case 'Cancelada': return 'cancelada';
        default: return 'planificada';
    }
};

// ── Mapeo tratamiento texto → categoría UI ───────────────────────
const tratamientoToCategoria = (tto?: string): TratamientoCategoria => {
    switch (tto) {
        case 'Control':
        case 'Primera Visita':
        case 'Estudio Ortodoncia':
        case 'Rx/escaner':
            return 'Diagnostico';
        case 'Urgencia': return 'Urgencia';
        case 'Protesis Fija':
        case 'Protesis Removible':
        case 'Ajuste Prot/tto': return 'Protesis';
        case 'Cirugia/Injerto':
        case 'Exodoncia': return 'Cirugía';
        case 'Retirar Ortodoncia':
        case 'Colocacion Ortodoncia':
        case 'Mensualidad Ortodoncia': return 'Ortodoncia';
        case 'Periodoncia': return 'Periodoncia';
        case 'Cirugia de Implante': return 'Implante';
        case 'Higiene Dental': return 'Higiene';
        case 'Endodoncia': return 'Endodoncia';
        case 'Reconstruccion': return 'Conservadora';
        default: return 'Diagnostico';
    }
};

// ── Conversión row → Cita ────────────────────────────────────────
const rowToCita = (row: CitaRow): Cita => {
    const nombreCompleto = [row.Nombre, row.Apellidos].filter(Boolean).join(' ').trim() || 'Paciente';

    // Doctores (Dr./Dra.) → G1, Sanitarios (Tc., higienistas, etc.) → G2
    const gabinete = row.Odontologo?.startsWith('Dr') ? 'G1' : 'G2';

    return {
        id: row.Registro || crypto.randomUUID(),
        pacienteNumPac: row.NumPac ?? '',
        nombrePaciente: nombreCompleto,
        gabinete,
        horaInicio: row.Hora ?? '00:00',
        duracionMinutos: row.Duracion ?? 30,
        tratamiento: row.Tratamiento ?? 'Sin especificar',
        categoria: tratamientoToCategoria(row.Tratamiento),
        estado: estadoTextToEnum(row.EstadoCita),
        doctor: row.Odontologo ?? 'Odontologo',
        alertasMedicas: [],
        alertasLegales: [],
        alertasFinancieras: false,
        notas: row.Notas ?? '',
    };
};

/** Formatea un Date como 'YYYY-MM-DD' para filtrar la FDW */
export const dateToISO = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

/** Obtiene todas las citas de un día concreto */
export const getCitasByFecha = async (fecha: Date): Promise<Cita[]> => {
    if (!isDbConfigured()) { console.warn('[CITAS] DB no configurada'); return []; }
    const fechaStr = dateToISO(fecha);
    console.log('[CITAS] Buscando fecha:', fechaStr);
    const rows = await dbSelect<CitaRow>('DCitas', {
        Fecha: `eq.${fechaStr}`,
        order: 'Hora.asc',
    });
    console.log('[CITAS] Rows recibidas:', rows.length, rows);
    return rows.map(rowToCita);
};

/** Obtiene todas las citas de un paciente */
export const getCitasByPaciente = async (numPac: string): Promise<Cita[]> => {
    if (!isDbConfigured()) return [];
    const rows = await dbSelect<CitaRow>('DCitas', {
        NumPac: `eq.${numPac}`,
        order: 'Fecha.desc,Hora.asc',
    });
    return rows.map(rowToCita);
};

/** Crea una nueva cita — FDW subquery es solo lectura */
export const createCita = async (cita: Omit<Cita, 'id'>, _fecha: Date): Promise<Cita | null> => {
    return { ...cita, id: crypto.randomUUID() } as Cita;
};

/** Actualiza una cita — FDW subquery es solo lectura */
export const updateCita = async (
    id: string,
    updates: Partial<Cita>,
    _nuevaFecha?: Date
): Promise<Cita | null> => {
    return { id, ...updates } as Cita;
};

/** Actualiza solo el estado de una cita — local only */
export const updateEstadoCita = async (_id: string, _estado: EstadoCita): Promise<boolean> => true;

/** Elimina una cita — local only */
export const deleteCita = async (_id: string): Promise<boolean> => true;


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
    Importe?: string | number;  // text from FDW CAST
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
            plan: r.Importe ? `Importe: ${parseFloat(String(r.Importe)).toFixed(2)}€` : '',
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
    IdTto?: number; StaTto?: number; ImportePre?: string | number; Notas?: string;
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
            entry.total += parseFloat(String(r.ImportePre ?? 0)) || 0;
            byPresu.set(pid, entry);
        }
        return Array.from(byPresu.entries()).map(([id, v]) => ({ id, ...v }));
    } catch { return []; }
};

export { isDbConfigured };
