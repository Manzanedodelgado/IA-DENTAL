import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { SaraConfig } from './ia/SaraConfig';
import { AutomationRules } from './ia/AutomationRules';
import { FlowsView } from './ia/FlowsView';
import { AutomationEditor } from './ia/AutomationEditor';
import { Plantillas } from './ia/Plantillas';

interface IAAutomatizacionProps { activeSubArea?: string; }

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-dashed border-slate-200">
        <div className="text-center">
            <Sparkles className="w-8 h-8 text-slate-200 mx-auto mb-3" />
            <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
            <p className="text-[11px] text-slate-300 mt-1">Próximamente</p>
        </div>
    </div>
);

const IAAutomatizacion: React.FC<IAAutomatizacionProps> = ({ activeSubArea }) => {
    const renderContent = () => {
        switch (activeSubArea) {
            case 'Asistente Sara ✦': return <SaraConfig />;
            case 'Automatizaciones': return <AutomationRules />;
            case 'Flujos Conversacionales': return <FlowsView />;
            case 'Editor': return <AutomationEditor />;
            case 'Plantillas': return <Plantillas />;
            default: return <AutomationRules />;
        }
    };

    return (
        <div className="pb-12 animate-in fade-in duration-500 space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#0056b3]" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {activeSubArea ?? 'Automatizaciones'}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Motor activo
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default IAAutomatizacion;
