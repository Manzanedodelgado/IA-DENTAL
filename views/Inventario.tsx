
import React, { useState, useEffect } from 'react';
import { ItemInventario, Lote } from '../types';
import {
    Package,
    Boxes,
    TrendingDown,
    AlertTriangle,
    History,
    ShoppingCart,
    Search,
    QrCode,
    Download,
    Verified,
    Calendar,
    Cpu,
    ArrowRight,
    Plus,
    Filter,
    ArrowUpRight,
    Euro
} from 'lucide-react';
import { StatCard, Badge, PremiumContainer } from '../components/UI';
import { getInventario, isDbConfigured as isDbCfg } from '../services/inventario.service';

// Mock Data based on 5.1.2 Data Architecture
const INITIAL_INVENTORY: ItemInventario[] = [
    {
        id: "IMP-STR-41",
        nombre: "Implante Straumann BLX ø4.1mm",
        sku: "STR-BLX-4110",
        categoria: "Implante",
        stockFisico: 8,
        stockVirtual: 6, // 2 reservados para cirugías de mañana
        minimoReorden: 5,
        lotes: [
            { batchId: "B-2023-99", loteFabricante: "LOT-8821", fechaCaducidad: "2024-02-15", cantidad: 2, estado: "Caducidad_Proxima", ubicacion: "Cajón Q1" },
            { batchId: "B-2024-01", loteFabricante: "LOT-9932", fechaCaducidad: "2025-10-20", cantidad: 6, estado: "OK", ubicacion: "Almacén Central" }
        ]
    },
    {
        id: "ANEST-ART-4",
        nombre: "Articaína 4% 1:100.000",
        sku: "INI-ART-100",
        categoria: "Desechable",
        stockFisico: 45,
        stockVirtual: 45,
        minimoReorden: 50, // Alerta de stock bajo
        lotes: [
            { batchId: "B-AN-22", loteFabricante: "XJ-221", fechaCaducidad: "2024-12-01", cantidad: 45, estado: "OK", ubicacion: "Nevera 2" }
        ]
    },
    {
        id: "SUT-SEDA-30",
        nombre: "Sutura Seda 3/0 TC-15",
        sku: "SUT-S30",
        categoria: "Desechable",
        stockFisico: 12,
        stockVirtual: 12,
        minimoReorden: 10,
        lotes: [
            { batchId: "B-SU-99", loteFabricante: "S-992", fechaCaducidad: "2026-01-01", cantidad: 12, estado: "OK", ubicacion: "Cajón C3" }
        ]
    }
];

const TRAZABILIDAD_MOCK = [
    { id: "TR-001", fecha: "20 Oct 2024 10:45", paciente: "Bárbara Ruiz", item: "Implante Straumann BLX ø4.1mm", lote: "LOT-8821", doctor: "Dr. García", tipo: "Consumo" },
    { id: "TR-002", fecha: "20 Oct 2024 09:15", paciente: "Javier Abad", item: "Articaína 4%", lote: "XJ-221", doctor: "Dra. Rubio", tipo: "Consumo" },
];

interface InventarioProps {
    activeSubArea?: string;
}

const Inventario: React.FC<InventarioProps> = ({ activeSubArea }) => {
    const [activeTab, setActiveTab] = useState('visual');
    const [searchTerm, setSearchTerm] = useState('');
    const [inventory, setInventory] = useState<ItemInventario[]>(INITIAL_INVENTORY);

    useEffect(() => {
        if (isDbCfg()) {
            getInventario().then(data => {
                if (data.length > 0) setInventory(data);
                else setInventory(INITIAL_INVENTORY);
            });
        }
    }, []);

    useEffect(() => {
        if (activeSubArea === 'Trazabilidad') setActiveTab('trazabilidad');
        else if (activeSubArea === 'Pedidos IA') setActiveTab('pedidos');
        else setActiveTab('visual');
    }, [activeSubArea]);

    const renderVisualInventory = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {inventory.map(item => {
                const isLowStock = item.stockFisico <= item.minimoReorden;
                const nextExpiring = item.lotes.sort((a, b) => new Date(a.fechaCaducidad).getTime() - new Date(b.fechaCaducidad).getTime())[0];
                const isExpiringSoon = nextExpiring && new Date(nextExpiring.fechaCaducidad) < new Date(new Date().setMonth(new Date().getMonth() + 3));

                return (
                    <div key={item.id} className={`bg-white dark:bg-slate-800 rounded-[2rem] p-6 border-2 shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden ${isLowStock ? 'border-rose-200 dark:border-rose-900/50' : 'border-[#051650] dark:border-slate-700'}`}>
                        {/* Status Badges */}
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${item.categoria === 'Implante' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-50 text-slate-500 dark:bg-slate-700 dark:text-slate-300'}`}>
                                {item.categoria === 'Implante' ? <Package className="w-6 h-6" /> : <Boxes className="w-6 h-6" />}
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-3xl font-black tracking-tighter ${isLowStock ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                                    {item.stockFisico}
                                </span>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Unidades</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.nombre}</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant="gray">{item.sku}</Badge>
                                {isLowStock && <Badge variant="rose">Reposición Urgente</Badge>}
                                {isExpiringSoon && !isLowStock && <Badge variant="amber">Caducidad {nextExpiring.fechaCaducidad}</Badge>}
                            </div>
                        </div>

                        {/* Shelf Info */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border-2 border-[#051650] dark:border-slate-700 mb-6 space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-400">Ubicación</span>
                                <span className="text-slate-700 dark:text-slate-300">{nextExpiring.ubicacion}</span>
                            </div>
                            <div className="h-px bg-slate-200 dark:bg-slate-700 w-full" />
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-400">Lote FEFO</span>
                                <span className={isExpiringSoon ? 'text-amber-600' : 'text-slate-700 dark:text-slate-300'}>{nextExpiring.loteFabricante}</span>
                            </div>
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition-all">
                                <History className="w-3.5 h-3.5" />
                                Trazas
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 bg-[#051650] text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95">
                                <Plus className="w-3.5 h-3.5" />
                                Reponer
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderTrazabilidad = () => (
        <PremiumContainer
            title="Blockchain Sanitario Ledger"
            subtitle="Trazabilidad total de implantes y material quirúrgico AEMPS"
            actions={
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-slate-200 transition-all">
                    <Download className="w-4 h-4" />
                    Exportar Registro
                </button>
            }
            className="animate-in fade-in zoom-in-95 duration-500"
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-800/50">
                            <th className="px-6 py-5">Fecha / Hora</th>
                            <th className="px-6 py-5">Paciente</th>
                            <th className="px-6 py-5">Producto / UDI</th>
                            <th className="px-6 py-5">Responsable</th>
                            <th className="px-6 py-5 text-right">Estado Legal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {TRAZABILIDAD_MOCK.map(row => (
                            <tr key={row.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-8 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">{row.fecha.split(' ')[0]} {row.fecha.split(' ')[1]}</p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase">{row.fecha.split(' ').slice(2).join(' ')}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-black text-blue-600 dark:text-blue-400 uppercase tracking-tight">{row.paciente}</td>
                                <td className="px-6 py-5">
                                    <p className="font-bold text-slate-700 dark:text-slate-300">{row.item}</p>
                                    <p className="text-[10px] font-mono text-slate-400 mt-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded w-fit">{row.lote}</p>
                                </td>
                                <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-400 uppercase text-[11px] tracking-tight">{row.doctor}</td>
                                <td className="px-6 py-5 text-right">
                                    <Badge variant="blue">
                                        <div className="flex items-center gap-1.5 p-0.5">
                                            <Verified className="w-3 h-3" />
                                            REGISTRADO
                                        </div>
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PremiumContainer>
    );

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Tower Control Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">

                <div className="flex items-center bg-white dark:bg-slate-800 border-2 border-[#051650] rounded-[1.5rem] p-1 shadow-md">
                    <button
                        onClick={() => setActiveTab('visual')}
                        className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'visual' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-blue-600'}`}
                    >
                        Stock Visual
                    </button>
                    <button
                        onClick={() => setActiveTab('trazabilidad')}
                        className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'trazabilidad' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-blue-600'}`}
                    >
                        Blockchain Ledger
                    </button>
                    <button
                        onClick={() => setActiveTab('pedidos')}
                        className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'pedidos' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-blue-600'}`}
                    >
                        Smart Orders (IA)
                    </button>
                </div>
            </div>

            {/* Smart Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                <StatCard
                    title="Ítems en Catálogo"
                    value={inventory.length.toString()}
                    trend="Actualizado"
                    icon={Boxes}
                    color="text-blue-600"
                    description="Referencias activas"
                />
                <StatCard
                    title="Stock Crítico"
                    value={inventory.filter(i => i.stockFisico <= i.minimoReorden).length.toString()}
                    trend="Inmediato"
                    isPositive={inventory.filter(i => i.stockFisico <= i.minimoReorden).length === 0}
                    icon={AlertTriangle}
                    color="text-rose-600"
                    description="Ítems por debajo del mínimo"
                />
                <StatCard
                    title="Caducidad Próxima"
                    value={inventory.flatMap(i => i.lotes).filter(l => new Date(l.fechaCaducidad) < new Date(new Date().setMonth(new Date().getMonth() + 3))).length.toString()}
                    trend="30 Días"
                    isPositive={false}
                    icon={Calendar}
                    color="text-amber-600"
                    description="Lotes con FEFO prioritario"
                />
                <StatCard
                    title="Rotación"
                    value="Alta"
                    trend="Óptima"
                    icon={TrendingDown}
                    color="text-emerald-600"
                    description="Índice de consumo mensual"
                />
            </div>

            {/* Content Area */}
            <div className="px-1">
                {activeTab === 'visual' && renderVisualInventory()}
                {activeTab === 'trazabilidad' && renderTrazabilidad()}
                {activeTab === 'pedidos' && (
                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-16 border-2 border-[#051650] dark:border-slate-700 text-center animate-in zoom-in-95 duration-500 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -ml-32 -mt-32"></div>
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-blue-100">
                                <Cpu className="w-12 h-12" />
                            </div>
                            <h3 className="text-3xl font-black text-[#051650] dark:text-white uppercase tracking-tighter mb-4">Sarah AI Order Engine</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto mb-10 leading-relaxed font-medium">
                                El motor predictivo analiza el consumo histórico de gabinetes, la agenda quirúrgica de las próximas 4 semanas y los niveles de stock actuales para generar una propuesta de pedido a distribuidores.
                            </p>
                            <button className="px-10 py-5 bg-[#051650] text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto group">
                                Generar Pre-Pedido Inteligente
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventario;
