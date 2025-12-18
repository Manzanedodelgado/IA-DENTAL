import React, { useState } from 'react';
import { Sparkles, Database, Users, Settings, Mic, Zap, BrainCircuit } from 'lucide-react';
import { ChatMessage, SystemConfigItem, ReflectionLog, VoiceConfig } from '../../../types';
import { iaDentalAdminQuery, iaDentalPatientChat } from '../../../services/iaDentalService';
import { AdminChatTab, PatientChatTab, VoiceTab } from './tabs';

// Default voice config
const DEFAULT_VOICE_CONFIG: VoiceConfig = {
    voiceName: 'Lucía',
    accent: 'es-ES',
    speed: 1.0,
    pitch: 1.0,
    pauseDuration: 500,
};

interface IADentalProps {
    systemConfig: SystemConfigItem[];
    setSystemConfig: React.Dispatch<React.SetStateAction<SystemConfigItem[]>>;
    reflectionLogs: ReflectionLog[];
    onReflectionDecision: (id: string, decision: 'APPROVED' | 'REJECTED') => void;
    onSimulate: () => void;
}

type IADentalTab = 'admin-chat' | 'patient-chat' | 'voice' | 'config' | 'reflection' | 'automation';

const IADental: React.FC<IADentalProps> = ({
    systemConfig,
    setSystemConfig,
    reflectionLogs,
    onReflectionDecision,
    onSimulate
}) => {
    const [activeTab, setActiveTab] = useState<IADentalTab>('admin-chat');

    // Admin Chat State
    const [adminMessages, setAdminMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            sender: 'assistant',
            text: 'Sistema IA Dental listo. Conectado a **GELITE**.\\n\\nComo administrador puedes preguntarme sobre:\\n- Datos de pacientes\\n- Citas programadas\\n- Tratamientos y presupuestos\\n- Estadísticas de la clínica',
            timestamp: new Date()
        }
    ]);
    const [adminInput, setAdminInput] = useState('');
    const [adminLoading, setAdminLoading] = useState(false);

    // Patient Chat State
    const [patientMessages, setPatientMessages] = useState<ChatMessage[]>([
        {
            id: 'init-patient',
            sender: 'assistant',
            text: '¡Hola! Soy IA Dental, el asistente virtual de Rubio García Dental. 👋\\n\\n¿En qué puedo ayudarte hoy? Puedo resolver:\\n- Dudas sobre tratamientos\\n- Información de la clínica\\n- Preparación para tu cita',
            timestamp: new Date()
        }
    ]);
    const [patientInput, setPatientInput] = useState('');
    const [patientLoading, setPatientLoading] = useState(false);

    // Voice Config State
    const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>(DEFAULT_VOICE_CONFIG);
    const [isPlaying, setIsPlaying] = useState(false);

    // Admin Chat Handler
    const handleAdminSend = async () => {
        if (!adminInput.trim() || adminLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: adminInput,
            timestamp: new Date()
        };

        setAdminMessages(prev => [...prev, userMsg]);
        setAdminInput('');
        setAdminLoading(true);

        try {
            const response = await iaDentalAdminQuery(adminMessages, adminInput, systemConfig);
            setAdminMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                text: response,
                timestamp: new Date()
            }]);
        } catch (error: any) {
            setAdminMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                text: `❌ Error: ${error.message}`,
                timestamp: new Date()
            }]);
        } finally {
            setAdminLoading(false);
        }
    };

    // Patient Chat Handler
    const handlePatientSend = async () => {
        if (!patientInput.trim() || patientLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: patientInput,
            timestamp: new Date()
        };

        setPatientMessages(prev => [...prev, userMsg]);
        setPatientInput('');
        setPatientLoading(true);

        try {
            const response = await iaDentalPatientChat(patientInput);
            setPatientMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                text: response,
                timestamp: new Date()
            }]);
        } catch (error: any) {
            setPatientMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                text: 'Lo siento, no pude procesar tu mensaje. Por favor, contacta directamente con la clínica.',
                timestamp: new Date()
            }]);
        } finally {
            setPatientLoading(false);
        }
    };

    // Voice Test Handler
    const handleVoiceTest = () => {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
    };

    // Render SQL code blocks
    const renderContent = (content: string) => {
        const parts = content.split(/(```sql[\\s\\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```sql')) {
                const code = part.replace(/```sql\\n?|```/g, '').trim();
                return (
                    <div key={index} className="my-3 rounded-lg overflow-hidden border border-brand-cyan/30 bg-brand-dark">
                        <div className="flex justify-between items-center px-3 py-1 bg-brand-dark/80 border-b border-brand-cyan/20">
                            <span className="text-[10px] font-mono text-brand-cyan flex items-center gap-1">
                                <Database size={10} /> SQL QUERY
                            </span>
                        </div>
                        <pre className="p-3 overflow-x-auto">
                            <code className="text-xs font-mono text-brand-lime whitespace-pre">{code}</code>
                        </pre>
                    </div>
                );
            }
            return (
                <span key={index} dangerouslySetInnerHTML={{
                    __html: part
                        .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                        .replace(/\\n/g, '<br/>')
                }} />
            );
        });
    };

    return (
        <div className="h-full flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-lime to-brand-cyan flex items-center justify-center shadow-lg animate-pulse-glow">
                    <Sparkles size={28} className="text-brand-dark" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                        IA Dental
                        <span className="text-xs bg-brand-dark text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">v2.0</span>
                    </h1>
                    <p className="text-sm text-gray-500">Asistente Inteligente con Conexión SQL</p>
                </div>
            </div>

            {/* Main Container */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-100 flex flex-col py-4">
                    <div className="px-4 mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Modo de Conversación</p>
                    </div>
                    <nav className="space-y-1 px-3">
                        <button
                            onClick={() => setActiveTab('admin-chat')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'admin-chat' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Database size={18} /> Chat Administrador
                        </button>
                        <button
                            onClick={() => setActiveTab('patient-chat')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'patient-chat' ? 'bg-white text-brand-cyan shadow-md' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Users size={18} /> Chat Pacientes
                        </button>
                    </nav>

                    <div className="px-4 mt-6 mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Configuración IA</p>
                    </div>
                    <nav className="space-y-1 px-3">
                        <button
                            onClick={() => setActiveTab('voice')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'voice' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Mic size={18} /> Voz
                        </button>
                        <button
                            onClick={() => setActiveTab('config')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'config' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Settings size={18} /> Entrenamiento
                        </button>
                        <button
                            onClick={() => setActiveTab('automation')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'automation' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Zap size={18} /> Automatización
                        </button>
                        <button
                            onClick={() => setActiveTab('reflection')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'reflection' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <BrainCircuit size={18} /> Auto-Reflexión
                            {reflectionLogs.filter(l => l.status === 'PENDING').length > 0 && (
                                <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                                    {reflectionLogs.filter(l => l.status === 'PENDING').length}
                                </span>
                            )}
                        </button>
                    </nav>

                    {/* Status */}
                    <div className="mt-auto px-4">
                        <div className="bg-brand-lime/10 border border-brand-lime/30 rounded-xl p-3">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                                <span className="text-xs font-bold text-brand-dark">GELITE Conectado</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    {activeTab === 'admin-chat' && (
                        <AdminChatTab
                            messages={adminMessages}
                            input={adminInput}
                            loading={adminLoading}
                            onInputChange={setAdminInput}
                            onSend={handleAdminSend}
                            renderContent={renderContent}
                        />
                    )}

                    {activeTab === 'patient-chat' && (
                        <PatientChatTab
                            messages={patientMessages}
                            input={patientInput}
                            loading={patientLoading}
                            onInputChange={setPatientInput}
                            onSend={handlePatientSend}
                        />
                    )}

                    {activeTab === 'voice' && (
                        <VoiceTab
                            voiceConfig={voiceConfig}
                            setVoiceConfig={setVoiceConfig}
                            isPlaying={isPlaying}
                            onTest={handleVoiceTest}
                        />
                    )}

                    {/* Other tabs would be rendered here */}
                    {(activeTab === 'config' || activeTab === 'automation' || activeTab === 'reflection') && (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <p>Tab en desarrollo - extraer del componente original</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IADental;
