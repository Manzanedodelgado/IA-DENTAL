import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Users, Settings, Mic, Send, StopCircle, Database, Copy, Volume2, Loader2, BrainCircuit, Check, X, AlertTriangle, ArrowRight, Microscope, FileText, ToggleLeft, ToggleRight, Plus, Save, Lock, AlertCircle, Play, Pause, Zap, GitBranch, Calendar, MessageCircle, Bell, Mail, ChevronDown, Trash2, Wifi, WifiOff } from 'lucide-react';
import { ChatMessage, SystemConfigItem, ReflectionLog, IADentalMode, VoiceConfig, Workflow, WorkflowNode } from '../types';
import { iaDentalAdminQuery, iaDentalPatientChat } from '../services/iaDentalService';
import { messagingService, ScheduledMessage, MESSAGE_TEMPLATES } from '../services/messagingService';
import { whatsappService, WhatsAppStatus } from '../services/whatsappService';


interface IADentalProps {
    systemConfig: SystemConfigItem[];
    setSystemConfig: React.Dispatch<React.SetStateAction<SystemConfigItem[]>>;
    reflectionLogs: ReflectionLog[];
    onReflectionDecision: (id: string, decision: 'APPROVED' | 'REJECTED') => void;
    onSimulate: () => void;
}

// Default voice config
const DEFAULT_VOICE_CONFIG: VoiceConfig = {
    voiceName: 'Lucía',
    accent: 'es-ES',
    speed: 1.0,
    pitch: 1.0,
    pauseDuration: 500,
};

// Available voices
const AVAILABLE_VOICES = [
    { name: 'Lucía', gender: 'female', accent: 'es-ES' },
    { name: 'Jorge', gender: 'male', accent: 'es-ES' },
    { name: 'María', gender: 'female', accent: 'es-MX' },
    { name: 'Carlos', gender: 'male', accent: 'es-MX' },
];

// Mock workflows
const MOCK_WORKFLOWS: Workflow[] = [
    {
        id: 'wf1',
        name: 'Recordatorio de Cita',
        description: 'Envía recordatorio automático 24h antes de la cita',
        nodes: [
            { id: 'n1', type: 'trigger', name: 'Cita Programada', icon: 'Calendar', position: { x: 100, y: 50 }, config: { timing: '24h_before' } },
            { id: 'n2', type: 'action', name: 'Enviar WhatsApp', icon: 'MessageCircle', position: { x: 100, y: 150 }, config: { template: 'reminder' } },
        ],
        connections: [{ id: 'c1', from: 'n1', to: 'n2' }],
        active: true,
        createdAt: '2024-12-01',
        lastRun: '2024-12-14',
    },
    {
        id: 'wf2',
        name: 'Seguimiento Post-Tratamiento',
        description: 'Contacta al paciente 48h después de un tratamiento',
        nodes: [
            { id: 'n1', type: 'trigger', name: 'Tratamiento Finalizado', icon: 'Check', position: { x: 100, y: 50 }, config: {} },
            { id: 'n2', type: 'condition', name: '¿Tratamiento Invasivo?', icon: 'GitBranch', position: { x: 100, y: 150 }, config: {} },
            { id: 'n3', type: 'action', name: 'Enviar Encuesta', icon: 'Mail', position: { x: 50, y: 250 }, config: {} },
            { id: 'n4', type: 'action', name: 'Llamada de Control', icon: 'Bell', position: { x: 150, y: 250 }, config: {} },
        ],
        connections: [
            { id: 'c1', from: 'n1', to: 'n2' },
            { id: 'c2', from: 'n2', to: 'n3', label: 'No' },
            { id: 'c3', from: 'n2', to: 'n4', label: 'Sí' },
        ],
        active: false,
        createdAt: '2024-11-15',
    },
];

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
            text: 'Sistema IA Dental listo. Conectado a **GELITE**.\n\nComo administrador puedes preguntarme sobre:\n- Datos de pacientes\n- Citas programadas\n- Tratamientos y presupuestos\n- Estadísticas de la clínica',
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
            text: '¡Hola! Soy IA Dental, el asistente virtual de Rubio García Dental. 👋\n\n¿En qué puedo ayudarte hoy? Puedo resolver:\n- Dudas sobre tratamientos\n- Información de la clínica\n- Preparación para tu cita',
            timestamp: new Date()
        }
    ]);
    const [patientInput, setPatientInput] = useState('');
    const [patientLoading, setPatientLoading] = useState(false);

    // Voice Config State
    const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>(DEFAULT_VOICE_CONFIG);
    const [isPlaying, setIsPlaying] = useState(false);

    // Workflows State
    const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
    const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

    // Reflection State
    const [isScanning, setIsScanning] = useState(false);

    // WhatsApp & Messaging State
    const [waStatus, setWaStatus] = useState<WhatsAppStatus | null>(null);
    const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([]);

    const adminEndRef = useRef<HTMLDivElement>(null);
    const patientEndRef = useRef<HTMLDivElement>(null);

    // Check WhatsApp status
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const available = await whatsappService.isWorkerAvailable();
                if (available) {
                    const status = await whatsappService.getStatus();
                    setWaStatus(status);
                }
            } catch (e) {
                console.error('Error checking WhatsApp status:', e);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    // Subscribe to scheduled messages updates
    useEffect(() => {
        const unsubscribe = messagingService.onQueueChange((messages) => {
            setScheduledMessages(messages);
        });
        // Load initial messages
        setScheduledMessages(messagingService.getAllMessages());
        return unsubscribe;
    }, []);

    useEffect(() => {
        adminEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [adminMessages]);

    useEffect(() => {
        patientEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [patientMessages]);

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

    // Scan Handler
    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            onSimulate();
            setIsScanning(false);
        }, 2000);
    };

    // Voice Test Handler
    const handleVoiceTest = () => {
        setIsPlaying(true);
        // Simulate playing audio
        setTimeout(() => setIsPlaying(false), 3000);
    };

    // Toggle Workflow Active
    const toggleWorkflowActive = (workflowId: string) => {
        setWorkflows(prev => prev.map(wf =>
            wf.id === workflowId ? { ...wf, active: !wf.active } : wf
        ));
    };

    // Config Handler
    const handleValueChange = (key: string, newValue: string) => {
        setSystemConfig(prev => prev.map(c => c.key === key ? { ...c, value: newValue } : c));
    };

    // Copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Render SQL code blocks
    const renderContent = (content: string) => {
        const parts = content.split(/(```sql[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```sql')) {
                const code = part.replace(/```sql\n?|```/g, '').trim();
                return (
                    <div key={index} className="my-3 rounded-lg overflow-hidden border border-brand-cyan/30 bg-brand-dark">
                        <div className="flex justify-between items-center px-3 py-1 bg-brand-dark/80 border-b border-brand-cyan/20">
                            <span className="text-[10px] font-mono text-brand-cyan flex items-center gap-1">
                                <Database size={10} /> SQL QUERY
                            </span>
                            <button onClick={() => copyToClipboard(code)} className="text-slate-400 hover:text-white transition-colors">
                                <Copy size={12} />
                            </button>
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
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                }} />
            );
        });
    };

    // Get icon component for workflow nodes
    const getNodeIcon = (iconName: string) => {
        const icons: Record<string, React.ReactNode> = {
            Calendar: <Calendar size={16} />,
            MessageCircle: <MessageCircle size={16} />,
            Check: <Check size={16} />,
            GitBranch: <GitBranch size={16} />,
            Mail: <Mail size={16} />,
            Bell: <Bell size={16} />,
        };
        return icons[iconName] || <Zap size={16} />;
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
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'admin-chat' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <Database size={18} /> Chat Administrador
                        </button>
                        <button
                            onClick={() => setActiveTab('patient-chat')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'patient-chat' ? 'bg-white text-brand-cyan shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
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
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'voice' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <Mic size={18} /> Voz
                        </button>
                        <button
                            onClick={() => setActiveTab('config')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'config' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <Settings size={18} /> Entrenamiento
                        </button>
                        <button
                            onClick={() => setActiveTab('automation')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'automation' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            <Zap size={18} /> Automatización
                        </button>
                        <button
                            onClick={() => setActiveTab('reflection')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'reflection' ? 'bg-white text-brand-blue shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
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
                    {/* ADMIN CHAT */}
                    {activeTab === 'admin-chat' && (
                        <>
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <Database size={18} className="text-brand-blue" />
                                    <h2 className="font-bold text-brand-dark">Chat Administrador</h2>
                                    <span className="ml-auto text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-lg font-medium">
                                        Acceso SQL Completo
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                                {adminMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                            ? 'bg-brand-blue text-white rounded-br-none'
                                            : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                                            }`}>
                                            <div className="text-sm leading-relaxed">
                                                {msg.sender === 'user' ? msg.text : renderContent(msg.text)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {adminLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-3">
                                            <Loader2 className="animate-spin text-brand-blue" size={18} />
                                            <span className="text-xs text-gray-500">Consultando GELITE...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={adminEndRef} />
                            </div>

                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-blue/30">
                                    <input
                                        type="text"
                                        value={adminInput}
                                        onChange={(e) => setAdminInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAdminSend()}
                                        placeholder="Pregunta sobre la base de datos..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 mx-2"
                                        disabled={adminLoading}
                                    />
                                    <button
                                        onClick={handleAdminSend}
                                        disabled={!adminInput.trim() || adminLoading}
                                        className={`p-3 rounded-lg transition-all ${adminInput.trim() && !adminLoading
                                            ? 'bg-brand-blue text-white hover:bg-brand-dark'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* PATIENT CHAT */}
                    {activeTab === 'patient-chat' && (
                        <>
                            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-brand-cyan/10 to-transparent">
                                <div className="flex items-center gap-2">
                                    <Users size={18} className="text-brand-cyan" />
                                    <h2 className="font-bold text-brand-dark">Chat Modo Paciente</h2>
                                    <span className="ml-auto text-xs bg-brand-cyan/20 text-brand-dark px-2 py-1 rounded-lg font-medium">
                                        Sin Acceso a Datos
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Simula cómo un paciente interactúa con IA Dental</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-brand-cyan/5 to-white">
                                {patientMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                            ? 'bg-brand-cyan text-white rounded-br-none'
                                            : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                                            }`}>
                                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                                        </div>
                                    </div>
                                ))}
                                {patientLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-3">
                                            <Loader2 className="animate-spin text-brand-cyan" size={18} />
                                            <span className="text-xs text-gray-500">IA Dental está escribiendo...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={patientEndRef} />
                            </div>

                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-cyan/30">
                                    <input
                                        type="text"
                                        value={patientInput}
                                        onChange={(e) => setPatientInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handlePatientSend()}
                                        placeholder="Escribe como si fueras un paciente..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 mx-2"
                                        disabled={patientLoading}
                                    />
                                    <button
                                        onClick={handlePatientSend}
                                        disabled={!patientInput.trim() || patientLoading}
                                        className={`p-3 rounded-lg transition-all ${patientInput.trim() && !patientLoading
                                            ? 'bg-brand-cyan text-white hover:bg-brand-dark'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* VOICE TAB */}
                    {activeTab === 'voice' && (
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                        <Mic className="text-brand-cyan" size={20} /> Configuración de Voz
                                    </h2>
                                    <p className="text-xs text-gray-500">Personaliza cómo suena IA Dental al hablar con los pacientes</p>
                                </div>
                                <button className="px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                                    <Save size={16} /> Guardar
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Voice Selection */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-bold text-brand-dark mb-4">Voz del Asistente</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {AVAILABLE_VOICES.map(voice => (
                                            <button
                                                key={voice.name}
                                                onClick={() => setVoiceConfig(prev => ({ ...prev, voiceName: voice.name, accent: voice.accent as any }))}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${voiceConfig.voiceName === voice.name
                                                    ? 'border-brand-cyan bg-brand-cyan/5'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${voice.gender === 'female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        <Volume2 size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-brand-dark">{voice.name}</p>
                                                        <p className="text-xs text-gray-500">{voice.accent}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Voice Parameters */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-bold text-brand-dark mb-4">Parámetros de Voz</h3>
                                    <div className="space-y-6">
                                        {/* Speed */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-gray-700">Velocidad</span>
                                                <span className="text-brand-cyan font-bold">{voiceConfig.speed.toFixed(1)}x</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="2"
                                                step="0.1"
                                                value={voiceConfig.speed}
                                                onChange={e => setVoiceConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>Lento</span>
                                                <span>Rápido</span>
                                            </div>
                                        </div>

                                        {/* Pitch */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-gray-700">Tono</span>
                                                <span className="text-brand-cyan font-bold">{voiceConfig.pitch.toFixed(1)}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="2"
                                                step="0.1"
                                                value={voiceConfig.pitch}
                                                onChange={e => setVoiceConfig(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>Grave</span>
                                                <span>Agudo</span>
                                            </div>
                                        </div>

                                        {/* Pause Duration */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-gray-700">Duración de Pausas</span>
                                                <span className="text-brand-cyan font-bold">{voiceConfig.pauseDuration}ms</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="200"
                                                max="1000"
                                                step="100"
                                                value={voiceConfig.pauseDuration}
                                                onChange={e => setVoiceConfig(prev => ({ ...prev, pauseDuration: parseInt(e.target.value) }))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>Corta</span>
                                                <span>Larga</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Test Voice */}
                            <div className="mt-6 bg-gradient-to-r from-brand-dark to-brand-blue rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">Probar Voz</h3>
                                        <p className="text-white/70 text-sm">Escucha cómo suena la configuración actual</p>
                                    </div>
                                    <button
                                        onClick={handleVoiceTest}
                                        disabled={isPlaying}
                                        className="px-6 py-3 bg-white text-brand-dark rounded-xl font-bold flex items-center gap-2 hover:bg-brand-lime transition-colors"
                                    >
                                        {isPlaying ? (
                                            <>
                                                <Pause size={18} /> Reproduciendo...
                                            </>
                                        ) : (
                                            <>
                                                <Play size={18} /> Reproducir Ejemplo
                                            </>
                                        )}
                                    </button>
                                </div>
                                {isPlaying && (
                                    <div className="mt-4 bg-white/10 rounded-lg p-3">
                                        <p className="text-sm italic">"Hola, soy IA Dental, tu asistente de Rubio García Dental. ¿En qué puedo ayudarte hoy?"</p>
                                        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-lime animate-pulse" style={{ width: '60%' }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* AUTOMATION TAB */}
                    {activeTab === 'automation' && (
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                        <Zap className="text-brand-lime" size={20} /> Automatización de Flujos
                                    </h2>
                                    <p className="text-xs text-gray-500">Configura acciones automáticas basadas en eventos</p>
                                </div>
                                <button className="px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                                    <Plus size={16} /> Nuevo Flujo
                                </button>
                            </div>

                            {/* Workflows List */}
                            <div className="space-y-4">
                                {workflows.map(workflow => (
                                    <div
                                        key={workflow.id}
                                        className={`bg-white rounded-xl border-2 transition-all ${workflow.active ? 'border-brand-lime' : 'border-gray-200'
                                            }`}
                                    >
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${workflow.active ? 'bg-brand-lime/20 text-brand-dark' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    <Zap size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-brand-dark">{workflow.name}</h3>
                                                    <p className="text-xs text-gray-500">{workflow.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {workflow.lastRun && (
                                                    <span className="text-xs text-gray-400">Última ejecución: {workflow.lastRun}</span>
                                                )}
                                                <button
                                                    onClick={() => toggleWorkflowActive(workflow.id)}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${workflow.active ? 'bg-brand-lime' : 'bg-gray-300'
                                                        }`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${workflow.active ? 'translate-x-7' : 'translate-x-1'
                                                        }`} />
                                                </button>
                                                <button
                                                    onClick={() => setSelectedWorkflow(selectedWorkflow?.id === workflow.id ? null : workflow)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <ChevronDown size={18} className={`transition-transform ${selectedWorkflow?.id === workflow.id ? 'rotate-180' : ''}`} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded Workflow View */}
                                        {selectedWorkflow?.id === workflow.id && (
                                            <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Diagrama de Flujo</h4>
                                                <div className="relative min-h-[200px] bg-white rounded-xl border border-gray-200 p-4">
                                                    {/* Visual Workflow Diagram */}
                                                    <div className="flex flex-col items-center gap-4">
                                                        {workflow.nodes.map((node, index) => (
                                                            <React.Fragment key={node.id}>
                                                                {index > 0 && (
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="w-0.5 h-6 bg-gray-300" />
                                                                        <ArrowRight size={16} className="text-gray-400 rotate-90" />
                                                                    </div>
                                                                )}
                                                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${node.type === 'trigger' ? 'bg-blue-50 border-blue-300' :
                                                                    node.type === 'condition' ? 'bg-amber-50 border-amber-300' :
                                                                        'bg-brand-lime/10 border-green-300'
                                                                    }`}>
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${node.type === 'trigger' ? 'bg-blue-100 text-blue-600' :
                                                                        node.type === 'condition' ? 'bg-amber-100 text-amber-600' :
                                                                            'bg-brand-lime/20 text-brand-dark'
                                                                        }`}>
                                                                        {getNodeIcon(node.icon)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-bold text-gray-400 uppercase">{node.type}</p>
                                                                        <p className="font-medium text-gray-700">{node.name}</p>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-2 mt-4">
                                                    <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1">
                                                        <Trash2 size={14} /> Eliminar
                                                    </button>
                                                    <button className="px-3 py-2 text-sm font-medium text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors">
                                                        Editar Flujo
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp Connection Status */}
                            <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${waStatus?.status === 'connected'
                                ? 'bg-brand-lime/10 border-brand-lime/30'
                                : 'bg-amber-50 border-amber-200'
                                }`}>
                                {waStatus?.status === 'connected' ? (
                                    <Wifi size={24} className="text-brand-dark" />
                                ) : (
                                    <WifiOff size={24} className="text-amber-600" />
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-brand-dark">
                                        WhatsApp {waStatus?.status === 'connected' ? 'Conectado' : 'Desconectado'}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {waStatus?.status === 'connected'
                                            ? 'Las automatizaciones enviarán mensajes en tiempo real'
                                            : 'Conecta WhatsApp para habilitar envíos automáticos'}
                                    </p>
                                </div>
                                {waStatus?.status !== 'connected' && (
                                    <button
                                        onClick={() => whatsappService.reconnect()}
                                        className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors"
                                    >
                                        Conectar
                                    </button>
                                )}
                            </div>

                            {/* Scheduled Messages Queue */}
                            <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Bell size={16} className="text-brand-cyan" />
                                        <h4 className="font-bold text-brand-dark">Cola de Mensajes Programados</h4>
                                    </div>
                                    <span className="text-xs bg-brand-cyan/10 text-brand-cyan px-2 py-1 rounded-full font-bold">
                                        {scheduledMessages.filter(m => m.status === 'pending').length} pendientes
                                    </span>
                                </div>
                                <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                                    {scheduledMessages.length === 0 ? (
                                        <div className="p-6 text-center text-gray-400">
                                            <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No hay mensajes programados</p>
                                        </div>
                                    ) : (
                                        scheduledMessages.slice(0, 10).map(msg => (
                                            <div key={msg.id} className="p-3 hover:bg-gray-50 flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${msg.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                                                    msg.status === 'sent' ? 'bg-brand-lime/20 text-brand-dark' :
                                                        msg.status === 'failed' ? 'bg-red-100 text-red-600' :
                                                            'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    {msg.type === 'reminder' ? <Calendar size={14} /> :
                                                        msg.type === 'followup' ? <Bell size={14} /> :
                                                            <MessageCircle size={14} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-brand-dark truncate">{msg.recipientName}</p>
                                                    <p className="text-xs text-gray-500 truncate">{msg.content.substring(0, 50)}...</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${msg.status === 'pending' ? 'bg-blue-100 text-blue-600' :
                                                        msg.status === 'sent' ? 'bg-brand-lime/20 text-brand-dark' :
                                                            msg.status === 'failed' ? 'bg-red-100 text-red-600' :
                                                                'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {msg.status === 'pending' ? 'Pendiente' :
                                                            msg.status === 'sent' ? 'Enviado' :
                                                                msg.status === 'failed' ? 'Fallido' : 'Cancelado'}
                                                    </span>
                                                    <p className="text-[10px] text-gray-400 mt-1">
                                                        {new Date(msg.scheduledFor).toLocaleString('es', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                                {msg.status === 'pending' && (
                                                    <button
                                                        onClick={() => messagingService.cancelMessage(msg.id)}
                                                        className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Cancelar"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Info Card */}
                            <div className="mt-6 p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/20 flex items-center gap-3">
                                <Zap size={24} className="text-brand-blue" />
                                <div>
                                    <p className="text-sm font-bold text-brand-dark">Automatiza tareas repetitivas</p>
                                    <p className="text-xs text-gray-600">Los flujos se ejecutan automáticamente cuando se cumplen las condiciones del trigger</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ENTRENAMIENTO (Training) */}
                    {activeTab === 'config' && (
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                        <BrainCircuit size={20} className="text-brand-blue" /> Entrenamiento de IA Dental
                                    </h2>
                                    <p className="text-xs text-gray-500">Configura el conocimiento, personalidad y comportamiento del asistente</p>
                                </div>
                                <button className="px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                                    <Save size={16} /> Guardar Todo
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Datos de la Clínica */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                                        <Database size={16} className="text-brand-cyan" /> Datos de la Clínica
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Nombre de la Clínica</label>
                                            <input type="text" defaultValue="Rubio García Dental" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Dirección</label>
                                            <input type="text" defaultValue="Calle Principal 123, Madrid" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Teléfono</label>
                                                <input type="text" defaultValue="+34 912 345 678" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Email</label>
                                                <input type="email" defaultValue="info@rubiogarciadental.com" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Horario de Atención</label>
                                            <input type="text" defaultValue="Lunes a Viernes: 9:00 - 20:00, Sábados: 9:00 - 14:00" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                        </div>
                                    </div>
                                </div>

                                {/* Conocimiento de Odontología */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                                        <FileText size={16} className="text-brand-blue" /> Conocimiento Dental
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Especialidades de la Clínica</label>
                                            <textarea
                                                defaultValue="Implantología dental, Estética dental, Ortodoncia invisible, Endodoncia, Periodoncia, Odontopediatría, Cirugía oral"
                                                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan h-20 resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Información Adicional para Pacientes</label>
                                            <textarea
                                                placeholder="Añade información que IA Dental debe saber sobre tratamientos, cuidados post-operatorios, preparación para citas..."
                                                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan h-24 resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">FAQs Frecuentes</label>
                                            <textarea
                                                placeholder="¿Cuánto dura un implante? ¿Duele la ortodoncia?..."
                                                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan h-20 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Personalidad y Comportamiento */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                                        <Sparkles size={16} className="text-brand-lime" /> Personalidad del Asistente
                                    </h3>
                                    <div className="space-y-5">
                                        {/* Tono */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-gray-700">Trato con el Paciente</span>
                                                <span className="text-brand-cyan font-bold">Cercano</span>
                                            </div>
                                            <input type="range" min="0" max="100" defaultValue="75" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan" />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>Formal</span>
                                                <span>Muy Cercano</span>
                                            </div>
                                        </div>

                                        {/* Velocidad de Respuesta */}
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-gray-700">Velocidad de Respuesta</span>
                                                <span className="text-brand-cyan font-bold">Rápida</span>
                                            </div>
                                            <input type="range" min="0" max="100" defaultValue="80" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan" />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>Pausada</span>
                                                <span>Instantánea</span>
                                            </div>
                                        </div>

                                        {/* Tiempo de Espera */}
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Tiempo Máximo de Espera (segundos)</label>
                                            <input type="number" defaultValue="30" min="5" max="120" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                            <p className="text-xs text-gray-400 mt-1">Tiempo antes de enviar mensaje de seguimiento</p>
                                        </div>

                                        {/* Actitud */}
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Actitud General</label>
                                            <div className="flex flex-wrap gap-2">
                                                {['Amable', 'Profesional', 'Empático', 'Informativo', 'Paciente'].map(trait => (
                                                    <button key={trait} className="px-3 py-1.5 text-xs font-bold rounded-full border-2 border-brand-cyan bg-brand-cyan/10 text-brand-dark">
                                                        {trait}
                                                    </button>
                                                ))}
                                                <button className="px-3 py-1.5 text-xs font-bold rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-cyan transition-colors">
                                                    + Añadir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Listado de Precios (CSV Upload) */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                                        <FileText size={16} className="text-brand-dark" /> Listado de Precios
                                    </h3>
                                    <div className="space-y-4">
                                        {/* CSV Upload */}
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-brand-cyan transition-colors cursor-pointer">
                                            <Database size={32} className="mx-auto text-gray-300 mb-3" />
                                            <p className="text-sm font-bold text-brand-dark">Subir listado de precios (CSV)</p>
                                            <p className="text-xs text-gray-500 mt-1">Arrastra un archivo o haz click para seleccionar</p>
                                            <input type="file" accept=".csv" className="hidden" />
                                            <button className="mt-3 px-4 py-2 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-dark transition-colors">
                                                Seleccionar CSV
                                            </button>
                                        </div>

                                        {/* Current Prices Preview */}
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Vista Previa de Precios</p>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between py-1 border-b border-gray-200">
                                                    <span className="text-gray-600">Limpieza dental</span>
                                                    <span className="font-bold text-brand-dark">60€</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-gray-200">
                                                    <span className="text-gray-600">Empaste simple</span>
                                                    <span className="font-bold text-brand-dark">45€</span>
                                                </div>
                                                <div className="flex justify-between py-1 border-b border-gray-200">
                                                    <span className="text-gray-600">Extracción simple</span>
                                                    <span className="font-bold text-brand-dark">80€</span>
                                                </div>
                                                <div className="flex justify-between py-1">
                                                    <span className="text-gray-600">Implante dental</span>
                                                    <span className="font-bold text-brand-dark">1.200€</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2 text-center">... y 24 tratamientos más</p>
                                        </div>

                                        <div className="p-3 bg-brand-lime/10 rounded-lg border border-brand-lime/30">
                                            <p className="text-xs text-brand-dark">
                                                <strong>Formato CSV:</strong> Tratamiento, Precio, Categoría, Descripción
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* REFLECTION */}
                    {activeTab === 'reflection' && (
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="bg-gradient-to-r from-brand-dark to-brand-blue rounded-xl p-6 text-white mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <BrainCircuit size={32} />
                                    <div>
                                        <h2 className="text-xl font-bold">Auto-Reflexión Cognitiva</h2>
                                        <p className="text-white/70 text-sm">Análisis de errores y mejora automática</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleScan}
                                    disabled={isScanning}
                                    className="px-4 py-2 bg-white text-brand-dark rounded-lg font-semibold text-sm flex items-center gap-2"
                                >
                                    {isScanning ? <Loader2 className="animate-spin" size={16} /> : <Microscope size={16} />}
                                    {isScanning ? 'Analizando...' : 'Ejecutar Diagnóstico'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                {reflectionLogs.map((log) => (
                                    <div key={log.id} className={`bg-white rounded-xl border-l-4 shadow-sm p-6 ${log.status === 'PENDING' ? 'border-amber-400' :
                                        log.status === 'APPROVED' ? 'border-brand-lime/50 opacity-75' : 'border-red-400 opacity-60'
                                        }`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{log.id}</span>
                                                <span className="text-xs text-gray-400">{log.timestamp.toLocaleDateString()}</span>
                                            </div>
                                            {log.status === 'PENDING' ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => onReflectionDecision(log.id, 'REJECTED')}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => onReflectionDecision(log.id, 'APPROVED')}
                                                        className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-lg"
                                                    >
                                                        <Check size={16} /> Aprobar
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${log.status === 'APPROVED' ? 'bg-brand-lime/20 text-brand-dark' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {log.status}
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-xs font-bold text-red-600 uppercase mb-2 flex items-center gap-1">
                                                    <AlertTriangle size={14} /> Error Detectado
                                                </h4>
                                                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                                    <p className="font-medium text-sm mb-1">{log.errorType}</p>
                                                    <p className="text-xs text-gray-600">{log.description}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-brand-blue uppercase mb-2 flex items-center gap-1">
                                                    <BrainCircuit size={14} /> Corrección Propuesta
                                                </h4>
                                                <div className={`p-4 rounded-lg border ${log.status === 'APPROVED' ? 'bg-brand-lime/10 border-brand-lime/30' : 'bg-gray-50 border-gray-200'
                                                    }`}>
                                                    <p className="text-sm font-medium">{log.proposedFix}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {reflectionLogs.length === 0 && (
                                    <div className="text-center py-12 text-gray-400">
                                        <Check size={48} className="mx-auto mb-2 opacity-50" />
                                        <p>No hay anomalías pendientes</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IADental;
