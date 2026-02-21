
// ─────────────────────────────────────────────────────────────────
//  services/gdrive.service.ts
//  Capa de integración con Google Drive
//  Carpeta base: Clínica/Pacientes/{patientId}/
//
//  Modo de funcionamiento:
//    • Con VITE_GDRIVE_FOLDER_ID + VITE_GDRIVE_API_KEY  →  API real
//    • Sin variables                                    →  mock demo
// ─────────────────────────────────────────────────────────────────

const GDRIVE_FOLDER_ID = import.meta.env.VITE_GDRIVE_FOLDER_ID as string | undefined;
const GDRIVE_API_KEY = import.meta.env.VITE_GDRIVE_API_KEY as string | undefined;

export const isGDriveConfigured = (): boolean =>
    Boolean(GDRIVE_FOLDER_ID && GDRIVE_API_KEY);

// ── Tipos ──────────────────────────────────────────────────────

export interface PatientPhoto {
    id: string;
    name: string;
    label: string;     // Frente, Derecha, Izquierda, etc.
    date: string;
    url: string;
    thumbnail: string;
    mimeType: string;
}

// ── Mock data ─────────────────────────────────────────────────

const MOCK_PHOTOS: PatientPhoto[] = [
    {
        id: 'ph-001', name: 'frente_2024-03.jpg', label: 'Frente',
        date: 'Mar 2024',
        url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=200',
        mimeType: 'image/jpeg',
    },
    {
        id: 'ph-002', name: 'derecha_2024-03.jpg', label: 'Derecha',
        date: 'Mar 2024',
        url: 'https://images.unsplash.com/photo-1598256989803-b14b0c4b1c6b?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1598256989803-b14b0c4b1c6b?auto=format&fit=crop&q=80&w=200',
        mimeType: 'image/jpeg',
    },
    {
        id: 'ph-003', name: 'izquierda_2023-01.jpg', label: 'Izquierda',
        date: 'Ene 2023',
        url: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800',
        thumbnail: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=200',
        mimeType: 'image/jpeg',
    },
];

// ── Helpers ───────────────────────────────────────────────────

/** Deriva la etiqueta de la foto desde el nombre de archivo */
const labelFromName = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('frente') || n.includes('front')) return 'Frente';
    if (n.includes('derech') || n.includes('right')) return 'Derecha';
    if (n.includes('izquier') || n.includes('left')) return 'Izquierda';
    if (n.includes('superior') || n.includes('upper')) return 'Superior';
    if (n.includes('inferior') || n.includes('lower')) return 'Inferior';
    if (n.includes('oclusal') || n.includes('occlusal')) return 'Oclusal';
    return name.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
};

// ── API calls ─────────────────────────────────────────────────

/**
 * Lista las fotos de la subcarpeta Clínica/Pacientes/{patientId}/
 */
export const getPatientPhotos = async (patientId: string): Promise<PatientPhoto[]> => {
    if (!isGDriveConfigured()) {
        await new Promise(r => setTimeout(r, 400));
        return MOCK_PHOTOS;
    }

    // 1. Busca la subcarpeta del paciente dentro del directorio base
    const searchParams = new URLSearchParams({
        q: `'${GDRIVE_FOLDER_ID}' in parents and name='${patientId}' and mimeType='application/vnd.google-apps.folder'`,
        key: GDRIVE_API_KEY!,
        fields: 'files(id,name)',
        pageSize: '1',
    });
    const folderRes = await fetch(`https://www.googleapis.com/drive/v3/files?${searchParams}`);
    if (!folderRes.ok) return MOCK_PHOTOS;
    const folderJson = await folderRes.json();
    const subfolderId = folderJson.files?.[0]?.id;
    if (!subfolderId) return [];

    // 2. Lista las imágenes dentro de esa subcarpeta
    const filesParams = new URLSearchParams({
        q: `'${subfolderId}' in parents and mimeType contains 'image/'`,
        key: GDRIVE_API_KEY!,
        fields: 'files(id,name,createdTime,mimeType)',
        orderBy: 'createdTime desc',
    });
    const filesRes = await fetch(`https://www.googleapis.com/drive/v3/files?${filesParams}`);
    if (!filesRes.ok) return MOCK_PHOTOS;
    const filesJson = await filesRes.json();

    return (filesJson.files ?? []).map((f: { id: string; name: string; createdTime: string; mimeType: string }) => ({
        id: f.id,
        name: f.name,
        label: labelFromName(f.name),
        date: new Date(f.createdTime).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
        url: `https://drive.google.com/uc?id=${f.id}&export=view&key=${GDRIVE_API_KEY}`,
        thumbnail: `https://drive.google.com/thumbnail?id=${f.id}&sz=w200&key=${GDRIVE_API_KEY}`,
        mimeType: f.mimeType,
    }));
};

/**
 * Sube una foto nueva a la subcarpeta del paciente.
 * Requiere OAuth (no soportado con API key sola).
 */
export const uploadPatientPhoto = async (
    _patientId: string,
    _file: File,
): Promise<boolean> => {
    if (!isGDriveConfigured()) {
        await new Promise(r => setTimeout(r, 600));
        return true; // mock: siempre OK
    }
    // TODO: implementar con OAuth2 + multipart upload
    console.warn('Upload requires OAuth2 — not implemented in API-key mode');
    return false;
};
