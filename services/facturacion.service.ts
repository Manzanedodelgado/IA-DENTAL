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
    id: string;
    numero_factura: string;
    fecha: string;
    base_imponible: number;
    total: number;
    estado: string;
    tbai_verificado: boolean;
    paciente_id: string;
    // mock para simplificar el JOIN (en un entorno real haríamos un JOIN)
    nombre_paciente_mock?: string;
}

interface MovimientoBancoRow {
    id: string;
    fecha: string;
    descripcion: string;
    importe: number;
    tipo: string;
    conciliado: boolean;
}

const formatCurrency = (val: number): string =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(val).replace('€', '€');

const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${d.toLocaleString('es-ES', { month: 'short' })} ${d.getFullYear()}`;
};

export const getFacturas = async (): Promise<FacturaUI[]> => {
    if (!isDbConfigured()) return [];

    // Suponemos que la tabla "facturas" se ha creado o usamos mock si no
    try {
        const rows = await dbSelect<FacturaRow>('facturas', { order: 'fecha.desc' });
        return rows.map(r => ({
            id: r.numero_factura,
            name: r.nombre_paciente_mock || 'Paciente Desconocido',
            date: formatDate(r.fecha),
            base: formatCurrency(r.base_imponible),
            total: formatCurrency(r.total),
            status: (r.estado.charAt(0).toUpperCase() + r.estado.slice(1)) as any,
            tbai: r.tbai_verificado ? 'Verificado' : 'Enviando...',
            rawDate: new Date(r.fecha),
            rawTotal: r.total
        }));
    } catch (e) {
        return [];
    }
};

export const createFactura = async (factura: Partial<FacturaRow>): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const row = await dbInsert<FacturaRow>('facturas', factura);
    return row !== null;
};

export const getMovimientosBanco = async (): Promise<MovimientoBancoUI[]> => {
    if (!isDbConfigured()) return [];

    try {
        const rows = await dbSelect<MovimientoBancoRow>('movimientos_banco', { order: 'fecha.desc' });
        return rows.map(r => ({
            desc: r.descripcion,
            date: formatDate(r.fecha),
            amount: `${r.tipo === 'ingreso' ? '+' : '-'}${formatCurrency(Math.abs(r.importe))}`.replace('€', '€'),
            type: r.tipo === 'ingreso' ? 'in' : 'out',
            match: r.conciliado
        }));
    } catch (e) {
        return [];
    }
};

export const getGestoriaStats = async () => {
    // Calculamos estadísticas reales a partir de los datos en BD
    // En un entorno de producción, esto sería una RPC (función SQL) por eficiencia
    const facturas = await getFacturas();
    const movimientos = await getMovimientosBanco();

    const ingresosBrutos = facturas.reduce((acc, f) => acc + f.rawTotal, 0);
    // Asumimos un margen del 71% mock por ahora o se calcula con gastos

    return {
        ingresosBrutos: formatCurrency(ingresosBrutos),
        facturasConteo: facturas.length
    };
};
