// ─────────────────────────────────────────────────────────────────
//  services/inventario.service.ts
//  CRUD de inventario y lotes contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { ItemInventario, Lote, EstadoLote } from '../types';
import { dbSelect, dbInsert, dbUpdate, dbDelete, isDbConfigured } from './db';
export { isDbConfigured };

interface ItemRow {
    IdArticulo: string;
    Nombre: string;
    Codigo?: string;
    SKU?: string;
    StockFisico?: number;
    PrecioCompra?: number;
}
interface LoteRow {
    IdMov: string;
    IdArticulo: string;
    Lote?: string;
    FecCaducidad?: string;
    Cantidad?: number;
}

const rowToItem = (row: ItemRow, lotes: Lote[]): ItemInventario => ({
    id: row.IdArticulo,
    nombre: row.Nombre,
    sku: row.SKU || row.Codigo || '',
    categoria: 'Desechable',
    stockFisico: row.StockFisico ?? 0,
    stockVirtual: row.StockFisico ?? 0,
    minimoReorden: 10,
    lotes,
});

const rowToLote = (row: LoteRow): Lote => ({
    batchId: row.IdMov,
    loteFabricante: row.Lote ?? '',
    fechaCaducidad: row.FecCaducidad ?? '',
    cantidad: row.Cantidad ?? 0,
    estado: 'OK',
    ubicacion: 'Almacén Central',
});

export const getInventario = async (): Promise<ItemInventario[]> => {
    if (!isDbConfigured()) return [];
    try {
        const items = await dbSelect<ItemRow>('TArticulo', { order: 'Nombre.asc' });
        const result: ItemInventario[] = [];
        for (const item of items) {
            const loteRows = await dbSelect<LoteRow>('StckMov', {
                IdArticulo: `eq.${item.IdArticulo}`, order: 'FecCaducidad.asc',
            });
            result.push(rowToItem(item, loteRows.map(rowToLote)));
        }
        return result;
    } catch (e) {
        return [];
    }
};

export const updateStock = async (itemId: string, stockFisico: number): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const row = await dbUpdate<ItemRow>('TArticulo', itemId, { StockFisico: stockFisico }, 'IdArticulo');
    return row !== null;
};

export const addLote = async (itemId: string, lote: Omit<Lote, 'batchId'> & { batchId?: string }): Promise<Lote | null> => {
    const row = await dbInsert<LoteRow>('StckMov', {
        IdArticulo: itemId,
        Lote: lote.loteFabricante,
        FecCaducidad: lote.fechaCaducidad,
        Cantidad: lote.cantidad,
    });
    return row ? rowToLote(row) : null;
};

export const deleteLote = async (id: string): Promise<boolean> =>
    dbDelete('StckMov', id, 'IdMov');
