
// ─────────────────────────────────────────────────────────────────
//  services/romexis.service.ts
//  Capa de integración con Planmeca Romexis
//  Modo de funcionamiento:
//    • Con VITE_ROMEXIS_ENDPOINT  →  llama a la API real de Romexis
//    • Sin variable de entorno    →  mock realista (modo demo)
// ─────────────────────────────────────────────────────────────────
/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta = import.meta as any;
const ROMEXIS_ENDPOINT = meta.env?.VITE_ROMEXIS_ENDPOINT as string | undefined;
const ROMEXIS_KEY = meta.env?.VITE_ROMEXIS_KEY as string | undefined;


export const isRomexisConfigured = (): boolean =>
    Boolean(ROMEXIS_ENDPOINT && ROMEXIS_KEY);

// ── Tipos ──────────────────────────────────────────────────────

export interface RomexisPatient {
    romexisId: string;
    name: string;
    birthDate: string;
    dni: string;
}

export interface RomexisPanoramica {
    id: string;
    date: string;
    dateLabel: string;
    url: string;          // signed URL o data URL
    thumbnail: string;
    type: 'panoramica' | 'bite-wing' | 'periapical' | 'tc3d';
    tooth?: string;
}

// ── Mock data ─────────────────────────────────────────────────

const MOCK_PANORAMICAS: RomexisPanoramica[] = [
    {
        id: 'rx-001', date: '2024-03-25', dateLabel: '25 Mar 2024',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Panoramic_dental_X-ray.jpg',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Panoramic_dental_X-ray.jpg/800px-Panoramic_dental_X-ray.jpg',
        type: 'panoramica',
    },
    {
        id: 'rx-002', date: '2023-01-10', dateLabel: '10 Ene 2023',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Panoramic_dental_X-ray.jpg',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Panoramic_dental_X-ray.jpg/800px-Panoramic_dental_X-ray.jpg',
        type: 'panoramica',
    },
    {
        id: 'rx-003', date: '2022-06-05', dateLabel: '05 Jun 2022',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Panoramic_dental_X-ray.jpg',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Panoramic_dental_X-ray.jpg/800px-Panoramic_dental_X-ray.jpg',
        type: 'panoramica',
    },
];

// ── API calls ─────────────────────────────────────────────────

/**
 * Busca un paciente en Romexis por DNI.
 */
export const searchRomexisPatient = async (dni: string): Promise<RomexisPatient | null> => {
    if (!isRomexisConfigured()) {
        // mock: siempre encontrado
        return { romexisId: `ROM-${dni}`, name: 'Demo', birthDate: '1985-01-01', dni };
    }
    const res = await fetch(`${ROMEXIS_ENDPOINT}/api/patients?dni=${encodeURIComponent(dni)}`, {
        headers: { 'X-API-Key': ROMEXIS_KEY! },
    });
    if (!res.ok) return null;
    return res.json();
};

/**
 * Crea un paciente en Romexis. Llamado al registrar un paciente nuevo.
 * Devuelve el romexisId asignado, o null si hay error.
 */
export const createRomexisPatient = async (data: {
    nombre: string; apellidos: string; dni: string;
    fechaNacimiento: string; telefono: string;
}): Promise<string | null> => {
    if (!isRomexisConfigured()) {
        // mock: simula creación con delay
        await new Promise(r => setTimeout(r, 800));
        return `ROM-${Date.now()}`;
    }
    const res = await fetch(`${ROMEXIS_ENDPOINT}/api/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': ROMEXIS_KEY! },
        body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.romexisId ?? null;
};

/**
 * Descarga la lista de radiografías de un paciente en Romexis.
 */
export const getPatientPanoramicas = async (romexisId: string): Promise<RomexisPanoramica[]> => {
    if (!isRomexisConfigured()) {
        await new Promise(r => setTimeout(r, 500));
        return MOCK_PANORAMICAS;
    }
    const res = await fetch(`${ROMEXIS_ENDPOINT}/api/patients/${romexisId}/images`, {
        headers: { 'X-API-Key': ROMEXIS_KEY! },
    });
    if (!res.ok) return MOCK_PANORAMICAS; // fallback
    return res.json();
};
