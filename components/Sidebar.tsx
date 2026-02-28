import React, { useState } from 'react';
import { type Area } from '../types';
import { navigationItems } from '../navigation';
import {
    LayoutDashboard, Calendar, Users, BarChart2, Package, Settings, MessageSquare,
    Search, UserPlus, ChevronRight, Activity, Clock, AlertCircle, TrendingUp,
    MoreHorizontal, PlusCircle, AlertTriangle, Monitor, FileText, Grid, CreditCard,
    Brain, FileCheck, ClipboardList, ShoppingCart, QrCode, Receipt, PieChart, Bot
} from 'lucide-react';

interface SidebarProps {
    activeArea: Area;
    activeSubArea: string;
    onNavigate: (area: Area, subArea: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeArea, activeSubArea, onNavigate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const currentMenuItem = navigationItems.find(item => item.name === activeArea);

    if (!currentMenuItem?.children) {
        return null;
    }

    // Mapeo exhaustivo de iconos
    const getIcon = (iconName: string) => {
        switch (iconName) {
            // General
            case 'dashboard': return LayoutDashboard;
            case 'calendar_today': return Calendar;
            case 'people': return Users;
            case 'psychology': return Brain;
            case 'inventory_2': return Package;
            case 'admin_panel_settings': return Settings;
            case 'chat': return MessageSquare;

            // Sub-items Agenda
            case 'view_week': return Calendar;
            case 'view_day': return Calendar;
            case 'edit_calendar': return Settings;
            case 'hourglass_top': return Clock;

            // Sub-items Pacientes
            case 'medical_information': return Activity;
            case 'grid_view': return Grid;
            case 'sick': return AlertCircle;
            case 'description': return FileText;
            case 'payments': return CreditCard;
            case 'request_quote': return Receipt;

            // Sub-items IA
            case 'smart_toy': return Brain;
            case 'fact_check': return FileCheck;
            case 'rule': return ClipboardList;

            // Sub-items Inventario
            case 'qr_code_scanner': return QrCode;
            case 'shopping_cart': return ShoppingCart;

            // Sub-items Admin
            case 'account_balance': return BarChart2;
            case 'receipt_long': return FileText;
            case 'request_page': return FileText;
            case 'analytics': return PieChart;

            // Sub-items Whatsapp
            case 'inbox': return MessageSquare;
            case 'contacts': return Users;

            default: return Activity;
        }
    };

    // Datos operativos simulados
    const stats = {
        espera: [
            { id: "p1", nombre: "Bárbara Ruiz", tiempo: "12 min", alerta: "Látex", trat: "Cirugía" },
            { id: "p2", nombre: "Javier Abad", tiempo: "4 min", alerta: "Deuda", trat: "Limpieza" }
        ],
        gabinete: [
            { id: "p3", nombre: "Maria Carmen", gab: "G1", doctor: "Pérez", tiempo: "35 min" }
        ],
        waitlist: [
            { id: "w1", nombre: "Fuensanta Aguado", trat: "Revision", urgencia: "Alta" },
            { id: "w2", nombre: "Roberto Solís", trat: "Urgencia", urgencia: "Media" }
        ],
        produccion: { actual: 3450, objetivo: 5000 }
    };

    const isAgenda = activeArea === 'Agenda';
    const isPacientes = activeArea === 'Pacientes';

    const MainIcon = getIcon(currentMenuItem.icon || 'clinic');
    const isExpanded = isHovered;

    return (
        <div className={`relative h-full flex-shrink-0 z-40 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-[84px]'}`}>
            <aside
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`absolute inset-y-0 left-0 h-full flex flex-col border-r-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c2a80] to-[#051650] border-[#051650] ${isExpanded ? 'w-80' : 'w-[84px]'}`}
            >
                {/* Header del Sidebar (Global Actions) */}
                <div className="h-16 flex items-center justify-center px-4 border-b border-white/10 flex-shrink-0">
                    {isExpanded ? (
                        <div className="flex w-full gap-2 transition-opacity duration-300 opacity-100 animate-fade-in">
                            <button
                                onClick={() => onNavigate('Pacientes', 'ACTION_SEARCH')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 transition-all active:scale-95 group"
                            >
                                <Search className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Buscar</span>
                            </button>
                            <button
                                onClick={() => onNavigate('Pacientes', 'ACTION_NEW')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-md transition-all active:scale-95 group font-black"
                            >
                                <UserPlus className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Nuevo</span>
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-2 transition-opacity duration-300 opacity-100 animate-fade-in">
                            <button
                                onClick={() => onNavigate('Pacientes', 'ACTION_SEARCH')}
                                title="Buscar"
                                className="w-full flex items-center justify-center py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 transition-all active:scale-95"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Scrollable Content */}
                <div className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${isExpanded ? 'px-4' : 'px-2'} flex flex-col gap-6 py-4`}>

                    {/* Título del Área */}
                    {currentMenuItem.title && (
                        <div className={`transition-all duration-300 ${isExpanded ? 'px-4 pt-3 pb-4 mb-1' : 'px-1 py-1 mb-2 flex flex-col items-center'}`}>
                            {isExpanded ? (
                                <div className="animate-fade-in">
                                    <div className="flex items-center gap-3 mb-3 whitespace-nowrap">
                                        <div className="w-9 h-9 rounded-xl bg-[#0ea5e9]/15 border border-white/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <MainIcon className="w-4.5 h-4.5 text-[#0ea5e9]" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-0.5">{activeArea}</p>
                                            <h2 className="text-[15px] font-black text-white uppercase tracking-tight leading-tight truncate">{currentMenuItem.title}</h2>
                                        </div>
                                    </div>
                                    <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(14,165,233,0.4), transparent)' }} />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/15 border border-white/30 flex items-center justify-center flex-shrink-0 shadow-inner animate-fade-in mb-2" title={`${activeArea} - ${currentMenuItem.title}`}>
                                    <MainIcon className="w-5 h-5 text-[#0ea5e9]" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* NAVEGACIÓN ESTÁNDAR */}
                    <nav className="flex flex-col gap-1 w-full">
                        {currentMenuItem.children.map((subItem) => {
                            const SubIcon = getIcon(subItem.icon || 'dashboard');
                            const isActive = activeSubArea === subItem.name;
                            return (
                                <button
                                    key={subItem.name}
                                    title={subItem.name}
                                    onClick={() => onNavigate(activeArea, subItem.name)}
                                    className={`flex items-center rounded-lg group transition-all duration-200 ${isExpanded ? 'w-full gap-3 px-4 py-2.5 border-l-4' : 'w-12 h-12 justify-center mx-auto border-l-[3px]'
                                        } ${isActive
                                            ? 'border-[#1d4ed8] text-white shadow-sm'
                                            : 'bg-transparent border-transparent text-white/60 hover:bg-white/8 hover:text-white/90'
                                        }`}
                                    style={isActive ? { background: 'linear-gradient(135deg, rgba(29,78,216,0.25), rgba(37,99,235,0.15))' } : {}}
                                >
                                    <SubIcon className={`flex-shrink-0 ${isExpanded ? 'w-4 h-4' : 'w-[18px] h-[18px]'} ${isActive ? 'text-[#60a5fa]' : 'text-white/60 group-hover:text-white'}`} />

                                    {isExpanded && (
                                        <div className="flex-1 flex items-center justify-between min-w-0 animate-fade-in">
                                            <span className="text-[13px] font-semibold flex-1 text-left leading-tight truncate">
                                                {subItem.name}
                                            </span>
                                            {isActive && (
                                                <ChevronRight className="w-3.5 h-3.5 text-[#60a5fa]/60" />
                                            )}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {isAgenda && isExpanded && (
                        /* VISTA OPERATIVA (AGENDA) */
                        <div className="mt-2 border-t border-white/10 pt-4">
                            <div className="animate-fade-in space-y-6">
                                {/* WIDGET 2: Sala de Espera */}
                                <div>
                                    <div className="flex items-center justify-between mb-2 px-1">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <div className="relative">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" title="Datos Simulados"></span>
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-wider">Sala de Espera</span>
                                        </div>
                                        <span className="bg-[#0ea5e9] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">{stats.espera.length}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {stats.espera.map((p) => (
                                            <div key={p.id} className="bg-white p-2.5 rounded-lg flex items-center gap-3 hover:bg-slate-50 transition-all cursor-pointer border border-slate-100">
                                                <div className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${parseInt(p.tiempo) > 10 ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'}`}>
                                                    <div className="flex flex-col items-center leading-none">
                                                        <span className="text-xs font-bold">{p.tiempo.split(' ')[0]}</span>
                                                        <span className="text-[7px] font-bold uppercase">min</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-bold text-slate-800 truncate leading-tight">{p.nombre}</p>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide truncate">{p.trat}</span>
                                                        {p.alerta === "Látex" && <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* WIDGET 3: En Gabinete */}
                                <div>
                                    <div className="flex items-center justify-between mb-3 px-1 mt-2">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <div className="relative">
                                                <Activity className="w-3.5 h-3.5" />
                                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" title="Datos Simulados"></span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest">En Gabinete</span>
                                        </div>
                                        <span className="bg-[#0ea5e9] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">1</span>
                                    </div>
                                    <div className="bg-white border-l-4 border-l-[#051650] border border-slate-200 p-3 rounded-lg flex items-center gap-3 hover:bg-slate-50 transition-all cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-[#051650] text-white flex items-center justify-center flex-shrink-0 font-black text-sm">
                                            G1
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate leading-tight">Maria Carmen</p>
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Dr. Pérez • 35 min</span>
                                        </div>
                                        <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"></span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}
                </div>

                {/* ACCIONES RÁPIDAS GLOBALES */}
                <div className={`p-3 border-t border-white/10 transition-all duration-300 mt-auto ${isExpanded ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2 items-center'}`}>
                    {isExpanded ? (
                        <>
                            <button className="flex items-center justify-center gap-2 py-2 bg-[#0a2150] hover:bg-[#0d2760] text-white rounded-md border border-[#1a3a7a] transition-all active:scale-95 animate-fade-in">
                                <PlusCircle className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Cita</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md border border-red-800 transition-all active:scale-95 animate-fade-in">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Urgente</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="w-11 h-11 flex items-center justify-center bg-[#0a2150] hover:bg-[#0d2760] text-white rounded-xl border border-[#1a3a7a] transition-all active:scale-95 animate-fade-in shadow-inner" title="Nueva Cita">
                                <PlusCircle className="w-[18px] h-[18px]" />
                            </button>
                            <button className="w-11 h-11 flex items-center justify-center bg-red-700/80 hover:bg-red-600 text-white rounded-xl border border-red-800 transition-all active:scale-95 animate-fade-in shadow-inner" title="Urgencia">
                                <AlertTriangle className="w-[18px] h-[18px]" />
                            </button>
                        </>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;