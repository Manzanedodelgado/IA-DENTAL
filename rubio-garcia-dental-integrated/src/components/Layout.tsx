import React, { useState } from 'react';
import { LayoutGrid, Calendar, Users, MessageSquare, Briefcase, Sparkles, Settings, LogOut, Bell, Search, FileText } from 'lucide-react';
import { User, ViewState } from '../types';

interface LayoutProps {
    children: React.ReactNode;
    user: User;
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
    onLogout: () => void;
}

const NavItem: React.FC<{
    active: boolean;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}> = ({ active, icon, label, onClick }) => (
    <button
        onClick={onClick}
        title={label}
        className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 mb-2 relative group ${active
            ? 'bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-lg shadow-brand-blue/40'
            : 'text-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime hover:translate-x-1'
            }`}
    >
        {icon}
        <span className="absolute left-16 bg-white text-brand-dark px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-50">
            {label}
        </span>
    </button>
);

const Layout: React.FC<LayoutProps> = ({ children, user, currentView, onNavigate, onLogout }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <div className="w-full h-screen bg-brand-bg flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-[85px] bg-gradient-to-b from-brand-dark to-[#2a1a7a] flex flex-col items-center py-6 shadow-[6px_0_24px_rgba(29,17,96,0.2)] z-20 rounded-r-[24px]">
                {/* Logo eliminado según requisitos de diseño */}

                <nav className="flex-1 flex flex-col items-center w-full px-2 gap-2 mt-6">
                    <NavItem active={currentView === 'dashboard'} icon={<LayoutGrid size={24} />} label="Panel" onClick={() => onNavigate('dashboard')} />
                    <NavItem active={currentView === 'agenda'} icon={<Calendar size={24} />} label="Agenda" onClick={() => onNavigate('agenda')} />
                    <NavItem active={currentView === 'patients'} icon={<Users size={24} />} label="Pacientes" onClick={() => onNavigate('patients')} />
                    <NavItem active={currentView === 'documents'} icon={<FileText size={24} />} label="Documentos" onClick={() => onNavigate('documents')} />
                    <NavItem active={currentView === 'communication'} icon={<MessageSquare size={24} />} label="Comunicación" onClick={() => onNavigate('communication')} />
                    <NavItem active={currentView === 'management'} icon={<Briefcase size={24} />} label="Gestión" onClick={() => onNavigate('management')} />
                    <NavItem active={currentView === 'ia-dental'} icon={<Sparkles size={24} />} label="IA Dental" onClick={() => onNavigate('ia-dental')} />

                    {user.role === 'admin' && (
                        <NavItem active={currentView === 'config'} icon={<Settings size={24} />} label="Configuración" onClick={() => onNavigate('config')} />
                    )}
                </nav>

                <div className="mt-auto relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="w-[50px] h-[50px] rounded-xl bg-white/10 border-2 border-white/20 hover:border-brand-lime hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,198,204,0.4)] transition-all overflow-hidden flex items-center justify-center"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-lime to-brand-cyan text-brand-dark font-bold flex items-center justify-center text-sm">
                            {user.name.charAt(0)}
                        </div>
                    </button>

                    {showUserMenu && (
                        <div className="absolute bottom-2 left-16 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] p-2 min-w-[200px] z-50 animate-fade-in">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-bold text-brand-dark">{user.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                            >
                                <LogOut size={16} /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Topbar */}
                <header className="bg-white h-14 border-b border-gray-200 px-8 flex items-center justify-between shadow-sm flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="text-xs font-medium text-gray-400">
                            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-brand-bg px-4 py-2 rounded-lg border border-gray-200 w-64">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm text-brand-dark w-full placeholder-gray-400" />
                        </div>

                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand-bg border border-gray-200 hover:border-brand-cyan hover:bg-gray-100 transition-colors relative">
                            <Bell size={18} className="text-gray-500" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-lime border border-white shadow-[0_0_8px_rgba(207,242,20,0.6)]"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#f5f7fa] p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
