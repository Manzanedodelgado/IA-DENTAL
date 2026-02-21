
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { type Area, type Paciente } from './types';
import { navigationItems } from './navigation';
import Dashboard from './views/Dashboard';
import Agenda from './views/Agenda';
import Pacientes from './views/Pacientes';
import IAAutomatizacion from './views/IAAutomatizacion';
import Gestoria from './views/Gestoria';
import Whatsapp from './views/Whatsapp';
import Inventario from './views/Inventario';

const App: React.FC = () => {
    const [activeArea, setActiveArea] = useState<Area>('Agenda');
    const [activeSubArea, setActiveSubArea] = useState<string>('Jornada de Hoy');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleNavigation = (area: Area, subArea: string) => {
        setActiveArea(area);
        setActiveSubArea(subArea);
    };

    const renderContent = () => {
        switch (activeArea) {
            case 'Agenda':
                return <Agenda activeSubArea={activeSubArea} />;
            case 'Pacientes':
                return <Pacientes
                    activeSubArea={activeSubArea}
                    onSubAreaChange={(subArea) => setActiveSubArea(subArea)}
                    showToast={showToast}
                />;
            case 'IA & Automatización':
                return <IAAutomatizacion activeSubArea={activeSubArea} />;
            case 'Gestoría':
                return <Gestoria activeSubArea={activeSubArea} />;
            case 'Inventario':
                return <Inventario activeSubArea={activeSubArea} />;
            case 'Whatsapp':
                return <Whatsapp activeSubArea={activeSubArea} />;
            case 'CLÍNICA':
            default:
                return <Dashboard />;
        }
    };

    const currentMenuItem = navigationItems.find(item => item.name === activeArea);
    const showSidebar = !!currentMenuItem?.children;

    return (
        <div className="flex flex-col h-screen bg-clinical-soft dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans overflow-hidden">
            {toastMessage && (
                <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[5000] flex items-center gap-3 animate-fade-in border border-white/10">
                    <span className="material-icons text-emerald-400">check_circle</span>
                    <span className="text-xs font-black uppercase tracking-widest">{toastMessage}</span>
                </div>
            )}

            <Header activeArea={activeArea} onNavigate={handleNavigation} />

            {/* Patient Status Bar - Floating Glassmorphism */}

            <div className="flex flex-1 overflow-hidden">
                {showSidebar && (
                    <div className="hidden lg:flex flex-shrink-0">
                        <Sidebar
                            activeArea={activeArea}
                            activeSubArea={activeSubArea}
                            onNavigate={handleNavigation}
                        />
                    </div>
                )}
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    {activeArea === 'Agenda'
                        ? renderContent()
                        : (
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar bg-clinical-soft/30">
                                <div className="max-w-[1600px] mx-auto animate-fade-in">
                                    {renderContent()}
                                </div>
                            </div>
                        )
                    }
                </main>
            </div>
        </div>
    );
};

export default App;
