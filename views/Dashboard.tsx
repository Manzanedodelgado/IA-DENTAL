
import React from 'react';
import {
    Armchair,
    Euro,
    Ban,
    ThumbsUp,
    Flame,
    Zap,
    BarChart3,
    Package,
    TrendingUp,
    MessageSquare,
    CheckCircle2,
    Calendar,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Activity
} from 'lucide-react';
import { StatCard, Badge } from '../components/UI';

const MAIN_KPIS = [
    {
        id: 1,
        title: "Tasa Ocupación Real",
        value: "87%",
        trend: "+5%",
        isPositive: true,
        icon: Armchair,
        color: "text-blue-600",
        desc: "Tiempo de sillón productivo"
    },
    {
        id: 2,
        title: "Producción / Hora",
        value: "342€",
        trend: "+12€",
        isPositive: true,
        icon: Euro,
        color: "text-emerald-600",
        desc: "Rentabilidad media gabinete"
    },
    {
        id: 3,
        title: "Lucro Cesante",
        value: "1.250€",
        trend: "-15%",
        isPositive: true,
        icon: Ban,
        color: "text-rose-600",
        desc: "Pérdida por huecos/no-shows"
    },
    {
        id: 4,
        title: "Case Acceptance",
        value: "68%",
        trend: "-2%",
        isPositive: false,
        icon: ThumbsUp,
        color: "text-amber-600",
        desc: "% Presupuestos aceptados"
    }
];

const HEATMAP_DATA = [
    { hour: '09:00', mon: 80, tue: 90, wed: 60, thu: 85, fri: 50 },
    { hour: '10:00', mon: 95, tue: 100, wed: 80, thu: 90, fri: 70 },
    { hour: '11:00', mon: 100, tue: 100, wed: 90, thu: 95, fri: 85 },
    { hour: '12:00', mon: 70, tue: 80, wed: 50, thu: 60, fri: 40 },
    { hour: '13:00', mon: 40, tue: 50, wed: 30, thu: 40, fri: 20 },
    { hour: '16:00', mon: 90, tue: 95, wed: 85, thu: 90, fri: 60 },
    { hour: '17:00', mon: 100, tue: 100, wed: 100, thu: 100, fri: 50 },
    { hour: '18:00', mon: 85, tue: 90, wed: 80, thu: 85, fri: 30 },
];

const getHeatmapColor = (value: number) => {
    if (value >= 90) return 'bg-secondary shadow-sm ring-1 ring-blue-400/20';
    if (value >= 75) return 'bg-secondary/70';
    if (value >= 60) return 'bg-blue-300';
    if (value >= 45) return 'bg-blue-100 dark:bg-blue-900/20';
    if (value >= 30) return 'bg-slate-100 dark:bg-slate-800';
    return 'bg-slate-50 dark:bg-slate-900 opacity-50';
};

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8 pb-10 animate-in fade-in duration-700">
            {/* Header Tower Control */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
                <div></div>
                <div className="flex items-center bg-white dark:bg-slate-800 border-2 border-[#051650] rounded-md p-1 shadow-md">
                    <button className="px-4 py-1.5 bg-secondary text-white rounded-md text-[10px] font-bold uppercase tracking-wider">Gerencia</button>
                    <button className="px-4 py-1.5 text-slate-400 hover:text-secondary rounded-md text-[10px] font-bold uppercase tracking-wider transition-all">Recepción</button>
                </div>
            </div>

            {/* KPI Cards Grid Premium */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MAIN_KPIS.map(kpi => (
                    <StatCard
                        key={kpi.id}
                        icon={kpi.icon}
                        title={kpi.title}
                        value={kpi.value}
                        trend={kpi.trend}
                        isPositive={kpi.isPositive}
                        color={kpi.color}
                        description={kpi.desc}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Heatmap Analysis Container */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-md border-2 border-[#051650] dark:border-slate-700 shadow-sm p-6 overflow-hidden relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
                                <Flame className="w-4 h-4 text-rose-500" />
                                Análisis de Ocupación por Slots
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title="Datos Simulados"></span>
                            </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 p-1.5 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                            <span className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Alta
                            </span>
                            <span className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-blue-300"></span> Media
                            </span>
                            <span className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-slate-200"></span> Baja
                            </span>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto custom-scrollbar relative z-10">
                        <table className="w-full text-center border-separate border-spacing-y-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] w-20">Slot</th>
                                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie'].map(day => (
                                        <th key={day} className="px-4 py-2 text-[11px] font-black text-[#051650] dark:text-white uppercase tracking-wider">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {HEATMAP_DATA.map((row, idx) => (
                                    <tr key={idx} className="group">
                                        <td className="px-4 py-1 text-[11px] font-bold text-slate-400 tracking-tighter">{row.hour}</td>
                                        {[row.mon, row.tue, row.wed, row.thu, row.fri].map((val, i) => (
                                            <td key={i} className="px-1 py-1">
                                                <div
                                                    className={`w-full h-8 rounded-sm ${getHeatmapColor(val)} hover:scale-105 hover:z-20 transform transition-all cursor-pointer border border-transparent hover:border-white/20 relative`}
                                                    title={`Ocupación: ${val}%`}
                                                >
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Impacto IA & Insights Side Panel */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Sara IA Impact Card */}
                    <div className="bg-slate-900 rounded-md shadow-md p-6 text-white border-2 border-[#051650] relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-secondary rounded flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-md font-bold tracking-tight leading-none uppercase">Sara Intelligence</h3>
                                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title="Datos Simulados"></span>
                                    </div>
                                    <Badge variant="blue" className="!bg-blue-800 !text-blue-100 px-1.5 py-0 rounded-sm mt-1">v4.2 Active</Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[9px] font-bold text-blue-300 uppercase tracking-wider">Eficiencia IA</span>
                                        <span className="text-2xl font-bold text-white tracking-tight">72%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-secondary h-full" style={{ width: '72%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights Board */}
                    <div className="bg-white dark:bg-slate-800 rounded-md border-2 border-[#051650] dark:border-slate-700 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Target className="w-4 h-4" /> AI Insights Board
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title="Datos Simulados"></span>
                            </h3>
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-2 border-[#051650] dark:border-slate-700 rounded-md group hover:bg-white transition-all cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-tight">Campaña de Alerta</p>
                                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">Baja ocupación Jueves. Lanzar recordatorio.</p>
                                        <div className="flex items-center gap-2 mt-2 text-secondary font-bold text-[9px]">
                                            VER DETALLE <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
