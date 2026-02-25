import React from 'react';
import { type Area } from '../types';
import { navigationItems } from '../navigation';
import { Search, Bell, Settings, HelpCircle, Users, Calendar, BarChart2, Home, Package, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
    activeArea: Area;
    onNavigate: (area: Area, subArea: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeArea, onNavigate }) => {
    const { logout, user } = useAuth();

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
        <header className="h-16 text-white flex items-center z-50 flex-shrink-0 shadow-md border-b-2 border-white sticky top-0 w-full relative bg-[#051650]" style={{ overflow: 'visible' }}>

            {/* Brand — left side, fixed 220px, only text "RUBIO GARCÍA DENTAL" */}
            <div
                className="flex-shrink-0 flex items-center pl-5 cursor-pointer gap-3"
                style={{ width: '260px' }}
                onClick={() => onNavigate('CLÍNICA', 'General')}
            >
                {/* Muela a la izquierda del logo */}
                <svg width="38" height="44" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M10 2C6.5 2 2 5 2 10C2 13 3 15 4 17C5.5 20 6 24 7 28C7.5 30.5 8.5 34 10.5 34C12.5 34 13 31 14 28C14.5 26 15 24 16 24C17 24 17.5 26 18 28C19 31 19.5 34 21.5 34C23.5 34 24.5 30.5 25 28C26 24 26.5 20 28 17C29 15 30 13 30 10C30 5 25.5 2 22 2C19.5 2 18 3.5 16 3.5C14 3.5 12.5 2 10 2Z" fill="#0ea5e9" fillOpacity="0.95" />
                    <path d="M10 2C12.5 2 14 3.5 16 3.5C18 3.5 19.5 2 22 2" stroke="rgba(186,230,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col leading-none select-none">
                    <span className="text-white font-black text-[22px] tracking-tight uppercase leading-tight whitespace-nowrap">RUBIO GARCÍA</span>
                    <span className="text-[#0ea5e9]/70 font-medium text-[11px] tracking-[0.35em] uppercase leading-none mt-0.5">DENTAL</span>
                </div>
            </div>

            {/* Nav — centered, all items visible, bigger */}
            <nav className="flex-1 flex items-center justify-center gap-1.5 min-w-0 px-4">
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
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 flex-shrink-0 whitespace-nowrap ${isActive
                                ? 'bg-[#0ea5e9] text-white font-black border border-blue-400/30 shadow-md'
                                : 'text-white hover:bg-white/10 border border-transparent font-medium'
                                }`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-[12px] font-bold uppercase tracking-wider">
                                {item.name}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Right actions — fixed width */}
            <div className="flex items-center gap-1.5 pr-5 flex-shrink-0" style={{ width: '220px', justifyContent: 'flex-end' }}>
                {/* Search */}
                <div className="flex items-center bg-black/20 rounded-lg px-3 py-1.5 border border-white/15 focus-within:ring-1 focus-within:ring-[#0ea5e9]/50 transition-all">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent border-none outline-none text-[12px] text-white placeholder-white/40 w-16"
                    />
                    <Search className="w-3.5 h-3.5 text-white/50 ml-1" />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-0.5">
                    {[Bell, Settings, HelpCircle].map((Icon, i) => (
                        <button key={i} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-[#0ea5e9] hover:bg-white/10 rounded-lg transition-all">
                            <Icon className="w-3.5 h-3.5" />
                        </button>
                    ))}
                    <div className="w-px h-5 bg-white/15 mx-1" />
                    <button
                        onClick={logout}
                        title={`Cerrar sesión (${user?.email || 'Usuario'})`}
                        className="h-8 px-2 flex items-center gap-1.5 bg-white/10 border border-white/15 text-white hover:bg-red-500/20 rounded-lg transition-all group"
                    >
                        <div className="w-5 h-5 rounded-full bg-[#0ea5e9] flex items-center justify-center text-[9px] font-black uppercase">
                            {user?.email?.charAt(0) || 'U'}
                        </div>
                        <LogOut className="w-3.5 h-3.5 text-white/40 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;