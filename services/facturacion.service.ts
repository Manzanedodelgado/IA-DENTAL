// ─────────────────────────────────────────────────────────────────
//  services/facturacion.service.ts
//  CRUD de facturas, gastos y bancos contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { dbSelect, dbInsert, dbUpdate, isDbConfigured } from './db';

// Interfaces simplificadas para coincidir con la UI de Gestoria.tsx
export interface FacturaUI {
    id: string; // Ej: 2024-FACT-001
    name: string; // Paciente / Titular
    date: string; // Ej: Hoy, 12:45
    base: string; // Ej: €1,200.00
    total: string; // Ej: €1,200.00
    status: 'Liquidado' | 'Pendiente' | 'Impagado';
    tbai: 'Verificado' | 'Enviando...' | 'Error';
    rawDate: Date;
    rawTotal: number;
}

export interface MovimientoBancoUI {
    desc: string;
    date: string;
    amount: string; // Ej: +1,200.00
    type: 'in' | 'out';
    match: boolean;
}

interface FacturaRow {
    Id: string;
    No: string;
    "Fecha Registro": string;
    Total: number;
    IdPac?: string;
    "Nombre fiscal"?: string;
}

interface MovimientoBancoRow {
    Apunte: string;
    Fecha: string;
    Concepto: string;
    Importe: number;
    Tipo: string; // 'Ingreso' / 'Gasto'
    IdBanco?: string;
}

const formatCurrency = (val: number): string =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(val).replace('€', '€');

const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${d.toLocaleString('es-ES', { month: 'short' })} ${d.getFullYear()}`;
};

export const getFacturas = async (): Promise<FacturaUI[]> => {
    if (!isDbConfigured()) return [];

    try {
        const rows = await dbSelect<FacturaRow>('NV_CabFactura', { order: '"Fecha Registro".desc' });
        return rows.map(r => ({
            id: r.No,
            name: r["Nombre fiscal"] || 'Paciente Desconocido',
            date: formatDate(r["Fecha Registro"]),
            base: formatCurrency(r.Total / 1.21), // Cálculo aproximado si no hay base
            total: formatCurrency(Number(r.Total)),
            status: 'Liquidado',
            tbai: 'Verificado',
            rawDate: new Date(r["Fecha Registro"]),
            rawTotal: Number(r.Total)
        }));
    } catch (e) {
        return [];
    }
};

export const createFactura = async (factura: Partial<FacturaRow>): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const row = await dbInsert<FacturaRow>('NV_CabFactura', factura);
    return row !== null;
};

export const getMovimientosBanco = async (): Promise<MovimientoBancoUI[]> => {
    if (!isDbConfigured()) return [];

    try {
        const rows = await dbSelect<MovimientoBancoRow>('BancoMov', { order: 'Fecha.desc' });
        return rows.map(r => ({
            desc: r.Concepto,
            date: formatDate(r.Fecha),
            amount: `${r.Tipo === 'Ingreso' ? '+' : '-'}${formatCurrency(Math.abs(r.Importe))}`.replace('€', '€'),
            type: r.Tipo === 'Ingreso' ? 'in' : 'out',
            match: true
        }));
    } catch (e) {
        return [];
    }
};

export const getGestoriaStats = async () => {
    const facturas = await getFacturas();
    const ingresosBrutos = facturas.reduce((acc, f) => acc + f.rawTotal, 0);

    return {
        ingresosBrutos: formatCurrency(ingresosBrutos),
        facturasConteo: facturas.length
    };
};
