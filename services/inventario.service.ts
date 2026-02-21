// ─────────────────────────────────────────────────────────────────
//  services/inventario.service.ts
//  CRUD de inventario y lotes contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { ItemInventario, Lote, EstadoLote } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';
export { isDbConfigured };

interface ItemRow {
    id: string; nombre: string; sku?: string; categoria?: string;
    stock_fisico?: number; stock_virtual?: number; minimo_reorden?: number; precio_medio?: number;
}
interface LoteRow {
    id?: string; item_id: string; batch_id?: string; lote_fabricante?: string;
    fecha_caducidad?: string; cantidad?: number; estado?: string; ubicacion?: string;
    temperatura_alerta?: boolean;
}

const rowToItem = (row: ItemRow, lotes: Lote[]): ItemInventario => ({
    id: row.id, nombre: row.nombre, sku: row.sku ?? '',
    categoria: (row.categoria ?? 'Desechable') as ItemInventario['categoria'],
    stockFisico: row.stock_fisico ?? 0, stockVirtual: row.stock_virtual ?? 0,
    minimoReorden: row.minimo_reorden ?? 0, lotes,
});

const rowToLote = (row: LoteRow): Lote => ({
    batchId: row.batch_id ?? '', loteFabricante: row.lote_fabricante ?? '',
    fechaCaducidad: row.fecha_caducidad ?? '', cantidad: row.cantidad ?? 0,
    estado: (row.estado ?? 'OK') as EstadoLote,
    ubicacion: row.ubicacion ?? '',
    temperaturaAlerta: row.temperatura_alerta,
});

export const getInventario = async (): Promise<ItemInventario[]> => {
    if (!isDbConfigured()) return [];
    const items = await dbSelect<ItemRow>('inventario_items', { order: 'nombre.asc' });
    const result: ItemInventario[] = [];
    for (const item of items) {
        const loteRows = await dbSelect<LoteRow>('inventario_lotes', {
            item_id: `eq.${item.id}`, order: 'fecha_caducidad.asc',
        });
        result.push(rowToItem(item, loteRows.map(rowToLote)));
    }
    return result;
};

export const updateStock = async (itemId: string, stockFisico: number): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const row = await dbUpdate<ItemRow>('inventario_items', itemId, { stock_fisico: stockFisico });
    return row !== null;
};

export const addLote = async (itemId: string, lote: Omit<Lote, 'batchId'> & { batchId?: string }): Promise<Lote | null> => {
    const row = await dbInsert<LoteRow>('inventario_lotes', {
        item_id: itemId, batch_id: lote.batchId,
        lote_fabricante: lote.loteFabricante, fecha_caducidad: lote.fechaCaducidad,
        cantidad: lote.cantidad, estado: lote.estado, ubicacion: lote.ubicacion,
    });
    return row ? rowToLote(row) : null;
};

export const deleteLote = async (id: string): Promise<boolean> =>
    dbDelete('inventario_lotes', id);
