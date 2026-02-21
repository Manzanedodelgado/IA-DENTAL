import React from 'react';
import {
    Brain,
    Cpu,
    Zap,
    MessageSquare,
    FileText,
    PlayCircle,
    RefreshCcw,
    Send,
    CheckCircle2,
    Activity,
    ShieldCheck,
    Bot,
    Terminal,
    Sparkles,
    Settings2,
    Microscope
} from 'lucide-react';
import { Badge, PremiumContainer } from '../components/UI';

interface IAAutomatizacionProps {
    activeSubArea?: string;
}

const IAAutomatizacion: React.FC<IAAutomatizacionProps> = ({ activeSubArea }) => {
    const renderVisual = () => (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-1">
            {/* Logic Panels */}
            <div className="lg:col-span-5 flex flex-col gap-8">
                <PremiumContainer
                    title="Reconocimiento de Intenciones"
                    subtitle="Mapeo semántico de lenguaje natural (NLU)"
                    className="shadow-xl shadow-slate-200/50"
                >
                    <div className="p-4 space-y-4">
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border-2 border-[#051650] dark:border-purple-800/50 group hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-tight">CANCEL_REASON_HEALTH</span>
                                </div>
                                <span className="text-[10px] font-black text-purple-400 uppercase">98% Confianza</span>
                            </div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic mb-3">"No podré ir porque mi hijo se ha puesto malo"</p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="blue">Acción: Reprogramar</Badge>
                                <Badge variant="gray">Trigger: +3 Huecos</Badge>
                            </div>
                        </div>

                        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border-2 border-[#051650] dark:border-rose-800/50 group hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                                    <span className="text-[10px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-tight">URGENCY_PAIN_DETECTED</span>
                                </div>
                                <span className="text-[10px] font-black text-rose-400 uppercase">95% Confianza</span>
                            </div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic mb-3">"Me duele mucho, no aguanto más"</p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="rose">Prioridad Roja</Badge>
                                <Badge variant="gray">Alerta: Recepción</Badge>
                            </div>
                        </div>
                    </div>
                </PremiumContainer>

                <PremiumContainer
                    title="Automatización Documental"
                    subtitle="Triggers inteligentes de cumplimiento legal"
                    className="shadow-xl shadow-slate-200/50"
                >
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        <div className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-[#051650] dark:text-white uppercase tracking-tight">Flujo Bienvenida (1ª Visita)</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Trigger: Estado = Planificada</p>
                                </div>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-[#051650] dark:text-white uppercase tracking-tight">Pack Post-Quirúrgico</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Trigger: Cierre Sesión Gabinete (Cirugía)</p>
                                </div>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                    </div>
                </PremiumContainer>
            </div>

            {/* Simulator Console */}
            <div className="lg:col-span-7 flex flex-col">
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-2 border-[#051650] dark:border-slate-700 flex flex-col min-h-[600px] overflow-hidden relative">
                    {/* Console Header */}
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#051650] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                                <Terminal className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-[#051650] dark:text-white uppercase tracking-widest">Sara IA Simulator</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real-time Stream</span>
                                </div>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 hover:bg-slate-50 transition-all">
                            <RefreshCcw className="w-3.5 h-3.5" />
                            Reset Context
                        </button>
                    </div>

                    {/* Message Stream */}
                    <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-slate-50/20 dark:bg-slate-900/10 relative z-10">
                        {/* User Message */}
                        <div className="flex justify-end pr-2 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-[#051650] text-white rounded-[2rem] rounded-tr-sm py-4 px-6 max-w-[80%] text-sm shadow-xl shadow-blue-900/10 font-bold">
                                <p className="leading-relaxed">Hola, necesito cancelar mi cita de mañana, tengo fiebre.</p>
                            </div>
                        </div>

                        {/* AI Thought Process */}
                        <div className="flex justify-center">
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-[#051650] dark:border-slate-700 rounded-2xl py-3 px-5 flex items-center gap-4 shadow-sm animate-pulse group hover:animate-none hover:shadow-md transition-all">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                                    <Brain className="w-4 h-4" />
                                </div>
                                <div className="font-mono text-[9px] text-slate-500 leading-tight">
                                    <p className="font-black text-blue-600 mb-0.5">INTENT DETECTED: CANCEL_HEALTH</p>
                                    <p>CONFIDENCE: 0.992 | ENTITY: "fiebre" | ACTION: TRIGGER_REFLOW</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex justify-start pl-2 animate-in slide-in-from-left-4 duration-500">
                            <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-[2rem] rounded-tl-sm py-5 px-7 max-w-[85%] text-sm shadow-lg border-2 border-[#051650] dark:border-slate-700 relative group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Sara AI Assist</span>
                                </div>
                                <p className="font-bold text-lg leading-tight tracking-tight mb-2 text-[#051650] dark:text-white">"Siento mucho que no te encuentres bien."</p>
                                <p className="font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Vaya, lo siento mucho. Espero que te mejores pronto. He cancelado tu cita para que descanses sin preocupaciones. ¿Te gustaría que te avise la semana que viene para reagendar cuando estés mejor?</p>
                                <div className="flex gap-2">
                                    <Badge variant="blue">Confirmación SMS Enviada</Badge>
                                    <Badge variant="gray">Agenda Actualizada</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Console Input */}
                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 relative z-10">
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                                <Microscope className="w-4 h-4" />
                            </div>
                            <input
                                className="w-full pl-16 pr-14 py-4 rounded-2xl border-2 border-[#051650] dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none"
                                placeholder="Simula un mensaje para entrenar el Motor NLU..."
                                type="text"
                            />
                            <button className="absolute right-3 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95 group-focus-within:scale-105 transition-all">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Decorative Background Blurs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                </div>
            </div>
        </div>
    );

    const renderEmpty = (title: string) => (
        <div className="h-[600px] flex items-center justify-center bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 border-dashed border-[#051650] dark:border-slate-700">
            <div className="text-center">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-tighter">{title}</h3>
                <p className="text-sm text-slate-400 mt-2">Módulo en fase de entrenamiento IA</p>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSubArea) {
            case 'Agente "Sara"': return renderVisual();
            case 'Plantillas': return renderEmpty("Biblioteca de Plantillas Dinámicas");
            case 'Reglas de Automatización': return renderEmpty("Motor de Reglas de Negocio");
            default: return renderVisual();
        }
    };

    return (
        <div className="pb-20 animate-in fade-in duration-700 space-y-8">
            {/* Tower Control Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
                <div></div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">NLU Training Status</span>
                        <span className="text-sm font-bold text-emerald-600 uppercase">Motor Online</span>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100">
                        <Activity className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default IAAutomatizacion;
