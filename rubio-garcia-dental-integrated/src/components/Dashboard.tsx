import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Zap, Sparkles, ArrowRight, UserPlus, FileText, Plus, RefreshCw, AlertCircle, Database, Activity } from 'lucide-react';
import { ViewState, Appointment, ChatContact } from '../types';
import { databaseService } from '../services/databaseService';
import { MOCK_APPOINTMENTS, INITIAL_CONTACTS } from '../constants';

interface DashboardProps {
    onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    // Widget Toggles
    const [toggles, setToggles] = useState({
        agenda: true,
        whatsapp: true,
        auto: true,
        ai: localStorage.getItem('ia_dental_active') === 'true'
    });

    // Data State
    const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
    const [loadingApts, setLoadingApts] = useState(true);
    const [urgentChats, setUrgentChats] = useState<ChatContact[]>([]);
    const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'loading'>('loading');
    const [stats, setStats] = useState({ citasHoy: 0, pacientesActivos: 0, citasPendientes: 0 });

    // Load Data
    useEffect(() => {
        const fetchData = async () => {
            setLoadingApts(true);
            try {
                // Check DB status
                await databaseService.checkHealth();
                setDbStatus('connected');

                // Fetch appointments
                const appointments = await databaseService.getAppointments(new Date());
                setTodayAppointments(appointments.length > 0 ? appointments : MOCK_APPOINTMENTS);

                // Fetch stats
                const dashStats = await databaseService.getDashboardStats();
                setStats(dashStats);
            } catch (error) {
                console.error('Error connecting to database:', error);
                setDbStatus('error');
                setTodayAppointments(MOCK_APPOINTMENTS);
            } finally {
                setLoadingApts(false);
            }
        };

        fetchData();

        // Load urgent chats
        const loadChats = () => {
            const saved = localStorage.getItem('ia_dental_chats');
            const allChats: ChatContact[] = saved ? JSON.parse(saved) : INITIAL_CONTACTS;
            setUrgentChats(allChats.filter(c => c.urgent === true));
        };
        loadChats();
    }, []);

    const toggleSystem = (key: keyof typeof toggles) => {
        const newState = !toggles[key];
        setToggles(prev => ({ ...prev, [key]: newState }));

        if (key === 'ai') {
            localStorage.setItem('ia_dental_active', String(newState));
        }
    };

    return (
        <div className="animate-fade-in relative min-h-full pb-20">
            {/* DB Status Badge */}
            <div className="flex justify-end mb-6">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${dbStatus === 'connected' ? 'bg-alert-success/10 text-brand-dark border border-brand-lime/30' :
                    dbStatus === 'error' ? 'bg-alert-error/10 text-alert-error border border-alert-error/30' :
                        'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}>
                    <Database size={16} />
                    {dbStatus === 'connected' ? 'GELITE Conectado' :
                        dbStatus === 'error' ? 'Sin conexión BD' :
                            'Verificando...'}
                </div>
            </div>


            {/* Widgets Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { key: 'agenda', label: 'Agenda', desc: 'Sincronización auto', icon: <Calendar size={18} className="text-white" />, action: () => onNavigate('agenda') },
                    { key: 'whatsapp', label: 'WhatsApp', desc: 'Mensajería activa', icon: <MessageCircle size={18} className="text-white" />, action: () => onNavigate('communication') },
                    { key: 'auto', label: 'Automatización', desc: 'Flujos activos', icon: <Zap size={18} className="text-white" />, action: () => { } },
                    { key: 'ai', label: 'IA Dental', desc: toggles.ai ? 'Respuesta Auto: ON' : 'Respuesta Auto: OFF', icon: <Sparkles size={18} className="text-white" />, action: null }
                ].map((item) => (
                    <div
                        key={item.key}
                        onClick={() => {
                            if (item.action && item.key !== 'ai') item.action();
                            else toggleSystem(item.key as any);
                        }}
                        className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:-translate-y-1 ${toggles[item.key as keyof typeof toggles]
                            ? 'bg-white border-brand-cyan shadow-[0_4px_16px_rgba(0,198,204,0.15)]'
                            : 'bg-gray-50 border-gray-200 opacity-70'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-colors ${toggles[item.key as keyof typeof toggles]
                                    ? 'bg-gradient-to-br from-brand-blue to-brand-cyan'
                                    : 'bg-gray-400'
                                    }`}>
                                    {item.icon}
                                </div>
                                <span className="font-bold text-brand-dark">{item.label}</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles[item.key as keyof typeof toggles] ? 'bg-gradient-to-r from-brand-blue to-brand-cyan' : 'bg-gray-300'
                                }`}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${toggles[item.key as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Main Grid: Agenda & WhatsApp */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Agenda Box */}
                <div
                    onClick={() => onNavigate('agenda')}
                    className="col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm cursor-pointer hover:border-brand-blue/30 transition-colors"
                >
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                            <Calendar size={20} className="text-brand-blue" /> Agenda de Hoy
                        </h3>
                        <div className="flex items-center gap-3">
                            {loadingApts && <RefreshCw size={14} className="animate-spin text-gray-400" />}
                            <button className="text-xs font-bold text-brand-cyan hover:text-brand-blue transition-colors flex items-center gap-1">
                                Ver Todo <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {loadingApts ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-4 items-center p-2">
                                        <div className="w-16 h-8 bg-gray-100 rounded animate-pulse"></div>
                                        <div className="flex-1 h-8 bg-gray-100 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            todayAppointments.slice(0, 6).map((apt) => (
                                <div key={apt.id} className="flex gap-4 items-center group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <div className="text-right w-16 border-r-2 border-brand-cyan pr-4">
                                        <div className="text-sm font-bold text-brand-dark">{apt.time}</div>
                                        <div className="text-[10px] text-gray-400 font-medium">{apt.duration}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{apt.patientName}</h4>
                                        <p className="text-xs text-gray-500">{apt.doctor} • {apt.treatment}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${apt.status === 'confirmed'
                                        ? 'bg-gradient-to-r from-brand-cyan to-[#00E5CC] text-white'
                                        : apt.status === 'completed'
                                            ? 'bg-blue-100 text-brand-blue'
                                            : 'bg-brand-lime text-brand-dark'
                                        }`}>
                                        {apt.status === 'confirmed' ? 'Confirmada' : apt.status === 'completed' ? 'Finalizada' : 'Pendiente'}
                                    </div>
                                </div>
                            ))
                        )}
                        {!loadingApts && todayAppointments.length === 0 && (
                            <div className="text-center py-6 text-gray-400 flex flex-col items-center">
                                <Calendar size={32} className="mb-2 opacity-50" />
                                <p className="text-sm font-bold">No hay citas para hoy</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Urgent Chats Box */}
                <div
                    onClick={() => onNavigate('communication')}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm cursor-pointer hover:border-brand-lime/50 transition-colors"
                >
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                            <MessageCircle size={20} className="text-brand-lime" /> Urgencias
                        </h3>
                        {urgentChats.length > 0 && (
                            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse shadow-[0_0_8px_rgba(207,242,20,0.8)]"></span>
                        )}
                    </div>

                    <div className="space-y-3 max-h-[320px] overflow-y-auto">
                        {urgentChats.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                <AlertCircle size={32} className="mx-auto mb-2 opacity-50 text-green-500" />
                                <p className="text-xs">No hay urgencias pendientes</p>
                            </div>
                        ) : (
                            urgentChats.map((chat) => (
                                <div key={chat.id} className="p-3 rounded-xl bg-white border-l-4 border-brand-lime hover:bg-gray-50 transition-all shadow-sm">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs font-bold text-brand-dark">{chat.name}</span>
                                        <span className="text-[10px] text-gray-400">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">{chat.msg}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Nueva Cita', sub: 'Agendar', icon: <Plus size={20} />, color: 'from-brand-dark to-brand-blue', action: () => onNavigate('agenda') },
                    { label: 'Nuevo Paciente', sub: 'Registrar', icon: <UserPlus size={20} />, color: 'from-brand-blue to-brand-cyan', action: () => onNavigate('patients') },
                    { label: 'Documento', sub: 'Generar', icon: <FileText size={20} />, color: 'from-brand-cyan to-[#00E5CC]', action: () => onNavigate('documents') },
                    { label: 'Comunicación', sub: 'WhatsApp', icon: <MessageCircle size={20} />, color: 'from-brand-blue to-brand-lime', action: () => onNavigate('communication') },
                    { label: 'IA Dental', sub: 'Consultar', icon: <Sparkles size={20} />, color: 'from-brand-lime to-brand-cyan', action: () => onNavigate('ia-dental') },
                ].map((action, idx) => (
                    <div
                        key={idx}
                        onClick={action.action}
                        className="bg-white p-4 rounded-2xl border border-gray-200 text-center hover:border-brand-cyan hover:shadow-[0_4px_16px_rgba(0,198,204,0.15)] hover:-translate-y-1 transition-all cursor-pointer group"
                    >
                        <div className={`w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                            {action.icon}
                        </div>
                        <h4 className="font-bold text-brand-dark text-xs">{action.label}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{action.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
