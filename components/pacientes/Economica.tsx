
import React, { useState } from 'react';
import {
    FolderOpen, Folder, Printer, MessageSquare, Check,
    Receipt, CreditCard, Plus, ChevronDown, ChevronUp,
    AlertCircle, TrendingUp, Banknote
} from 'lucide-react';

interface Concepto {
    id: string;
    descripcion: string;
    diente: string;
    importe: number;
    descuento: number;
    estado: 'Pendiente' | 'Realizado' | 'Facturado';
}

interface Presupuesto {
    id: string;
    folio: string;
    nombre: string;
    fecha: string;
    doctor: string;
    total: number;
    estado: 'Borrador' | 'Pendiente' | 'Aceptado' | 'Rechazado' | 'Finalizado';
    conceptos: Concepto[];
    vencimiento?: string;
}

const MOCK_PRESUPUESTOS: Presupuesto[] = [
    {
        id: "1", folio: "P-2023-089", nombre: "Rehabilitación Implantológica Q2",
        fecha: "15 Oct 2023", doctor: "Dr. Pablo García", total: 2450.00,
        estado: "Aceptado", vencimiento: "15 Nov 2023",
        conceptos: [
            { id: "c1", descripcion: "Implante Straumann BLX", diente: "26", importe: 850, descuento: 0, estado: "Realizado" },
            { id: "c2", descripcion: "Implante Straumann BLX", diente: "27", importe: 850, descuento: 0, estado: "Realizado" },
            { id: "c3", descripcion: "Corona Zirconio s/ Implante", diente: "26", importe: 375, descuento: 0, estado: "Pendiente" },
            { id: "c4", descripcion: "Corona Zirconio s/ Implante", diente: "27", importe: 375, descuento: 0, estado: "Pendiente" },
        ]
    },
    {
        id: "2", folio: "P-2023-112", nombre: "Estética Dental Superior",
        fecha: "20 Oct 2023", doctor: "Dra. Sofía Marín", total: 1800.00,
        estado: "Pendiente",
        conceptos: [
            { id: "c5", descripcion: "Blanqueamiento Philips Zoom", diente: "Arcadas", importe: 350, descuento: 50, estado: "Pendiente" },
            { id: "c6", descripcion: "Carilla Disilicato de Litio", diente: "11", importe: 450, descuento: 0, estado: "Pendiente" },
            { id: "c7", descripcion: "Carilla Disilicato de Litio", diente: "21", importe: 450, descuento: 0, estado: "Pendiente" },
        ]
    }
];

const MOVIMIENTOS = [
    { id: 1, fecha: "15 Oct 2023", concepto: "Entrega a cuenta (P-2023-089)", tipo: "Cobro", metodo: "Tarjeta", importe: 850.00, estado: "Conciliado" },
    { id: 2, fecha: "12 Nov 2023", concepto: "Entrega a cuenta (P-2023-089)", tipo: "Cobro", metodo: "Efectivo", importe: 850.00, estado: "Conciliado" },
];

const estadoConfig: Record<string, string> = {
    'Aceptado': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Finalizado': 'bg-blue-50 text-blue-700 border-blue-200',
    'Pendiente': 'bg-amber-50 text-amber-700 border-amber-200',
    'Rechazado': 'bg-red-50 text-red-600 border-red-200',
    'Borrador': 'bg-slate-50 text-slate-500 border-slate-200',
};
const fmt = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

const Economica: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'presupuestos' | 'pagos'>('presupuestos');
    const [expanded, setExpanded] = useState<string | null>('1');
    const deuda = 1500.00;
    const pagado = 1700.00;
    const total = deuda + pagado;

    return (
        <div className="space-y-5 pb-10 animate-in fade-in duration-500">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Deuda */}
                <div className="bg-white rounded-xl border border-rose-100 shadow-sm p-5 relative overflow-hidden">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Deuda Pendiente</p>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                    </div>
                    <p className="text-3xl font-black text-rose-600">{fmt(deuda)}</p>
                    <p className="text-[9px] font-bold text-rose-400 mt-1">Vencimiento: 15 Nov</p>
                    <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-rose-50 to-transparent" />
                </div>

                {/* Total facturado */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Facturado</p>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-black text-slate-800">{fmt(total)}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(pagado / total) * 100}%` }} />
                    </div>
                    <p className="text-[8px] font-black text-slate-400 text-right mt-1">
                        {Math.round((pagado / total) * 100)}% cobrado
                    </p>
                </div>

                {/* Financiación */}
                <div className="bg-[#051650] rounded-xl shadow-lg p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:brightness-110 transition-all">
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <p className="text-[9px] font-black text-white/60 uppercase tracking-widest">Financiación</p>
                            <CreditCard className="w-4 h-4 text-white/60" />
                        </div>
                        <p className="text-xl font-black text-white mt-1">Pre-Aprobada</p>
                        <p className="text-[9px] text-white/70 font-medium mt-1">Hasta 3.000€ en 12 meses sin intereses.</p>
                    </div>
                    <button className="mt-4 bg-white text-[#051650] py-2 px-4 rounded-lg text-[9px] font-black uppercase tracking-widest self-start hover:bg-blue-50 transition-all active:scale-95">
                        Activar Plan
                    </button>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                {(['presupuestos', 'pagos'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'bg-[#051650] text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-700'
                            }`}
                    >
                        {tab === 'presupuestos' ? 'Presupuestos' : 'Pagos y Facturas'}
                    </button>
                ))}
            </div>

            {/* Presupuestos */}
            {activeTab === 'presupuestos' && (
                <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex justify-end">
                        <button className="flex items-center gap-1.5 bg-[#051650] text-white px-4 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-blue-900 transition-all active:scale-95">
                            <Plus className="w-4 h-4" /> Nuevo Presupuesto
                        </button>
                    </div>

                    {MOCK_PRESUPUESTOS.map(p => (
                        <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div
                                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${expanded === p.id ? 'bg-[#051650] text-white border-[#051650]' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                        {expanded === p.id ? <FolderOpen className="w-5 h-5" /> : <Folder className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-black text-slate-800">{p.nombre}</h4>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${estadoConfig[p.estado] ?? ''}`}>
                                                {p.estado}
                                            </span>
                                        </div>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                            {p.folio} · {p.fecha} · {p.doctor}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                                        <p className="text-lg font-black text-[#051650]">{fmt(p.total)}</p>
                                    </div>
                                    {expanded === p.id ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                                </div>
                            </div>

                            {expanded === p.id && (
                                <div className="border-t border-slate-100 bg-slate-50/50 p-4 animate-in fade-in duration-200">
                                    <table className="w-full text-left mb-4">
                                        <thead>
                                            <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                                                <th className="pb-2 pl-2">Concepto</th>
                                                <th className="pb-2 text-center">Diente</th>
                                                <th className="pb-2 text-right">Importe</th>
                                                <th className="pb-2 text-center">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {p.conceptos.map(c => (
                                                <tr key={c.id} className="text-xs border-b border-slate-100 last:border-0">
                                                    <td className="py-2.5 pl-2 font-medium text-slate-700">{c.descripcion}</td>
                                                    <td className="py-2.5 text-center font-mono text-slate-500">{c.diente}</td>
                                                    <td className="py-2.5 text-right font-bold text-slate-700">{fmt(c.importe)}</td>
                                                    <td className="py-2.5 text-center">
                                                        {c.estado === 'Realizado'
                                                            ? <Check className="w-4 h-4 text-emerald-500 inline-block" />
                                                            : <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                                        <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-500 hover:bg-slate-50 hover:text-[#051650] transition-colors">
                                            <Printer className="w-3.5 h-3.5" /> Imprimir
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                                            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                                        </button>
                                        {p.estado === 'Pendiente' && (
                                            <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase hover:bg-emerald-600 transition-colors shadow-sm">
                                                <Check className="w-3.5 h-3.5" /> Aceptar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Pagos */}
            {activeTab === 'pagos' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Historial de Movimientos</h3>
                        <button className="flex items-center gap-1.5 text-[9px] font-black text-[#051650] uppercase hover:underline">
                            <Banknote className="w-3.5 h-3.5" /> Descargar Extracto
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="p-4">Fecha</th>
                                <th className="p-4">Concepto</th>
                                <th className="p-4">Método</th>
                                <th className="p-4 text-right">Importe</th>
                                <th className="p-4 text-center">Estado</th>
                                <th className="p-4 text-center">Factura</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-medium text-slate-600">
                            {MOVIMIENTOS.map(m => (
                                <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-bold text-slate-700">{m.fecha}</td>
                                    <td className="p-4">{m.concepto}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-slate-100 rounded text-[9px] font-bold uppercase text-slate-500 border border-slate-200">
                                            {m.metodo}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-black text-emerald-600">+{fmt(m.importe)}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                            <Check className="w-3 h-3" /> {m.estado}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-[#051650] transition-all mx-auto">
                                            <Receipt className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Economica;
