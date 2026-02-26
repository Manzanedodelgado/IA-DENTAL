// ─────────────────────────────────────────────────────────────────
//  services/tratamientos.service.ts
//  Servicio para catálogo de tratamientos dentales.
// ─────────────────────────────────────────────────────────────────
import { dbSelect, isDbConfigured } from './db';

export interface Tratamiento {
    id: number;
    nombre: string;
    categoria: string;
    tipo_aplicacion: 'pieza' | 'arcada' | 'cuadrante' | 'boca';
    precio: number;
    activo: boolean;
}

interface TratamientoRow {
    id: number;
    nombre: string;
    categoria: string;
    tipo_aplicacion: string;
    precio: number;
    activo: boolean;
    orden: number;
}

/** Cache in-memory para no recargar en cada render */
let _cache: Tratamiento[] | null = null;

/**
 * Carga el catálogo completo de tratamientos (cacheado en memoria).
 * Se ordena por popularidad descendente (campo orden).
 */
export const getCatalogoTratamientos = async (): Promise<Tratamiento[]> => {
    if (_cache) return _cache;
    if (!isDbConfigured()) return [];

    const rows = await dbSelect<TratamientoRow>('catalogo_tratamientos', {
        activo: 'eq.true',
        order: 'orden.desc,nombre.asc',
        limit: '2000',  // top 2000 más usados
    });

    _cache = rows.map(r => ({
        id: r.id,
        nombre: r.nombre,
        categoria: r.categoria,
        tipo_aplicacion: r.tipo_aplicacion as Tratamiento['tipo_aplicacion'],
        precio: r.precio ?? 0,
        activo: r.activo,
    }));

    return _cache;
};

/** Obtiene las categorías únicas del catálogo */
export const getCategorias = async (): Promise<string[]> => {
    const ttos = await getCatalogoTratamientos();
    return [...new Set(ttos.map(t => t.categoria))].sort();
};

/** Busca tratamientos por nombre (filtro local sobre cache) */
export const searchTratamientos = async (
    query: string,
    categoria?: string
): Promise<Tratamiento[]> => {
    const all = await getCatalogoTratamientos();
    const q = query.toLowerCase();
    return all.filter(t =>
        (!q || t.nombre.toLowerCase().includes(q)) &&
        (!categoria || t.categoria === categoria)
    ).slice(0, 50);
};

/** Invalida la cache (útil si se edita el catálogo) */
export const invalidateCache = (): void => { _cache = null; };
