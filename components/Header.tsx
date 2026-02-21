import React from 'react';
import { type Area } from '../types';
import { navigationItems } from '../navigation';
import { Search, Bell, Grid, User, Settings, HelpCircle, Monitor, Home, Users, Calendar, BarChart2, ShieldCheck, Mail, Package, MessageSquare, Stethoscope } from 'lucide-react';

interface HeaderProps {
    activeArea: Area;
    onNavigate: (area: Area, subArea: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeArea, onNavigate }) => {

    // Mapeo de iconos para los items de navegación
    const getIcon = (name: string) => {
        switch (name) {
            case 'CLÍNICA': return Home;
            case 'Agenda': return Calendar;
            case 'Pacientes': return Users;
            case 'Inventario': return Package;
            case 'IA & Automatización': return BarChart2;
            case 'Gestoría': return BarChart2;
            case 'Whatsapp': return MessageSquare;
            default: return Home;
        }
    };

    return (
        <header className="h-18 text-white flex items-center justify-between z-50 flex-shrink-0 shadow-md border-b border-white/20 sticky top-0 w-full overflow-visible relative bg-[#051650]">

            {/* Brand / Logo Area */}
            <div className="flex items-center cursor-pointer group flex-shrink-0 z-20 w-80 md:w-80 pl-4 md:pl-8" onClick={() => onNavigate('CLÍNICA', 'General')}>
                {/* Logo en código — no depende de imagen externa */}
                <div className="flex items-center gap-3">
                    {/* Icono diente SVG */}
                    <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2C6.5 2 2 5 2 10C2 13 3 15 4 17C5.5 20 6 24 7 28C7.5 30.5 8.5 34 10.5 34C12.5 34 13 31 14 28C14.5 26 15 24 16 24C17 24 17.5 26 18 28C19 31 19.5 34 21.5 34C23.5 34 24.5 30.5 25 28C26 24 26.5 20 28 17C29 15 30 13 30 10C30 5 25.5 2 22 2C19.5 2 18 3.5 16 3.5C14 3.5 12.5 2 10 2Z" fill="white" fillOpacity="0.9" />
                        <path d="M10 2C12.5 2 14 3.5 16 3.5C18 3.5 19.5 2 22 2" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    {/* Texto */}
                    <div className="flex flex-col leading-none">
                        <span className="text-white font-black text-[15px] tracking-tight uppercase leading-none">Rubio García</span>
                        <span className="text-white/70 font-light text-[10px] tracking-[0.3em] uppercase leading-none mt-0.5">Dental</span>
                    </div>
                </div>
            </div>

            {/* Primary Navigation Icons - DISTRIBUTED IN SPACE */}
            <nav className="flex-1 flex items-center justify-center gap-8 overflow-x-auto no-scrollbar mask-linear-fade z-10 hidden md:flex px-8">
                {navigationItems.map((item) => {
                    const Icon = getIcon(item.name);
                    const isActive = activeArea === item.name;

                    return (
                        <button
                            key={item.name}
                            onClick={() => {
                                const firstSubArea = item.children?.[0]?.name || 'General';
                                onNavigate(item.name as Area, firstSubArea);
                            }}
                            className={`flex items-center gap-2 px-4.5 py-2 rounded-lg transition-all duration-200 flex-shrink-0 ${isActive
                                ? 'bg-white/20 text-white font-black border border-white/30 shadow-lg'
                                : 'text-white hover:bg-white/10 border border-transparent'
                                }`}
                        >
                            <Icon className="w-4.5 h-4.5" />
                            <span className="text-[11.5px] font-bold uppercase tracking-widest hidden lg:inline">
                                {item.name}
                            </span>
                        </button>
                    )
                })}
            </nav>

            <div className="flex items-center gap-2 ml-auto pr-4 md:pr-6 flex-shrink-0">
                <div className="hidden md:flex items-center bg-black/20 rounded-lg px-4 py-2 border border-white/20 focus-within:ring-2 focus-within:ring-white/40 transition-all text-white">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent border-none outline-none text-[12px] font-bold text-white placeholder-white/50 w-32 lg:w-56"
                    />
                    <Search className="w-4.5 h-4.5 text-white" />
                </div>

                <div className="flex items-center gap-1 hidden sm:flex">
                    {[Bell, User, Settings, HelpCircle].map((Icon, i) => (
                        <button key={i} className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-lg transition-all shadow-md active:scale-95">
                            <Icon className="w-4.5 h-4.5 text-white" />
                        </button>
                    ))}
                </div>
                {/* Mobile Menu Toggle (Simplified) */}
                <button className="sm:hidden w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-md">
                    <Settings className="w-4.5 h-4.5 text-white" />
                </button>
            </div>
        </header>
    );
};

export default Header;